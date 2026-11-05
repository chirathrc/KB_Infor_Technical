"""Decompile an Infor IEC/MEC Mapper .map file (UTF-8 or UTF-16) into readable pseudocode.

Usage: python3 -I mapdump.py <file.map|file.zap> [--no-java] [--max-java N]
"""
import sys, re, io
import xml.etree.ElementTree as ET

FUNC_KIND = {
    "UV": "Java(void)", "UB": "Boolean", "ASN": "Assign", "AS": "M3Settings",
    "AVM": "M3API single,ExitMapOnNOK", "AVL": "M3API single,ExitLoopOnNOK", "AVI": "M3API single,IgnoreNOK",
    "ARM": "M3API repeat,ExitMapOnNOK", "ARL": "M3API repeat,ExitLoopOnNOK", "ARI": "M3API repeat,IgnoreNOK",
}


def load(path):
    import zipfile
    if zipfile.is_zipfile(path):                      # accept a .zap directly
        z = zipfile.ZipFile(path)
        raw = z.read(next(n for n in z.namelist() if n.endswith(".map")))
    else:
        raw = open(path, "rb").read()
    if raw[:2] in (b"\xfe\xff", b"\xff\xfe"):
        txt = raw.decode("utf-16")
    else:
        txt = raw.decode("utf-8")
    txt = re.sub(r'encoding="UTF-16"', 'encoding="UTF-8"', txt, count=1)
    return ET.fromstring(txt.encode("utf-8"))


def parse(r):
    m = {}
    meta = r.find("MappingMeta")
    m["meta"] = {k: meta.findtext(k) for k in ("ID", "Name", "Standard", "Namespace", "Version", "Description")}
    for side in ("SchemaIn", "SchemaOut"):
        s = meta.find(side)
        m["meta"][side] = None if s is None else {k: s.findtext(k) for k in ("File", "Name", "Namespace", "Category", "Version")}
    m["funcs"] = {}
    for f in r.iter("Function"):
        m["funcs"][f.find("ID_F").get("ID")] = dict(type=f.findtext("Type"), name=f.findtext("Name"), path=f.findtext("PATH"),
                                                    desc=f.findtext("Description"), reuse=f.findtext("IsResuable"))
    m["loops"] = {}
    for l in r.iter("Loop"):
        m["loops"][l.find("ID_L").get("ID")] = dict(name=l.findtext("Name"), cond=l.findtext("Condition"), desc=l.findtext("Description"))
    m["params"] = {}
    for p in r.iter("Parameter"):
        m["params"][p.find("ID_P").get("ID")] = dict(func=p.find("ID_F").get("IDREF"), name=p.findtext("Name"), io=p.findtext("Type"),
                                                     pos=int(p.findtext("Position") or 0), dtype=p.findtext("DataType"),
                                                     mand=p.findtext("Mandatory"), desc=p.findtext("Description"))
    m["java"] = {}
    for impl in r.iter("Implementation"):
        lang = impl.find("Language")
        m["java"][lang.get("IDREF")] = (lang.tail or "").strip("\n")
    m["consts"] = {}
    cs = r.find("Constants")
    for c in (cs if cs is not None else []):
        m["consts"][c.find("ID_F").get("ID")] = dict(name=c.findtext("Name"), value=c.findtext("Value"), type=c.findtext("Type"))
    m["vars"] = {}
    for v in r.iter("Variable"):
        m["vars"][v.find("ID_V").get("ID")] = dict(name=v.findtext("Name"), init=v.findtext("InitialValue"), type=v.findtext("Type"), desc=v.findtext("Description"))
    m["in"] = {}; m["out"] = {}
    for side, key in (("SchemaIn", "in"), ("SchemaOut", "out")):
        s = r.find(side)
        if s is None:
            continue
        for rec in s.iter("Record"):
            m[key][rec.find("ID_M").get("ID")] = dict(path=rec.findtext("PATH"), type=rec.findtext("Type"))
    m["links"] = []
    for l in r.iter("Link"):
        m["links"].append(dict(src=l.find("InFrom").get("IDREF"), dst=l.find("OutTo").get("IDREF"),
                               sin=l.findtext("SequenceIn"), sout=l.findtext("SequenceOut"), type=l.findtext("Type")))
    m["seq"] = []
    for s in r.find("SequenceList").iter("Sequence"):
        m["seq"].append((int(s.findtext("Number")), s.find("ID_S").get("IDREF"), s.findtext("Type")))
    m["props"] = [dict(type=p.findtext("Type"), name=p.findtext("Name"), value=p.findtext("Value"), id1=p.findtext("ID_1"), id2=p.findtext("ID_2"))
                  for p in r.iter("Property")]
    return m


def label(m, ident):
    if ident in m["in"]:
        return "IN:" + m["in"][ident]["path"]
    if ident in m["out"]:
        return "OUT:" + m["out"][ident]["path"]
    if ident in m["vars"]:
        return "$" + m["vars"][ident]["name"]
    if ident in m["consts"]:
        return "CONST " + m["consts"][ident]["name"] + "=" + (m["consts"][ident]["value"] or "")
    if ident in m["params"]:
        p = m["params"][ident]
        return m["funcs"].get(p["func"], {}).get("name", "?") + "." + p["name"]
    if ident in m["funcs"]:
        return "FUNC " + m["funcs"][ident]["name"]
    if ident in m["loops"]:
        return "LOOP " + m["loops"][ident]["name"]
    return "?" + ident


