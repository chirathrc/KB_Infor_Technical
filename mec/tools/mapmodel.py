"""Lossless model of an IEC Mapper .map file + serializer (UTF-16BE+BOM, LF, 4-space indent).

read_map(path) -> dict model ; write_map(model) -> bytes
The model keeps every section as ordered lists of dicts so a parse->write round trip is byte-identical.
"""
import re
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape as _esc

SECTION_ORDER = ["MappingMeta", "Format", "SequenceList", "Loops", "Functions", "Parameters", "Implementations",
                 "Constants", "Variables", "SchemaIn", "SchemaOut", "Links", "Properties", "Namespaces", "Replacements"]

# child-field order per record type (as written by the Mapper)
FIELDS = {
    "Sequence": [("Number", None), ("ID_S", "IDREF"), ("Type", None)],
    "Loop": [("Name", None), ("Condition", None), ("Description", None), ("ID_L", "ID")],
    "Function": [("IsResuable", None), ("PATH", None), ("Name", None), ("Type", None), ("Description", None), ("ID_F", "ID")],
    "Parameter": [("Position", None), ("Name", None), ("Type", None), ("Description", None), ("DataType", None),
                  ("Mandatory", None), ("ID_F", "IDREF"), ("ID_P", "ID")],
    "Constant": [("Name", None), ("Value", None), ("Type", None), ("Description", None), ("ID_F", "ID")],
    "Variable": [("Name", None), ("InitialValue", None), ("Type", None), ("Description", None), ("ID_V", "ID")],
    "RecordIn": [("PATH", None), ("ID_M", "ID"), ("Type", None), ("FormattedPath", None)],
    "RecordOut": [("PATH", None), ("ID_M", "ID"), ("Type", None), ("FormattedPath", None)],
    "Link": [("InFrom", "IDREF"), ("OutTo", "IDREF"), ("SequenceIn", None), ("SequenceOut", None), ("Type", None)],
    "Property": [("Type", None), ("ID_1", None), ("ID_2", None), ("Name", None), ("Value", None)],
    "Namespace": [("ID_N", "ID"), ("URI", None), ("Prefix", None), ("Schema", None)],
    "Replacement": [("ID_R", "ID"), ("Path", None), ("Sequence", None), ("Mandatory", None), ("Repetitive", None), ("ID_N", "IDREF")],
}
META_FIELDS = ["ID", "File", "Name", "Standard", "Namespace", "Version", "Description", "Layout", "ChangeDate"]
SCHEMA_META_FIELDS = ["ID", "File", "Name", "Namespace", "Category", "Version"]
CONTAINERS = {"SequenceList": "Sequence", "Loops": "Loop", "Functions": "Function", "Parameters": "Parameter",
              "Constants": "Constant", "Variables": "Variable", "Links": "Link", "Properties": "Property",
              "Namespaces": "Namespace", "Replacements": "Replacement"}


def _decode(raw):
    if raw[:2] == b"\xfe\xff" or raw[:2] == b"\xff\xfe":
        return raw.decode("utf-16")
    return raw.decode("utf-8")


def read_map(path):
    txt = _decode(open(path, "rb").read())
    r = ET.fromstring(txt.replace('encoding="UTF-16"', 'encoding="UTF-8"', 1).encode("utf-8"))
    model = {"_sections": [c.tag for c in r]}
    meta = r.find("MappingMeta")
    model["MappingMeta"] = {k: meta.findtext(k) for k in META_FIELDS if meta.find(k) is not None}
    model["MappingMeta"]["_order"] = [c.tag for c in meta]
    for side in ("SchemaIn", "SchemaOut"):
        s = meta.find(side)
        if s is not None:
            model["MappingMeta"][side] = {k: s.findtext(k) for k in SCHEMA_META_FIELDS}
    model["Format"] = r.findtext("Format")
    for cont, item in CONTAINERS.items():
        el = r.find(cont)
        if el is None:
            continue
        rows = []
        for it in el:
            row = {}
            for f, attr in FIELDS[item]:
                sub = it.find(f)
                if sub is None:
                    continue
                row[f] = sub.get(attr) if attr else (sub.text or "")
            row["_present"] = [c.tag for c in it]
            rows.append(row)
        model[cont] = rows
    if r.find("Implementations") is not None:
        model["Implementations"] = []
        sec = re.search(r"<Implementations>(.*?)\n    </Implementations>", txt, re.S)
        body = sec.group(1) if sec else ""
        for mm in re.finditer(r'<Implementation>\s*<Language IDREF="([^"]+)">([^<]*)</Language>(.*?)</Implementation>', body, re.S):
            tail = mm.group(3)
            cd = re.match(r"\s*<!\[CDATA\[(.*)\]\]>\s*$", tail, re.S)
            model["Implementations"].append({"IDREF": mm.group(1), "Language": mm.group(2),
                                             "Code": cd.group(1) if cd else None})
    for side, key in (("SchemaIn", "RecordIn"), ("SchemaOut", "RecordOut")):
        el = r.find(side)
        if el is None:
            continue
        rows = []
        for it in el:
            row = {f: (it.find(f).get(a) if a else (it.find(f).text or "")) for f, a in FIELDS[key] if it.find(f) is not None}
            row["_present"] = [c.tag for c in it]
            rows.append(row)
        model[side] = rows
    return model


