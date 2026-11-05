"""Write markdown indexes from mi_catalog_full.json.gz:
  mi_modules.md   — one row per module prefix (count + example program titles)   [small]
  mi_programs.md  — one row per MI program (title, #transactions, tenant flag)  [full]
Usage: python3 -I build_mi_indexes.py <catalog.json.gz> <out_dir>
"""
import sys, os, re, gzip, json, collections

cat = json.load(gzip.open(sys.argv[1], "rt", encoding="utf-8"))
out = sys.argv[2]
P = cat["programs"]; G = set(cat["meta"]["general_transactions"])
mods = collections.defaultdict(list)
for k, p in P.items():
    if k == "GENERAL":
        continue
    mods[re.sub(r"\d.*$", "", k)].append((k, p))
nbiz = lambda p: sum(1 for t in p["transactions"] if t not in G)
with open(os.path.join(out, "mi_modules.md"), "w") as fh:
    fh.write("# MI API modules (from the m3api-rest swagger export)\n\n")
    fh.write(f"{len(P) - 1} MI programs, {sum(nbiz(p) for p in P.values())} business transactions (+ the 9 GENERAL transactions present in every program). "
             "Module = program-name prefix. Look up details with `tools/mi_lookup.py program <PGM>` / `search` / `show`.\n\n")
    fh.write("| Prefix | Programs | Transactions | Example programs |\n|---|---|---|---|\n")
    for m in sorted(mods, key=lambda x: -sum(nbiz(p) for _, p in mods[x])):
        items = sorted(mods[m], key=lambda kp: -nbiz(kp[1]))
        ex = "; ".join(f"{k} {p['title'][:38]}" for k, p in items[:3])
        fh.write(f"| {m} | {len(items)} | {sum(nbiz(p) for _, p in items)} | {ex} |\n")
with open(os.path.join(out, "mi_programs.md"), "w") as fh:
    fh.write("# MI programs index\n\n`⚠` = tenant-specific (custom lists, generated table reads, Extensibility APIs).\n\n")
    for m in sorted(mods):
        fh.write(f"## {m}\n\n")
        for k, p in sorted(mods[m]):
            fh.write(f"- **{k}** — {p['title']} ({nbiz(p)})" + (" ⚠" if p.get("tenant_specific") else "") + "\n")
        fh.write("\n")
print("ok")
