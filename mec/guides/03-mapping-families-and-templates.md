# 03 — Mapping families and their templates

The 80 samples fall into ten integration patterns (F1–F10); F11 (Load) comes from later Cloud projects. For a new FS, first decide the family; the family fixes
the naming, input/output documents, the opening and closing functions, and the manifest settings. Only the
business middle part varies. Full member list: `inventory.md`. Canonical Java for the template functions:
`05-standard-snippets.md`.

Notation: `[UV]` Java void, `[UB]` Boolean, `[AS]` M3 Settings, `[AVM|AVI|AVL]` single API, `[ARM|ARI|ARL]`
list API, `LOOP[WT]`, `LOOP[WF]`, `IF[IT]`, `(ML)` loop over input element, `(FL)` loop controlled by
function, `(LM)` loop creates output element.

---

## Naming rules (all families)

| Kind | Pattern | Examples |
|---|---|---|
| Custom BOD | `<Prefix>_<Noun>_<Verb>_<In|Out>_<Suffix>` (Infor rule — wrong pattern → "Invalid Mapping Schema") | `M3BOD_StockCountUpload_Process_In_GC_Custom`, `M3BOD_PurchaseOrderWF_Sync_Out_1_0_0_GC_Custom` |
| Error acknowledge | `<Prefix>_<Noun>_Acknowledge_Error_Out_<Suffix>` | `M3BOD_StockCountUpload_Acknowledge_Error_Out_GC_Custom` |
| Standard BOD copy | standard name + version suffix | `M3BOD_PurchaseOrder_Sync_Out_2_14_3` |
| Non-BOD (flat/XML) | `M3FTD_<Client>_<Area>_<Flow>[_<Dir>]_Custom` | `M3FTD_GC_WB_ID_POReceiving_Custom`, `M3FTD_GC_SG_HSBC_PP_OUT_Custom` |
| Country/site variants | country code in the name, one map per variant | `…_WB_CN_…`, `…_WB_ID_…`, `…_WB_VN_…` |

Mapper namespace (`MappingMeta/Namespace`): `M3 BOD` for BOD maps, `FBM` for bank/MBM file maps, `Test` used
for many custom FTDs (a Mapper folder — choose per project convention).

## BOD verb decision (all families)

| Verb | Use when | Reply |
|---|---|---|
| **Sync** | M3 (the owner) publishes a change; no response expected | none |
| **Process** | The sender asks M3 to create/update and needs a status back | Acknowledge, always (+ `_Acknowledge_Error_Out` map) |
| **Load** | Bulk/fire-and-forget create in M3; ownership passes to the receiver | none — no Acknowledge, no error map (F11) |
| **Acknowledge** | The response to a Process (accepted/rejected) | is the reply |
| **Get / Show** | Request and response for reading data | Show |
| **Confirm** | ION-internal failure notice; never routed externally — the `_Acknowledge_Error_Out` map turns it into an Acknowledge | — |

**Sync rule:** a Sync map's input is always Event Analytics `EventData`. If the input is a custom trigger or request
file (even one carrying only filter criteria), the map is **Process/Acknowledge**, even when the business data flows
out of M3 (*file-triggered extract*, F6 variant).

---

## F1 — MBM-triggered outbound file (bank payment, pain.001) — 16 maps

*Trigger:* payment proposal/print job → MBM → MEC. *In:* `EventData` (MBM keys). *Out:* ISO 20022
`Document` (`urn:iso:std:iso:20022:tech:xsd:pain.001.001.03`) or bank-specific XML.

