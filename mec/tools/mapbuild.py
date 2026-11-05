"""Compile a mapping spec (JSON) into an importable IEC Mapper unit: <Name>.map + hashed XSDs + mapping.properties,
zipped as <Name>.zap. Applies every rule verified in 01-zap-and-map-file-format.md.

Usage:  python3 -I mapbuild.py <spec.json> <out_dir> [--catalog mi_catalog_full.json.gz] [--no-zip]

Spec (see 08-mapping-spec-and-generator.md for the full reference):
{
  "name": "M3FTD_ACME_Thing_Custom", "version": "1.0", "namespace": "Test", "description": "...",
  "schema_in":  {"xsd": "In.xsd",  "name": "InSchema",  "root": "Request"},          # paths relative to spec
  "schema_out": {"xsd": "Out.xsd", "name": "OutSchema", "root": "Response"},         # or null
  "properties": [{"type": "CP", "name": "Company", "value": "100"}],
  "constants":  [{"name": "INOU", "value": "\"1\""}],
  "variables":  [{"name": "g_Company", "type": "String", "init": "\"\""}],
  "sequence": [
    {"java": "ReadMe", "code": "/* spec ref, version log */"},
    {"java": "Init", "in": {"iKey": "IN:/Request/Key"}, "out": {"oKey": ["$g_Key"]}, "code": "oKey = iKey == null ? \"\" : iKey.trim();"},
    {"settings": {"Company": "$g_Company"}},
    {"loop": "Lines", "cond": "WT", "ctl": "IN:/Request/Line", "emits": ["OUT:/Response/Line"], "body": [
        {"api": "MMS200MI/Get", "mode": "AVI", "in": {"ITNO": "IN:/Request/Line/Item"}, "out": {"ITDS": ["$g_ITDS"]}},
        {"java": "SetLine", "in": {"iITDS": "$g_ITDS"}, "out": {"oName": ["OUT:/Response/Line/Name"]}, "code": "oName = iITDS;"}
    ]},
    {"loop": "IfOK", "cond": "IT", "body": [{"bool": "IsOK", "code": "return isLastAPICallOK();"}, ...]},
    {"loop": "Rows", "cond": "WT", "body": [{"api": "PPS200MI/LstLine", "mode": "ARM", "in": {...}, "out": {...}}, ...]}
  ]
}
Sources (input params): "IN:/path[@attr]", "$variable", "#CONSTANT", "Function.param" (earlier function output;
use "id.param" when the item has an "id"). A list = several links. Targets (output params): "OUT:/path", "$variable".
Loops: "ctl": "IN:/path" -> ML; omitted -> the first body element (UB / AR* / AVI) controls it (FL).
"""
import sys, os, re, json, gzip, zlib, time, zipfile, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapmodel import write_map
from xsdpath import Schema
import xsdpath as _xsdpath

# Java that the M3 CE publish-time security scanner rejects ("Mapping contains unauthorized code") or that the
# KB never generates (04 §1, §6). Checked on comment-stripped code and on variable types/initialisers.
SCANNER_REJECT = [
    (r"\bLinkedList\b|AbstractSequentialList", "java.util.LinkedList (AbstractSequentialList) - use java.util.ArrayList"),
    (r"java\.util\.concurrent|\bTimeUnit\b", "java.util.concurrent (e.g. TimeUnit) - use plain millisecond arithmetic"),
    (r"\bThread\s*\.|java\.lang\.Thread", "java.lang.Thread - use the inherited sleep(ms)"),
    (r"java\.sql\.|\bDriverManager\b|SQLServerDriver", "JDBC / SQL - not allowed in Cloud; use MI (EXPORTMI, MDBREADMI, standard APIs)"),
    (r"java\.io\.File|java\.nio\.file", "file I/O"),
    (r"\bSystem\s*\.\s*(out|err)\b", "System.out/err - use logDebug/logWarn"),
    (r"\bDocServer\b|(?<![A-Za-z0-9_.])cat\s*\.\s*(debug|info|warn|error)\s*\(", "on-prem logging/DocServer - use logWarn/logDebug"),
]
NUMERIC_XS = {"int", "integer", "long", "short", "byte", "decimal", "double", "float", "nonNegativeInteger",
              "positiveInteger", "nonPositiveInteger", "negativeInteger", "unsignedInt", "unsignedLong",
              "unsignedShort", "unsignedByte"}