def dump(m, show_java=True, max_java=400, out=sys.stdout):
    w = lambda s="": out.write(s + "\n")
    meta = m["meta"]
    w(f"MAPPING {meta['Name']}  v{meta['Version']}  ns='{meta['Namespace']}'  standard={meta['Standard']}")
    for side in ("SchemaIn", "SchemaOut"):
        s = meta[side]
        if s:
            w(f"  {side}: {s['Name']} [{s['Category']}] file={s['File']} ns='{s['Namespace']}'")
    roots_in = sorted({v['path'].split('/')[1] for v in m['in'].values() if v['path'].count('/') >= 1})
    w(f"  input roots: {roots_in}  records in={len(m['in'])} out={len(m['out'])}")
    if m["props"]:
        w("PROPERTIES:")
        for p in m["props"]:
            w(f"  [{p['type']}] {p['name']} = {p['value']}" + (f"  (id1={p['id1']} id2={p['id2']})" if (p['id1'] or p['id2']) else ""))
    if m["consts"]:
        w("CONSTANTS:")
        for c in m["consts"].values():
            w(f"  {c['name']} : {c['type']} = {c['value']}")
    if m["vars"]:
        w("VARIABLES:")
        for v in m["vars"].values():
            w(f"  {v['type']} {v['name']} = {v['init']}")
    by_src = {}; by_dst = {}
    for l in m["links"]:
        by_src.setdefault(l["src"], []).append(l)
        by_dst.setdefault(l["dst"], []).append(l)
    w("SEQUENCE:")
    depth = 0
    for num, ident, typ in m["seq"]:
        ind = "  " * (depth + 1)
        if typ == "LB" or (typ is None and ident in m["loops"] and False):
            lp = m["loops"][ident]
            ctl = [label(m, l["src"]) + f" ({l['type']})" for l in by_dst.get(ident, [])]
            outs = [label(m, l["dst"]) + f" ({l['type']})" for l in by_src.get(ident, [])]
            w(f"{ind}#{num} BEGIN {'IF' if lp['cond'].startswith('I') else 'LOOP'}[{lp['cond']}] {lp['name']}  ctl={ctl}" + (f" emits={outs}" if outs else ""))
            depth += 1
            continue
        if typ == "LE":
            depth -= 1
            ind = "  " * (depth + 1)
            w(f"{ind}#{num} END {m['loops'][ident]['name']}")
            continue
        f = m["funcs"].get(ident)
        if f is None:
            w(f"{ind}#{num} ?? {ident} {typ}")
            continue
        kind = FUNC_KIND.get(f["type"], f["type"])
        api = f["path"] if f["path"] and f["path"].count("/") >= 2 else ""
        w(f"{ind}#{num} [{f['type']}:{kind}] {f['name']} {api}")
        ps = sorted([(pid, p) for pid, p in m["params"].items() if p["func"] == ident], key=lambda x: (x[1]["io"] != "I", x[1]["pos"]))
        for pid, p in ps:
            if p["io"] == "I":
                srcs = [label(m, l["src"]) for l in by_dst.get(pid, [])]
                if srcs or f["type"] in ("UV", "UB"):
                    w(f"{ind}    in  {p['name']}{'*' if p['mand']=='true' else ''} <- {', '.join(srcs) if srcs else '(unlinked)'}")
            else:
                dsts = [label(m, l["dst"]) for l in by_src.get(pid, [])]
                if dsts or f["type"] in ("UV",):
                    w(f"{ind}    out {p['name']} -> {', '.join(dsts) if dsts else '(unlinked)'}")
        for l in by_dst.get(ident, []):
            w(f"{ind}    <{l['type']}> from {label(m, l['src'])}")
        for l in by_src.get(ident, []):
            w(f"{ind}    <{l['type']}> to {label(m, l['dst'])}")
        code = m["java"].get(ident, "")
        if show_java and code.strip():
            lines = [ln.rstrip() for ln in code.splitlines()]
            lines = [ln for ln in lines if ln.strip()]
            for ln in lines[:max_java]:
                w(f"{ind}    | {ln}")
            if len(lines) > max_java:
                w(f"{ind}    | ... ({len(lines)-max_java} more lines)")


if __name__ == "__main__":
    args = sys.argv[1:]
    show_java = "--no-java" not in args
    mj = 400
    if "--max-java" in args:
        mj = int(args[args.index("--max-java") + 1])
    path = [a for a in args if a.endswith((".map", ".zap"))][0]
    try:
        dump(parse(load(path)), show_java=show_java, max_java=mj)
    except BrokenPipeError:          # e.g. piped into head
        import os as _os
        _os.dup2(_os.open(_os.devnull, _os.O_WRONLY), sys.stdout.fileno())