```
[UV] ReadMe                       spec/version notes
LOOP[WT] ElementDataLoop (ML IN:/EventData/Document/ElementData)
  [UV] GetElementData             put MessageCopy/Date/Time/MessageKey1..6_Value into a HashMap
[UV] SetMBMInit → [UV] MBMInit    MessageKey1..4 → CONO, DIVI, PRPN, PYON (+ DecimalFormat init)
[AS] M3 Settings                  Company←CONO, Division←DIVI
[AVM] APS130MI/GetHead, GetHead2, GetHeadAddress   payment proposal header, bank, company address
[UV] F_Set_Message_Identification  MsgId / PmtInfId templates
[UV] F_Set_Manifest_Info          map:FileName, MAP_ION_CUSTOM+"FileName", MAP_PARTNER
LOOP[WT] L_Calculate_Transactions (FL ARM APS130MI/LstPayeeTotals)  count + control sum
[UV] F_Set_Header_Out             → GrpHdr
IF[IT] L_Set_Payment_Info (UB return true) (LM PmtInf)
  [UV] F_Set_Payment_Infomation, F_Set_Debtor, F_Set_Debtor_Account, F_Set_Debtor_Agent, F_Set_ChargeBr
  LOOP[WT] L_Set_Credit_Tranfer_Info (FL ARM LstPayeeTotals) (LM CdtTrfTxInf)       one per payee
    LOOP[WT] (FL ARM LstPayeeTotals2)                                              payee detail
    [UV] F_Set_EndToEnd_Id, F_Set_Amount, F_Set_Credit_Agent
    [AVI] CRS881MI/GetTranslData   (constants TRQF/MSTD/MVRS/BMSG/IBOB/ELMP/ELMD)  IBAN-country check
    [AVM] CRS980MI/GetTextID → LOOP (FL ARM CRS980MI/SltTxtBlock)                 supplier text → name
    [UV] F_Set_Creditor ; IF[IT] IBAN / IF[IT] non-IBAN ; [AVI] CRS620MI/GetSupplierRef
    IF[IT] country-specific blocks (LM RgltryRptg) …
    LOOP[WT] (FL ARM APS130MI/LstInvByPayee) → remittance info (invoice list)
```
Variants differ in code values (`SvcLvl/Cd` URGP / NURG / URNS, purpose/category codes CINV, OTHR, BKTR, CACC,
CNAPS; `Authstn/Cd` ILEV), date/timezone, character cleaning, and (7 maps) use of the custom extension table
`CUSEXTMI` as persistent per-key storage: `GetFieldValue` → if missing initialise defaults → `AddFieldValue` /
`ChgFieldValue`.

## F2 — MBM re-detector — 1 map

Reads the MBM, determines the payment *type* from bank text (`APS130MI/GetHeadAddress` → `LITX` prefix
HVP/LVP/PP/FAST/LTR/FTR/MYHVP…), then raises a **new** MBM with extra keys so a second, type-specific
agreement detects it:
`[AVM] MNS260MI/AddMBMInit (DONR="MBM", PRF1/PRF2/PRTF from control properties, OBJC="PRPN", DONO, MKV4..7)` →
`PrcMBMInit` → `DelMBMInit`. No output document. Control properties: `PRF1`, `PRF2`, `Program`.
→ Use when one M3 trigger must fan out to different mappings by business rule.

## F3 — Bank status report in (pain.002 → notification BOD) — 2 maps (+ F6 HSBCACKIN)

*In:* `Document` (pain.002.001.03). *Out:* custom `Sync<X>` BOD carrying `EmailGroup`, `MailSubject`,
`EmailBody` (HTML) and a `Table/TableRow` list — consumed by an ION workflow/alert that sends the e-mail.
Skeleton: header fields from `OrgnlGrpInfAndSts` → `[AS]` → `APS130MI/GetHead2` + `MNS100MI/GetBasicData` +
`CRS881MI/GetTranslData` (bank → division/e-mail group) → `IF[IT]` per status type (rejected / accepted) →
build mail body (loops over `StsRsnInf`, `LstPayeeTotals2`) → iterator loop emits `TableRow` (LM) →
`SetManifestInfor`.

## F4 — Custom outbound from an M3 event → custom Sync BOD (ION workflow / e-invoice) — 9 maps

*Trigger:* Event Analytics rule on an M3 table (e.g. CUGEX3 insert from a button) or MBM. *In:* `EventData`.
*Out:* custom BOD `Sync<Noun>` in `http://schema.infor.com/InforOAGIS/2`.

