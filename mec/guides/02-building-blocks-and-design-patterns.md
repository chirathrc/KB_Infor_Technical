# 02 — Building blocks and recurring design patterns

How the samples are *composed*: the semantics of each block, and the idioms the developers reuse. Counts are
from the 80 sample maps.

---

## 1. Execution model (what the generated class does)

- The sequence runs top to bottom once per message. Loops/ifs bracket parts of it (`LB`…`LE`).
- **Variables are class fields**: every function's Java can read/write any variable directly, linked or not.
  Many maps rely on unlinked globals (`g_ItemCounter++` inside a Boolean, list objects built in one function and
  iterated in another). `PV`/`VP` links move values between variables and parameters — and they are the
  **only** way to feed or read an M3 API / M3 Settings function, which have no Java body.
- **Parameters are per-call locals**: an input param gets the value of its linked source at the moment the
  function runs; an output param is pushed to its targets when the function returns.
- An output record is written when a param linked to it (`PM`) is produced. Repeating output nodes are
  created by the enclosing loop through an `LM` link (one node per iteration).
- M3 API functions: inputs not linked are sent blank (M3 defaults apply). Outputs map field → variable or
  next function. After the call, `isLastAPICallOK()` / `getLastAPIMessage()` / `getLastMIProgram()` /
  `getLastTransaction()` / `getCommandString()` describe the call; `hasNOKOccurred()` tells whether any call in
  the message failed.

## 2. Choosing the API error mode

| Situation in the FS | Use |
|---|---|
| Lookup that must exist; failure should fail the message | `AVM` (Exit map on NOK) — 503 uses |
| Lookup/update whose failure you want to report in an output/email, then continue | `AVI` (Ignore NOK) + a following `UV` that checks `isLastAPICallOK()` — 265 uses |
| Inside a line loop: skip the rest of this iteration on failure | `AVL` (Exit loop on NOK) — 4 uses |
| List API whose empty result is normal | `ARI` — 58 uses |
| List API that must return rows | `ARM` — 187 uses |
| List inside an outer loop where a failure should only end the inner loop | `ARL` — 33 uses |

`M3 Settings` (`AS`) is placed once near the top after CONO/DIVI are known (72 top-level, 9 inside loops when a
line changes company/division).

## 3. Control-flow idioms

### 3.1 Loop over repeating input — `ML`
```
LOOP[WT] LinesLoop  ctl = IN:/Root/Lines (ML)  [emits OUT:/Resp/Lines (LM)]
  [UV] ReadLine   in iX <- IN:/Root/Lines/X ...
```

### 3.2 Loop over an M3 list API — `FL` from `AR*`
```
LOOP[WT] L_Lines  ctl = FUNC LstLine (FL)  emits OUT:/Doc/Line (LM)
  [ARM] PPS200MI/LstLine   (first element)
  [UV ] SetLine  -> OUT:/Doc/Line/...
```
Nested list loops are common (header list → line list → text-block list `CRS980MI/SltTxtBlock`).

### 3.3 If-block — `IT` + Boolean
```
IF[IT] IfCN  ctl = FUNC IsCountryCN (FL)
  [UB] IsCountryCN  return iCSCD.equalsIgnoreCase("CN");
  ...
```
Pairs of complementary ifs (`IsX` / `IsNotX`) are used instead of else-branches (there is no else block).

### 3.4 Optional / single output block — `IT` + `return true` + `LM`
```
IF[IT] SetReceiveDelivery  ctl = FUNC ReturnTrue (FL)  emits OUT:/AcknowledgeReceiveDelivery/DataArea/ReceiveDelivery (LM)
```
Used to create a container element exactly once (standard Acknowledge maps: `ReturnTrue`, `SetTrue`).

### 3.5 Collect-then-emit (iterator loop) — the most important custom idiom
1. Gather data into Java collections while calling APIs (`java.util.List<String[]>`, `HashMap`).
2. `[UV] Init…Iterator` → `it = list.iterator();`
3. `LOOP[WT] ctl = [UB] Check…Iterator` (`return it.hasNext();` and/or `next()` into globals) `emits OUT:/…/Row (LM)`
4. `[UV] Set…Row` writes the fields of the current row.

Variants: index counters (`if (gIndex < list.size()) return true; else return false;`), `WF` loops that return
`true` to stop. Used for: sorted/grouped outputs, error tables, de-duplicated lines, two-pass validation.

