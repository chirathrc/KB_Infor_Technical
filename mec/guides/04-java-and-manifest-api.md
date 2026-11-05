# 04 — Java API, manifest keys and control properties (as used in live code)

Everything below appears in **live (non-commented) Java** of the 80 Cloud mappings, so it is known to pass
the M3 CE Java whitelist. JDBC (`java.sql`, `SQLServerDriver`), file I/O (`java.io.File`, `java.nio.file`),
`com.intentia.ec.server.DocServer`, `System.out`, `cat.*` and `strUUID` occur **only in commented-out legacy
code** — they were removed during Cloud migration. Never generate them. `e.printStackTrace()` is present in
16 published maps; prefer `logError(...)`.

## 1. Methods available in function bodies (base class)

| Method | Use | Maps |
|---|---|---|
| `logDebug(String)` / `logInfo` / `logWarn` / `logError` / `logDiag` | Logging (see EC Admin message log) | 56 / – / 19 / 1 / 5 |
| `getManifestInfo(String key)` / `setManifestInfo(String key, String value)` | Read/write message manifest (keys below) | 59 / 79 |
| `setManifestInfo(Map)` | Bulk-restore manifest entries, e.g. `setManifestInfo(aa.getIONManifestMap())` in standard error-acknowledge maps | 1 |
| `getManifestMap()` | Pass to `DataTranslator`, `MECDataTranslator`, `StringReplacer` | 18 |
| `getIONAppAreaManifestMap()` | Pass to `IONApplicationArea` | 13 |
| `getMapUUID()` | Message UUID (BODID default, correlation ID) | 22 |
| `getMappingVersion()` / `getBEVersion()` / `getSystemEnvironmentCode()` / `getFromLogicalID()` | BOD ApplicationArea values | ~20 each |
| `isLastAPICallOK()` | Result of the last M3 API function | 50 |
| `getLastAPIMessage()` / `getLastMIProgram()` / `getLastTransaction()` / `getCommandString()` | Diagnostics of the last API call | 28 / 13 / 6 / 11 |
| `hasNOKOccurred()` | Any API NOK so far in this message | 8 |
| `abort()` / `abort(String)` | Stop the mapping without output | 13 |
| `throw new MeCError(String[, Throwable])` | Fail the message | 16 |
| `sleep(long ms)` | Wait (e.g. after `GLS840MI/CtrlBatch`) — not `Thread.sleep` | 10 |

## 2. Helper classes

### IONToolbox (static)
`isEmpty(s)`, `rightTrim(s)`, `formatCompany(cono)` (→ 3-digit), `formatDivision(divi)` (→ 3-char padded),
`getAccountingEntityId(cono, divi)` (→ `"100_AAA"`; `divi=null` → company-level AE),
`getCompanyFromAccountingEntityId(ae)`, `getDivisionFromAccountingEntityId(ae)`,
`normalizeXMLDateTime(ts)`, `createNormalizedXMLDateTime()` (now, UTC),
`createSyncActionCode(operation)` (EventData `Operation` → `Add/Change/Delete…`),
`createLocationID(faci, whlo)`; constants `ACTION_CODE_ADD`, `ACTION_CODE_CHANGE`, `ACTION_CODE_REPLACE`,
`ACTION_CODE_ACCEPTED`, `ACTION_CODE_REJECTED`.

### IONApplicationArea — carry the inbound ApplicationArea to the Acknowledge
```java
IONApplicationArea aa = new IONApplicationArea(getIONAppAreaManifestMap(), iCorrelationID);
aa.putValue("Sender/LogicalID", iLogicalID);   ...   aa.save();        // in the Process map
aa.getIONManifestMap(); String v = aa.getValue("BODID");  ...  aa.remove();   // in SetAcknowledge / error map
```
Keys used: `Sender/LogicalID`, `Sender/LogicalID@schemeVersionID`, `Sender/ComponentID`,
`Sender/ComponentID@schemeVersionID`, `CreationDateTime`, `BODID`, `DataArea/Process/AccountingEntityID`,
plus noun-specific IDs.

