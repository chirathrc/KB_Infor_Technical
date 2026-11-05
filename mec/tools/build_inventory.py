"""Classify sample mappings into families and write kb/inventory.md."""
import sys, os, re, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapdump import load, parse

root, out_md = sys.argv[1], sys.argv[2]

FAMILIES = [
    ("F1", "MBM-triggered bank payment file out (EventData → ISO 20022 pain.001 / bank format)", r"^M3FTD_GC_(SG|ID|MY|VN|CN)_(HSBC|SCB)_\w+_OUT_Custom$"),
    ("F2", "MBM re-detector (classify event → raise new MBM via MNS260MI for a 2nd agreement)", r"ReDetector"),
    ("F3", "Bank status report in (pain.002 → custom notification BOD for ION email)", r"^GC_(CN_)?SCBACK\d_IN$"),
    ("F6", "Custom inbound Process BOD + Error Acknowledge (Process<Noun> → Acknowledge<Noun>)", r"^M3BOD_(StockCountUpload|BMPDSCleanUpAutomation|HSBCACKIN)_"),
    ("F5", "Infor standard BOD (copied/versioned → custom)", r"^M3BOD_\w+_\d+_\d+_\d+$"),
    ("F4", "Custom outbound from M3 event (EventData → custom Sync BOD / XML for ION workflow, e-invoice)", r"^M3BOD_\w+_(Sync)_Out_|^M3FTD_EHubPaymentConfirmation"),
    ("F7", "Custom XML request → M3 APIs → XML response (weighbridge / logistics)", r"^M3FTD_GC_WB_"),
    ("F8", "BESTMIX formulation in (FormulationML/Envelope → PDS001/PDS002 updates + response)", r"^M3FTD_GC_BESTMIX_In_"),
    ("F9", "Request-driven BOD out (Envelope request → M3 lists → Sync BOD reply)", r"^M3BODs_BM"),
    ("F10", "Uploaded file → validated M3 batch APIs → status/notification output", r"^M3FTD_(GC_GLDiscountUpload|GC_CreditNoteDiscountUploadME|EHubInvoicetoM3)"),
]

def family(n):
    for code, title, rx in FAMILIES:
        if re.search(rx, n):
            # standard EAM / PO etc. with version suffix but custom-style workflow BODs end _1_0_0 → F4
            if code == "F5" and re.search(r"(WF|EInvoice|CreditLimitApprove)", n):
                return "F4"
            return code
    return "F?"

rows = collections.defaultdict(list)
for n in sorted(os.listdir(root)):
    m = parse(load(os.path.join(root, n, n + ".map")))
    props = open(os.path.join(root, n, "mapping.properties")).read()
    inel = re.search(r"mapping.input.element=(.*)", props).group(1)
    outel = re.search(r"mapping.output.element=(.*)", props).group(1)
    apis = sorted({f["path"].strip("/").replace("/", ".") for f in m["funcs"].values() if f["type"][:2] in ("AV", "AR")})
    ft = collections.Counter(f["type"] for f in m["funcs"].values())
    rows[family(n)].append(dict(name=n, ver=m["meta"]["Version"], ns=m["meta"]["Namespace"], inel=inel, outel=outel,
                                nf=len(m["funcs"]), nl=len(m["loops"]), napi=sum(v for k, v in ft.items() if k[:2] in ("AV", "AR")),
                                apis=apis, props=[p["name"] for p in m["props"] if p["type"] == "CP"]))

with open(out_md, "w") as fh:
    total = sum(len(v) for v in rows.values())
    fh.write(f"# Sample mapping inventory ({total} mappings)\n\n")
    fh.write("Classified by integration pattern. `F/L/API` = functions / loops+ifs / M3 API calls. "
             "CP = agreement control properties defined in the map.\n\n")
    fh.write("| Family | Pattern | Count |\n|---|---|---|\n")
    for code, title, _ in FAMILIES:
        fh.write(f"| {code} | {title} | {len(rows.get(code, []))} |\n")
    fh.write("\n")
    for code, title, _ in FAMILIES:
        fh.write(f"## {code} — {title}\n\n| Mapping | Ver | In → Out | F/L/API | Control props |\n|---|---|---|---|---|\n")
        for r in rows.get(code, []):
            fh.write(f"| `{r['name']}` | {r['ver']} | {r['inel']} → {r['outel']} | {r['nf']}/{r['nl']}/{r['napi']} | {', '.join(r['props']) or '-'} |\n")
        allapis = collections.Counter(a for r in rows.get(code, []) for a in r["apis"])
        fh.write("\nM3 APIs used in this family: " + ", ".join(f"{a}" + (f" ({c})" if c > 1 else "") for a, c in sorted(allapis.items())) + "\n\n")
    if rows.get("F?"):
        fh.write("## Unclassified\n\n" + "\n".join(r["name"] for r in rows["F?"]) + "\n")
print({k: len(v) for k, v in rows.items()})