### 3.6 Two-pass validate-then-post (uploads)
`GLDiscountUpload`: read every input line into a list → validate all lines (collect errors) → abort/notify if
any error → only then `AddBatchHead` → loop `AddBatchLine` → `CtrlBatch` → `sleep(20000)` → list errors via a
custom list API → `UpdBatch` → notify. Pattern for any "all-or-nothing" FS.

### 3.7 Error collection for the response/notification
`AVI` call → `[UV] Validate…` → `if(!isLastAPICallOK()) errors.add(new String[]{lineInfo, getLastMIProgram()+"."+getLastTransaction()+" => "+getLastAPIMessage()});`
then emit errors via 3.5 into `ErrorDetails` elements (StockCountUpload) or an HTML email body (bank ack,
GL upload).

### 3.8 Stop the mapping
- `abort()` / `abort("reason")` — stop **without** producing output (13 maps, e.g. "nothing to notify",
  "no record to clean up").
- `throw new MeCError("…")` — fail the message (shows as failed in EC Administration) (16 maps): missing
  LogicalID, invalid CONO/DIVI, unparsable date.
- `AVM`/`ARM` NOK also fails the message.

### 3.9 Flat-file inputs (FLAT→XML)
The agreement converts the file with a flat file definition (FFD) before the mapping runs. Two shapes work:
- **Whole line**: one record type, one field = the complete line (`<Root><Row><Line>…</Line></Row>…`). The map
  cuts positions in Java. This is robust when header and lines differ, or when the layout is still moving.
- **Field split**: one record type per line kind (identified by a fixed value at a position, e.g. a record ID),
  with one element per field. Simpler links, but the FFD must match the real file exactly.

Either way:
- Derive positions from a **real sample file**, not from the FS text. Check every field byte by byte against
  both the file layout and the target API layout; specs and real files often disagree.
- The FFD must keep leading blanks in positional fields. Let the last field be variable-length, because
  generators often right-trim lines.
- Read every row into a list, validate all of them, then post (§3.6).
- The inbound file name is `getManifestInfo(ManifestConstants.COM_FILENAME)` (strip any path). File-name
  conventions can only be checked here, because only MEC knows the name.

### 3.10 One mapping produces one output
A map has a single output document. When an FS needs more than one result (e.g. a notification **and** a
reply file to the partner):
- produce one status document that carries everything (outcome, e-mail fields, failed records); then
- derive the second output from it, either with a further XML Transform → XML to FLAT → Send in the same agreement
  (verify that your MEC version continues after a Send step), or with a second agreement that receives the
  status document back from ION.

The second map aborts when there is nothing to send.

### 3.11 Notification through an ION data flow (script → IDM / workflow)
When ION sends the e-mail (an ION workflow/alert, or a data-flow script that calls an IDM template), the map's
output is a status BOD that ION can branch on without parsing logic:
- an overall result (`FinalStatus` Success/Failed) and a stage;
- recipients from control properties (success group / error group, optionally per division);
- the file name and a file-name validity flag;
- one result row per input record (status + message) and an error list (code, message, timestamp).

An e-mail attachment can be built in Java: CSV, with values quoted when they contain `,` or `"`, then encoded with
`java.util.Base64` (UTF-8 bytes). Note that no sample map uses `java.util.Base64` yet, so confirm that Generate
accepts it.

### 3.12 Validate everything, then update, and never leave a half result
- Stop with a clear status before the first M3 update if any validation fails; validate all records first.
- If an update step fails part-way (e.g. one line of a batch), do not continue to the next update step
  (control/post). Report the exact state that M3 is left in and the manual action needed.
- Write output elements only after all checks are done (collect-then-emit, §3.5), so a failure never leaves
  partial output.

### 3.13 IEC runtime facts that change a design
- **Event chain**: M3 database change → Event Hub → Event Analytics (Drools rules filter and enrich) → IEC builds the
  BOD → ION. Event Analytics correlation rules (TimeCorrelation, EventCorrelation) remove duplicate events; they are
  not a delay mechanism.
- **ION does not guarantee message order.** When order matters, make the IEC **Reorder** process the first process of
  the agreement (minimum hold time 120 s).
- **Translation tables**: IEC loads at most **20,000** CRS882 entries into memory. Do not use CRS881/CRS882 as a data
  store (use extension tables instead).
- `CRS881MI/GetTranslData` can be called several times in one map for unrelated lookups (a code translation, a
  notification recipient, …). Give each lookup its own variable. When its keys do not depend on line data, call it
  once outside the line loop.

## 4. Data-shaping idioms seen in Java

