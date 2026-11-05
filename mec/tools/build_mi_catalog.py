"""Harvest an M3 MI API catalog (program/transaction -> full input/output field metadata) from .map files.

Usage: python3 -I build_mi_catalog.py <utf8_root> <out.json> <out.md>
"""
import sys, os, re, json, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapdump import load, parse

root, out_json, out_md = sys.argv[1:4]
DESC_RX = re.compile(r"^(?P<label>.*?), size is (?P<len>\d+), type is (?P<type>Alpha|Numeric)(?P<mand>\(mandatory\))?\s*$")
cat = {}
usage = collections.defaultdict(lambda: {"maps": set(), "types": collections.Counter()})
for n in sorted(os.listdir(root)):
    m = parse(load(os.path.join(root, n, n + ".map")))
    for fid, f in m["funcs"].items():
        t = f["type"]
        if not (t.startswith("AV") or t.startswith("AR")):
            continue
        path = f["path"]
        _, prog, trn = path.split("/")
        ps = sorted([p for p in m["params"].values() if p["func"] == fid], key=lambda p: (p["io"], p["pos"]))
        fields = {"I": [], "O": []}
        for p in ps:
            d = DESC_RX.match(p["desc"] or "")
            fields[p["io"]].append({
                "name": p["name"], "pos": p["pos"], "mandatory": p["mand"] == "true",
                "label": d.group("label") if d else (p["desc"] or ""),
                "length": int(d.group("len")) if d else None,
                "type": d.group("type") if d else None,
            })
        key = f"{prog}/{trn}"
        usage[key]["maps"].add(n)
        usage[key]["types"][t] += 1
        size = len(fields["I"]) + len(fields["O"])
        if key not in cat or size > cat[key]["_size"]:
            cat[key] = {"program": prog, "transaction": trn, "inputs": fields["I"], "outputs": fields["O"], "_size": size, "_source_map": n}

for k, v in cat.items():
    v.pop("_size")
    u = usage[k]
    v["used_as"] = dict(u["types"])
    v["repeating"] = any(t.startswith("AR") for t in u["types"])
    v["used_in_maps"] = sorted(u["maps"])

json.dump(dict(sorted(cat.items())), open(out_json, "w"), indent=1, ensure_ascii=False)

with open(out_md, "w") as fh:
    fh.write("# M3 MI API catalog harvested from sample mappings\n\n")
    fh.write(f"{len(cat)} transactions across {len({v['program'] for v in cat.values()})} MI programs. ")
    fh.write("Full field metadata (position, length, type, mandatory) is in `mi_catalog.json`; this index lists each transaction, "
             "its mandatory inputs, how it was used (AV* single / AR* repeating, suffix M/L/I = exit map / exit loop / ignore on NOK), "
             "and how many sample maps use it.\n\n")
    byprog = collections.defaultdict(list)
    for k, v in sorted(cat.items()):
        byprog[v["program"]].append(v)
    for prog in sorted(byprog):
        fh.write(f"## {prog}\n\n| Transaction | Mandatory inputs | #in/#out | Used as | Maps |\n|---|---|---|---|---|\n")
        for v in byprog[prog]:
            mand = ", ".join(f["name"] for f in v["inputs"] if f["mandatory"]) or "-"
            ua = ", ".join(f"{t}×{c}" for t, c in sorted(v["used_as"].items()))
            fh.write(f"| {v['transaction']} | {mand} | {len(v['inputs'])}/{len(v['outputs'])} | {ua} | {len(v['used_in_maps'])} |\n")
        fh.write("\n")
print(len(cat), "transactions", len(byprog), "programs")