```
[UV] VersionLog
[UV] InitEventData                     HashMaps/Lists
LOOP[WT] GetEventDataLoop (ML ElementData) → [UV] GetEventData   eventData.put(name, trimmed value)
[UV] ManageEventData                   eventData.get("CONO"/"PUNO"/"PK01"/…) → variables
[UV] GetCONO_DIVI_AE                   IONToolbox.formatCompany/formatDivision/getAccountingEntityId
[AS] M3 Settings
[UV] SetGlobals / Init                 new DataTranslator(getManifestMap(), CONO, "", "ION", "1", "Generic"); tenant id
[AVM] MMS200MI|PPS200MI|…/GetUserInfo  language (ZDLANC) for languageCode
[UV] SetOutboxHeaderData               MAP_ION_BOD_TYPE "Sync.<Noun>", MAP_ION_ACCOUNTING_ENTITY
[UV] SetHeader                         releaseID 9.2, versionID, systemEnvironmentCode, ApplicationArea/*
[UV] SetSync                           DataArea/Sync AccountingEntityID, LocationID, ActionExpression@actionCode
[UV] setAgreementName (optional)       map:altAgreement = cmn:agreement + key
… business part: API calls, collect into lists, IF[IT] by status …
[UV] set<Header>  → DataArea/<Noun>/<Header>/*
LOOP[WT] <Detail>_Loop (FL UB iterator) (LM <Detail>) → [UV] set<Detail>
[UV] setTrailer
```
Custom BOD schemas: `BODs-Sync<Noun>.xsd` (extends `BusinessObjectDocumentType`, DataArea = `Sync` +
`<Noun>`), `Nouns-<Noun>.xsd` (the business structure), `Resources-Meta.xsd`.
Deployment outside the map: EAR rule/subscription, BOD Processor entry, publish → custom agreement → activate.

## F5 — Infor standard BODs (copied) — 11 maps

Reference implementations (very large: up to 272 functions). Use them as the source of truth for template
functions and for M3 API sequences per business object:
- Out from event: `PurchaseOrder_Sync_Out_2_14_3`, `SupplierInvoice_Sync_Out_2_13_0`, `EAMItemMaster_Acknowledge_Out_2_13_2`.
- In Process (sync ack): `ReceiveDelivery_Process_In_2_12_1`, `Shipment_Process_In_2_14_3`, `Requisition_Process_In_2_12_1`,
  `InventoryAdjustment_Process_In_2_12_1`, `EAMItemMaster_Process_In_2_13_4` (+ `_Acknowledge_Error_Out`).
- In Sync (no output, Check Order `CO` properties): `ReceiveDelivery_Sync_In_2_15_0`, `Shipment_Sync_In_2_9_0`.
Many `m3be*` control properties (order types, locations, process flags) live here — see `04`.

## F6 — Custom inbound Process BOD + Error Acknowledge — 3 pairs

*In:* `Process<Noun>`. *Out:* `Acknowledge<Noun>` (synchronous). Always paired with
`<Noun>_Acknowledge_Error_Out` (`ConfirmBOD` → `Acknowledge<Noun>`, actionCode Rejected).

```
[UV] Version_Log
[UV] SetCorrelationID        getMapUUID()
[UV] GetProcessHeader        save ApplicationArea in IONApplicationArea(getIONAppAreaManifestMap(), corrId);
                             AE "CCC_DDD" → CONO/DIVI; MeCError if LogicalID missing; MAP_M3BE_VERSION; map:correlationID
[AS] M3 Settings
[UV] INIT                    lists
[UV] GetProcess              LocationID, actionCode
[UV] SetHeader               Acknowledge header (versionID of the custom BOD)
[UV] SetOutboxHeaderData     MAP_ION_BOD_TYPE "Acknowledge.<Noun>", MAP_ION_TENANT_ID ← com:ionTenantId, AE
[UV] SetAcknowledge          OriginalApplicationArea from saved aa; ResponseExpression@actionCode = Accepted
LOOP[WT] (ML input lines) (LM output lines)
  IF[IT] validate/skip header rows … API lookups … collect into lists
LOOP[WT] (UB iterator) → [AVI] update API → [UV] Validate… collect errors
LOOP[WT] ErrorDetails (UB it.hasNext()) (LM ErrorDetails) → [UV] GetError
```
Error map (4 functions): `SetHeader`, `SetAcknowledge` (reads saved aa via `map:correlationID`, actionCode
`IONToolbox.ACTION_CODE_REJECTED`), `SetOutboxHeaderData`, `SetReason`
(`ConfirmBOD/DataArea/BOD/BODFailureMessage/ErrorProcessMessage/Description`, first line).
`SO` property `Schema Location` is set (copied from a standard map).

Hard rules (from Cloud projects):
- **Publish the `_Acknowledge_Error_Out` map first.** Without it the Process map's agreement fails: "An agreement cannot
  be generated yet. No available Acknowledge Error Mapping for Inbound Process Mapping with noun <Noun>."
