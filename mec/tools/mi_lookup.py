"""Query the M3 MI API catalog (mi_catalog_full.json.gz) — find the right API for an FS requirement.

Usage (catalog path defaults to ../mi/mi_catalog_full.json.gz next to this script, or $MI_CATALOG):
  python3 -I mi_lookup.py search  <words...> [--list|--single] [--verb Get,Lst] [--top 25]
        rank transactions by program title, transaction description, field names/labels
  python3 -I mi_lookup.py show    <PROG/TRN> [--all]        full field list (inputs then outputs)
  python3 -I mi_lookup.py program <PROG>                    every transaction of a program
  python3 -I mi_lookup.py field   <FIELD> [--given F1,F2] [--side out|in] [--list|--single]
        transactions that return (default) or take a field; --given keeps only transactions whose
        mandatory inputs are all among the fields you already have
  python3 -I mi_lookup.py label   <words...>                find field codes by label text ("net weight")
  python3 -I mi_lookup.py mapdesc <PROG/TRN>                Mapper parameter descriptions as written in .map files
"""
import sys, os, re, gzip, json, collections

HERE = os.path.dirname(os.path.abspath(__file__))
PATH = os.environ.get("MI_CATALOG") or os.path.join(HERE, "..", "mi", "mi_catalog_full.json.gz")


def load(path=PATH):
    with gzip.open(path, "rt", encoding="utf-8") as fh:
        return json.load(fh)


def iter_trn(cat, include_general=False):
    gen = set(cat["meta"]["general_transactions"])
    for prog, p in cat["programs"].items():
        if prog == "GENERAL":
            continue
        for trn, t in p["transactions"].items():
            if trn in gen and not include_general:
                continue
            yield prog, p, trn, t


def get(cat, key):
    prog, trn = key.split("/")
    p = cat["programs"].get(prog.upper())
    if not p:
        raise SystemExit(f"program {prog} not in catalog")
    t = p["transactions"].get(trn) or next((v for k, v in p["transactions"].items() if k.lower() == trn.lower()), None)
    if not t:
        raise SystemExit(f"{key}: transaction not found. Has: {', '.join(p['transactions'])}")
    return p, t


TYPE = {"A": "Alpha", "N": "Numeric", "D": "Date"}


def mapper_desc(label, length, typ, mandatory=False):
    """Description text exactly as the Mapper writes it in <Parameter>/<Constant> (dates are written as Alpha)."""
    t = "Numeric" if typ == "N" else "Alpha"
    return f"{label}, size is {length}, type is {t}" + ("(mandatory)" if mandatory else "")


def fmt_trn(prog, p, trn, t, all_fields=True):
    kind = "LIST (repeating: ARM/ARI/ARL)" if t["list"] else "single (AVM/AVI/AVL)"
    flag = "  ⚠ tenant-specific" if p.get("tenant_specific") else ""
    out = [f"{prog}/{trn} — {t['desc']}   [{kind}; {t['list_basis']}]{flag}",
           f"  program: {p['title']}"]
    out.append(f"  IN  ({len(t['in'])}):")
    for n, lab, ln, mand, typ, basis in t["in"]:
        out.append(f"     {'*' if mand else ' '} {n:<6} {TYPE[typ][0]}{ln if ln else '?':<4} {lab}")
    outs = t["out"] if all_fields else t["out"][:40]
    out.append(f"  OUT ({len(t['out'])}):")
    for n, lab, ln, typ in outs:
        out.append(f"       {n:<6} {TYPE[typ][0]}{ln if ln else '?':<4} {lab}")
    if len(outs) < len(t["out"]):
        out.append(f"       ... {len(t['out']) - len(outs)} more (use --all)")
    return "\n".join(out)


def words(s):
    return [w for w in re.split(r"[^a-z0-9]+", s.lower()) if w]