def _t(s):
    return _esc(s or "", {'"': "&quot;"}) if False else _esc(s or "")


def write_map(model, crlf=False):
    out = ['<?xml version="1.0" encoding="UTF-16" standalone="yes"?>', "<DatabaseData>"]
    I = "    "

    def leaf(level, tag, val):
        if val is None or val == "":
            out.append(f"{I*level}<{tag}></{tag}>")
        else:
            out.append(f"{I*level}<{tag}>{_t(val)}</{tag}>")

    def rows(level, item, rowlist, fields):
        for row in rowlist:
            out.append(f"{I*level}<{item}>")
            present = row.get("_present") or [f for f, _ in fields]
            fmap = dict(fields)
            for f in present:
                attr = fmap.get(f)
                if attr:
                    out.append(f'{I*(level+1)}<{f} {attr}="{row[f]}"/>')
                else:
                    leaf(level + 1, f, row.get(f))
            out.append(f"{I*level}</{item}>")

    for sec in model.get("_sections", SECTION_ORDER):
        if sec == "MappingMeta":
            mm = model["MappingMeta"]
            out.append(f"{I}<MappingMeta>")
            for k in mm.get("_order", META_FIELDS + ["SchemaIn", "SchemaOut"]):
                if k in ("SchemaIn", "SchemaOut"):
                    out.append(f"{I*2}<{k}>")
                    for f in SCHEMA_META_FIELDS:
                        leaf(3, f, mm[k].get(f))
                    out.append(f"{I*2}</{k}>")
                else:
                    leaf(2, k, mm.get(k))
            out.append(f"{I}</MappingMeta>")
        elif sec == "Format":
            leaf(1, "Format", model["Format"])
        elif sec == "Implementations":
            impls = model.get("Implementations", [])
            if not impls:
                out.append(f"{I}<Implementations/>"); continue
            out.append(f"{I}<Implementations>")
            for im in impls:
                out.append(f"{I*2}<Implementation>")
                code = im["Code"]
                out.append(f'{I*3}<Language IDREF="{im["IDREF"]}">{im.get("Language") or "Java"}</Language>')
                if code is not None:
                    out.append(f"{I*3}<![CDATA[{code}]]>")
                out.append(f"{I*2}</Implementation>")
            out.append(f"{I}</Implementations>")
        elif sec in ("SchemaIn", "SchemaOut"):
            recs = model.get(sec, [])
            if not recs:
                out.append(f"{I}<{sec}/>"); continue
            out.append(f"{I}<{sec}>")
            rows(2, "Record", recs, FIELDS["RecordIn" if sec == "SchemaIn" else "RecordOut"])
            out.append(f"{I}</{sec}>")
        elif sec in CONTAINERS:
            rl = model.get(sec, [])
            if not rl:
                out.append(f"{I}<{sec}/>"); continue
            out.append(f"{I}<{sec}>")
            rows(2, CONTAINERS[sec], rl, FIELDS[CONTAINERS[sec]])
            out.append(f"{I}</{sec}>")
    out.append("</DatabaseData>")
    text = "\n".join(out) + "\n"
    if crlf:
        text = text.replace("\n", "\r\n")
    return b"\xfe\xff" + text.encode("utf-16-be")