- Null-safe trim on every input: `iX = (iX == null) ? "" : iX.trim();` (or `IONToolbox.rightTrim`).
  **Exception: fixed-width records** (a whole line, or a PARM-style positional string). Never trim them; only
  remove CR/LF (and a BOM on the first line) and pad short lines to the full length before cutting positions.
  Trimming shifts every position. One upload sample trims its line and is only safe because it is CSV.
  Key values such as item numbers: right-trim only (`IONToolbox.rightTrim`), because leading characters are significant.
- Leading-zero strip: `s.replaceAll("^0+(?!$)", "")`.
- M3 date `yyyyMMdd` → ISO `yyyy-MM-dd` with `SimpleDateFormat`; timezone-explicit timestamps with
  `java.util.TimeZone.getTimeZone(java.time.ZoneId.of("Asia/Singapore"))`.
- Decimal formatting with `DecimalFormat("0.00", symbols)` (decimal separator forced to `.`), `BigDecimal`
  for amounts, `String.format("%.02f", …)` for per-facility decimals.
- ID templates: `"XMLV3PPP-[DIVI]-[BKID]-[CUCD]-[PRPN] [PYON]".replace("[DIVI]", …)`.
- Bank-safe text: `replaceAll("[^a-zA-Z0-9]", " ")`.
- Splitting compound keys: `"MILL:KEY".split(":")`.
- HTML e-mail bodies built in Java (`<table border="1">…`) and put into the output BOD for an ION workflow /
  alert to send.

## 5. Mapping-level conventions

- **First function = documentation**: `VersionLog` / `Version_Log` / `ReadMe` / `Modification_log` / `Note` —
  a `UV` with only a comment (purpose, developer, date, version history, FS reference).
- **Second block = initialisation**: `Init` / `InitEventData` creates the collections.
- **Last functions = manifest/output naming**: `OutputFileNameSetter`, `F_Set_Manifest_Info`,
  `SetOutboxHeaderData`.
- Variable prefixes: `g_`/`g` globals, `Line_` per-line values, M3 field names (`CONO`, `DIVI`, `PUNO`) for
  values passed to APIs. Function names: `F_Set_<Section>`, `Get…`, `Set…`, `Check…`, `Is…`, `Lst…`.
- Loop names: `L_<what>`, `<API>_loop`, `If_<cond>`, `Loop_<what>`.
- Functions, parameters, variables and loops mostly keep the Mapper default description "Please describe me"
  (15,290 occurrences) — give real descriptions in generated maps.

## 6. Triggers and their input documents

| Trigger | Input root | How keys arrive | Families |
|---|---|---|---|
| **Event Hub / EAR table event** (M3 table insert/update, incl. custom fields CUGEX1/3, e.g. button click writing CUGEX3) | `EventData` (`EventData.xsd` / `EventData_MT.xsd`, identical) | `ElementData` Name/Value pairs = **M3 field names** (`CONO`, `DIVI`, `PUNO`, `PK01`, `A030`, …) + optional `ToLogicalId`, `MAE_*` flags | F4, F5 outbound |
| **MBM** (M3 Business Message — e.g. an output/print job routed to MEC, or one raised with `MNS260MI/AddMBMInit`+`PrcMBMInit`) | `EventData` | `MessageCopy`, `Date`, `Time`, `MessageKey1_Value`…`MessageKey7_Value` (e.g. CONO, DIVI, PRPN, PYON), `Company`, `Division`, `JobName`, `Program`, `RecipientReference1_Data`… | F1, F2, e-invoice F4 |
| **ION inbound BOD** (Process/Sync) | `Process<Noun>` / `Sync<Noun>` (OAGIS namespace) | `ApplicationArea`, `DataArea/Process|Sync/AccountingEntityID` (`CCC_DDD`), `LocationID`, `ActionExpression/@actionCode` | F5, F6 |
| **File / custom XML via ION or file channel** | custom root (`WeibridgeInboundInput`, `FormulationML`, `GLDiscount`, `Document` pain.002, `Envelope`) | business fields; file name via `getManifestInfo(ManifestConstants.COM_FILENAME)` | F3, F7, F8, F9, F10 |
| **Flat file** (CSV/fixed) | XML produced by a **FLAT→XML** step from a Flat File Definition (inferred from the schema name `CreditNoteDiscountUploadFFDSchema`) | — | F10 (`CreditNoteDiscountUploadME`) |

The EAR / Event Hub subscription, MBM configuration, ION connection points and the partner agreement
(detection + process steps) are **outside** the `.map`; a complete FS-to-delivery package must also specify them.