### DataTranslator / MECDataTranslator (data translation, CRS881/MBMTRN)
```java
dtGen = new DataTranslator(getManifestMap(), CONO, "", "ION", "1", "Generic");   // msg std, version, msg type
dtGen.toMessage("Generic", "languageCode", iLANC, "", "", "CSYTAB", "LNCD");    // M3 → partner value
dtGen.toMovex("Generic", "UOMCode", iUOM, "", "", "CSYTAB", "UNMS");            // partner → M3 value
if (dtGen.translated()) { ... }                                                  // was a translation found?
dtAE = new MECDataTranslator(getManifestMap(), "lid://infor.m3", "", "", "", "Generic", "Generic", "Generic", 'O');
oAE = dtAE.translate("Generic", "AccountingEntityID", oAE, "", "", "<CONO>_<DIVI> to Accounting Entity Id");
```
Arguments of `toMessage/toMovex`: context, field, value, two qualifiers, M3 table, M3 field.

### Others
`DateTimeConverter dtc = new DateTimeConverter(); dtc.setXMLDateTime(x); dtc.getEDIDateTime(qualifier);`
`StringReplacer strRep = new StringReplacer(getManifestMap());` (declared in payment maps, unused).
`SortingStructure` (variable type in 3 maps).

## 3. Standard Java used freely
`java.util` (ArrayList, HashMap, Iterator, List, Map, Calendar, Date, Locale, TimeZone), `java.text`
(SimpleDateFormat, DecimalFormat, DecimalFormatSymbols, DateFormat, ParseException), `java.math.BigDecimal`,
`java.time.ZoneId`, `String.format`, regex (`replaceAll`, `matches`, `split`), `StringBuffer`/`StringBuilder`,
`Integer/Double/Float.parse*`. `java.util` classes resolve unqualified (`new ArrayList<String[]>()` appears even in
Infor's standard PurchaseOrder map), but 95 % of the samples fully qualify (`java.util.HashMap`,
`java.text.SimpleDateFormat`). Generated code: fully qualify everything outside `java.lang` — it never fails.

## 4. Manifest keys

### Written by mappings
| Key (constant → string) | Purpose | Seen in |
|---|---|---|
| `ManifestConstants.MAP_ION_BOD_TYPE` → `map:ionBODType` | BOD type, e.g. `"Sync.PurchaseRequisitionWF"`, `"Acknowledge.StockCountUpload"` | all BOD maps |
| `MAP_ION_ACCOUNTING_ENTITY` → `map:ionAccountingEntity` | AE for ION routing | BOD maps, re-detector |
| `MAP_ION_TENANT_ID` → `map:ionTenantId` | tenant (from `com:ionTenantId` inbound, or translated) | BOD maps |
| `MAP_ION_DOCUMENT_ID` → `map:ionDocumentId` | document id shown in ION OneView (`DLIX_<ts>`, file name, BOD id) | 36 uses |
| `MAP_ION_DOCUMENT_NAME` → `map:ionDocumentName` | ION document name for non-BOD documents (needed on Send — see MEC skill §8) | 1 |
| `MAP_ION_TO_LOGICAL_ID` → `map:ionToLogicalId` | target logical id (`"lid://infor.m3.m3:mec_prio"`, or `eventData.get("ToLogicalId")`) | F7, F4 |
| `MAP_ION_CUSTOM + "FileName"` | custom ION property carrying the file name | 113 uses |
| `MAP_PARTNER` | partner name shown in EC Admin (`"HSBC_" + MsgId`) | 53 |
| `AGR_ION_DOCUMENT_ID` | document id (agreement scope) | 11 |
| `MAP_M3BE_VERSION` → `map:m3beVersion` | BE version for ConfirmBOD | Process maps |
| `COM_FILENAME` | output file name (set) / input file name (get) | 11 |
| `"map:FileName"` | output file name for file channels | 60 |
| `"map:correlationID"` | links Process map ↔ error Acknowledge map | F6/F5 |
| `"map:altAgreement"` | alternative agreement label (`cmn:agreement + " " + key`) | F4 |
| `"map:ESUB"`, `"map:EMSG"` | e-mail subject / exception text | F9 |

### Read by mappings
`com:ionTenantId`, `com:fileName` / `ManifestConstants.COM_FILENAME`, `ManifestConstants.CMN_TENANTID`,
`cmn:agreement`, `map:correlationID`, and **`agr:<ControlProperty>`** (below).

## 5. Agreement control properties (`agr:*`)

Defined in the map as `CP` properties (default value) and/or on the agreement; read with
`getManifestInfo("agr:<Name>")`.

