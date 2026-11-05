"""Re-check the structural rules stated in 01-zap-and-map-file-format.md against a folder of unzipped .zap dirs.

Usage: python3 -I verify_rules.py <dir with one sub-folder per unzipped .zap>
Prints PASS/FAIL per rule with counts.
"""
import sys, os, re, zlib, glob, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapmodel import read_map, write_map


def jhash(s):
    h = 0
    for ch in s:
        h = (31 * h + ord(ch)) & 0xFFFFFFFF
    return h - (1 << 32) if h >= 1 << 31 else h


root = sys.argv[1]
R = collections.defaultdict(lambda: [0, 0, []])  # rule -> [pass, fail, examples]

def check(rule, ok, ex=None):
    R[rule][0 if ok else 1] += 1
    if not ok and ex and len(R[rule][2]) < 3:
        R[rule][2].append(ex)

for n in sorted(os.listdir(root)):
    d = os.path.join(root, n)
    mp = os.path.join(d, n + ".map")
    if not os.path.isfile(mp):
        continue
    raw = open(mp, "rb").read()
    m = read_map(mp)
    check("byte-identical round trip", write_map(m) == raw, n)
    check("UTF-16BE BOM", raw[:2] == b"\xfe\xff", n)
    check("single BOM, then XML (fe ff 00 3c)", raw[:4] == b"\xfe\xff\x00<", n)
    for xf in sorted(glob.glob(os.path.join(d, "*.xsd"))):
        xr = open(xf, "rb").read()
        check("XSD single BOM, then XML (fe ff 00 3c)", xr[:4] == b"\xfe\xff\x00<", os.path.basename(xf))
        try:
            import xml.etree.ElementTree as _ET
            _ET.fromstring(xr.decode("utf-16"))
            ok = True
        except Exception:
            ok = False
        check("XSD parses as XML", ok, os.path.basename(xf))
    check("Format 2.7", m["Format"] == "2.7", n)
    check("Layout constant", m["MappingMeta"].get("Layout") == "(Layout, 20, 60, 20)", n)
    funcs = {f["ID_F"]: f for f in m["Functions"]}
    loops = {l["ID_L"]: l for l in m.get("Loops", [])}
    params = {p["ID_P"]: p for p in m["Parameters"]}
    seq = m["SequenceList"]
    seqnum = {s["ID_S"]: int(s["Number"]) for s in seq if s["Type"] in ("F", "LB")}
    check("sequence numbers contiguous", [int(s["Number"]) for s in seq] == list(range(1, len(seq) + 1)), n)
    fseq = [s["ID_S"] for s in seq if s["Type"] == "F"]
    check("FIDn numbered in execution order", fseq == [f"FID{i}" for i in range(1, len(fseq) + 1)], n)
    lseq = [s["ID_S"] for s in seq if s["Type"] == "LB"]
    check("LIDn numbered in LB order", lseq == [f"LID{i}" for i in range(1, len(lseq) + 1)], n)
    check("one Implementation per function", sorted(i["IDREF"] for i in m["Implementations"]) == sorted(funcs), n)
    check("IsResuable false (true only on repository template fns)", all(f["IsResuable"] == "false" or f["Name"] in ("SetOutboxHeaderData", "SetHeader", "SetSync", "SetPurchaseOrderID") for f in funcs.values()), n)
    # links
    ctl = collections.defaultdict(list)
    for l in m["Links"]:
        src, dst = l["InFrom"], l["OutTo"]
        so, si = int(l["SequenceOut"]), int(l["SequenceIn"])
        dobj = params[dst]["ID_F"] if dst in params else dst
        sobj = params[src]["ID_F"] if src in params else src
        check("SequenceOut = target seq or -1", so == seqnum.get(dobj, -1), (n, l))
        check("SequenceIn = source seq or -1", si == seqnum.get(sobj, -1), (n, l))
        if dst in loops:
            ctl[dst].append(l)
    for lid in loops:
        check("each loop has exactly one controller", len(ctl[lid]) == 1, (n, lid))
    # controllers first inside loop
    for i, s in enumerate(seq):
        if s["Type"] == "LB":
            for l in ctl[s["ID_S"]]:
                if l["Type"] == "FL":
                    nxt = seq[i + 1]["ID_S"] if i + 1 < len(seq) else None
                    check("FL controller is first element of its loop", nxt == l["InFrom"], (n, s["ID_S"]))
    for fid, f in funcs.items():
        if f["Type"].startswith("AR"):
            check("repeating API controls a loop", any(l["InFrom"] == fid and l["Type"] == "FL" for l in m["Links"]), (n, f["Name"]))
    # FormattedPath prefix rule
    ns = m["MappingMeta"]["SchemaIn"]["Namespace"] or ""
    for rec in m.get("SchemaIn", []):
        p = rec["PATH"]
        if ns:
            pre = "H%d:" % abs(jhash(ns))
            exp = "/".join(("" if not step else (step if step.startswith("@") else pre + step)) for step in p.split("/"))
            exp = re.sub(r"\[@", "[@", exp)
            # attribute steps are written as [@x] appended to the element step
            exp = re.sub(re.escape(pre) + r"([^/\[]+)\[@", lambda mm: pre + mm.group(1) + "[@", exp)
        else:
            exp = p
        check("FormattedPath = H<abs(hashCode(ns))>: prefix rule", rec.get("FormattedPath") == exp, (n, p, rec.get("FormattedPath")))
    # schema record = root or linked
    linked = {x for l in m["Links"] for x in (l["InFrom"], l["OutTo"])}
    for side in ("SchemaIn", "SchemaOut"):
        for rec in m.get(side, []):
            ok = rec["ID_M"] in linked or rec["PATH"].count("/") == 1 or rec["PATH"].endswith("/Property")
            check("schema records = root + linked nodes (+UserArea/UserAreaMeta Property)", ok, (n, rec["PATH"]))
    # xsd crc32 naming
    for x in glob.glob(os.path.join(d, "*.xsd")):
        mm = re.search(r"_([0-9a-f]{5,8})\.xsd$", x)
        check("xsd suffix = crc32(raw bytes) [expected to fail for include-rewritten BOD schemas]",
              bool(mm) and "%x" % zlib.crc32(open(x, "rb").read()) == mm.group(1), os.path.basename(x))

w = max(len(k) for k in R)
for rule, (p, f, ex) in R.items():
    print(f"{'PASS' if f == 0 else 'FAIL'}  {rule:<{w}}  {p} ok / {f} fail" + (f"   e.g. {ex[0]}" if ex else ""))
