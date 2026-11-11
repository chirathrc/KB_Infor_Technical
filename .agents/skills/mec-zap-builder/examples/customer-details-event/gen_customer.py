"""Generate Nouns-CustomerDetails.xsd, BODs-SyncCustomerDetails.xsd and spec.json for
M3BOD_CustomerDetails_Sync_Out_Custom (M3 customer event -> CRS610MI -> custom Sync.CustomerDetails BOD)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fieldmap import H, F, O, A, DATES

WD = os.path.dirname(os.path.abspath(__file__))
NAME = "M3BOD_CustomerDetails_Sync_Out_Custom"
ROOT = "OUT:/SyncCustomerDetails"
CD = ROOT + "/DataArea/CustomerDetails"
tidy = lambda lines: [l.rstrip() for l in lines]

# ------------------------------------------------------------------ XSDs
def ctype(name, fields):
    s = f'\t<xs:complexType name="{name}">\n\t\t<xs:sequence>\n'
    for e, _ in fields:
        s += f'\t\t\t<xs:element name="{e}" type="xs:string" minOccurs="0"/>\n'
    return s + "\t\t</xs:sequence>\n\t</xs:complexType>\n"

noun = ('<?xml version="1.0" encoding="UTF-8" ?>\n'
 '<!-- Noun CustomerDetails: M3 customer master (OCUSMA/CIDMAS) via CRS610MI GetBasicData, GetFinancial, GetOrderInfo, LstAddresses -->\n'
 '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://schema.infor.com/InforOAGIS/2" '
 'targetNamespace="http://schema.infor.com/InforOAGIS/2" elementFormDefault="qualified" attributeFormDefault="unqualified" version="1.0.0">\n'
 '\t<xs:element name="CustomerDetails" type="CustomerDetailsType"/>\n'
 '\t<xs:complexType name="CustomerDetailsType">\n\t\t<xs:sequence>\n'
 '\t\t\t<xs:element name="CustomerHeader" type="CustomerDetailsHeaderType"/>\n'
 '\t\t\t<xs:element name="Financial" type="CustomerDetailsFinancialType"/>\n'
 '\t\t\t<xs:element name="OrderInfo" type="CustomerDetailsOrderInfoType"/>\n'
 '\t\t\t<xs:element name="Address" type="CustomerDetailsAddressType" minOccurs="0" maxOccurs="unbounded"/>\n'
 '\t\t</xs:sequence>\n\t</xs:complexType>\n'
 + ctype("CustomerDetailsHeaderType", H) + ctype("CustomerDetailsFinancialType", F)
 + ctype("CustomerDetailsOrderInfoType", O) + ctype("CustomerDetailsAddressType", A) + '</xs:schema>\n')
open(os.path.join(WD, "Nouns-CustomerDetails.xsd"), "w", encoding="utf-8", newline="\n").write(noun)

bod = ('<?xml version="1.0" encoding="UTF-8" ?>\n'
 '<!-- Custom BOD Sync.CustomerDetails - verb Sync, noun CustomerDetails (InforOAGIS 2) -->\n'
 '<xs:schema targetNamespace="http://schema.infor.com/InforOAGIS/2" xmlns:xs="http://www.w3.org/2001/XMLSchema" '
 'xmlns="http://schema.infor.com/InforOAGIS/2" elementFormDefault="qualified" attributeFormDefault="unqualified">\n'
 '\t<xs:include schemaLocation="Nouns-CustomerDetails.xsd"/>\n\t<xs:include schemaLocation="Resources-Meta.xsd"/>\n'
 '\t<xs:element name="SyncCustomerDetails" type="SyncCustomerDetailsType"/>\n'
 '\t<xs:complexType name="SyncCustomerDetailsType">\n\t\t<xs:complexContent>\n\t\t\t<xs:extension base="BusinessObjectDocumentType">\n'
 '\t\t\t\t<xs:sequence>\n\t\t\t\t\t<xs:element name="DataArea" type="SyncCustomerDetailsDataAreaType"/>\n\t\t\t\t</xs:sequence>\n'
 '\t\t\t</xs:extension>\n\t\t</xs:complexContent>\n\t</xs:complexType>\n'
 '\t<xs:complexType name="SyncCustomerDetailsDataAreaType">\n\t\t<xs:sequence>\n'
 '\t\t\t<xs:element ref="Sync"/>\n\t\t\t<xs:element ref="CustomerDetails"/>\n\t\t</xs:sequence>\n\t</xs:complexType>\n</xs:schema>\n')
open(os.path.join(WD, "BODs-SyncCustomerDetails.xsd"), "w", encoding="utf-8", newline="\n").write(bod)

# ------------------------------------------------------------------ single sections
def single_section(fn, api_fn, elem, fields, key_trim=None):
    ins = {"i" + f: f"{api_fn}.{f}" for e, f in fields}
    outs = {"o" + e: [f"{CD}/{elem}/{e}"] for e, f in fields}
    code = [f"// Values from CRS610MI/{api_fn} (validated in Validate{elem}). Trim; dates yyyyMMdd -> yyyy-MM-dd."]
    for e, f in fields:
        if f in DATES:
            code += [f"String d{f} = (i{f} == null) ? \"\" : i{f}.trim();",
                     f"if (d{f}.equals(\"0\") || d{f}.equals(\"00000000\")) d{f} = \"\";",
                     f"o{e} = (d{f}.length() == 8) ? d{f}.substring(0, 4) + \"-\" + d{f}.substring(4, 6) + \"-\" + d{f}.substring(6, 8) : d{f};"]
        elif f == key_trim:
            code.append(f"o{e} = (i{f} == null) ? \"\" : IONToolbox.rightTrim(i{f});")
        else:
            code.append(f"o{e} = (i{f} == null) ? \"\" : i{f}.trim();")
    return {"java": fn, "desc": f"Map CRS610MI/{api_fn} to CustomerDetails/{elem}", "in": ins, "out": outs, "code": tidy(code)}

def validate(fn, api, api_fn, with_key_check):
    code = ["if (!isLastAPICallOK()) {",
            f"    throw new MeCError(\"CustomerDetails: CRS610MI/{api} failed for customer \" + CUNO + \" (CONO \" + CONO + \"): \" + getLastAPIMessage());",
            "}"]
    if with_key_check:
        code += ["String rCUNO = (iCUNO == null) ? \"\" : IONToolbox.rightTrim(iCUNO);",
                 "if (IONToolbox.isEmpty(rCUNO)) {",
                 f"    throw new MeCError(\"CustomerDetails: CRS610MI/{api} returned no data for customer \" + CUNO);",
                 "}",
                 "if (!rCUNO.equals(CUNO)) {",
                 f"    throw new MeCError(\"CustomerDetails: CRS610MI/{api} returned customer \" + rCUNO + \" for requested customer \" + CUNO);",
                 "}"]
        return {"java": fn, "desc": f"Invalid customer / API failure / empty response -> MeCError (no BOD)", "in": {"iCUNO": f"{api_fn}.CUNO"}, "code": code}
    return {"java": fn, "desc": f"CRS610MI/{api} failure -> MeCError (no BOD)", "code": code}

# ------------------------------------------------------------------ list section (addresses)
def list_section():
    sec, api, var, it_var, label, out_elem = "Address", "CRS610MI/LstAddresses", "g_Adr", "g_AdrIt", "address", "Address"
    n = len(A)
    collect_in = {"iCUNO": "LstAddresses.CUNO"}
    collect_in.update({"i" + f: f"LstAddresses.{f}" for e, f in A})
    cc = ["// One call per row returned by " + api + ". The list is positioned on the customer key,",
          "// so rows of other customers are skipped; only exact matches are kept.",
          "String rCUNO = (iCUNO == null) ? \"\" : IONToolbox.rightTrim(iCUNO);",
          "if (rCUNO.equals(CUNO)) {", f"    String[] row = new String[{n}];"]
    for i, (e, f) in enumerate(A):
        if f in DATES:
            cc += [f"    String d{f} = (i{f} == null) ? \"\" : i{f}.trim();",
                   f"    if (d{f}.equals(\"0\") || d{f}.equals(\"00000000\")) d{f} = \"\";",
                   f"    row[{i}] = (d{f}.length() == 8) ? d{f}.substring(0, 4) + \"-\" + d{f}.substring(4, 6) + \"-\" + d{f}.substring(6, 8) : d{f};   // {e}"]
        else:
            cc.append(f"    row[{i}] = (i{f} == null) ? \"\" : i{f}.trim();   // {e}")
    cc += [f"    {var}.add(row);", "}"]
    chk = [f"// Runs after the {api} loop: the last API call is the list call itself.",
           "if (!isLastAPICallOK()) {",
           f"    String msg = \"CustomerDetails: {api} failed for customer \" + CUNO + \" (CONO \" + CONO + \"): \" + getLastAPIMessage();",
           "    if (strictLists) {", "        throw new MeCError(msg);   // never send a BOD with a section silently missing", "    }",
           f"    logWarn(msg + \" - {label} section omitted (StrictListCheck=false)\");", f"    {var}.clear();", "}",
           f"logDebug(\"CustomerDetails: \" + {var}.size() + \" {label} record(s) for customer \" + CUNO);"]
    collect = [
        {"loop": f"{sec}Loop", "cond": "WT", "desc": f"One iteration per {api} row",
         "body": [{"api": api, "mode": "ARI", "in": {"CUNO": "$CUNO"}, "out": {}, "desc": f"List customer addresses (NOK checked in Check{sec})"},
                  {"java": f"Collect{sec}", "in": collect_in, "out": {}, "code": tidy(cc), "desc": f"Keep rows of the event customer in {var}"}]},
        {"java": f"Check{sec}", "code": tidy(chk), "desc": f"API failure on {api}: fail the message (default) or omit the section"}]
    set_out = {"o" + e: [f"{CD}/{out_elem}/{e}"] for e, f in A}
    sc = [f"// Current row from {var} (set by HasNext{sec})."] + [f"o{e} = g_Row[{i}];" for i, (e, f) in enumerate(A)]
    emit = {"loop": f"Emit{sec}", "cond": "WT", "emits": [f"{CD}/{out_elem}"], "desc": f"One {out_elem} element per collected row",
            "body": [{"bool": f"HasNext{sec}", "desc": f"Iterator over {var}",
                      "code": [f"if ({it_var} != null && {it_var}.hasNext()) {{", f"    g_Row = {it_var}.next();", "    return true;", "}", "return false;"]},
                     {"java": f"Set{sec}", "out": set_out, "code": tidy(sc), "desc": f"Write one {out_elem} element"}]}
    return collect, emit

adr_c, adr_e = list_section()

seq = [
 {"java": "VersionLog", "desc": "Version log", "code": [
  "/*", f" * {NAME}",
  " * FS: M3 customer event -> retrieve customer data by CUNO -> custom Sync.CustomerDetails BOD to ION.",
  " * v1.0  2026-11-10  Initial version (generated from KB_Infor_Technical mec F4 pattern)",
  " *   Event (EventData: CUNO/CONO, also OKCUNO/OKCONO from OCUSMA and IDCUNO/IDCONO from CIDMAS)",
  " *   -> CRS610MI GetBasicData, GetFinancial, GetOrderInfo, LstAddresses",
  " *   Errors: missing CUNO/CONO, invalid customer, API NOK -> MeCError (no BOD). Delete event -> abort (no BOD).",
  " */"]},
 {"java": "InitEventData", "desc": "Create the event map and the collection lists", "code": [
  "eventData = new java.util.HashMap<String, String>();", "g_Adr = new java.util.ArrayList<String[]>();"]},
 {"loop": "GetEventDataLoop", "cond": "WT", "ctl": "IN:/EventData/Document/ElementData", "desc": "One iteration per event element", "body": [
  {"java": "GetEventData", "desc": "Store each element Name/Value; CUNO and CONO accepted with or without the OK (OCUSMA) / ID (CIDMAS) table prefix",
   "in": {"iName": "IN:/EventData/Document/ElementData/Name", "iValue": "IN:/EventData/Document/ElementData/Value"},
   "code": [
    "if (iName != null) {",
    "    String n = iName.trim();",
    "    String v = (iValue == null) ? \"\" : IONToolbox.rightTrim(iValue);",
    "    if (n.equals(\"CUNO\") || n.equals(\"OKCUNO\") || n.equals(\"IDCUNO\")) {",
    "        eventData.put(\"CUNO\", v);            // customer keys keep leading characters",
    "    } else if (n.equals(\"CONO\") || n.equals(\"OKCONO\") || n.equals(\"IDCONO\")) {",
    "        eventData.put(\"CONO\", v.trim());",
    "    } else {",
    "        eventData.put(n, v.trim());",
    "    }",
    "}"]}]},
 {"java": "ManageEventData", "desc": "Validate the event: delete -> abort, missing CUNO/CONO -> MeCError",
  "in": {"iOperation": "IN:/EventData/Operation", "iDocumentName": "IN:/EventData/DocumentName", "iEventId": "IN:/EventData/EventId"},
  "out": {"oCONO": ["$CONO"], "oCUNO": ["$CUNO"]},
  "code": [
   "String op = (iOperation == null) ? \"\" : iOperation.trim().toUpperCase();",
   "String doc = (iDocumentName == null) ? \"\" : iDocumentName.trim();",
   "String evt = (iEventId == null) ? \"\" : iEventId.trim();",
   "oCONO = eventData.get(\"CONO\");", "oCUNO = eventData.get(\"CUNO\");",
   "oCONO = (oCONO == null) ? \"\" : oCONO.trim();", "oCUNO = (oCUNO == null) ? \"\" : oCUNO;",
   "",
   "// Delete events: the customer no longer exists in M3 - end without output",
   "if (op.equals(\"D\") || op.equals(\"DELETE\")) {",
   "    logInfo(\"CustomerDetails: delete event \" + evt + \" for customer '\" + oCUNO + \"' - no BOD produced\");",
   "    abort(\"CustomerDetails: delete event - no Sync.CustomerDetails BOD\");   // ends the mapping, no output",
   "} else {",
   "    // Mandatory keys",
   "    if (IONToolbox.isEmpty(oCUNO)) {",
   "        throw new MeCError(\"CustomerDetails: customer number (CUNO/OKCUNO/IDCUNO) missing in event \" + evt + \" [\" + doc + \"]\");",
   "    }",
   "    if (IONToolbox.isEmpty(oCONO)) {",
   "        throw new MeCError(\"CustomerDetails: company (CONO/OKCONO/IDCONO) missing in event \" + evt + \" for customer \" + oCUNO);",
   "    }",
   "    logDebug(\"CustomerDetails: event \" + evt + \" op=\" + op + \" CONO=\" + oCONO + \" CUNO=\" + oCUNO);",
   "}"]},
 {"java": "GetCONO_DIVI_AE", "desc": "Format company, company-level accounting entity",
  "in": {"iCONO": "$CONO"}, "out": {"oCONO": ["$CONO"], "oAE": ["$bodAE"]},
  "code": ["// Get CONO", "oCONO = IONToolbox.formatCompany(iCONO);", "",
           "// Customer master is company-level: accounting entity from M3 company only",
           "oAE = IONToolbox.getAccountingEntityId(oCONO, null);"]},
 {"settings": {"Company": "GetCONO_DIVI_AE.oCONO"}},
 {"java": "Init", "desc": "DataTranslator, tenant id, control properties",
  "in": {"iCONO": "GetCONO_DIVI_AE.oCONO", "iTenantId": "IN:/EventData/TenantId"},
  "code": [
   "// Trim CONO:", "iCONO = iCONO == null ? \"\" : iCONO.trim();", "",
   "// Instantiate generic DataTranslator", "String blankDIVI = \"\";",
   "dtGen = new DataTranslator(getManifestMap(), iCONO, blankDIVI, \"ION\", \"1\", \"Generic\");", "",
   "// Set tenant id", "if (iTenantId == null) {",
   "    // On-premise: Translate M3 BE company to tenant id",
   "    tenantID = dtGen.toMessage(\"Generic\", \"TenantID\", iCONO, \"\", \"\", \"CMNCMP\", \"CONO\");",
   "    setManifestInfo(ManifestConstants.MAP_ION_TENANT_ID, tenantID);", "}", "",
   "// Control property StrictListCheck (default true): list API failure fails the message",
   "String strict = getManifestInfo(\"agr:StrictListCheck\");",
   "strictLists = !(strict != null && strict.trim().equalsIgnoreCase(\"false\"));"]},
 {"api": "CRS610MI/GetUserInfo", "mode": "AVM", "in": {}, "out": {"ZDLANC": ["$LANC"]}, "desc": "User language for the BOD languageCode"},
 {"api": "CRS610MI/GetBasicData", "mode": "AVI", "in": {"CUNO": "$CUNO"}, "out": {}, "desc": "Customer basic data (OCUSMA/CIDMAS) - NOK checked in ValidateCustomer"},
 validate("ValidateCustomer", "GetBasicData", "GetBasicData", True),
 {"api": "CRS610MI/GetFinancial", "mode": "AVI", "in": {"CUNO": "$CUNO"}, "out": {}, "desc": "Customer financial data - NOK checked in ValidateFinancial"},
 validate("ValidateFinancial", "GetFinancial", "GetFinancial", False),
 {"api": "CRS610MI/GetOrderInfo", "mode": "AVI", "in": {"CUNO": "$CUNO"}, "out": {}, "desc": "Customer order/sales data - NOK checked in ValidateOrderInfo"},
 validate("ValidateOrderInfo", "GetOrderInfo", "GetOrderInfo", False),
 *adr_c,
 {"java": "SetOutboxHeaderData", "desc": "BOD type, accounting entity, target logical id, document id", "code": [
  "// BODType, hard coded here", "setManifestInfo(ManifestConstants.MAP_ION_BOD_TYPE, \"Sync.CustomerDetails\"); // \"map:ionBODType\"", "",
  "// AccountingEntityID", "setManifestInfo(ManifestConstants.MAP_ION_ACCOUNTING_ENTITY, bodAE); // \"map:ionAccountingEntity\"", "",
  "// ToLogicalId, set from event when present",
  "if (!IONToolbox.isEmpty(eventData.get(\"ToLogicalId\"))) {",
  "    setManifestInfo(ManifestConstants.MAP_ION_TO_LOGICAL_ID, eventData.get(\"ToLogicalId\")); // \"map:ionToLogicalId\"", "}", "",
  "// Document id shown in ION OneView", "setManifestInfo(ManifestConstants.MAP_ION_DOCUMENT_ID, CUNO); // \"map:ionDocumentId\""]},
 {"java": "SetHeader", "desc": "BOD root attributes and ApplicationArea",
  "in": {"iCONO": "$CONO", "iLANC": "$LANC", "iSentTimestamp": "IN:/EventData/SentTimestamp", "iBODID": None},
  "out": {"oReleaseID": [ROOT + "[@releaseID]"], "oVersionID": [ROOT + "[@versionID]"],
          "oSystemEnvironmentCode": [ROOT + "[@systemEnvironmentCode]"], "oLanguageCode": [ROOT + "[@languageCode]"],
          "oLogicalID": [ROOT + "/ApplicationArea/Sender/LogicalID", "$LogicalID"],
          "oLogicalID_schemeVersionID": [ROOT + "/ApplicationArea/Sender/LogicalID[@schemeVersionID]"],
          "oComponentID": [ROOT + "/ApplicationArea/Sender/ComponentID"],
          "oComponentID_schemeVersionID": [ROOT + "/ApplicationArea/Sender/ComponentID[@schemeVersionID]"],
          "oConfirmationCode": [ROOT + "/ApplicationArea/Sender/ConfirmationCode"],
          "oCreationDateTime": [ROOT + "/ApplicationArea/CreationDateTime"], "oBODID": [ROOT + "/ApplicationArea/BODID"]},
  "code": [
   "// Set OAGIS release", "oReleaseID = \"9.2\";", "", "// Set version of the given BOD definition", "oVersionID = \"1.0.0\";", "",
   "// Set \"Test\" or \"Production\" (default) mode", "oSystemEnvironmentCode = getSystemEnvironmentCode();", "",
   "// Set language for the contents of the BOD", "if (iLANC != null) {",
   "    oLanguageCode = dtGen.toMessage(\"Generic\", \"languageCode\", iLANC, \"\", \"\", \"CSYTAB\",\"LNCD\");", "}", "",
   "// Set from logical ID", "oLogicalID = getFromLogicalID();", "",
   "// Set MEC mapping version", "oLogicalID_schemeVersionID = getMappingVersion();", "",
   "// Set business application that issued the BOD", "oComponentID = \"M3BE\";", "",
   "// Set M3 BE version", "oComponentID_schemeVersionID = getBEVersion();", "",
   "// Set date time stamp that the given instance of the BOD was created (UTC)",
   "oCreationDateTime = IONToolbox.normalizeXMLDateTime(iSentTimestamp);", "",
   "// Set GUID that will make each BOD instance uniquely identifiable, default MEC message UUID",
   "if (iBODID != null) {", "    oBODID = iBODID;", "} else {", "    oBODID = getMapUUID();", "}",
   "// Set ConfirmationCode", "oConfirmationCode = \"OnError\";"]},
 {"java": "SetSync", "desc": "Sync verb: accounting entity, location, action code",
  "in": {"iCONO": "$CONO", "iOperation": "IN:/EventData/Operation"},
  "out": {"oAccountingEntityID": [ROOT + "/DataArea/Sync/AccountingEntityID"], "oLocationID": [ROOT + "/DataArea/Sync/LocationID"],
          "oActionCode": [ROOT + "/DataArea/Sync/ActionCriteria/ActionExpression[@actionCode]"]},
  "code": ["// Set accounting entity id", "oAccountingEntityID = (!IONToolbox.isEmpty(bodAE)) ? bodAE : \"\";", "",
           "// Customer master is company-level: no location", "oLocationID = \"\";", "",
           "// Set action code (C -> Add, U -> Replace)", "oActionCode = IONToolbox.createSyncActionCode(iOperation);"]},
 single_section("SetCustomerHeader", "GetBasicData", "CustomerHeader", H, key_trim="CUNO"),
 single_section("SetFinancial", "GetFinancial", "Financial", F),
 single_section("SetOrderInfo", "GetOrderInfo", "OrderInfo", O),
 {"java": "PrepareOutput", "desc": "Iterator over the collected address rows", "code": ["g_AdrIt = g_Adr.iterator();"]},
 adr_e,
 {"java": "LogResult", "desc": "Summary in the MEC message log", "code": [
  "logInfo(\"CustomerDetails: Sync.CustomerDetails built for customer \" + CUNO + \" (CONO \" + CONO + \"): \"",
  "        + g_Adr.size() + \" address(es)\");"]},
]

L, IT = "java.util.List<String[]>", "java.util.Iterator<String[]>"
spec = {
 "name": NAME, "version": "1.0", "namespace": "M3 BOD",
 "description": "M3 customer event -> CRS610MI customer details -> custom Sync.CustomerDetails BOD",
 "schema_in": {"xsd": "EventData_MT.xsd", "name": "EventData_MT", "root": "EventData", "category": "Other"},
 "schema_out": {"xsd": "BODs-SyncCustomerDetails.xsd", "name": "BODs-SyncCustomerDetails", "root": "SyncCustomerDetails", "category": "BOD"},
 "properties": [{"type": "CP", "name": "StrictListCheck", "value": "true"}],
 "constants": [],
 "variables": [
  {"name": "eventData", "type": "java.util.Map<String, String>", "init": "null", "desc": "Event element Name -> Value"},
  {"name": "CONO", "desc": "Company from the event (formatted)"}, {"name": "CUNO", "desc": "Customer number from the event"},
  {"name": "LANC", "desc": "User language (GetUserInfo)"}, {"name": "bodAE", "desc": "Accounting entity of the BOD"},
  {"name": "tenantID", "desc": "Tenant id (on-premise translation)"}, {"name": "LogicalID", "desc": "From logical id"},
  {"name": "dtGen", "type": "DataTranslator", "init": "null", "desc": "Generic data translator"},
  {"name": "strictLists", "type": "boolean", "init": "true", "desc": "CP StrictListCheck"},
  {"name": "g_Adr", "type": L, "init": "null", "desc": "Collected address rows"},
  {"name": "g_AdrIt", "type": IT, "init": "null", "desc": "Address iterator"},
  {"name": "g_Row", "type": "String[]", "init": "null", "desc": "Current output row"}],
 "sequence": seq}
json.dump(spec, open(os.path.join(WD, "spec.json"), "w"), indent=1)
print("ok", len(seq), "top-level items")
