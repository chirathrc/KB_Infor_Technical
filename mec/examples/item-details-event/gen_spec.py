"""Generate spec.json for M3BOD_ItemDetails_Sync_Out_Custom from fieldmap.json (element <- MI field)."""
import json, os, sys

WD = sys.argv[1]
fm = json.load(open(os.path.join(WD, "fieldmap.json")))
H, W, F, U = fm["H"], fm["W"], fm["F"], fm["U"]
ROOT = "OUT:/SyncItemDetails"
ID = ROOT + "/DataArea/ItemDetails"
DATES = {"RGDT", "LMDT"}


def tidy(lines):
    return [l.rstrip() for l in lines]


# ---------------------------------------------------------------- header (GetItmBasic -> ItemHeader)
hdr_in = {"i" + f: "GetItmBasic." + f for e, f in H}
hdr_out = {"o" + e: [f"{ID}/ItemHeader/{e}"] for e, f in H}
hdr_code = ["// Item master values from MMS200MI/GetItmBasic (validated in ValidateItem). Trim; dates yyyyMMdd -> yyyy-MM-dd."]
for e, f in H:
    if f in DATES:
        hdr_code += [f"String d{f} = (i{f} == null) ? \"\" : i{f}.trim();",
                     f"if (d{f}.equals(\"0\") || d{f}.equals(\"00000000\")) d{f} = \"\";",
                     f"o{e} = (d{f}.length() == 8) ? d{f}.substring(0, 4) + \"-\" + d{f}.substring(4, 6) + \"-\" + d{f}.substring(6, 8) : d{f};"]
    elif f == "ITNO":
        hdr_code.append(f"o{e} = (i{f} == null) ? \"\" : IONToolbox.rightTrim(i{f});")
    else:
        hdr_code.append(f"o{e} = (i{f} == null) ? \"\" : i{f}.trim();")


# ---------------------------------------------------------------- list sections
def list_section(sec, api, fields, api_in, var, it_var, label, out_elem):
    """Collect loop (ARI list API + filter by item) + post-loop check + emit loop."""
    n = len(fields)
    collect_in = {"iITNO": f"{api.split('/')[1]}.ITNO"}
    collect_in.update({"i" + f: f"{api.split('/')[1]}.{f}" for e, f in fields})
    collect_code = [
        "// One call per row returned by " + api + ". The list is positioned on the item key,",
        "// so rows of other items are skipped; only exact matches are kept.",
        "String rITNO = (iITNO == null) ? \"\" : IONToolbox.rightTrim(iITNO);",
        "if (rITNO.equals(ITNO)) {",
        f"    String[] row = new String[{n}];",
    ]
    for i, (e, f) in enumerate(fields):
        collect_code.append(f"    row[{i}] = (i{f} == null) ? \"\" : i{f}.trim();   // {e}")
    collect_code += [f"    {var}.add(row);", "}"]
    check_code = [
        f"// Runs after the {api} loop: the last API call is the list call itself.",
        "if (!isLastAPICallOK()) {",
        f"    String msg = \"ItemDetails: {api} failed for item \" + ITNO + \" (CONO \" + CONO + \"): \" + getLastAPIMessage();",
        "    if (strictLists) {",
        "        throw new MeCError(msg);   // never send a BOD with a section silently missing",
        "    }",
        f"    logWarn(msg + \" - {label} section omitted (StrictListCheck=false)\");",
        f"    {var}.clear();",
        "}",
        f"logDebug(\"ItemDetails: \" + {var}.size() + \" {label} record(s) for item \" + ITNO);",
    ]
    set_out = {"o" + e: [f"{ID}/{out_elem}/{e}"] for e, f in fields}
    set_code = [f"// Current row from {var} (set by HasNext{sec})."]
    for i, (e, f) in enumerate(fields):
        set_code.append(f"o{e} = g_Row[{i}];")
    collect = [
        {"loop": f"{sec}Loop", "cond": "WT", "desc": f"One iteration per {api} row",
         "body": [
             {"api": api, "mode": "ARI", "in": api_in, "out": {},
              "desc": f"List {label} records of the item (NOK checked in Check{sec})"},
             {"java": f"Collect{sec}", "in": collect_in, "out": {}, "code": tidy(collect_code),
              "desc": f"Keep rows of the event item in {var}"},
         ]},
        {"java": f"Check{sec}", "code": tidy(check_code),
         "desc": f"API failure on {api}: fail the message (default) or omit the section"},
    ]
    emit = {"loop": f"Emit{sec}", "cond": "WT", "emits": [f"{ID}/{out_elem}"],
            "desc": f"One {out_elem} element per collected row",
            "body": [
                {"bool": f"HasNext{sec}", "code": [
                    f"if ({it_var} != null && {it_var}.hasNext()) {{",
                    f"    g_Row = {it_var}.next();",
                    "    return true;",
                    "}",
                    "return false;"], "desc": f"Iterator over {var}"},
                {"java": f"Set{sec}", "out": set_out, "code": tidy(set_code),
                 "desc": f"Write one {out_elem} element"},
            ]}
    return collect, emit


