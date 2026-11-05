"""Convert an existing Mapper unit (.zap, or a folder with .map + .xsd) into an editable mapping spec for mapbuild.py.

Usage: python3 -I map2spec.py <file.zap | unzipped-dir> <out_dir> [--catalog-api]
  out_dir receives spec.json + the schema files. By default the API field metadata embedded in the map is kept
  (spec "api_fields") so the rebuild is faithful; --catalog-api drops it for every transaction found in the MI
  catalog (so mapbuild uses current metadata) and keeps it only for tenant-specific APIs missing from the catalog.
Typical use: take the closest sample of the same family, convert, edit the spec for the new FS, rebuild.
"""
import sys, os, json, shutil, zipfile, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapmodel import read_map

DEFAULT_DESC = "Please describe me"


def _catalog_keys():
    import gzip
    path = os.environ.get("MI_CATALOG") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "mi", "mi_catalog_full.json.gz")
    if not os.path.exists(path):
        return set()
    with gzip.open(path, "rt", encoding="utf-8") as fh:
        c = json.load(fh)
    return {f"{p}/{t}" for p, v in c["programs"].items() for t in v["transactions"]}


def convert(src, out_dir, keep_api=True):
    in_catalog = set() if keep_api else _catalog_keys()
    tmp = None
    if zipfile.is_zipfile(src):
        tmp = tempfile.mkdtemp(); zipfile.ZipFile(src).extractall(tmp); src = tmp
    mp = next(os.path.join(src, f) for f in os.listdir(src) if f.endswith(".map"))
    m = read_map(mp)
    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(src):
        if f.endswith(".xsd"):
            shutil.copy(os.path.join(src, f), os.path.join(out_dir, f))
    props = {}
    pp = os.path.join(src, "mapping.properties")
    if os.path.exists(pp):
        for ln in open(pp, encoding="utf-8", errors="replace"):
            if "=" in ln and not ln.startswith("#"):
                k, v = ln.strip().split("=", 1); props[k] = v
    meta = m["MappingMeta"]
    funcs = {f["ID_F"]: f for f in m["Functions"]}
    fidx = {f["ID_F"]: i + 1 for i, f in enumerate(m["Functions"])}
    loops = {l["ID_L"]: l for l in m.get("Loops", [])}
    params = {p["ID_P"]: p for p in m["Parameters"]}
    pby = {}
    for p in m["Parameters"]:
        pby.setdefault(p["ID_F"], []).append(p)
    code = {i["IDREF"]: i["Code"] or "" for i in m["Implementations"]}
    recs_in = {r["ID_M"]: r["PATH"] for r in m.get("SchemaIn", [])}
    recs_out = {r["ID_M"]: r["PATH"] for r in m.get("SchemaOut", [])}
    vars_ = {v["ID_V"]: v for v in m.get("Variables", [])}
    consts = {c["ID_F"]: c for c in m.get("Constants", [])}
    into, outof = {}, {}
    for l in m["Links"]:
        into.setdefault(l["OutTo"], []).append(l); outof.setdefault(l["InFrom"], []).append(l)

    def src_ref(l):
        s = l["InFrom"]
        if s in recs_in: return "IN:" + recs_in[s]
        if s in vars_: return "$" + vars_[s]["Name"]
        if s in consts: return "#" + consts[s]["Name"]
        if s in params: return f"F{fidx[params[s]['ID_F']]}.{params[s]['Name']}"
        raise ValueError(f"unhandled source {s}")

    def dst_refs(pid):
        out = []
        for l in outof.get(pid, []):
            d = l["OutTo"]
            if d in recs_out: out.append("OUT:" + recs_out[d])
            elif d in vars_: out.append("$" + vars_[d]["Name"])
        return out

    api_fields = {}

    def func_item(f):
        fid = f["ID_F"]; t = f["Type"]
        ps = sorted(pby.get(fid, []), key=lambda p: (p["Type"] != "I", int(p["Position"])))
        ins = {p["Name"]: ([src_ref(l) for l in into.get(p["ID_P"], [])] or None) for p in ps if p["Type"] == "I"}
        ins = {k: (v[0] if v and len(v) == 1 else v) for k, v in ins.items()}
        outs = {p["Name"]: dst_refs(p["ID_P"]) for p in ps if p["Type"] == "O"}
        it = {"id": f"F{fidx[fid]}"}
        if t in ("UV", "UB"):
            it["bool" if t == "UB" else "java"] = f["Name"]
            it["in"], it["out"] = ins, outs
            it["code"] = code.get(fid, "")
            if f["Description"] != DEFAULT_DESC: it["desc"] = f["Description"]
            pd = {p["Name"]: p["Description"] for p in ps if p["Description"] != DEFAULT_DESC}
            if pd: it["pdesc"] = pd
            ty = {p["Name"]: p["DataType"] for p in ps if p["DataType"] != "String"}
            if ty: it["types"] = ty
        elif t == "AS":
            it["settings"] = {k: v for k, v in ins.items() if v}
            it["name"] = f["Name"]
        elif t == "ASN":
            a = [l for l in into.get(fid, []) if l["Type"] == "MF"]; b = [l for l in outof.get(fid, []) if l["Type"] == "FM"]
            it["assign"] = {"from": "IN:" + recs_in[a[0]["InFrom"]], "to": "OUT:" + recs_out[b[0]["OutTo"]]}
            it["name"] = f["Name"]
        else:
            prog, trn = f["PATH"].strip("/").split("/")
            it["api"] = f"{prog}/{trn}"; it["mode"] = t
            if f["Name"] != trn: it["name"] = f["Name"]
            it["in"] = {k: v for k, v in ins.items() if v}
            it["out"] = {k: v for k, v in outs.items() if v}
            if keep_api or f"{prog}/{trn}" not in in_catalog:   # keep sample metadata for non-catalog (tenant) APIs
                fx = {"in": [{"name": p["Name"], "desc": p["Description"], "mandatory": p["Mandatory"] == "true"} for p in ps if p["Type"] == "I"],
                      "out": [{"name": p["Name"], "desc": p["Description"]} for p in ps if p["Type"] == "O"]}
                api_fields.setdefault((prog, trn), []).append((it, fx))
        if f.get("IsResuable") == "true": it["reusable"] = True
        return it

    # rebuild the nested sequence
    root = []; stack = [root]; loopitem = {}
    for s in m["SequenceList"]:
        ident, typ = s["ID_S"], s["Type"]
        if typ == "LB":
            lp = loops[ident]
            it = {"loop": lp["Name"], "cond": lp["Condition"], "body": []}
            if lp["Description"] != DEFAULT_DESC: it["desc"] = lp["Description"]
            ctl = [l for l in into.get(ident, [])]
            if ctl and ctl[0]["Type"] == "ML": it["ctl"] = "IN:" + recs_in[ctl[0]["InFrom"]]
            em = ["OUT:" + recs_out[l["OutTo"]] for l in outof.get(ident, []) if l["Type"] == "LM"]
            if em: it["emits"] = em
            stack[-1].append(it); stack.append(it["body"])
        elif typ == "LE":
            stack.pop()
        else:
            stack[-1].append(func_item(funcs[ident]))
    api_list = []
    for (prog, trn), calls in api_fields.items():
        variants = {json.dumps(fx, sort_keys=True) for _, fx in calls}
        if len(variants) == 1:     # one metadata version in this map -> shared api_fields entry
            fx = calls[0][1]
            api_list.append({"program": prog, "transaction": trn, "list": calls[0][0]["mode"].startswith("AR"), **fx})
        else:                      # same transaction added at different MI versions -> per-call field lists
            for it, fx in calls:
                it["fields"] = fx

    def schema(side):
        sm = meta.get(side)
        if not sm or not sm.get("File"):
            return None
        rootel = props.get("mapping.input.element" if side == "SchemaIn" else "mapping.output.element")
        return {"xsd": sm["File"], "name": sm["Name"], "root": rootel, "category": sm["Category"], "version": sm["Version"]}

    spec = {"name": meta["Name"], "version": meta.get("Version"), "namespace": meta.get("Namespace"),
            "description": meta.get("Description") or "", "db_id": meta.get("ID"),
            "schema_in": schema("SchemaIn"), "schema_out": schema("SchemaOut"),
            "properties": [{"type": p["Type"], "name": p["Name"], "value": p["Value"], "id1": p.get("ID_1", ""), "id2": p.get("ID_2", "")} for p in m.get("Properties", [])],
            "constants": [{"name": c["Name"], "value": c["Value"], "type": c["Type"], "desc": c["Description"]}
                          for c in sorted(m.get("Constants", []), key=lambda c: int(c["ID_F"][3:]))],
            "variables": [{"name": v["Name"], "type": v["Type"], "init": v["InitialValue"], "desc": v["Description"]}
                          for v in sorted(m.get("Variables", []), key=lambda v: int(v["ID_V"][3:]))],
            "api_fields": api_list,
            "sequence": root}
    linked = {x for l in m["Links"] for x in (l["InFrom"], l["OutTo"])}
    extra = {"in": [r["PATH"] for r in m.get("SchemaIn", []) if r["ID_M"] not in linked and r["PATH"].count("/") > 1],
             "out": [r["PATH"] for r in m.get("SchemaOut", []) if r["ID_M"] not in linked and r["PATH"].count("/") > 1]}
    if extra["in"] or extra["out"]:
        spec["extra_records"] = {k: v for k, v in extra.items() if v}
    if m.get("Namespaces"):
        spec["namespaces"] = [{"id": n["ID_N"], "uri": n["URI"], "prefix": n.get("Prefix", ""), "schema": n["Schema"]} for n in m["Namespaces"]]
        spec["replacements"] = [{"id": r["ID_R"], "path": r["Path"], "sequence": r["Sequence"], "mandatory": r["Mandatory"],
                                 "repetitive": r["Repetitive"], "ns": r["ID_N"]} for r in m.get("Replacements", [])]
    json.dump(spec, open(os.path.join(out_dir, "spec.json"), "w"), indent=1, ensure_ascii=False)
    if tmp:
        shutil.rmtree(tmp)
    return spec


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) < 2:
        print(__doc__); sys.exit(1)
    s = convert(a[0], a[1], keep_api="--catalog-api" not in a)
    print("wrote", os.path.join(a[1], "spec.json"), "-", sum(1 for _ in json.dumps(s)), "chars")
