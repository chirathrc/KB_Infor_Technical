"""Collect statistics across all IEC .map files (UTF-8 copies)."""
import sys, os, re, json, collections
import xml.etree.ElementTree as ET

root_dir = sys.argv[1]
out_json = sys.argv[2]

C = collections.Counter
stats = {
    "format": C(), "func_type": C(), "func_type_name": collections.defaultdict(C),
    "func_path": C(), "link_type": C(), "loop_cond": C(), "seq_type": C(),
    "prop_type": C(), "prop_name": C(), "var_type": C(), "param_dtype": C(),
    "schema_cat": C(), "namespace": C(), "java_api": C(), "manifest_const": C(),
    "manifest_str": C(), "imports": C(), "func_reusable": C(), "const_type": C(),
    "schemain_type": C(), "elements_top": C(), "loop_names": C(),
}
per_map = {}

API_RX = re.compile(r"\b(getManifestInfo|setManifestInfo|logDebug|logInfo|logWarn|logError|isLastAPICallOK|getLastAPI\w*|getMapUUID|getMapName|getAgreement\w*|getPartner\w*|addError\w*|setError\w*|translate\w*|getDataTranslator\w*|getTranslat\w*|getMessage\w*|getMIError\w*|getAPIError\w*|setSkip\w*|skip\w*|throwMapping\w*|getM3\w*|callAPI\w*|setOutput\w*|getInput\w*|setAbort\w*|abort\w*|setStop\w*|getProperty|getControlProperty\w*|getUUID|getMEC\w*|getEc\w*|setMapStatus\w*|resetLastAPI\w*|setLastAPI\w*|getErrorMessage\w*|getErrorCode\w*|getBOD\w*|setBOD\w*|getION\w*|setION\w*|getEnvelope\w*|getCompany\w*|getDivision\w*|getUser\w*|getLanguage\w*|getDateFormat\w*|createError\w*|addBODError\w*|setConfirm\w*|getConfirm\w*|getLastMI\w*|getMIResult\w*)\s*\(")
MC_RX = re.compile(r"ManifestConstants\.(\w+)")
MSTR_RX = re.compile(r"[gs]etManifestInfo\(\s*\"([^\"]+)\"")
IMP_RX = re.compile(r"\b((?:java|javax|com|org)\.[a-z]\w*(?:\.[a-zA-Z_]\w*)+)")

for name in sorted(os.listdir(root_dir)):
    d = os.path.join(root_dir, name)
    mp = os.path.join(d, name + ".map")
    if not os.path.isfile(mp):
        continue
    r = ET.parse(mp).getroot()
    m = {"name": name}
    meta = r.find("MappingMeta")
    m["version"] = meta.findtext("Version")
    m["namespace"] = meta.findtext("Namespace")
    m["standard"] = meta.findtext("Standard")
    m["desc"] = meta.findtext("Description")
    for side in ("SchemaIn", "SchemaOut"):
        s = meta.find(side)
        if s is not None:
            m[side] = {k: s.findtext(k) for k in ("File", "Name", "Namespace", "Category", "Version")}
            stats["schema_cat"][(side, s.findtext("Category"))] += 1
    stats["format"][r.findtext("Format")] += 1
    stats["namespace"][m["namespace"]] += 1

    funcs = {}
    for f in r.iter("Function"):
        fid = f.find("ID_F").get("ID")
        t = f.findtext("Type"); n = f.findtext("Name"); p = f.findtext("PATH")
        funcs[fid] = (t, n, p)
        stats["func_type"][t] += 1
        stats["func_type_name"][t][n if t not in ("UV", "UB", "UI", "US") else "<user>"] += 1
        stats["func_reusable"][f.findtext("IsResuable")] += 1
        if t not in ("UV", "UB", "ASN", "AS") :
            stats["func_path"][(t, p)] += 1
    m["n_funcs"] = len(funcs)
    m["func_types"] = dict(C(t for t, _, _ in funcs.values()))
    m["apis"] = sorted({p for t, n, p in funcs.values() if p and p.startswith("/") and p.count("/") >= 2})

    for l in r.iter("Link"):
        stats["link_type"][l.findtext("Type")] += 1
    for lp in r.iter("Loop"):
        stats["loop_cond"][lp.findtext("Condition")] += 1
        stats["loop_names"][lp.findtext("Name")] += 1
    for s in r.iter("Sequence"):
        stats["seq_type"][s.findtext("Type")] += 1
    m["props"] = []
    for p in r.iter("Property"):
        stats["prop_type"][p.findtext("Type")] += 1
        stats["prop_name"][(p.findtext("Type"), p.findtext("Name"))] += 1
        m["props"].append((p.findtext("Type"), p.findtext("Name"), p.findtext("Value"), p.findtext("ID_1"), p.findtext("ID_2")))
    for v in r.iter("Variable"):
        stats["var_type"][v.findtext("Type")] += 1
    for c in r.find("Constants") if r.find("Constants") is not None else []:
        stats["const_type"][c.tag] += 1
    for pa in r.iter("Parameter"):
        stats["param_dtype"][pa.findtext("DataType")] += 1
    si = r.find("SchemaIn")
    if si is not None:
        for rec in si.iter("Record"):
            stats["schemain_type"][rec.findtext("Type")] += 1
    java = "\n".join((impl.text or "") + "".join(x.tail or "" for x in impl) for impl in r.iter("Implementation"))
    # CDATA text sits as tail of <Language>; collect it
    java = "\n".join("".join(impl.itertext()) for impl in r.iter("Implementation"))
    m["java_lines"] = len([ln for ln in java.splitlines() if ln.strip() and not ln.strip().startswith("//")])
    for a in API_RX.findall(java):
        stats["java_api"][a] += 1
    for a in MC_RX.findall(java):
        stats["manifest_const"][a] += 1
    for a in MSTR_RX.findall(java):
        stats["manifest_str"][a] += 1
    for a in IMP_RX.findall(java):
        stats["imports"][a] += 1
    m["n_links"] = len(list(r.iter("Link")))
    m["n_loops"] = len(list(r.iter("Loop")))
    m["n_vars"] = len(list(r.iter("Variable")))
    m["n_in"] = len(list(si.iter("Record"))) if si is not None else 0
    so = r.find("SchemaOut")
    m["n_out"] = len(list(so.iter("Record"))) if so is not None else 0
    per_map[name] = m

def show(title, c, n=60):
    print(f"\n### {title}")
    for k, v in c.most_common(n):
        print(f"  {v:6d}  {k}")

for k, v in stats.items():
    if k == "func_type_name":
        print("\n### func_type -> names")
        for t, cc in v.items():
            print(f"  [{t}] " + ", ".join(f"{n}({c})" for n, c in cc.most_common(25)))
    else:
        show(k, v, 80 if k in ("func_path", "java_api", "manifest_const", "manifest_str", "imports", "prop_name") else 40)

json.dump(per_map, open(out_json, "w"), indent=1, ensure_ascii=False)
