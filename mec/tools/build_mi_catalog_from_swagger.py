"""Build a normalised M3 MI API catalog from the m3api-rest v2 swagger export (one JSON per MI program).

Usage:
  python3 -I build_mi_catalog_from_swagger.py <mi-swagger dir or .zip> <out.json.gz> [harvested_map_catalog.json]

Output (gzip JSON):
{ "meta": {...},
  "programs": { "MMS200MI": { "title": "...", "version": "1600", "general": false,
       "transactions": { "Get": { "desc": "...", "list": false|true, "list_basis": "...",
            "in":  [[name, label, length, mandatory(bool), type('A'|'N'|'D'), type_basis], ...],
            "out": [[name, label, length, type('A'|'N'|'D')], ...] } } } } }
Type: N = numeric, D = M3 date (mvxdate, numeric 8), A = alpha. Input types are not in the swagger and are
inferred: same field in this transaction's outputs > same program > whole catalog > harvested .map metadata > A.
"""
import sys, os, re, io, json, gzip, zipfile, collections

src, out = sys.argv[1], sys.argv[2]
harvest = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else {}

CONTROL = {"cono", "divi", "lanc", "locale", "timeZone", "maxrecs", "dateformat", "excludeempty", "righttrim",
           "returncols", "format", "extendedresult"}
GENERAL_TRN = {"FpwVersion", "GetCurrentUser", "GetFieldHeading", "GetFixLevel", "GetMIBuild", "GetMessageText",
               "GetServerTime", "GetUserInfo", "ServerTimeZone"}
LBL = re.compile(r"^(.*)\((\d+)\)\s*$")
LIST_RX = re.compile(r"^(Lst|List|Sel|Slt|Search|Srch|Select)")


def files():
    if zipfile.is_zipfile(src):
        z = zipfile.ZipFile(src)
        for n in z.namelist():
            if n.endswith(".json"):
                yield os.path.basename(n), z.read(n)
    else:
        for n in sorted(os.listdir(src)):
            if n.endswith(".json"):
                yield n, open(os.path.join(src, n), "rb").read()


def split(desc):
    m = LBL.match(desc or "")
    return (m.group(1).strip(), int(m.group(2))) if m else ((desc or "").strip(), None)


progs = {}
for fname, raw in files():
    d = json.loads(raw)
    prog = fname[:-5]
    title = d.get("info", {}).get("title", "")
    title = title.split(" - ", 1)[1] if " - " in title else title
    p = {"title": title, "version": d.get("info", {}).get("version"), "transactions": {}}
    for path, v in d.get("paths", {}).items():
        op = v.get("get", {})
        trn = path.strip("/")
        ins = []
        for prm in op.get("parameters", []):
            if prm.get("in") != "query" or prm["name"] in CONTROL:
                continue
            lab, ln = split(prm.get("description"))
            ins.append([prm["name"], lab, ln, bool(prm.get("required")), None, None])
        # query params are listed required-first; the BulkResponse 'parameters' example keeps true MI order
        try:
            ex = op["responses"]["200"]["schema"]["properties"]["results"]["items"]["properties"]["parameters"].get("example", {})
            order = {n: i for i, n in enumerate(ex)}
            ins.sort(key=lambda f: order.get(f[0], 10 ** 6))
        except (KeyError, TypeError, AttributeError):
            pass
        outs = []
        try:
            rec = op["responses"]["200"]["schema"]["properties"]["results"]["items"]["properties"]["records"]["items"]
            for fn, fp in rec.get("properties", {}).items():
                lab, ln = split(fp.get("description"))
                fmt = fp.get("format")
                outs.append([fn, lab, ln, "D" if fmt == "mvxdate" else "N" if fmt == "numeric" else "A"])
        except (KeyError, TypeError):
            pass
        desc = (op.get("description") or op.get("summary") or "").strip()
        p["transactions"][trn] = {"desc": desc, "in": ins, "out": outs}
    progs[prog] = p

# ---- type inference for inputs
glob_type = collections.defaultdict(collections.Counter)
for prog, p in progs.items():
    for t in p["transactions"].values():
        for fn, lab, ln, typ in t["out"]:
            glob_type[fn][typ] += 1
harv_type = {}
for k, v in harvest.items():
    for f in v.get("inputs", []) + v.get("outputs", []):
        if f.get("type"):
            harv_type.setdefault(f["name"], "N" if f["type"] == "Numeric" else "A")
basis_count = collections.Counter()
for prog, p in progs.items():
    prog_type = collections.defaultdict(collections.Counter)
    for t in p["transactions"].values():
        for fn, lab, ln, typ in t["out"]:
            prog_type[fn][typ] += 1
    for trn, t in p["transactions"].items():
        own = {o[0]: o[3] for o in t["out"]}
        for f in t["in"]:
            name = f[0]
            hk = harvest.get(f"{prog}/{trn}")
            hv = None
            if hk:
                for hf in hk.get("inputs", []):
                    if hf["name"] == name and hf.get("type"):
                        hv = "N" if hf["type"] == "Numeric" else "A"
            if hv:
                f[4], f[5] = hv, "map"
            elif name in own:
                f[4], f[5] = own[name], "trn"
            elif name in prog_type:
                f[4], f[5] = prog_type[name].most_common(1)[0][0], "prog"
            elif name in glob_type:
                f[4], f[5] = glob_type[name].most_common(1)[0][0], "global"
            elif name in harv_type:
                f[4], f[5] = harv_type[name], "map-global"
            else:
                # input-only fields: 1-char fields are mostly numeric flags (54/70 in the samples)
                f[4], f[5] = ("N" if f[2] == 1 else "A"), "default"
            basis_count[f[5]] += 1
        # list / single heuristic (swagger has no S/M flag)
        h = harvest.get(f"{prog}/{trn}")
        if h and h.get("used_as"):
            t["list"] = any(k.startswith("AR") for k in h["used_as"])
            t["list_basis"] = "used in sample maps"
        else:
            t["list"] = bool(LIST_RX.match(trn))
            t["list_basis"] = "name prefix"

# tenant-defined content: custom lists (CMS100MI), generated table reads (MDBREADMI), Extensibility APIs (EXTnnnMI)
TENANT = {p for p in progs if p in ("CMS100MI", "MDBREADMI") or re.match(r"^EXT\d{3}MI$", p)}
for prog, p in progs.items():
    p["tenant_specific"] = prog in TENANT
meta = {
    "source": os.path.basename(src.rstrip("/")),
    "api": "m3api-rest v2 swagger (one file per MI program)",
    "programs": len(progs),
    "transactions": sum(len(p["transactions"]) for p in progs.values()),
    "general_transactions": sorted(GENERAL_TRN),
    "input_type_basis": dict(basis_count),
    "type_codes": {"A": "Alpha", "N": "Numeric", "D": "Date (mvxdate, numeric YYYYMMDD)"},
    "tenant_specific_programs": sorted(TENANT),
}
with gzip.open(out, "wt", encoding="utf-8") as fh:
    json.dump({"meta": meta, "programs": dict(sorted(progs.items()))}, fh, ensure_ascii=False, separators=(",", ":"))
print(json.dumps(meta, indent=1))