- The error map's `SchemaIn` is the generic `ConfirmBOD` set; its `SchemaOut` is the **same** `BODs-Acknowledge<Noun>`
  schema the Process map uses (do not build a second one). It fills only `ApplicationArea`, `ConfirmationCode`
  (`OnError`) and the reason; `DataArea/<Noun>` stays empty.
- When copying a reference pair, trace every field the copy fills: leftover logic (unpopulated ifs, fields of another
  noun) is common.

Typical ION data flow around the pair (file in, Process/Acknowledge): File connection point (Sync BOD of the raw file)
→ XSLT Sync→Process → M3 application (the map) → XSLT Acknowledge→Sync (only the notification fields) → workflow
(e-mail, SFTP, …), optionally gated by a `CBR_FILTER` (attribute existence); a parallel branch archives the source
file. Compose subject/body in the map; the workflow owns the recipient. Use distinct read/error/archive folders on
the file connection point (one folder + "move after read" can reprocess files in a loop).

*File-triggered extract* variant: the input file carries only request/filter criteria; the map reads M3 and its
output is the export data. Still Process/Acknowledge with the error map.

## F7 — Custom XML request → M3 → XML response (weighbridge / logistics) — 24 maps

*In:* small custom XML (`WeibridgeInboundInput/LineRecord/*`, `POReceivingTicketNew`, `OutboundLogistics_2`).
*Out:* response XML (`…Output/LineRecord/OutputMessage`, `ToleranceMessage`) back to the external system
via ION.

```
[UV] Modification_log
[UV] DataConversion       trim inputs; split PrimaryKey "MILL:KEY"; g_Company = getManifestInfo("agr:Company")
[AS] M3 Settings          Company ← g_Company      (CP Company = 100 default)
[AVM] MMS200MI/Get …      item master checks
IF[IT] business condition (UB)
  LOOP[WT] (FL ARI MWS422MI/LstPickDetail)   per pick line
    [AVM] MMS005MI/GetWarehouse ; [AVL] MDBREADMI/GetMITAUN00 (UoM factor) ; [UV] tolerance/split calc
    [AVI] MHS850MI/AddDOReceipt | PPS001MI/NotifyLine | MHS850MI/AddCOPick …   post transaction
    [UV] debug_… (log isLastAPICallOK / getLastAPIMessage / getCommandString)
[UV] SetOutput            OK / error message text (often in local language)
[UV] OutputFileNameSetter map:FileName, MAP_ION_TO_LOGICAL_ID "lid://infor.m3.m3:mec_prio",
                          MAP_ION_CUSTOM+"FileName", MAP_PARTNER, MAP_ION_DOCUMENT_ID
```
Country variants are copies with different API sets and message texts. Uses `MDBREADMI` direct table reads
(`GetMHDISH00`, `GetMITAUN00/21`, `GetMWOHED55`) heavily.

## F8 — BESTMIX formulation in (recipe → PDS) — 5 maps

*In:* `Envelope/Body/FormulationML/ProductRecipeList/ProductRecipe/…` (or `FormulationML`). *Out:*
`FormulationML` response lists per structure type (header/ingredient add/delete responses).
Pattern: header → `CRS881MI/LstTranslData` (plant/mill mapping, abort if not configured) → per recipe
(ML, LM): `PDS001MI/List` existing structure types → `MMS200MI/GetItmWhsBasic` validation → delete
existing components (`PDS002MI/LstComponent` + `Delete`) → add new (`WF` iterator + `PDS002MI/AddComponent`) →
emit per-action response lists via `WF` iterators. Future-period variants add date-effective structures
(`PDS001MI/Copy`, `Update`).

## F9 — Request-driven BOD out (Envelope request → lists → Sync BOD) — 3 maps

*In:* `Envelope/SubmitterDetails/*` + `Body/FormatRequest/RequestBody/PeriodList/*`. *Out:* `SyncBM<…>Lst`
custom BOD. Standard F4 header block, then `getTransactionHeader` from agreement properties
(`agr:MsgType`, `agr:MsgVersion`, `agr:AppName`, `agr:DestName`, `agr:DataLang`, `agr:DBName`,
`agr:EndPtCode`, `agr:FlowCode`), period setters, then list loops over custom `CMS100MI` lists
(`LstBMItemWH`, `LstBMStockPO`, `LstBMPriceFC`, …) emitting Transaction lines.

## F10 — Uploaded file → validated batch posting → status/notification — 3 maps