def _strip_comments(code):
    return re.sub(r"/\*.*?\*/|//[^\n]*", "", code, flags=re.S)


def scanner_hits(text):
    return [msg for rx, msg in SCANNER_REJECT if re.search(rx, text)]

API_MODES = {"AVM", "AVI", "AVL", "ARM", "ARI", "ARL"}


class BuildError(Exception):
    pass


def jhash(s):
    h = 0
    for ch in s:
        h = (31 * h + ord(ch)) & 0xFFFFFFFF
    return h - (1 << 32) if h >= 1 << 31 else h


def mapper_desc(label, length, typ, mandatory=False):
    t = "Numeric" if typ == "N" else "Alpha"
    return f"{label}, size is {length}, type is {t}" + ("(mandatory)" if mandatory else "")


def to_utf16(path):
    raw = open(path, "rb").read()
    if raw[:2] in (b"\xfe\xff", b"\xff\xfe"):
        txt = raw.decode("utf-16")
    else:
        txt = raw.decode("utf-8-sig")
    txt = re.sub(r'(<\?xml[^>]*encoding=")[^"]*(")', r"\1UTF-16\2", txt, count=1)
    return txt


class Builder:
    def __init__(self, spec, base, catalog):
        self.spec, self.base, self.cat = spec, base, catalog
        self.warn, self.errors = [], []
        self.seq = []            # (number, ident, type)
        self.funcs = []          # dicts in FID order
        self.loops = []          # dicts in LID order
        self.params = []         # dicts
        self.links = []
        self.in_recs, self.out_recs = {}, {}   # path -> {"id":..., "type":..., "key":...}
        self.byname = {}         # function name/id -> func dict (latest)
        self.n = {"F": 0, "L": 0, "I": 0, "O": 0}
        self.schemas = {}

    # ---------- schema handling
    def load_schema(self, side):
        sc = self.spec.get(side)
        if not sc:
            return None
        path = os.path.join(self.base, sc["xsd"])
        s = Schema(path)
        self.schemas[side] = s
        root = sc.get("root") or next(iter(s.elements))
        if root not in s.elements:
            raise BuildError(f"{side}: root element '{root}' not in {sc['xsd']} (has {list(s.elements)[:10]})")
        sc["root"] = root
        self.xsd_checks(side, s, root)
        return s

    def xsd_checks(self, side, s, root):
        """Schema rules from real Mapper/publish failures (01 §7)."""
        if "." in root or (root[:1].isupper() and re.match(r"^(Sync|Process|Acknowledge|Load|Show|Get)_", root)):
            raise BuildError(f"{side}: root element '{root}' - a BOD root is <Verb><Noun> written together; '.' or '_' "
                             "breaks MEC XPath resolution (01 §7)")
        for fpath in s.files:
            r = _xsdpath._read(fpath)
            fn = os.path.basename(fpath)
            if r.get("targetNamespace") and r.get("elementFormDefault") != "qualified":
                self.warn.append(f"{side}: {fn} has a targetNamespace but elementFormDefault is not 'qualified' (01 §7)")
            if any(e.get("form") == "unqualified" for e in r.iter(_xsdpath.XS + "element")):
                self.warn.append(f"{side}: {fn} sets form=\"unqualified\" on an element - breaks FormattedPath prefixes and links (01 §7)")
        hits, seen = [], set()

        def walk(el, path, rep, depth):
            if depth > 30:
                return
            tname, tnode = s.type_of(el)
            if rep and tname in NUMERIC_XS:
                hits.append(path)
            if tnode is None or (tname != "?" and (tname, rep) in seen):
                return
            if tname != "?":
                seen.add((tname, rep))
            for n, ch in s.children(el)[0]:
                mo = ch.get("maxOccurs") or s._deref(ch).get("maxOccurs")
                r2 = rep or mo == "unbounded" or (mo is not None and mo.isdigit() and int(mo) > 1)
                walk(ch, f"{path}/{n}", r2, depth + 1)
        walk(s.elements[root], "/" + root, False, 0)
        if hits:
            self.warn.append(f"{side}: numeric XSD types inside repeating groups ({len(hits)}, e.g. {hits[0]}) - reported to trigger "
                             "'too many passes (>100) cyclic dependencies' at publish in some maps (12 of the 80 published samples have "
                             "this and work); if that error appears, make code-like fields xs:string (01 §7)")

    def rec(self, ref):
        side, path = ("in", ref[3:]) if ref.startswith("IN:") else ("out", ref[4:])
        recs = self.in_recs if side == "in" else self.out_recs
        if path in recs:
            return ("REC", side, path)          # ids are assigned in finish(), after document ordering
        sch = self.schemas.get("schema_in" if side == "in" else "schema_out")
        if sch is None:
            raise BuildError(f"{ref}: no {'input' if side == 'in' else 'output'} schema declared")
        ok, typ, key, msg = sch.resolve(path)
        if not ok:
            self.errors.append(f"schema path {ref}: {msg}")
        recs[path] = {"id": None, "type": typ, "key": key}
        return ("REC", side, path)

    # ---------- sequence walk
    def add_seq(self, ident, typ):
        num = len(self.seq) + 1
        self.seq.append((num, ident, typ))
        return num

    def new_func(self, item, ftype, name, path):
        self.n["F"] += 1
        fid = f"FID{self.n['F']}"
        num = self.add_seq(fid, "F")
        f = {"fid": fid, "num": num, "type": ftype, "name": name, "path": path, "desc": item.get("desc", "Please describe me" if ftype in ("UV", "UB") else ""),
             "reusable": bool(item.get("reusable")),
             "code": "\n".join(item["code"]) if isinstance(item.get("code"), list) else item.get("code", ""),
             "in": [], "out": [], "item": item}
        self.funcs.append(f)
        self.byname[name] = f
        if item.get("id"):
            self.byname[item["id"]] = f
        return f

    def add_param(self, f, io, name, desc="Please describe me", dtype="String", mand=False):
        self.n[io] += 1
        pid = f"{'IID' if io == 'I' else 'OID'}{self.n[io]}"
        lst = f["in"] if io == "I" else f["out"]
        p = {"pid": pid, "func": f, "io": io, "name": name, "pos": len(lst), "desc": desc, "dtype": dtype, "mand": mand}
        lst.append(p); self.params.append(p)
        return p

    def walk(self, items, depth=0):
        for it in items:
            if "loop" in it:
                self.do_loop(it, depth)
            elif "java" in it or "bool" in it:
                self.do_java(it)
            elif "api" in it:
                self.do_api(it)
            elif "settings" in it:
                self.do_settings(it)
            elif "assign" in it:
                self.do_assign(it)
            else:
                raise BuildError(f"unknown sequence item: {json.dumps(it)[:120]}")

    def do_java(self, it):
        ftype = "UB" if "bool" in it else it.get("kind", "UV")
        name = it.get("bool") or it.get("java")
        f = self.new_func(it, ftype, name, "/implementations")
        types = it.get("types", {})
        for pn, src in (it.get("in") or {}).items():
            p = self.add_param(f, "I", pn, it.get("pdesc", {}).get(pn, "Please describe me"), types.get(pn, "String"))
            for s in (src if isinstance(src, list) else [src] if src else []):
                self.pending_in.append((p, s))
        for pn, dsts in (it.get("out") or {}).items():
            p = self.add_param(f, "O", pn, it.get("pdesc", {}).get(pn, "Please describe me"), types.get(pn, "String"))
            for d in (dsts if isinstance(dsts, list) else [dsts] if dsts else []):
                self.pending_out.append((p, d))
        if ftype == "UB" and "return" not in f["code"]:
            self.warn.append(f"{name}: Boolean function code has no return statement")
        if "]]>" in f["code"]:
            raise BuildError(f"{name}: Java code contains ']]>' which breaks CDATA")
        for msg in scanner_hits(_strip_comments(f["code"])):
            raise BuildError(f"{name}: uses {msg} (rejected at publish or not allowed in Cloud, 04 §6)")
        if ftype == "UV" and re.search(r"(?<![A-Za-z0-9_])return\s*;", re.sub(r"/\*.*?\*/|//[^\n]*", "", f["code"], flags=re.S)):
            self.warn.append(f"{name}: bare 'return;' in a void function - not used in any sample map; prefer if/else (04 §6)")

    def do_api(self, it):
        key = it["api"]; mode = it.get("mode", "AVM").upper()
        if mode not in API_MODES:
            raise BuildError(f"{key}: mode must be one of {sorted(API_MODES)}")
        prog, trn = key.split("/")
        p = self.cat["programs"].get(prog)
        t = p and p["transactions"].get(trn)
        if it.get("fields"):          # per-call metadata override (e.g. an older MI version kept from a sample map)
            fx = it["fields"]
            t = {"desc": "", "list": mode.startswith("AR"), "list_basis": "spec",
                 "in": [[f["name"], f.get("label", f["name"]), f.get("length", 10), f.get("mandatory", False), f.get("type", "A"), "spec"] for f in fx["in"]],
                 "out": [[f["name"], f.get("label", f["name"]), f.get("length", 10), f.get("type", "A")] for f in fx["out"]],
                 "raw_desc": {**{"I" + f["name"]: f["desc"] for f in fx["in"] if f.get("desc")}, **{"O" + f["name"]: f["desc"] for f in fx["out"] if f.get("desc")}}}
            p = p or {"tenant_specific": True}
        if not t:
            raise BuildError(f"API {key} not in MI catalog — supply it via 'api_fields' or check the name")
        if p.get("tenant_specific"):
            self.warn.append(f"{key}: tenant-specific program — confirm it exists, with these fields, in the target tenant before publish")
        if t["list"] and mode.startswith("AV"):
            self.warn.append(f"{key}: catalog marks it LIST ({t['list_basis']}) but mode {mode} is single")
        if not t["list"] and mode.startswith("AR"):
            self.warn.append(f"{key}: catalog marks it single ({t['list_basis']}) but mode {mode} is repeating")
        f = self.new_func(it, mode, it.get("name", trn), f"/{prog}/{trn}")
        ins = {x[0]: x for x in t["in"]}; outs = {x[0]: x for x in t["out"]}
        pin = {}
        raw = t.get("raw_desc", {})
        for n, lab, ln, mand, typ, _ in t["in"]:
            pin[n] = self.add_param(f, "I", n, raw.get("I" + n) or mapper_desc(lab, ln, typ, mand), "String", mand)
        pout = {}
        for n, lab, ln, typ in t["out"]:
            pout[n] = self.add_param(f, "O", n, raw.get("O" + n) or mapper_desc(lab, ln, typ), "String", False)
        for fn, src in (it.get("in") or {}).items():
            if fn not in pin:
                self.errors.append(f"{key}: input field {fn} does not exist (inputs: {', '.join(ins)})"); continue
            for s in (src if isinstance(src, list) else [src]):
                self.pending_in.append((pin[fn], s))
        for fn, dsts in (it.get("out") or {}).items():
            if fn not in pout:
                self.errors.append(f"{key}: output field {fn} does not exist"); continue
            for d in (dsts if isinstance(dsts, list) else [dsts]):
                self.pending_out.append((pout[fn], d))
        missing = [n for n, x in ins.items() if x[3] and n not in (it.get("in") or {}) and n != "CONO"]
        if missing:
            self.warn.append(f"{key}: mandatory input(s) not linked: {', '.join(missing)}")

    def do_settings(self, it):
        f = self.new_func(it, "AS", it.get("name", "M3 Settings"), "/implementations")
        f["desc"] = ""
        for pn, d in (("Company", "M3 Company"), ("Division", "M3 Division")):
            p = self.add_param(f, "I", pn, d)
            src = it["settings"].get(pn)
            for s in (src if isinstance(src, list) else [src] if src else []):
                self.pending_in.append((p, s))

    def do_assign(self, it):
        f = self.new_func(it, "ASN", it.get("name", "Assign"), "/Assign")
        f["desc"] = ""
        self.pending_assign.append((f, it["assign"]["from"], it["assign"]["to"]))

    def do_loop(self, it, depth):
        self.n["L"] += 1
        lid = f"LID{self.n['L']}"
        cond = it.get("cond", "WT").upper()
        if cond not in ("WT", "WF", "IT"):
            raise BuildError(f"loop {it['loop']}: cond must be WT, WF or IT")
        lp = {"lid": lid, "name": it["loop"], "cond": cond, "desc": it.get("desc", "Please describe me")}
        self.loops.append(lp)
        lp["num"] = self.add_seq(lid, "LB")
        body = it.get("body", [])
        if not body:
            self.warn.append(f"loop {it['loop']} has an empty body")
        ctl = it.get("ctl")
        first_index = len(self.funcs)
        self.walk(body, depth + 1)
        self.add_seq(lid, "LE")
        if ctl:
            if not ctl.startswith("IN:"):
                raise BuildError(f"loop {it['loop']}: ctl must be an IN:/ path (or omit it to use the first body function)")
            self.pending_ml.append((lp, ctl))
            if cond != "WT":
                self.warn.append(f"loop {it['loop']}: input-element control normally uses WT")
        else:
            if not body or "loop" in body[0]:
                raise BuildError(f"loop {it['loop']}: no ctl and the first body element is not a function")
            f = self.funcs[first_index]
            if f["type"] not in ("UB", "ARM", "ARI", "ARL", "AVI"):
                raise BuildError(f"loop {it['loop']}: first body element {f['name']} ({f['type']}) cannot control a loop — use a Boolean, a repeating API, or ctl")
            if f["type"].startswith("AR") and cond != "WT":
                self.warn.append(f"loop {it['loop']}: repeating API control normally uses WT")
            self.links.append({"src": f["fid"], "dst": lid, "type": "FL", "sin": f["num"], "sout": lp["num"]})
        for e in it.get("emits", []) or []:
            self.pending_lm.append((lp, e))

    # ---------- resolution
    def src_ident(self, s, ctx):
        if s.startswith("IN:"):
            return ("M", self.rec(s), -1)
        if s.startswith("OUT:"):
            raise BuildError(f"{ctx}: OUT: path cannot be a source")
        if s.startswith("$"):
            v = self.vars.get(s[1:])
            if not v: raise BuildError(f"{ctx}: unknown variable {s}")
            return ("V", v["id"], -1)
        if s.startswith("#"):
            c = self.consts.get(s[1:])
            if not c: raise BuildError(f"{ctx}: unknown constant {s}")
            return ("K", c["id"], -1)
        if "." in s:
            fn, pn = s.rsplit(".", 1)
            f = self.byname.get(fn)
            if not f: raise BuildError(f"{ctx}: unknown function {fn}")
            p = next((p for p in f["out"] if p["name"] == pn), None)
            if not p: raise BuildError(f"{ctx}: {fn} has no output param {pn}")
            return ("P", p["pid"], f["num"])
        raise BuildError(f"{ctx}: cannot parse source '{s}'")

    def finish(self):
        for p, s in self.pending_in:
            kind, ident, sin = self.src_ident(s, f"{p['func']['name']}.{p['name']}")
            if kind == "P":
                srcf = next(x for x in self.params if x["pid"] == ident)["func"]
                if srcf["num"] >= p["func"]["num"]:
                    self.warn.append(f"{p['func']['name']}.{p['name']} <- {s}: source runs after the target")
            self.links.append({"src": ident, "dst": p["pid"], "type": kind + "P", "sin": sin, "sout": p["func"]["num"]})
        for p, d in self.pending_out:
            if d.startswith("OUT:"):
                self.links.append({"src": p["pid"], "dst": self.rec(d), "type": "PM", "sin": p["func"]["num"], "sout": -1})
            elif d.startswith("$"):
                v = self.vars.get(d[1:])
                if not v: raise BuildError(f"{p['func']['name']}.{p['name']}: unknown variable {d}")
                self.links.append({"src": p["pid"], "dst": v["id"], "type": "PV", "sin": p["func"]["num"], "sout": -1})
            else:
                raise BuildError(f"{p['func']['name']}.{p['name']} -> {d}: targets must be OUT:/ or $var (wire functions on the input side)")
        for lp, ctl in self.pending_ml:
            self.links.append({"src": self.rec(ctl), "dst": lp["lid"], "type": "ML", "sin": -1, "sout": lp["num"]})
            sch = self.schemas.get("schema_in")
            if sch and not sch.is_repeating(ctl[3:]):
                self.warn.append(f"loop {lp['name']}: {ctl} is not declared repeating (maxOccurs) — loop runs once")
        for lp, e in self.pending_lm:
            if not e.startswith("OUT:"):
                raise BuildError(f"loop {lp['name']}: emits must be OUT:/ paths")
            self.links.append({"src": lp["lid"], "dst": self.rec(e), "type": "LM", "sin": lp["num"], "sout": -1})
        for f, a, b in self.pending_assign:
            self.links.append({"src": self.rec(a), "dst": f["fid"], "type": "MF", "sin": -1, "sout": f["num"]})
            self.links.append({"src": f["fid"], "dst": self.rec(b), "type": "FM", "sin": f["num"], "sout": -1})
        for side, paths in (self.spec.get("extra_records") or {}).items():   # unlinked placeholders (UserArea/Property)
            for path in paths:
                self.rec(("IN:" if side == "in" else "OUT:") + path)
        # schema records: root + referenced, in document order, ids assigned afterwards
        for side, recs, pre in (("schema_in", self.in_recs, "MID"), ("schema_out", self.out_recs, "MOD")):
            sc = self.spec.get(side)
            if not sc:
                continue
            root = "/" + sc["root"]
            if root not in recs:
                ok, typ, key, msg = self.schemas[side].resolve(root)
                recs[root] = {"id": None, "type": typ, "key": key}
            for i, path in enumerate(sorted(recs, key=lambda p: (recs[p]["key"], p)), 1):
                recs[path]["id"] = f"{pre}{i}"
        for l in self.links:
            for end in ("src", "dst"):
                v = l[end]
                if isinstance(v, tuple) and v[0] == "REC":
                    l[end] = (self.in_recs if v[1] == "in" else self.out_recs)[v[2]]["id"]

    # ---------- model
    def build(self):
        sp = self.spec
        # The Mapper treats a map with any BOD-category schema as a custom BOD mapping and then requires
        # <Prefix>_<Noun>_<Verb>_[Error_]<In|Out>_<Suffix> ("BOD Mapping Name ERROR"). Maps with other names that
        # still read/write a BOD document (e.g. GC_SCBACK1_IN: file -> Sync BOD) use category Other.
        import re as _re
        bod_name = _re.match(r"^[A-Za-z0-9]+_[A-Za-z0-9]+_(Sync|Process|Acknowledge|Show|Get|Load|Notify|Post|Cancel|Update|Respond|Confirm)_(Error_)?(In|Out)(_|$)", sp["name"])
        for side in ("schema_in", "schema_out"):
            sc = sp.get(side) or {}
            if sc.get("category") == "BOD" and not bod_name:
                raise BuildError(f"{side}: category BOD requires a BOD mapping name <Prefix>_<Noun>_<Verb>_<In|Out>_<Suffix> "
                                 f"('{sp['name']}' is not) - rename the map or set the category to Other")
        for side in ("schema_in", "schema_out"):
            self.load_schema(side)
        self.consts = {c["name"]: dict(c, id=f"CID{i}") for i, c in enumerate(sp.get("constants", []), 1)}
        self.vars = {v["name"]: dict(v, id=f"VID{i}") for i, v in enumerate(sp.get("variables", []), 1)}
        for v in sp.get("variables", []):
            for msg in scanner_hits(f"{v.get('type', '')} {v.get('init', '')}"):
                raise BuildError(f"variable {v['name']}: uses {msg} (04 §6)")
        self.pending_in, self.pending_out, self.pending_ml, self.pending_lm, self.pending_assign = [], [], [], [], []
        self.walk(sp["sequence"])
        self.finish()
        # sanity: unused / duplicate
        names = [f["name"] for f in self.funcs if f["type"] in ("UV", "UB")]
        dups = {n for n in names if names.count(n) > 1}
        clash = {l["name"] for l in self.loops} & {f["name"] for f in self.funcs}
        if clash:
            self.warn.append(f"loop and function share a name: {', '.join(sorted(clash))} - rename the loop (e.g. <Name>Loop)")
        if dups:
            self.warn.append(f"duplicate Java function names (allowed, but refs resolve to the latest): {sorted(dups)}")
        if self.errors:
            raise BuildError("\n  ".join(["spec has errors:"] + self.errors))
        return self.model()

    def model(self):
        sp = self.spec
        def schema_meta(side):
            sc = sp.get(side)
            if not sc:
                return {"ID": "-1", "File": "", "Name": "", "Namespace": "", "Category": "NULL", "Version": "0.0"}
            return {"ID": "-1", "File": sc["_file"], "Name": sc.get("name", sc["root"]), "Namespace": self.schemas[side].target_ns or "",
                    "Category": sc.get("category", "BOD" if (self.schemas[side].target_ns or "").startswith("http://schema.infor.com/InforOAGIS") else "Other"),
                    "Version": sc.get("version", "1.0")}
        m = {"_sections": ["MappingMeta", "Format", "SequenceList", "Loops", "Functions", "Parameters", "Implementations",
                           "Constants", "Variables", "SchemaIn", "SchemaOut", "Links"]}
        m["MappingMeta"] = {"ID": str(sp.get("db_id", -1)), "File": sp["name"] + ".map", "Name": sp["name"], "Standard": "false",
                            "Namespace": sp.get("namespace", "Test"), "Version": sp.get("version", "1.0"),
                            "Description": sp.get("description", ""), "Layout": "(Layout, 20, 60, 20)",
                            "ChangeDate": str(int(time.time() * 1000)), "SchemaIn": schema_meta("schema_in"), "SchemaOut": schema_meta("schema_out"),
                            "_order": ["ID", "File", "Name", "Standard", "Namespace", "Version", "Description", "Layout", "ChangeDate", "SchemaIn", "SchemaOut"]}
        m["Format"] = "2.7"
        m["SequenceList"] = [{"Number": str(n), "ID_S": i, "Type": t} for n, i, t in self.seq]
        m["Loops"] = [{"Name": l["name"], "Condition": l["cond"], "Description": l["desc"], "ID_L": l["lid"]} for l in self.loops]
        m["Functions"] = [{"IsResuable": "true" if f["reusable"] else "false", "PATH": f["path"], "Name": f["name"], "Type": f["type"], "Description": f["desc"], "ID_F": f["fid"]} for f in self.funcs]
        m["Parameters"] = []
        for f in self.funcs:
            for p in f["in"] + f["out"]:
                m["Parameters"].append({"Position": str(p["pos"]), "Name": p["name"], "Type": p["io"], "Description": p["desc"],
                                        "DataType": p["dtype"], "Mandatory": "true" if p["mand"] else "false", "ID_F": f["fid"], "ID_P": p["pid"]})
        m["Implementations"] = [{"IDREF": f["fid"], "Language": "Java", "Code": f["code"] if f["type"] in ("UV", "UB") else ""} for f in self.funcs]
        m["Constants"] = [{"Name": c["name"], "Value": c["value"], "Type": c.get("type", "String"), "Description": c.get("desc", ""), "ID_F": c["id"]} for c in self.consts.values()]
        m["Variables"] = [{"Name": v["name"], "InitialValue": v.get("init", '""' if v.get("type", "String") == "String" else "0"),
                           "Type": v.get("type", "String"), "Description": v.get("desc", "Please describe me"), "ID_V": v["id"]} for v in self.vars.values()]
        ns = self.schemas["schema_in"].target_ns if "schema_in" in self.schemas else ""
        pre = ("H%d:" % abs(jhash(ns))) if ns else ""
        def fpath(path):
            if not pre: return path
            el, _, attr = path.partition("[@")
            return "/".join(pre + s if s else "" for s in el.split("/")) + (("[@" + attr) if attr else "")
        m["SchemaIn"] = [{"PATH": p, "ID_M": r["id"], "Type": r["type"], "FormattedPath": fpath(p)}
                         for p, r in sorted(self.in_recs.items(), key=lambda x: int(x[1]["id"][3:]))]
        m["SchemaOut"] = [{"PATH": p, "ID_M": r["id"], "Type": r["type"], "_present": ["PATH", "ID_M", "Type"]}
                          for p, r in sorted(self.out_recs.items(), key=lambda x: int(x[1]["id"][3:]))]
        m["Links"] = [{"InFrom": l["src"], "OutTo": l["dst"], "SequenceIn": str(l["sin"]), "SequenceOut": str(l["sout"]), "Type": l["type"]} for l in self.links]
        if sp.get("properties"):
            m["_sections"].append("Properties")
            m["Properties"] = [{"Type": p.get("type", "CP"), "ID_1": p.get("id1", ""), "ID_2": p.get("id2", ""), "Name": p["name"], "Value": str(p.get("value", ""))} for p in sp["properties"]]
        if sp.get("namespaces"):       # BOD UserArea wildcard replacements (raw passthrough, see 01 §3.12)
            m["_sections"] += ["Namespaces", "Replacements"]
            m["Namespaces"] = [{"ID_N": n["id"], "URI": n["uri"], "Prefix": n.get("prefix", ""), "Schema": n["schema"]} for n in sp["namespaces"]]
            m["Replacements"] = [{"ID_R": r["id"], "Path": r["path"], "Sequence": str(r.get("sequence", 0)), "Mandatory": str(r.get("mandatory", 0)),
                                  "Repetitive": str(r.get("repetitive", 1)), "ID_N": r["ns"]} for r in sp.get("replacements", [])]
        return m


