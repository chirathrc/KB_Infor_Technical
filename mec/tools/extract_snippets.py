"""Extract canonical template functions (signature + Java) from sample maps into a markdown snippet library."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mapdump import load, parse, label

root, out_md = sys.argv[1], sys.argv[2]

GROUPS = [
    ("A. Outbound BOD from an M3 event (EventData → Sync/Process BOD)", "M3BOD_PurchaseOrder_Sync_Out_2_14_3",
     ["InitEventData", "GetEventData", "ManageEventData", "GetCONO_DIVI_AE", "Init", "SetOutboxHeaderData", "SetHeader", "SetSync"]),
    ("B. Inbound Process BOD (Process → Acknowledge, synchronous)", "M3BOD_ReceiveDelivery_Process_In_2_12_1",
     ["SetCorrelationID", "GetProcessHeader", "GetCONO_DIVI", "GetProcess", "SetGlobals", "SetHeader", "SetOutboxHeaderData", "SetAcknowledge"]),
    ("C. Error Acknowledge (ConfirmBOD → Acknowledge, actionCode Rejected)", "M3BOD_EAMItemMaster_Acknowledge_Error_Out_2_13_2",
     ["SetHeader", "SetAcknowledge", "SetOutboxHeaderData", "SetReason"]),
    ("D. Custom BOD outbound — tenant/AE helpers used in custom maps", "M3BOD_PurchaseRequisitionWF_Sync_Out_1_0_0_GC_Custom",
     ["GetCONO_DIVI_AE", "SetGlobals", "setAgreementName"]),
    ("E. MBM-triggered FTD (EventData from MNS260/MBM → flat/XML file)", "M3FTD_GC_SG_HSBC_PP_OUT_Custom",
     ["GetElementData", "SetMBMInit", "MBMInit", "F_Set_Manifest_Info"]),
    ("F. MBM re-detect (classify, then raise a new MBM for a second agreement)", "M3FTD_SCB_HSBC_Payment_MBM_ReDetector_Custom",
     ["GetCONO_DIVI_AE", "F_Set_MBM_OUT", "F_Set_ManifestInfo"]),
    ("G. Custom XML in → M3 API → XML response (weighbridge style)", "M3FTD_GC_WB_DO_Mapping_Update_Custom",
     ["DataConvertion", "SetOutput", "OutputFileNameSetter"]),
    ("H. Collect-then-emit iterator pattern + API error capture", "M3BOD_StockCountUpload_Process_In_GC_Custom",
     ["ValidateMMS301MIUpdateStockTake", "SetIetrator", "ErrorDetailsCondition", "GetError"]),
]

with open(out_md, "w") as fh:
    fh.write("# 05 — Canonical template functions (verbatim from the samples)\n\n")
    fh.write("Copied from the sample mappings so generated maps reuse proven, Cloud-whitelist-compliant code. "
             "`in`/`out` lines show the parameter and what it was linked to in the source map "
             "(`IN:`/`OUT:` = schema path, `$x` = variable, `F.p` = another function's parameter, `CONST`).\n\n")
    for title, mapname, fnames in GROUPS:
        m = parse(load(os.path.join(root, mapname, mapname + ".map")))
        fh.write(f"## {title}\n\nSource: `{mapname}`\n\n")
        byname = {}
        for fid, f in m["funcs"].items():
            byname.setdefault(f["name"], fid)
        by_src = {}; by_dst = {}
        for l in m["links"]:
            by_src.setdefault(l["src"], []).append(l); by_dst.setdefault(l["dst"], []).append(l)
        for fn in fnames:
            fid = byname.get(fn)
            if not fid:
                fh.write(f"### {fn}\n\n_(not found)_\n\n"); continue
            f = m["funcs"][fid]
            fh.write(f"### {fn}  `[{f['type']}]`\n\n")
            ps = sorted([(pid, p) for pid, p in m["params"].items() if p["func"] == fid], key=lambda x: (x[1]["io"] != "I", x[1]["pos"]))
            if ps:
                fh.write("```text\n")
                for pid, p in ps:
                    if p["io"] == "I":
                        src = ", ".join(label(m, l["src"]) for l in by_dst.get(pid, [])) or "(unlinked)"
                        fh.write(f"in  {p['dtype']} {p['name']} <- {src}\n")
                    else:
                        dst = ", ".join(label(m, l["dst"]) for l in by_src.get(pid, [])) or "(unlinked)"
                        fh.write(f"out {p['dtype']} {p['name']} -> {dst}\n")
                fh.write("```\n\n")
            code = (m["java"].get(fid) or "").strip("\n")
            # normalise the Mapper's leading indentation
            import textwrap
            lines = [ln.replace("\t", "    ").rstrip() for ln in code.splitlines()]
            if lines:
                first = lines[0].lstrip()
                rest = textwrap.dedent("\n".join(lines[1:])).splitlines() if len(lines) > 1 else []
                lines = [first] + rest
            while lines and not lines[-1].strip():
                lines.pop()
            fh.write("```java\n" + "\n".join(lines) + "\n```\n\n")
print("written", out_md)