| Group | Names (default) |
|---|---|
| Company / org | `Company` (100), `Supplier` (TEMPCHINA), per-division e-mail groups `201_AFC`, `210_HANAM`, `220_DONGNAI`, `230_PILMICO`, `240_BINHDUONG` |
| Notification | `ToEmail`, `ToEmail<FACI|WHLO>`, `CCEmail`, `ENV`/`Env`, `OUT_Folder`, `FileMoverTrigger_IN`, `attachpath`, `pathStructureType`, `Processed`, `WMSURLPosition` |
| Business rules | `ITTY` (G03,G04,G05), `IDTR`, `INSC`, `WHSY`, `WHTY`, `FNCNList`, `STATID2/3/16`, `STATRPA`, `SleepSeconds` (30) |
| MBM re-detect | `PRF1`, `PRF2` (BKREDTECT), `Program` (REDETECTPF) |
| BESTMIX header | `MsgType`, `MsgVersion`, `MsgDate`, `AppName`, `DestName`, `DataLang`, `DBName`, `EndPtCode`, `FlowCode` |
| Standard BOD (`m3be*`) | `m3beWarehouseInterfaceProcessFlag` (*EXE), `m3beItemInterfaceProcessFlag` (*IMP), `m3beDefaultRequisitionOrderType` (RO1/RO3), `m3beDefaultDistributionOrderType` (DO1), `m3beDefaultReplenishmentOrderType` (RO2), `m3beDirectPurchaseOrderType` (DPO), `m3beFixedAssetOrderType` (FAS), `m3beRTSOrderType` (CLM), `m3beDockLocation` (DOCK), `m3bePackLocation` (PACK), `m3beRejectionReason` (RR), `m3beItemType` (Y00), `m3beLotControlMethod`, `m3beStatusOverride`, `m3beEnableAttributes`, `m3beCustomerDefinedFields`, `m3beReference`, `m3beReceivePackageLine`, `m3beInspectCustomerReturn`, `m3beShipToPreferenceIndicator`, `m3beIgnoreAltUMDeletion`, `m3beRetrieveSPUCfromTemplate` |

Anti-pattern found: `agr:DBUSR`, `agr:DBPASS`, `agr:Username`, `agr:Password` (legacy SQL credentials in
control properties). Do not generate credential properties.

Design rule for generated maps: anything an FS calls "configurable", "per company/division/facility" or
"maintained by the customer" becomes a `CP` property with a sensible default.

## 6. Coding rules for generated maps (from compiled and imported builds)

- **No bare `return;` in `UV` functions.** No sample uses it, and how MEC wraps the body is not documented. Use
  if/else, or a guard flag that later functions check. `UB` functions must `return` a boolean.
- **`abort()` / `abort(String)` ends the mapping immediately** with no output and no error. Infor's own item map
  uses it to skip all later MI calls, and samples follow it directly with `AVM` calls. Use it only where "no
  output" is the correct business outcome. Use `throw new MeCError(...)` when the message must show as failed.
- `sleep(ms)` waits inside a map (e.g. to let M3 finish a batch control before reading its results).
  Never use `Thread.sleep`.
- Amounts: `java.math.BigDecimal` (exact sums, balance checks). Dates: `SimpleDateFormat` with `setLenient(false)`
  and an explicit `TimeZone`.
- `String.format("%7s", n)` / `"%-10s"` for fixed-width keys and fields.
- `java.util.Base64` compiles and is in `java.util`, but no sample uses it: confirm it at Generate.
- Inbound file name: `getManifestInfo(ManifestConstants.COM_FILENAME)`. Outbound file name: set
  `COM_FILENAME`, `"map:FileName"`, `MAP_ION_CUSTOM + "FileName"` and `MAP_ION_DOCUMENT_ID` together.
- Give loops and functions different names (e.g. loop `WarehouseLoop`, function `CollectWarehouse`).
- Check every function offline before import: `tools/javacheck.py` compiles all Java against stubs of this API,
  and `tools/javasim.py` runs it in mapping order with simulated MI results (08 §5).
- **Rejected by the publish-time security scanner** ("Mapping contains unauthorized code: …"), so never generate:
  `java.util.LinkedList` (any `AbstractSequentialList`; use `java.util.ArrayList`), `java.util.concurrent.*` such as
  `TimeUnit` (use millisecond arithmetic for date differences), `java.lang.Thread` (use `sleep(ms)`). `mapbuild.py`
  and `javacheck.py` fail on these, and on JDBC, file I/O, `System.out` and on-prem `cat.*` logging.
- Give every non-String parameter its type in the spec (`types`: `java.util.Iterator`, `int`, `boolean`, …).
  In the Mapper UI a new output parameter defaults to `String`, and a Boolean output can silently revert to `Void`:
  re-check both after editing a generated map there.