whs_c, whs_e = list_section("Warehouse", "MMS200MI/LstItmWhsByItm", W,
                            {"ITNO": "$ITNO", "LNCD": "$LANC"}, "g_Whs", "g_WhsIt", "warehouse", "Warehouse")
fac_c, fac_e = list_section("Facility", "MMS200MI/LstFacByItem", F,
                            {"ITNO": "$ITNO"}, "g_Fac", "g_FacIt", "facility", "Facility")
aun_c, aun_e = list_section("AlternateUOM", "MMS200MI/LstItmAltUnitMs", U,
                            {"FITN": "$ITNO", "TITN": "$ITNO", "LNCD": "$LANC"}, "g_Aun", "g_AunIt",
                            "alternate U/M", "AlternateUOM")

seq = [
    {"java": "VersionLog", "desc": "Version log", "code": [
        "/*",
        " * M3BOD_ItemDetails_Sync_Out_Custom",
        " * FS: M3 item event -> retrieve all item details by ITNO -> custom Sync.ItemDetails BOD to ION.",
        " * v1.0  2026-11-04  Initial version (generated with iec-mapping-from-fs, KB v0.2)",
        " *   Event (EventData) -> ITNO/CONO -> MMS200MI GetItmBasic, LstItmWhsByItm, LstFacByItem, LstItmAltUnitMs",
        " *   Errors: missing ITNO/CONO, invalid item, API NOK -> MeCError (no BOD). Delete event -> abort (no BOD).",
        " */"]},
    {"java": "InitEventData", "desc": "Create the event map and the collection lists", "code": [
        "eventData = new java.util.HashMap<String, String>();",
        "g_Whs = new java.util.ArrayList<String[]>();",
        "g_Fac = new java.util.ArrayList<String[]>();",
        "g_Aun = new java.util.ArrayList<String[]>();"]},
    {"loop": "GetEventDataLoop", "cond": "WT", "ctl": "IN:/EventData/Document/ElementData",
     "desc": "One iteration per event element", "body": [
        {"java": "GetEventData", "desc": "Store each element Name/Value; ITNO and CONO accepted with or without the MM table prefix",
         "in": {"iName": "IN:/EventData/Document/ElementData/Name", "iValue": "IN:/EventData/Document/ElementData/Value"},
         "code": [
            "if (iName != null) {",
            "    String n = iName.trim();",
            "    String v = (iValue == null) ? \"\" : IONToolbox.rightTrim(iValue);",
            "    if (n.equals(\"ITNO\") || n.equals(\"MMITNO\")) {",
            "        eventData.put(\"ITNO\", v);            // item keys keep leading characters",
            "    } else if (n.equals(\"CONO\") || n.equals(\"MMCONO\")) {",
            "        eventData.put(\"CONO\", v.trim());",
            "    } else {",
            "        eventData.put(n, v.trim());",
            "    }",
            "}"]}]},
    {"java": "ManageEventData", "desc": "Validate the event: delete -> abort, missing ITNO/CONO -> MeCError",
     "in": {"iOperation": "IN:/EventData/Operation", "iDocumentName": "IN:/EventData/DocumentName",
            "iEventId": "IN:/EventData/EventId"},
     "out": {"oCONO": ["$CONO"], "oITNO": ["$ITNO"]},
     "code": [
        "String op = (iOperation == null) ? \"\" : iOperation.trim().toUpperCase();",
        "String doc = (iDocumentName == null) ? \"\" : iDocumentName.trim();",
        "String evt = (iEventId == null) ? \"\" : iEventId.trim();",
        "oCONO = eventData.get(\"CONO\");",
        "oITNO = eventData.get(\"ITNO\");",
        "oCONO = (oCONO == null) ? \"\" : oCONO.trim();",
        "oITNO = (oITNO == null) ? \"\" : oITNO;",
        "",
        "// Delete events: the item no longer exists in M3 - end without output",
        "if (op.equals(\"D\") || op.equals(\"DELETE\")) {",
        "    logInfo(\"ItemDetails: delete event \" + evt + \" for item '\" + oITNO + \"' - no BOD produced\");",
        "    abort(\"ItemDetails: delete event - no Sync.ItemDetails BOD\");   // ends the mapping, no output",
        "} else {",
        "    // Mandatory keys",
        "    if (IONToolbox.isEmpty(oITNO)) {",
        "        throw new MeCError(\"ItemDetails: item number (ITNO/MMITNO) missing in event \" + evt + \" [\" + doc + \"]\");",
        "    }",
        "    if (IONToolbox.isEmpty(oCONO)) {",
        "        throw new MeCError(\"ItemDetails: company (CONO/MMCONO) missing in event \" + evt + \" for item \" + oITNO);",
        "    }",
        "    logDebug(\"ItemDetails: event \" + evt + \" op=\" + op + \" CONO=\" + oCONO + \" ITNO=\" + oITNO);",
        "}"]},
    {"java": "GetCONO_DIVI_AE", "desc": "Format company, company-level accounting entity",
     "in": {"iCONO": "$CONO"}, "out": {"oCONO": ["$CONO"], "oAE": ["$bodAE"]},
     "code": [
        "// Get CONO",
        "oCONO = IONToolbox.formatCompany(iCONO);",
        "",
        "// Item master is company-level: accounting entity from M3 company only",
        "oAE = IONToolbox.getAccountingEntityId(oCONO, null);"]},
    {"settings": {"Company": "GetCONO_DIVI_AE.oCONO"}},
    {"java": "Init", "desc": "DataTranslator, tenant id, control properties",
     "in": {"iCONO": "GetCONO_DIVI_AE.oCONO", "iTenantId": "IN:/EventData/TenantId"},
     "code": [
        "// Trim CONO:",
        "iCONO = iCONO == null ? \"\" : iCONO.trim();",
        "",
        "// Instantiate generic DataTranslator",
        "String blankDIVI = \"\";",
        "dtGen = new DataTranslator(getManifestMap(), iCONO, blankDIVI, \"ION\", \"1\", \"Generic\");",
        "",
        "// Set tenant id",
        "if (iTenantId == null) {",
        "    // On-premise: Translate M3 BE company to tenant id",
        "    tenantID = dtGen.toMessage(\"Generic\", \"TenantID\", iCONO, \"\", \"\", \"CMNCMP\", \"CONO\");",
        "    setManifestInfo(ManifestConstants.MAP_ION_TENANT_ID, tenantID);",
        "}",
        "",
        "// Control property StrictListCheck (default true): list API failure fails the message",
        "String strict = getManifestInfo(\"agr:StrictListCheck\");",
        "strictLists = !(strict != null && strict.trim().equalsIgnoreCase(\"false\"));"]},
    {"api": "MMS200MI/GetUserInfo", "mode": "AVM", "in": {}, "out": {"ZDLANC": ["$LANC"]},
     "desc": "User language for descriptions and the BOD languageCode"},
    {"api": "MMS200MI/GetItmBasic", "mode": "AVI", "in": {"ITNO": "$ITNO", "LNCD": "$LANC"}, "out": {},
     "desc": "Item master (MITMAS) - NOK checked in ValidateItem"},
    {"java": "ValidateItem", "desc": "Invalid item / API failure / empty response -> MeCError (no BOD)",
     "in": {"iITNO": "GetItmBasic.ITNO"},
     "code": [
        "if (!isLastAPICallOK()) {",
        "    throw new MeCError(\"ItemDetails: MMS200MI/GetItmBasic failed for item \" + ITNO + \" (CONO \" + CONO + \"): \" + getLastAPIMessage());",
        "}",
        "String rITNO = (iITNO == null) ? \"\" : IONToolbox.rightTrim(iITNO);",
        "if (IONToolbox.isEmpty(rITNO)) {",
        "    throw new MeCError(\"ItemDetails: MMS200MI/GetItmBasic returned no data for item \" + ITNO);",
        "}",
        "if (!rITNO.equals(ITNO)) {",
        "    throw new MeCError(\"ItemDetails: MMS200MI/GetItmBasic returned item \" + rITNO + \" for requested item \" + ITNO);",
        "}"]},
    *whs_c, *fac_c, *aun_c,
    {"java": "SetOutboxHeaderData", "desc": "BOD type, accounting entity, target logical id, document id",
     "code": [
        "// BODType, hard coded here",
        "setManifestInfo(ManifestConstants.MAP_ION_BOD_TYPE, \"Sync.ItemDetails\"); // \"map:ionBODType\"",
        "",
        "// AccountingEntityID",
        "setManifestInfo(ManifestConstants.MAP_ION_ACCOUNTING_ENTITY, bodAE); // \"map:ionAccountingEntity\"",
        "",
        "// ToLogicalId, set from event when present",
        "if (!IONToolbox.isEmpty(eventData.get(\"ToLogicalId\"))) {",
        "    setManifestInfo(ManifestConstants.MAP_ION_TO_LOGICAL_ID, eventData.get(\"ToLogicalId\")); // \"map:ionToLogicalId\"",
        "}",
        "",
        "// Document id shown in ION OneView",
        "setManifestInfo(ManifestConstants.MAP_ION_DOCUMENT_ID, ITNO); // \"map:ionDocumentId\""]},
    {"java": "SetHeader", "desc": "BOD root attributes and ApplicationArea",
     "in": {"iCONO": "$CONO", "iLANC": "$LANC", "iSentTimestamp": "IN:/EventData/SentTimestamp", "iBODID": None},
     "out": {
        "oReleaseID": [ROOT + "[@releaseID]"],
        "oVersionID": [ROOT + "[@versionID]"],
        "oSystemEnvironmentCode": [ROOT + "[@systemEnvironmentCode]"],
        "oLanguageCode": [ROOT + "[@languageCode]"],
        "oLogicalID": [ROOT + "/ApplicationArea/Sender/LogicalID", "$LogicalID"],
        "oLogicalID_schemeVersionID": [ROOT + "/ApplicationArea/Sender/LogicalID[@schemeVersionID]"],
        "oComponentID": [ROOT + "/ApplicationArea/Sender/ComponentID"],
        "oComponentID_schemeVersionID": [ROOT + "/ApplicationArea/Sender/ComponentID[@schemeVersionID]"],
        "oConfirmationCode": [ROOT + "/ApplicationArea/Sender/ConfirmationCode"],
        "oCreationDateTime": [ROOT + "/ApplicationArea/CreationDateTime"],
        "oBODID": [ROOT + "/ApplicationArea/BODID"]},
     "code": [
        "// Set OAGIS release",
        "oReleaseID = \"9.2\";",
        "",
        "// Set version of the given BOD definition",
        "oVersionID = \"1.0.0\";",
        "",
        "// Set \"Test\" or \"Production\" (default) mode",
        "oSystemEnvironmentCode = getSystemEnvironmentCode();",
        "",
        "// Set language for the contents of the BOD",
        "if (iLANC != null) {",
        "    oLanguageCode = dtGen.toMessage(\"Generic\", \"languageCode\", iLANC, \"\", \"\", \"CSYTAB\",\"LNCD\");",
        "}",
        "",
        "// Set from logical ID",
        "oLogicalID = getFromLogicalID();",
        "",
        "// Set MEC mapping version",
        "oLogicalID_schemeVersionID = getMappingVersion();",
        "",
        "// Set business application that issued the BOD",
        "oComponentID = \"M3BE\";",
        "",
        "// Set M3 BE version",
        "oComponentID_schemeVersionID = getBEVersion();",
        "",
        "// Set date time stamp that the given instance of the BOD was created (UTC)",
        "oCreationDateTime = IONToolbox.normalizeXMLDateTime(iSentTimestamp);",
        "",
        "// Set GUID that will make each BOD instance uniquely identifiable, default MEC message UUID",
        "if (iBODID != null) {",
        "    oBODID = iBODID;",
        "} else {",
        "    oBODID = getMapUUID();",
        "}",
        "// Set ConfirmationCode",
        "oConfirmationCode = \"OnError\";"]},
    {"java": "SetSync", "desc": "Sync verb: accounting entity, location, action code",
     "in": {"iCONO": "$CONO", "iOperation": "IN:/EventData/Operation"},
     "out": {"oAccountingEntityID": [ROOT + "/DataArea/Sync/AccountingEntityID"],
             "oLocationID": [ROOT + "/DataArea/Sync/LocationID"],
             "oActionCode": [ROOT + "/DataArea/Sync/ActionCriteria/ActionExpression[@actionCode]"]},
     "code": [
        "// Set accounting entity id",
        "oAccountingEntityID = (!IONToolbox.isEmpty(bodAE)) ? bodAE : \"\";",
        "",
        "// Item master is company-level: no location",
        "oLocationID = \"\";",
        "",
        "// Set action code (C -> Add, U -> Replace)",
        "oActionCode = IONToolbox.createSyncActionCode(iOperation);"]},
    {"java": "SetItemHeader", "desc": "Map MMS200MI/GetItmBasic to ItemDetails/ItemHeader",
     "in": hdr_in, "out": hdr_out, "code": tidy(hdr_code)},
    {"java": "PrepareOutput", "desc": "Iterators over the collected lists",
     "code": [
        "g_WhsIt = g_Whs.iterator();",
        "g_FacIt = g_Fac.iterator();",
        "g_AunIt = g_Aun.iterator();"]},
    whs_e, fac_e, aun_e,
    {"java": "LogResult", "desc": "Summary in the MEC message log", "code": [
        "logInfo(\"ItemDetails: Sync.ItemDetails built for item \" + ITNO + \" (CONO \" + CONO + \"): \"",
        "        + g_Whs.size() + \" warehouse(s), \" + g_Fac.size() + \" facility(ies), \" + g_Aun.size() + \" alternate U/M(s)\");"]},
]

