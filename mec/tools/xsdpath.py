"""Minimal XSD resolver: does a slash path (/Root/A/B[@attr]) exist in a schema, what is its type, and where does
it sit in document order. Follows xs:include, element @ref/@type, named/anonymous complexTypes, sequence/choice/all,
group refs, complexContent/simpleContent extension, attributes and attributeGroups. Enough for Mapper records.
"""
import os, re
import xml.etree.ElementTree as ET

XS = "{http://www.w3.org/2001/XMLSchema}"


def _read(path):
    raw = open(path, "rb").read()
    if raw[:2] in (b"\xfe\xff", b"\xff\xfe"):
        txt = raw.decode("utf-16")
    elif raw[:3] == b"\xef\xbb\xbf":
        txt = raw[3:].decode("utf-8")
    else:
        txt = raw.decode("utf-8")
    txt = re.sub(r'^\s*<\?xml[^>]*\?>', "", txt, count=1)
    return ET.fromstring(txt)


def local(q):
    return q.split(":")[-1] if q else q


class Schema:
    def __init__(self, path):
        self.elements, self.types, self.groups, self.agroups = {}, {}, {}, {}
        self.target_ns = None
        self.files = []
        self._load(os.path.abspath(path), set())

    def _load(self, path, seen):
        if path in seen or not os.path.exists(path):
            return
        seen.add(path); self.files.append(path)
        root = _read(path)
        if self.target_ns is None:
            self.target_ns = root.get("targetNamespace") or ""
        for ch in root:
            tag = ch.tag.replace(XS, "")
            name = ch.get("name")
            if tag == "element": self.elements.setdefault(name, ch)
            elif tag in ("complexType", "simpleType"): self.types.setdefault(name, ch)
            elif tag == "group": self.groups.setdefault(name, ch)
            elif tag == "attributeGroup": self.agroups.setdefault(name, ch)
            elif tag in ("include", "import", "redefine") and ch.get("schemaLocation"):
                self._load(os.path.join(os.path.dirname(path), ch.get("schemaLocation")), seen)

    # ---- element structure
    def _deref(self, el):
        if el.get("ref"):
            return self.elements.get(local(el.get("ref")), el)
        return el

    def type_of(self, el):
        el = self._deref(el)
        t = el.get("type")
        if t:
            return local(t), self.types.get(local(t))
        ct = el.find(XS + "complexType")
        return "?", ct

    def _walk(self, node, elems, attrs, depth=0):
        if node is None or depth > 40:
            return
        for ch in node:
            tag = ch.tag.replace(XS, "")
            if tag == "element":
                d = self._deref(ch); elems.append((d.get("name") or local(ch.get("ref")), ch))
            elif tag in ("sequence", "choice", "all"):
                self._walk(ch, elems, attrs, depth + 1)
            elif tag == "group" and ch.get("ref"):
                self._walk(self.groups.get(local(ch.get("ref"))), elems, attrs, depth + 1)
            elif tag in ("complexContent", "simpleContent"):
                self._walk(ch, elems, attrs, depth + 1)
            elif tag in ("extension", "restriction"):
                base = self.types.get(local(ch.get("base")))
                if base is not None and base.tag == XS + "complexType":
                    self._walk(base, elems, attrs, depth + 1)
                self._walk(ch, elems, attrs, depth + 1)
            elif tag == "attribute":
                attrs.append((ch.get("name") or local(ch.get("ref")), ch))
            elif tag == "attributeGroup" and ch.get("ref"):
                self._walk(self.agroups.get(local(ch.get("ref"))), elems, attrs, depth + 1)
            elif tag == "any":
                elems.append(("WILDCARD", ch))

    def children(self, el):
        tname, tnode = self.type_of(el)
        elems, attrs = [], []
        self._walk(tnode, elems, attrs)
        return elems, attrs

    def resolve(self, path):
        """-> (ok, type_name, order_key, message)"""
        m = re.match(r"^(/[^\[]*)(?:\[@([^\]]+)\])?$", path)
        if not m:
            return False, "?", (), f"bad path syntax {path}"
        steps = [s for s in m.group(1).split("/") if s]
        attr = m.group(2)
        if not steps or steps[0] not in self.elements:
            return False, "?", (), f"root '{steps[0] if steps else ''}' not a global element"
        el = self.elements[steps[0]]; key = [0]
        for s in steps[1:]:
            elems, _ = self.children(el)
            idx = next((i for i, (n, _) in enumerate(elems) if n == s), None)
            if idx is None and any(n == "WILDCARD" for n, _ in elems):
                # xs:any (e.g. BOD UserArea) — the replacement element is a global element of the schema set
                widx = next(i for i, (n, _) in enumerate(elems) if n == "WILDCARD")
                el = self.elements.get(s, elems[widx][1]); key.append(widx)
                continue
            if idx is None:
                avail = ", ".join(n for n, _ in elems[:25])
                return False, "?", tuple(key), f"'{s}' not under /{'/'.join(steps[:steps.index(s)])} (has: {avail})"
            el = elems[idx][1]; key.append(idx)
        if attr:
            _, attrs = self.children(el)
            idx = next((i for i, (n, _) in enumerate(attrs) if n == attr), None)
            if idx is None:
                return False, "?", tuple(key), f"attribute @{attr} not on {m.group(1)} (has: {', '.join(n for n, _ in attrs)})"
            a = attrs[idx][1]
            if a.get("ref"):
                return True, "?", tuple(key) + (-1, idx), ""
            return True, local(a.get("type")) or "?", tuple(key) + (-1, idx), ""
        tname, _ = self.type_of(el)
        return True, tname, tuple(key), ""

    def is_repeating(self, path):
        steps = [s for s in path.split("[")[0].split("/") if s]
        el = self.elements.get(steps[0]) if steps else None
        if el is None:
            return False
        for s in steps[1:]:
            elems, _ = self.children(el)
            hit = next((e for n, e in elems if n == s), None)
            if hit is None:
                return False
            el = hit
        mo = el.get("maxOccurs") or self._deref(el).get("maxOccurs")
        return mo == "unbounded" or (mo is not None and mo.isdigit() and int(mo) > 1)
