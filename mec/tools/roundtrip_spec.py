"""Regression test: for every sample unit, .map -> spec (map2spec) -> .map (mapbuild) and compare semantically.

Usage: python3 -I roundtrip_spec.py <dir of unzipped units> <work_dir>
Compares, independent of ID numbering and element order: functions (type, name, path, desc, code, params),
sequence shape, loops, variables, constants, properties, schema record paths, and the full link graph.
"""
import sys, os, json, shutil, subprocess, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapmodel import read_map
import map2spec

HERE = os.path.dirname(os.path.abspath(__file__))


def canon(m):
    fidx = {f["ID_F"]: i for i, f in enumerate(m["Functions"])}
    lidx = {l["ID_L"]: i for i, l in enumerate(m.get("Loops", []))}
    params = {p["ID_P"]: p for p in m["Parameters"]}
    rin = {r["ID_M"]: r["PATH"] for r in m.get("SchemaIn", [])}
    rout = {r["ID_M"]: r["PATH"] for r in m.get("SchemaOut", [])}
    var = {v["ID_V"]: v["Name"] for v in m.get("Variables", [])}
    con = {c["ID_F"]: c["Name"] for c in m.get("Constants", [])}
    def lab(x):
        if x in params: p = params[x]; return f"F{fidx[p['ID_F']]}.{p['Type']}.{p['Name']}"
        if x in fidx: return f"F{fidx[x]}"
        if x in lidx: return f"L{lidx[x]}"
        if x in rin: return "IN:" + rin[x]
        if x in rout: return "OUT:" + rout[x]
        if x in var: return "$" + var[x]
        if x in con: return "#" + con[x]
        return "?" + x
    code = {i["IDREF"]: (i["Code"] or "") for i in m["Implementations"]}
    pby = collections.defaultdict(list)
    for p in m["Parameters"]:
        pby[p["ID_F"]].append((p["Type"], int(p["Position"]), p["Name"], p["Description"], p["DataType"], p["Mandatory"]))
    return {
        "functions": [(f["Type"], f["Name"], f["PATH"], f["Description"], f["IsResuable"], code.get(f["ID_F"]), sorted(pby[f["ID_F"]])) for f in m["Functions"]],
        "sequence": [(s["Type"], lab(s["ID_S"])) for s in m["SequenceList"]],
        "loops": [(l["Name"], l["Condition"], l["Description"]) for l in m.get("Loops", [])],
        "variables": sorted((v["Name"], v["Type"], v["InitialValue"], v["Description"]) for v in m.get("Variables", [])),
        "constants": sorted((c["Name"], c["Value"], c["Type"], c["Description"]) for c in m.get("Constants", [])),
        "properties": sorted((p["Type"], p["Name"], p["Value"]) for p in m.get("Properties", [])),
        "records_in": sorted(rin.values()), "records_out": sorted(rout.values()),
        "links": sorted((lab(l["InFrom"]), lab(l["OutTo"]), l["Type"], l["SequenceIn"], l["SequenceOut"]) for l in m["Links"]),
        "meta": tuple(m["MappingMeta"].get(k) for k in ("Name", "Version", "Namespace", "Description")),
    }


def main(src_root, work):
    ok, bad = 0, []
    for n in sorted(os.listdir(src_root)):
        d = os.path.join(src_root, n)
        if not os.path.isfile(os.path.join(d, n + ".map")):
            continue
        sd = os.path.join(work, n, "spec"); od = os.path.join(work, n, "out")
        shutil.rmtree(os.path.join(work, n), ignore_errors=True)
        map2spec.convert(d, sd)
        r = subprocess.run([sys.executable, "-I", os.path.join(HERE, "mapbuild.py"), os.path.join(sd, "spec.json"), od, "--no-zip"],
                           capture_output=True, text=True)
        if r.returncode:
            bad.append((n, "BUILD: " + (r.stdout + r.stderr).strip().splitlines()[-1][:300])); continue
        a = canon(read_map(os.path.join(d, n + ".map")))
        b = canon(read_map(os.path.join(od, n, n + ".map")))
        diffs = [k for k in a if a[k] != b[k]]
        if diffs:
            detail = []
            for k in diffs[:3]:
                if isinstance(a[k], list):
                    sa, sb = set(map(str, a[k])), set(map(str, b[k]))
                    detail.append(f"{k}: -{len(sa - sb)} +{len(sb - sa)} e.g. {sorted(sa - sb)[:1]} / {sorted(sb - sa)[:1]}")
                else:
                    detail.append(f"{k}: {a[k]} vs {b[k]}")
            bad.append((n, "; ".join(detail)))
        else:
            ok += 1
    print(f"semantically identical: {ok}   different/failed: {len(bad)}")
    for n, why in bad:
        print(" ", n, "::", why[:600])


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