L = "java.util.List<String[]>"
IT = "java.util.Iterator<String[]>"
spec = {
    "name": "M3BOD_ItemDetails_Sync_Out_Custom",
    "version": "1.0",
    "namespace": "M3 BOD",
    "description": "M3 item event -> MMS200MI item details -> custom Sync.ItemDetails BOD",
    "schema_in": {"xsd": "EventData_MT.xsd", "name": "EventData_MT", "root": "EventData", "category": "Other"},
    "schema_out": {"xsd": "BODs-SyncItemDetails.xsd", "name": "BODs-SyncItemDetails", "root": "SyncItemDetails", "category": "BOD"},
    "properties": [{"type": "CP", "name": "StrictListCheck", "value": "true"}],
    "constants": [],
    "variables": [
        {"name": "eventData", "type": "java.util.Map<String, String>", "init": "null", "desc": "Event element Name -> Value"},
        {"name": "CONO", "desc": "Company from the event (formatted)"},
        {"name": "ITNO", "desc": "Item number from the event"},
        {"name": "LANC", "desc": "User language (GetUserInfo)"},
        {"name": "bodAE", "desc": "Accounting entity of the BOD"},
        {"name": "tenantID", "desc": "Tenant id (on-premise translation)"},
        {"name": "LogicalID", "desc": "From logical id"},
        {"name": "dtGen", "type": "DataTranslator", "init": "null", "desc": "Generic data translator"},
        {"name": "strictLists", "type": "boolean", "init": "true", "desc": "CP StrictListCheck"},
        {"name": "g_Whs", "type": L, "init": "null", "desc": "Collected warehouse rows"},
        {"name": "g_Fac", "type": L, "init": "null", "desc": "Collected facility rows"},
        {"name": "g_Aun", "type": L, "init": "null", "desc": "Collected alternate U/M rows"},
        {"name": "g_WhsIt", "type": IT, "init": "null", "desc": "Warehouse iterator"},
        {"name": "g_FacIt", "type": IT, "init": "null", "desc": "Facility iterator"},
        {"name": "g_AunIt", "type": IT, "init": "null", "desc": "Alternate U/M iterator"},
        {"name": "g_Row", "type": "String[]", "init": "null", "desc": "Current output row"},
    ],
    "sequence": seq,
}
json.dump(spec, open(os.path.join(WD, "spec.json"), "w"), indent=1)
print("ok", len(seq), "top-level items")