def write_schemas(spec, base, out_dir):
    """Copy XSDs (and their includes) as UTF-16BE+BOM with CRC32-suffixed names; rewrite includes."""
    done = {}
    def emit(path):
        path = os.path.abspath(path)
        if path in done:
            return done[path]
        txt = to_utf16(path)
        for loc in re.findall(r'schemaLocation="([^"]+)"', txt):
            child = os.path.join(os.path.dirname(path), loc)
            if os.path.exists(child):
                txt = txt.replace(f'schemaLocation="{loc}"', f'schemaLocation="{emit(child)}"')
        data = b"\xfe\xff" + txt.encode("utf-16-be")
        stem = re.sub(r"_[0-9a-f]{5,8}$", "", os.path.splitext(os.path.basename(path))[0])   # file stem, minus an old hash
        name = f"{stem}_{zlib.crc32(data):x}.xsd"
        open(os.path.join(out_dir, name), "wb").write(data)
        done[path] = name
        return name
    for side in ("schema_in", "schema_out"):
        sc = spec.get(side)
        if sc:
            sc["_file"] = emit(os.path.join(base, sc["xsd"]))


def main():
    a = sys.argv[1:]
    if len(a) < 2:
        print(__doc__); sys.exit(1)
    spec_path, out_dir = a[0], a[1]
    catp = a[a.index("--catalog") + 1] if "--catalog" in a else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "mi", "mi_catalog_full.json.gz")
    spec = json.load(open(spec_path))
    base = os.path.dirname(os.path.abspath(spec_path))
    with gzip.open(catp, "rt", encoding="utf-8") as fh:
        cat = json.load(fh)
    for extra in spec.get("api_fields", []):   # tenant-specific APIs not in the catalog
        cat["programs"].setdefault(extra["program"], {"title": "", "transactions": {}, "tenant_specific": True})["transactions"][extra["transaction"]] = {
            "desc": extra.get("desc", ""), "list": extra.get("list", False), "list_basis": "spec",
            "in": [[f["name"], f.get("label", f["name"]), f.get("length", 10), f.get("mandatory", False), f.get("type", "A"), "spec"] for f in extra["in"]],
            "out": [[f["name"], f.get("label", f["name"]), f.get("length", 10), f.get("type", "A")] for f in extra["out"]],
            "raw_desc": {**{"I" + f["name"]: f["desc"] for f in extra["in"] if f.get("desc")}, **{"O" + f["name"]: f["desc"] for f in extra["out"] if f.get("desc")}}}
    unit = os.path.join(out_dir, spec["name"])
    if os.path.exists(unit):
        shutil.rmtree(unit)
    os.makedirs(unit)
    write_schemas(spec, base, unit)
    b = Builder(spec, base, cat)
    try:
        model = b.build()
    except BuildError as e:
        for w in b.warn:
            print("WARN:", w)
        print("BUILD FAILED:", e); sys.exit(2)
    open(os.path.join(unit, spec["name"] + ".map"), "wb").write(write_map(model))
    sin, sout = spec.get("schema_in"), spec.get("schema_out")
    props = ["#Mapping properties", "#" + time.strftime("%a %b %d %H:%M:%S %Z %Y"), "mapping.db.id=-1",
             "mapping.db.location=n/a(imported from mapping unit)",
             f"mapping.input.element={sin['root'] if sin else 'n/a'}", f"mapping.input.exist={'true' if sin else 'false'}", "mapping.input.max.depth=-1",
             f"mapping.output.element={sout['root'] if sout else 'n/a'}", f"mapping.output.exist={'true' if sout else 'false'}", "mapping.output.max.depth=-1"]
    open(os.path.join(unit, "mapping.properties"), "w", newline="\n").write("\n".join(props) + "\n")
    if "--no-zip" not in a:
        zp = os.path.join(out_dir, spec["name"] + ".zap")
        with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
            for fn in sorted(os.listdir(unit)):
                z.write(os.path.join(unit, fn), fn)
        print("wrote", zp)
    print(f"functions={len(b.funcs)} loops={len(b.loops)} params={len(b.params)} links={len(b.links)} "
          f"records in/out={len(b.in_recs)}/{len(b.out_recs)}")
    for w in b.warn:
        print("WARN:", w)


if __name__ == "__main__":
    main()