def cmd_search(cat, args, top=25, want=None, verbs=None):
    q = words(" ".join(args))
    res = []
    for prog, p, trn, t in iter_trn(cat):
        if want is not None and t["list"] != want:
            continue
        if verbs and not any(trn.startswith(v) for v in verbs):
            continue
        hay_title = words(p["title"]); hay_desc = words(t["desc"]) + words(re.sub(r"([a-z])([A-Z])", r"\1 \2", trn))
        hay_fields = set(f[0].lower() for f in t["in"] + t["out"])
        hay_labels = set(w for f in t["in"] + t["out"] for w in words(f[1]))
        s = 0
        for w in q:
            s += 4 * (w in hay_desc) + 3 * (w in hay_title) + 3 * (w in hay_fields) + 1 * (w in hay_labels)
            s += 2 * (w == prog.lower() or w == trn.lower())
        if s:
            res.append((s, prog, trn, t, p))
    res.sort(key=lambda x: (-x[0], x[1], x[2]))
    for s, prog, trn, t, p in res[:top]:
        mand = ",".join(f[0] for f in t["in"] if f[3]) or "-"
        print(f"{s:3d}  {prog}/{trn:<16} {'LIST ' if t['list'] else 'single'}  in*={mand:<24} {t['desc'][:60]}  ({p['title'][:40]})"
              + ("  ⚠tenant" if p.get("tenant_specific") else ""))


def cmd_field(cat, name, side="out", given=None, want=None, top=60):
    name = name.upper(); res = []
    for prog, p, trn, t in iter_trn(cat):
        if want is not None and t["list"] != want:
            continue
        fields = t["out"] if side == "out" else t["in"]
        if not any(f[0] == name for f in fields):
            continue
        mand = [f[0] for f in t["in"] if f[3]]
        if given is not None and not set(mand) <= given:
            continue
        keyed = len(set(mand) & given) if given else 0
        takes = len({f[0] for f in t["in"]} & given) if given else 0
        res.append((-(2 * keyed + takes), len(mand), prog, trn, t, mand))
    res.sort(key=lambda x: (x[0], x[1], x[2], x[3]))
    print(f"{len(res)} transactions {'return' if side == 'out' else 'take'} {name}" + (f" with mandatory inputs ⊆ {sorted(given)}" if given else ""))
    for sc, nm, prog, trn, t, mand in res[:top]:
        print(f"  {prog}/{trn:<16} {'LIST ' if t['list'] else 'single'} in*={','.join(mand) or '-':<24} {t['desc'][:70]}")


def cmd_label(cat, args, top=40):
    q = words(" ".join(args)); c = collections.Counter(); lab = {}
    for prog, p, trn, t in iter_trn(cat):
        for f in t["in"] + t["out"]:
            lw = words(f[1])
            if all(w in lw for w in q):
                c[f[0]] += 1; lab.setdefault(f[0], collections.Counter())[f[1]] += 1
    for n, k in c.most_common(top):
        print(f"  {n:<6} used in {k:5d} field defs   e.g. '{lab[n].most_common(1)[0][0]}'")


def main():
    a = sys.argv[1:]
    if not a:
        print(__doc__); return
    flags = {x for x in a if x.startswith("--")}
    def opt(n, d=None):
        return a[a.index(n) + 1] if n in a else d
    pos = [x for i, x in enumerate(a) if not x.startswith("--") and (i == 0 or a[i - 1] not in ("--given", "--side", "--top", "--verb"))]
    want = True if "--list" in flags else False if "--single" in flags else None
    cat = load()
    cmd = pos[0]
    if cmd == "search":
        cmd_search(cat, pos[1:], int(opt("--top", 25)), want, (opt("--verb") or "").split(",") if opt("--verb") else None)
    elif cmd == "show":
        p, t = get(cat, pos[1]); print(fmt_trn(pos[1].split("/")[0].upper(), p, pos[1].split("/")[1], t, "--all" in flags or True))
    elif cmd == "program":
        p = cat["programs"][pos[1].upper()]
        print(f"{pos[1].upper()} — {p['title']} (v{p['version']})" + ("  ⚠ tenant-specific" if p.get("tenant_specific") else ""))
        for trn, t in p["transactions"].items():
            mand = ",".join(f[0] for f in t["in"] if f[3]) or "-"
            print(f"  {trn:<18} {'LIST ' if t['list'] else 'single'} in*={mand:<28} {t['desc']}")
    elif cmd == "field":
        g = set(x.strip().upper() for x in opt("--given").split(",")) if opt("--given") else None
        cmd_field(cat, pos[1], opt("--side", "out"), g, want, int(opt("--top", 60)))
    elif cmd == "label":
        cmd_label(cat, pos[1:])
    elif cmd == "mapdesc":
        p, t = get(cat, pos[1])
        for i, f in enumerate(t["in"]):
            print(f"I {i:3d} {f[0]:<6} {mapper_desc(f[1], f[2], f[4], f[3])}")
        for i, f in enumerate(t["out"]):
            print(f"O {i:3d} {f[0]:<6} {mapper_desc(f[1], f[2], f[3])}")
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