*In:* XML from an uploaded spreadsheet/CSV (`GLDiscount/GLDiscountDetails`, FFD-based
`CreditNoteDiscountUpload`, `EHubInvoice`). *Out:* status document/e-mail content (`…UploadStatus`,
`EHubInvoiceAcknowledge`).
Pattern = two-pass validate-then-post (02 §3.6): read all lines → validate (APIs `CRS610MI/GetBasicData`,
`CRS630MI/GetAccountID`, `CRS030MI/GetBasicData`, custom lists) → abort with notification on errors →
`GLS840MI/AddBatchHead` → `AddBatchLine` loop → `CtrlBatch` → `sleep()` → `CMS100MI/LstGLErrors` →
`UpdBatch` (pattern: 06 §4); or `OIS100MI/AddBatchHead/AddBatchLine/Confirm` for credit notes. The e-mail group comes from a
per-division control property (`getManifestInfo("agr:" + division)`, e.g. CPs `201_AFC`, `210_HANAM`); the
status/e-mail content goes into the output document for ION to deliver. (`map:Sub` / `map:Msg` / `map:To`
manifest e-mail keys survive only in commented-out legacy code.)

Variants seen in later projects:
- **Fixed-width TXT input** through an FFD (02 §3.9). The positional record often has to be **rebuilt** for the
  target API (e.g. a missing field inserted, 06 §4).
- **Notification through an ION data flow** (02 §3.11): output = status BOD with FinalStatus, mail group,
  file-name validity, per-record results and a Base64 CSV attachment. An ION script maps it to an IDM template.
- **Reply file to the partner** (failed records) as a second map on the status document (02 §3.10).

**E-mail handling across families (live code):** recipients from control properties (`agr:ToEmail`,
`agr:ToEmail<facility|warehouse>`, `agr:CCEmail`, `agr:<division>`); BESTMIX/F9 maps also set
`map:ESUB` / `map:EMSG` (subject / exception message) in the manifest; body and recipients are written into
the output BOD/XML for an ION workflow or alert to send.

## F11 — Inbound Load BOD → M3 (no Acknowledge) — example `examples/load-in`

*In:* `Load<Noun>` BOD from an ION data flow (e.g. File (Sync) → XSLT Sync→Load → M3 application). *Out:* none.
Envelope (confirmed on a running Cloud map; a flat schema without `ApplicationArea` fails with "Input Document Missing
Root Element"):
```
Load<Noun>
  ApplicationArea / Sender / LogicalID, ConfirmationCode ; ApplicationArea / BODID
  DataArea / Load / ActionCriteria / ActionExpression
  DataArea / <Noun> / Load<Noun>   (repeating: the business fields)
```
Only the business fields get records and links; the envelope nodes need none.
```
[UV] VersionLog
[UV] InitSettings            CPs (Company, partner/message type …); MeCError if missing
[AS] M3 Settings
LOOP[WT] LineLoop (ML …/<Noun>/Load<Noun>)
  [UV] ReadLine              validate, stage API inputs, collect errors
  IF[IT] IfLineValid (UB)
    [AVI] <interface API>    e.g. MMS850MI/AddAdjust, OIS100MI/AddBatch*
    [UV] CheckAdjust         isLastAPICallOK() → error list
[UV] Finish                  logWarn each error; MeCError if any line failed (visible in EC Administration)
```
Choose Load when no status must go back to the sender; otherwise Process/Acknowledge (F6).

---

## Choosing a family from an FS (draft decision table)

| FS says… | Family |
|---|---|
| "When <M3 event/button/status change>, send data to ION workflow / external system as BOD" | F4 (or F5 if a standard BOD fits) |
| "Generate a bank/partner file when a payment proposal / document is printed" | F1 (+ F2 if several formats share one trigger) |
| "External system sends a request; M3 must post a transaction and reply OK/error" | F7 |
| "External system sends a business document into M3 via ION BOD, reply with acknowledgement" | F6 (custom noun) / F5 (standard noun) |
| "User uploads an Excel/CSV; validate everything, then post; e-mail the result" | F10 |
| "Bank/partner returns a status file; notify users" | F3 |
| "External planning system (BESTMIX) sends recipes/formulas to update M3" | F8 |
| "External system requests a data extract for given periods" | F9 |
| "External system sends records into M3, no reply needed" (bulk / fire-and-forget) | F11 (Load) |
| "A request file (filter criteria) triggers an M3 data export" | F6 variant: file-triggered extract (Process/Acknowledge) |
