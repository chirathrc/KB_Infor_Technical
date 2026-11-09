# Infor M3 Cloud Migration — Master Reference
> Abhishek Agrawal | Fortude
> Single authoritative reference for MEC map migration, XtendM3 feasibility work, ION Data Catalog,
> Cloud Smart Rules, and adjacent Infor M3 Cloud migration technical work.
> DRAFT — being built incrementally. Once complete, this replaces the standalone skill/reference
> files currently in project knowledge (mec-map-processor SKILL.md, XTENDM3_MASTER_REFERENCE, etc.)
> Project-specific per-map context stays out of this file — this is patterns/rules only.

---

## 0. Source Provenance
Content in this file is pulled from, in order received:
- (a) `mec-map-processor` skill, v2.0.13 (20260831) — MEC .zap migration rules — **[DONE]**
- (b) Sample Cloud maps (EXPORTMI, ArrayList/HashMap Java patterns) — **[IN PROGRESS — 7 maps
  analyzed (Sync-Out x1, Load-In x2, Process/Acknowledge pairs x2); 66 confirmed APIs in the
  companion library; ArrayList/HashMap Java pattern examples still to come]**
- (c) MEC map type reference: Sync / Load / Process — **[IN PROGRESS — Sync (§3.1), Load (§3.2),
  and Process/Acknowledge (§8, "Pattern F" architecture incl. Data Flow shape, CBR_FILTER gating,
  Load-verb variant) all confirmed from real maps + past session history]**
- (d) MRS001-style API repository export — **[DONE for 7 programs — MMS025MI, MMS200MI, CRS610MI,
  PPS001MI, PPS200MI, OIS100MI, MMS100MI (376 transactions total). The 14 already-confirmed-used
  transactions were upgraded from map-derived to official Swagger data; the rest indexed by name
  only, expand on demand. More API exports welcome any time.]**
- (e) Infor OS / ION architecture (Abhishek's cross-project skill file) — **[DONE, merged into §14]**

**Companion file:** `Infor_M3_API_Reference_Library.md` — full input/output field definitions for
every confirmed API. §13 here is just an index; keep both in sync. (Everything else — MEC patterns
and ION/Infor OS architecture — lives in this one file, §1–§14.)

---

## 1. Project Defaults

| Parameter | Value |
|---|---|
| Developer | Chirath Rothila |
| Engagement type | Infor M3 Cloud migration engagement |
| Migration direction | Infor M3/MEC on-prem → Cloud (MEC Mapper / XtendM3 / ION) |
| Rename convention | `KL_<BODNoun>_<BODVerb>_<Direction>_1_0_0` |
| Map file encoding | UTF-16BE, single `FE FF` BOM (never UTF-16LE, never double-BOM) |

---

## 2. Interaction Rules (Non-Negotiable)

- **Step by step with confirmation** — share one step at a time, wait for go-ahead before the next.
- **Surgical edits only** — change only what's asked; leave everything else untouched.
- **Respond in plain English** even when the question is in Hindi or Hindi-English mix.
- **Effective 1 July 2026: all XtendM3 review requests go through ServiceNow** ("XtendM3 Review
  ONLY") — plain email submission is no longer valid.
- For `.zap`/`.map` transformation tasks: write and run a script implementing the documented rules
  against the actual file — never hand-edit the XML directly, except where a rule below explicitly
  says hand-edit is safe (schema pointer swaps with no target namespace).
- Confirm before executing multi-step changes; show the plan first.
- Deliver complete, copy-paste-ready artifacts when code/documents are requested.

---

## 3. MEC Map Type Overview

**BOD verb decision table** (full ION/OS architecture context in the companion
`Infor_OS_ION_Architecture_Reference.md`):

| Verb | Use When | Acknowledge? |
|---|---|---|
| **Sync** | Owner (M3) publishes a change; no response expected | No |
| **Process** | Requesting the owner to create/update; needs status writeback | Yes — always |
| **Load** | Creating an object, ownership handed to receiver; high-volume fire-and-forget | No |
| **Acknowledge** | Response to Process — success/failure | — (is the response) |
| **Get / Show** | Request + response for reading data | — |
| **Confirm** | ION-internal failure notification, never routed externally — a companion map translates it into a normal Acknowledge (§8) | — |

### 3.1 Sync (outbound, M3 → ION → external)
**Decision rule, confirmed 20260905:** Sync's input is *always* Event Analytics-generated
`EventData` (the fixed generic shape below) — not any file- or request-shaped custom schema. If
`SchemaIn` is a custom trigger/request XSD (even a simple one carrying just filter criteria), the
map is **not** Sync regardless of how request/reply-like its behavior looks. Confirmed by
correcting an initial Sync assessment on `InhouseInventoryDataExport4` (on-prem trigger is a
`DiskIn` file drop carrying calculation-method/filter criteria, not `EventData`) — reclassified to
Process/Acknowledge; see the file-triggered-outbound-extract variant at the end of §8.

Input is always **Event Analytics-generated `EventData`** (same shape as §5 item 9's EventData
schema); output is a **Sync BOD**. Confirmed structure from a real published map
(`KL_AllocationStatusShopify_Sync_Out_1_0_0`):

**Input (`EventData`, generic across every Sync map):**
```
/EventData
/EventData/Operation
/EventData/Document/ElementData
/EventData/Document/ElementData/Name
/EventData/Document/ElementData/Value
```

**Output (`Sync<Noun>`) envelope:**
```
Sync<Noun>
  [@releaseID] [@versionID] [@systemEnvironmentCode] [@languageCode]   <- element attributes on root
  ApplicationArea
    Sender
      LogicalID [@schemeVersionID]
      ComponentID [@schemeVersionID]
      ConfirmationCode
    CreationDateTime
    BODID
  DataArea
    Sync
      AccountingEntityID
      LocationID
      ActionCriteria
        ActionExpression [@actionCode]
    <Noun>
      <business fields...>
      Lines
        Line (repeating)
          <line-level business fields...>
```
Note the root-level `@releaseID`/`@versionID`/`@systemEnvironmentCode`/`@languageCode` attributes
and the `DataArea/Sync/ActionCriteria/ActionExpression[@actionCode]` wrapper — this is a different
envelope shape from both the Load BOD pattern (§9) and the Process/Acknowledge BOD pattern (§8);
don't assume the same wrapper structure carries across verb types.

**Typical function chain observed** (outbound, event-triggered): `VersionLog` → `GetUserInfo`
(`MMS200MI/GetUserInfo`) → `Get_FACI` → `GetCONO_DIVI_AE` → `SetOutboxHeaderData` → `Set_Timestamp`
→ `SetHeader` → `SetSync` → `Set_Delay` → `GetEventData` → `GetOrderHead` (`OIS100MI/GetOrderHead`)
→ `GetAddress` (`CRS610MI/GetAddress`) → translation/field lookups (`CRS881MI/GetTranslData`,
`CUSEXTMI/GetFieldValue`) → EXPORTMI query (see §6) → header population → line-loop with per-line
standard MI calls (`OIS100MI/LstLine`, `EXT101MI/UpdCODetails`, `CMS100MI/LstOOLINEWhoSel`,
`MMS025MI/GetAlias`) → line population. This is one confirmed real shape, not a rigid template —
individual function names/count will vary by integration, but the overall spine (header setup →
EventData read → header enrichment via standard MI lookups → EXPORTMI where needed → line loop with
per-line MI calls) is representative of a typical Sync-Out map.

### 3.2 Load (inbound, external → M3 via Load BOD)
Always inbound — ION Data Flow delivers the BOD into the map. **Load never sends an
Acknowledge/companion map back** — it just calls standard/custom M3 APIs directly to write the
data, unlike Process (§3.3), which always pairs with an Acknowledge_Error_Out companion. See §9
for the confirmed envelope shape.

### 3.3 Process / Acknowledge (inbound, external → M3 via file-driven integration)
See §8 (Inbound Integration Pattern) for the confirmed envelope shapes and companion-map
requirement.

---

## 4. Tier 1 Fixes — Automated, Applied to Every Map

These are safe to apply map-wide without per-map judgment; the `mec-map-processor` script applies
them automatically.

1. **`cat.*` → `logWarn` regex fix.** Replace only the `cat.X(strUUID + ` prefix with `logWarn(`;
   leave the rest of the original expression — including its own trailing `);` — untouched. Do
   **not** re-close on just the first string literal (produces invalid Java /
   `com.github.javaparser.ParseProblemException`). Confirmed general on-prem pattern, not confined
   to `SetHeader` (also seen in e.g. `Get_First_ITNO`).
2. **All `cat.*` levels normalize to `logWarn`** (house style) — `logDebug`/`logError` distinctions
   are not preserved.
3. **Log message style simplified.** On-prem `"[:] Label=|" + value + "|"` → `"Label=" + value`,
   stripping the `[:]` prefix and `|` delimiters map-wide. Minor known artifact: a harmless
   `+ ""` can be left when the `|` fell mid-concatenation — valid Java, zero functional effect.
4. **`SetHeader`/`IONToolbox` boilerplate**, applied everywhere in the map (not just `SetHeader`):

   | On-prem (broken in Cloud) | Cloud (correct) |
   |---|---|
   | `IONToolbox.getSystemEnvironmentCode(myMap)` | `getSystemEnvironmentCode()` |
   | `IONToolbox.getSenderLogicalID(myMap)` | `getFromLogicalID()` — **name changes**, not just prefix |
   | `IONToolbox.getMappingVersion(myMap)` | `getMappingVersion()` |
   | `IONToolbox.getBEVersion(myMap)` | `getBEVersion()` |
   | `strUUID` (field, doesn't exist in Cloud) | `getMapUUID()` (method) |

   `IONToolbox.normalizeXMLDateTime(...)` and `IONToolbox.isEmpty(...)` remain correctly prefixed —
   don't touch these. Inbound (`_Load_In`) maps often legitimately show 0 hits here — this is an
   outbound-map pattern.
5. **`GetHead` → `GetOrderHead`** — only renames `/OIS100MI/GetHead` (updates both `<PATH>` and
   `<Name>`). Other APIs' `GetHead` calls (e.g. `/MWS410MI/GetHead`) are correctly left alone.
6. **`Thread.sleep(n)` → `sleep(n)`, map-wide.** Cloud's publish-time security scanner rejects
   `java.lang.Thread` outright. Cloud provides a bare inherited `sleep(n)` method, argument
   unchanged. Confirmed on `KL_AllocationStatusWholesale_Sync_Out_1_0_0`.
7. **Bare `myMap` passed as a constructor argument.** Distinct from item 4's static-call
   boilerplate — this is the `myMap` Constant (`Type Object`, `Value this`) passed directly into
   another on-prem class's constructor:

   | On-prem | Cloud |
   |---|---|
   | `new DataTranslator(myMap, ...)` | `new DataTranslator(getManifestMap(), ...)` |
   | `new IONApplicationArea(myMap, iCorrelationID)` | `new IONApplicationArea(getIONAppAreaManifestMap(), iCorrelationID)` |

   Each constructor takes its **own** dedicated replacement method — not a uniform find/replace.
   The `myMap` Constant declaration itself is left in place (unused but harmless). If `myMap`
   surfaces as an argument to some other, undocumented class, treat as flag-only until a confirmed
   replacement method is found — don't guess a method name.
8. **Map version and boilerplate:** set `<Version>` to `1.0.0`; append migration log lines to the
   `VersionLog` Function's `Implementation` block (match by FID via `<Name>`, not by comment text
   guessing) — create the Function if it doesn't exist.
9. **Rename** `<File>` and `<Name>` tags under `MappingMeta` to `KL_<BODNoun>_<BODVerb>_<Direction>_1_0_0`
   — performed automatically, no per-map confirmation needed. Grep the fully decoded map afterward
   to confirm **zero** remaining references to the old name before repackaging. **Watch for the
   duplicate-`<Name>` gotcha** (§5, item 13) before doing a blind global replace. Re-encode as
   UTF-16BE with `FE FF` BOM when writing back out.

---

## 5. Detected & Flagged — Not Auto-Fixed (Manual Review Required)

Reported in the processing summary's Warnings column. Each needs the fix pattern below applied by
hand before publish.

**6. `CONO` wired into `GetOrderHead`.** Cloud's `OIS100MI/GetOrderHead` only accepts `ORNO`. If
`CONO` is still a declared Parameter, publish fails: `"Input field:CONO doesn't exist. Generation
aborted"`.
- Deleting the `CONO` **Link** alone is **not enough** — `CONO` stays a declared Parameter and
  still gets sent, reproducing the identical error even with zero Links into it.
- **Full fix:** delete the `CONO` Link → **re-fetch `OIS100MI/GetOrderHead` from the M3 API
  Repository** (this regenerates the Parameters list against the current Cloud signature, which
  is the step that actually removes stale `CONO`) → re-wire `ORNO` (re-fetch resets wiring) →
  re-validate/publish.
- Detection is based on `CONO` existing as a declared Parameter tied to the function's FID — not
  on whether it's wired. "No Link found" is not evidence the warning is a false positive.

**7. Old-style `EventData` input schema (semi-auto: pointer swap only).** Cause of `"Server
responds: An error occurred while generating an agreement: Inbound Schema is not valid"` —
appears **after** a successful publish, at agreement generation. On-prem `Input_Event*.xsd` is
missing `TenantId`, `EventId`, `Document/ElementData/OldValue`.
- Safe to auto-swap: `MappingMeta/SchemaIn` pointer (`File`/`Name`) → canonical
  `EventData_46e58dff.xsd`. Plain metadata edit.
- **Never auto-fixed:** field-level `Record`/`Links` for the new fields — Mapper assigns internal
  namespace prefixes at XSD import time that can't be reproduced outside the tool. Manual steps:
  1. Open the map — `SchemaIn` shows the new tree (`TenantId`, `Publisher`, `DocumentName`,
     `Operation`, `TrackingId`, `EventId`, `SentTimestamp`, `Document/ElementData/Name`, `Value`,
     `OldValue`).
  2. Old input-side `Record`/`Links` reference old flat paths and appear broken — delete stale links.
  3. Redraw `TenantId`/`EventId` to `SetHeader` or wherever `CorrelationID`/tracking logic
     consumes them (check a working reference, e.g. `KL_BatchInventory_Sync_Out_1_0_0`).
  4. Redraw `OldValue` on the `ElementData` loop alongside existing `Name`/`Value`.
  5. Re-validate/publish.
- Detection only fires when `SchemaIn` is confirmed EventData-shaped AND missing ≥1 of
  `TenantId`/`EventId`/`OldValue` — a genuinely unrelated schema is left untouched.

**8. `GetCONO_DIVI_AE`/`dtAE`/`MECDataTranslator` pattern (conditional auto-fix).** On-prem
`AccountingEntityID` computation is usually not needed in Cloud — `oAccountingEntityID` resolves
fine via the existing `(!IONToolbox.isEmpty(bodAE)) ? bodAE : ""` ternary once `bodAE` stays `""`.
- Safe to remove **only if** the `oAE`-equivalent output isn't consumed downstream. `oCONO`/`oDIVI`
  from the same function are frequently used elsewhere and must never be touched.
- Auto-fix logic: trace the `dtVar.translate()` output's Link. If nothing reads it downstream and
  it doesn't feed a `SchemaOut` field directly → safe → comment out just the two AE-specific
  statements (CONO/DIVI computation untouched). If anything reads it → not safe → flag only.
  The `dtVar` Variable declaration is left in place (delete manually via Variables and Constants
  panel if desired).
- Confirmed on `KL_StockOnHand_Sync_Out_1_0_0`: `oAE`→`VID20` (unread elsewhere, safely commented);
  `oCONO`→`VID17`, `oDIVI`→`VID18` (read elsewhere, correctly left untouched).

**9. `MvxEnvelope` input schema — full structural conversion, not a simple swap.** Different,
older starting shape than item 7 (which is a version-bump between two already-EventData-shaped
schemas).
- **Recognize it:** `SchemaIn` points at an old broadcast-message envelope (`XSD_MBM_*.xsd`),
  shape `MBMIdentifier → SubmitterID → Target → MvxBody/MovexBusinessMessageInitiator`, with a
  generic `MessageKeys/MessageKey1...7` (`Field`+`Value`) structure instead of a real business shape.
- Signal strings: `MBMIdentifier`, `MvxBody`, `MovexBusinessMessageInitiator`, `MessageKeys`,
  `GetMBMData`. If `SchemaIn` already points at `EventData*.xsd`, the map is likely already
  converted (function/record names like `GetMBMData` are commonly kept as-is through conversion).
- **Manual conversion steps:**
  1. Swap `SchemaIn` to the current Cloud `EventData_*.xsd`.
  2. Rebuild input `Record`s: `MessageKeys/MessageKeyN/Field`+`Value` →
     `Document/ElementData/Name`+`Value`.
  3. Rewire existing loop/function Links (e.g. `GetMBMDataLoop`/`GetMBMData` — names don't need to
     change, just what feeds them) to the new element IDs.
  4. **Check for stale `brokenlink` stubs** (item 10) — this is the step most likely to actually
     block publish.

**10. Stale `brokenlink` Link stubs after ANY `SchemaIn` swap** (not specific to item 9). Rather
than cleanly removing old Links that no longer resolve, Mapper can leave orphaned stubs:
```
<InFrom IDREF="brokenlink;? --> LID1;Input Document Element --ML--> Loop;
  Source element id was = MID2. Target element id was = LID1.
  Source element is missing in mapping. "/>
```
These are typically **exact duplicates** (same `OutTo` target) of a working Link elsewhere.
Confirmed on `KL_StockOnHand_Sync_Out_1_0_0` — 3 such stubs were the actual publish blocker.
**Detection:** scan for `<InFrom IDREF="brokenlink;...">`. **Fix:** delete the stale stub Link(s)
at the reported `OutTo` targets — nothing needs to be redrawn.

**11. "Crossing output link" validation errors.** Cosmetic/pre-existing link-ordering artifacts
inherited from on-prem maps, not functional defects. Too map-specific to detect generically —
likely safe to publish through, but test a real transaction for certainty.

**12. `java.util.LinkedList` rejected by Cloud's publish-time security scanner.** Cloud blocks
`java.util.AbstractSequentialList` and implementers. Publish fails: `"Mapping contains
unauthorized code: - java.util.AbstractSequentialList - iter = <VariableName>.iterator()"`.
- **Detection:** scan Variable declarations for `<Type>java.util.LinkedList</Type>`.
- **Fix:** change Type + initializer to `java.util.ArrayList` / `new java.util.ArrayList()` in the
  Mapper's Variables and Constants panel (UI field edit, not XML hand-edit).
- **Only safe if** every usage across the *entire* map uses generic `List`/`Collection` methods
  (`.add()`, `.size()`, `.iterator()`, `.get()`) rather than `LinkedList`-specific methods
  (`addFirst`, `addLast`, `peekFirst`, `removeLast`). The variable may be populated in one function
  and drained in another — check every function touching it before applying.

**13. `<Name>` can appear twice in `MappingMeta` — a blind rename can hit the wrong one.**
`MappingMeta` has its own `<Name>` and `MappingMeta/SchemaIn` has its own `<Name>`. If the on-prem
`SchemaIn/Name` is **not** hash-suffixed, both tags can be byte-identical strings, and a global
replace during rename incorrectly renames `SchemaIn/Name` too. **Fix:** count occurrences of the
old `<Name>X</Name>` string before renaming; if >1, scope to the first occurrence only
(`MappingMeta`'s own `Name` appears first in file order), or match with surrounding context (the
preceding `<File>` tag) to disambiguate.

**14. Load BOD Noun should follow the map's filename convention, not the on-prem root tag, when
they diverge.** Normally these coincide. Confirmed divergent case: `StockAdjustmentImport.map`'s
on-prem root element is `StockAdjustments` (plural), but the Load envelope's inner Noun was set to
`StockAdjustmentImport` (matching the eventual `BODNoun`) — not the literal on-prem tag. Confirm
with the user when the two names diverge; don't assume silently.

**15.** *(superseded by §4 item 7 — the `myMap` constructor-argument fix is now Tier 1 automated.)*

**16.** *(superseded by §4 item 6 — `Thread.sleep(n)` → `sleep(n)` is now Tier 1 automated.)*

**17. Double-BOM corruption when hand-editing a decoded `.map`/`.xsd`.** `iconv -f UTF-16BE -t
UTF-8` preserves the original BOM as a literal `U+FEFF` character. Reading it back with plain
`encoding='utf-8'` (not `'utf-8-sig'`) leaves that character in the string; re-encoding with a
manually prepended `b'\xfe\xff'` then produces **two** BOMs (`FE FF FE FF`) — invalid. Business
Document Mapper fails with "Failed to load mapping model" / `mecModel is null` NullPointerException
— doesn't obviously point back to encoding.
- **Detection:** `od -An -tx1 -N4 file` — correct file reads `fe ff 00 3c` (BOM + null + `<`). Two
  BOM pairs (`fe ff fe ff`) confirms the bug.
- **Fix:** always read the iconv-decoded intermediate file with `encoding='utf-8-sig'`, not
  `'utf-8'`, before any edit/re-encode.
- **Always validate the final packaged file with a real XML parser** (e.g. `lxml.etree.parse`)
  before delivering — checking only the first 2 bytes is insufficient (corruption sits at bytes
  3–4). Treat full-file XML validation as mandatory on every package, not optional.

**18. Business Document Mapper re-hashes schema filenames on its own import/save.** Any 8-char
hash suffix you invent for a new `BODs-*_hash.xsd`/`Nouns-*_hash.xsd` pair is almost certainly
**not** what Mapper assigns once the user actually imports/saves it. Confirmed: three fabricated
hashes were silently re-hashed to different values after import. **Consequence:** any later
hand-edit referencing your originally-fabricated hash will point at a filename that no longer
exists. **Fix:** after the user confirms a schema package is imported, get the current `.zap` (or
just current filenames) before doing further schema-referencing work — never assume your own hash
is still current. When updating a schema file in place, keep the user's *current* filename exactly.

**19. Numeric types in custom Noun XSDs are NOT inherently a "too many passes" risk.** A flat,
non-repeating schema with a genuine mix of `xs:string`/numeric types publishes and works cleanly.
The actual trigger for "too many passes (>100) cyclic dependencies" correlates with
**repeating-group structures (`maxOccurs="unbounded"`) combined with numeric types**, not numeric
types alone. On a schema with repeating groups, keep numeric-*looking* identifier fields (barcodes,
warehouse/location codes) as `xs:string`, but don't force true quantity/count fields to string on
a flat, non-repeating schema without a specific reason.

**20. File Template/Data Catalog "Generate Metadata" auto-inference can be wrong either direction
— confirm with the user, don't silently force a type.** Confirmed: `Barcode`→auto-inferred
`xs:long` (should be `xs:string`, identifier not a number); `Warehouse`→auto-inferred `xs:short`
(should be `xs:string`); `Quantity`→auto-inferred `xs:byte` (caps at 127 — too small for real
stock; should be `xs:int`). Each needed a different fix for a different reason — review every
auto-inferred numeric type against what the field actually represents.

**21. `Verb.Noun` (dotted) vs `VerbNoun` (concatenated) — both forms are used, in different
places; don't conflate.** BOD root **element name** always concatenates with no separator
(`ProcessBleckmannInventoryAdjustment`). Manifest string values (e.g. `ionBODType` =
`"Acknowledge.BleckmannInventoryAdjustment"`, or a Data Flow `ActivityDocument`'s `Noun`/`Verb`)
use the dotted form. When renaming a reference map for a new Noun, these need **two separate,
non-overlapping string replacements** — the concatenated form is not a substring of the dotted
form (the literal `.` breaks substring matching).

**22. `EXPORTMI.SelectPad`'s `REPL` output needs an explicit `.trim()` per parsed field.** `REPL`
is a comma-separated string of space-padded M3 alpha-field values. Dropping `.trim()` risks a
downstream match failure (e.g. `MMS175MI.Update` failing on an item number with trailing spaces)
that surfaces as a confusing runtime error far from the actual cause. **Fix:** `.trim()` every
parsed string field — `String itemNumber = iREPL.split(",")[0].trim();`. Numeric fields parsed via
`Double.parseDouble(...)` don't need this (parsing tolerates whitespace).

**23. Business Document Mapper checksum caching on re-import.** Re-importing a `.zap` over an
already-existing map of the same name can leave a stale checksum, producing "Input Document
Missing Root Element Error" and unresolved Broken Links even when `SchemaIn`/`Record` are
genuinely correct. **Fix:** delete the checksum for the map's folder in the workspace → re-import
the `.zap` fresh → **Documents → Update Checksums** in the Mapper → re-check Broken Links. If
"Missing Root Element" persists after this, it's a genuine schema/Record mismatch, not caching.

**24. New Function output Parameters default to Data Type `String` in the Mapper UI.** An output
Parameter meant to hold e.g. `java.util.Iterator` left at the default produces a Java compile
error ("Type mismatch: cannot convert from Iterator to String") — the generated code is correct
given the (wrong) configured type; this is a Parameter configuration issue, not a codegen bug.
**Fix:** explicitly set the Data Type on the Function's Parameters panel / output socket
Properties for any non-`String` output, especially `Iterator` or other object types.

**25. `java.util.concurrent.TimeUnit` is unauthorized code, rejected at publish time.** Publish
fails: `"Mapping contains unauthorized code: java.util.concurrent.TimeUnit -
java.util.concurrent.TimeUnit.DAYS.convert(...)"`. Confirmed on KL DOImport. Treat as flag-only —
rework any date-diff logic using `TimeUnit` into plain millisecond arithmetic instead.

**26. Boolean-typed Function output silently reverts to Void in the Mapper UI (gotcha, not a code
bug).** Watch for this when building a new combined-guard boolean Function (see §7 "Combined guard
conditions") — confirm the output Parameter's Data Type is still `Boolean` after any UI edit
session; if it silently reverted to `Void`, the `If` condition consuming it will fail to compile
or bind correctly.

---

## 6. Direct-SQL Replacement Patterns
**Cloud MEC mapping does not allow SQL statements at all** — this is the governing constraint
behind everything in this section. Any on-prem JDBC/direct-SQL call must be replaced with a
standard MI transaction of one of two shapes:

### 6.1 EXPORTMI SQL-Replacement Pattern
*(for genuine ad-hoc queries — arbitrary WHERE clause, multiple columns, needs the flexibility of
a real query string — confirmed via `EXPORTMI.SelectPad`)*

### Inputs/Outputs
| Field | Direction | Notes |
|---|---|---|
| `SEPC` | In | typically blank |
| `HDRS` | In | typically blank/"0" |
| `QERY` | In | Query statement, **mandatory**, max 982 chars (Alpha) |
| `REPL` | Out | Reply field, max 3985 chars (Alpha) |

`QERY` is a plain string, built like on-prem SQL minus the `SELECT` keyword:
`"<col1>,<col2>,... from <TABLE> where <cond1> and <cond2>..."`.
- Only **column-vs-literal** conditions confirmed working (`=`, `>`) — `VMSPMT = 9`, `PMWAPC > 0`.
- **Numeric columns are quoted as string literals too** — confirmed via `OBPONR = '"+PONR+"'` in a
  live published map, where `PONR` is numeric. Don't assume numeric columns stay unquoted.
- No confirmed example uses a computed expression or column-vs-column comparison inside `QERY` —
  assume unsupported; move these to the Retrieve function's Java (see Deferred Calculation below).

### Two call shapes — always inside a loop
`EXPORTMI.SelectPad` must **always** sit inside a `Loop_<TABLE>` (Condition = `WT`) — it cannot be
called flat/standalone, regardless of `ARM` vs `ARI`. The Function Type governs whether Mapper
re-invokes the call across loop passes and auto-paginates (`ARI`) vs. the loop running once and
exiting (`ARM`) — it is not a single-row-vs-loop distinction.
1. **Single-row lookup** — `Query_<TABLE>` → `Loop_<TABLE>` (`WT`) { `SelectPad` (type `ARM`) →
   `Retrieve_<TABLE>` }. `QERY`'s WHERE clause matches exactly one row; `Retrieve_*` splits `REPL`
   into a fixed set of positional fields.
2. **Multi-row lookup** — same shape but `SelectPad` type `ARI`. `ARI` makes Mapper re-invoke each
   loop pass and **exit the `WT` loop automatically once `REPL` comes back empty** (Mapper-native
   pagination, not scripted). Use whenever the on-prem SQL could return more than one row.

### Full confirmed structure (multi-row)
```
Function "Query_<TABLE>" (Type UV, runs once before the loop):
    <collection>.clear();
    String query = "<col1>,<col2>,... from <TABLE> where <cond>=... and <cond>=...";
    oQERY_<TABLE> = query;

Loop "Loop_<TABLE>" (Condition = WT), containing:
    Function "EXPORTMI.SelectPad" (Type ARI, PATH=/EXPORTMI/SelectPad)
        Inputs:  SEPC (blank), HDRS (blank/"0"), QERY = QERY_<TABLE>
        Output:  REPL_<TABLE>
    Function "Retrieve_<TABLE>" (Type UV):
        if (iREPL != null && !iREPL.isEmpty()) {
            <split iREPL on ",", .trim() every string field, parse numerics>
            <do here whatever the on-prem SQL's WHERE/computed-column logic needed>
            <populate the same collection shape the old JDBC loop used to build>
        }

Function "Set<Iterator/Result>" (Type UV), placed AFTER Loop_<TABLE>'s close (outside the loop):
    o<Output> = <collection>.iterator();
```
The function *consuming* the final output needs no changes — same collection shape in/out, only
how the collection gets populated changed.

### Deferred calculation
Anything the on-prem SQL did that `QERY` can't express — computed columns
(`cast(MLSTQT-MLALQT as integer)`), cross-column comparisons (`MLALQT < MLSTQT`) — moves into
`Retrieve_<TABLE>`'s Java, applied to already-fetched raw values:
```java
double stqt = Double.parseDouble(iREPL.split(",")[1]);
double alqt = Double.parseDouble(iREPL.split(",")[2]);
if (alqt < stqt) {
    int quantity = (int)(stqt - alqt);
}
```
Decide per-condition whether it's cheaper to leave in `QERY` (M3 filters before sending rows — fine
for plain literal comparisons) or move to Groovy (required for computed/cross-column). Ask before
assuming — the two aren't cost-equivalent, and a condition redundant given another may not need
restating.

### House convention: collect into `LL_Errors`, don't throw
Default the Retrieve function's failure branch to appending a message to a shared `LL_Errors`
(`java.util.ArrayList`) Variable rather than `throw`/`abort()`ing immediately — confirmed preferred
on two KL projects (Bleckmann, DOImport). Lets the map keep processing (e.g. remaining lines in an
outer loop) and report every issue together at the end. The `LL_Errors`→email chain (a boolean
`IsErrorFound`/`If_Error` block joining collected messages into `EMAIL_RECEPIENT`/`EMAIL_SUBJECT`/
`EMAIL_BODY` on the Acknowledge output) should be built **once, after every other query/check is
wired** — not rebuilt per-query. Some checks are more severe than a plain validation failure (e.g.
a same-DO-number collision from simultaneous imports) — flag those rather than silently
collect-and-continue, since immediate abort may be genuinely safer for that specific case.

### Gotchas specific to this pattern
See §5 items 22–24 (`.trim()` requirement, checksum-caching false "Missing Root Element", new
Parameter defaults to `String`) and items 25–26 (`TimeUnit`, Boolean-Function-reverts-to-Void).

### Before decomposing a multi-column SELECT/JOIN, trace what's actually live
Don't assume the on-prem SQL's column list defines how many Mapper objects are needed. Confirmed
on KL DOImport (`MITMAS LEFT JOIN MITBAL` x2, 5 selected columns): tracing the on-prem Java showed
two of three implied lookups only fed a check that had been commented out since an earlier on-prem
version — fetched but never read. Built as a single `MITMAS` lookup instead of the planned
3-lookups-plus-combine decomposition, with zero behavioral difference. Always check whether every
selected column has a live (non-commented) consumer before deciding how many EXPORTMI objects a
query needs.

### Combined guard conditions need a new, matching boolean Function
When on-prem guards a block with multiple ANDed conditions (e.g. `remark not empty AND
flag.equalsIgnoreCase("Y")`), don't reuse an existing boolean Function built for a *different*,
narrower guard elsewhere — even if it tests one of the same clauses. Build a new combined Function
reproducing the full original condition. Confirmed on KL DOImport: header-level check used only a
flag (`IsCheckIfRemarkAlreadyExists`); line-level had an extra `remark-not-empty` clause the
header-level function didn't test — reuse as-is would call `SelectPad` with a sometimes-empty
`QERY`.

### Check for a superseding standard MI transaction before assuming EXPORTMI is needed at all
Some on-prem functions don't stop at a JDBC read — they also do a separate write-back (custom SOAP
call, second SQL statement) that EXPORTMI alone can't replace (`SelectPad` is read-only). Before
building anything, check whether a standard MI transaction supersedes the **entire** on-prem
function, not just the SELECT. Confirmed on KL DOImport Query 6 (`CSYNBR`, next-number allocation):
on-prem did JDBC SELECT + custom SOAP write-back to persist the incremented number, wrapped in a
10-attempt retry loop clearly anticipating collisions from the non-atomic design. `CRS165MI/
RtvNextNumber` replaces both steps in one atomic call — no EXPORTMI build needed, and the retry
wrapper was safe to delete entirely (its guarded failure mode doesn't exist with one atomic call).

### 6.2 `MDBREADMI` generic table-read — for simple key-based lookups (no query string needed)
*(confirmed via `KL_AddLinesToExistingDO_Load_In_1_0_0`)*

Simpler alternative to EXPORTMI when the on-prem read is a **plain key lookup** (single row or
list by a fixed key, no arbitrary WHERE logic) — no `QERY` string to build at all:
- `MDBREADMI/Get<Table>00` (Type `AVM`) — single-row lookup by key. Confirmed:
  `GetMGHEAD00` (input `TRNR`, order no.) → returns fixed named output columns.
- `MDBREADMI/Lst<Table>00` (Type `ARM`) — multi-row lookup by key. Confirmed:
  `LstMMIPPT00` (input `WHLO`+`E0IO`) → returns fixed named output columns.

Table name is baked into the transaction name (`Get<Table>00`/`Lst<Table>00`), and outputs are
named/typed columns rather than a comma-separated `REPL` string to parse — no `.trim()`/split
logic needed. Use this instead of EXPORTMI whenever the on-prem SQL was a straight key lookup with
no computed/multi-condition WHERE clause; reserve EXPORTMI (§6.1) for genuine ad-hoc queries.

**KL-wide override, confirmed 20260904:** despite the guidance above, **always prefer
`EXPORTMI.SelectPad` over `MDBREADMI`** on this project, even for plain key lookups that would
otherwise fit `Get<Table>00`/`Lst<Table>00`'s shape exactly. Explicit project convention, not a
technical limitation of `MDBREADMI` — confirmed on `InhouseInventoryDataExport4`'s single-row
`MITMAH`/`MITMAS` key lookups (Branch 5), which fit the `MDBREADMI` shape perfectly but were built
as `EXPORTMI.SelectPad` (`ARM`, single row) regardless.

### Check for a superseding standard MI transaction before defaulting to EXPORTMI — worked example
`MMS060MI/LstBalID` (input `WHLO` mandatory, `ITNO`/`WHSL` optional) is a genuine bulk-by-warehouse
read of `MITLOC` — confirmed via `MMS060MI_MVX.java` source (not just Swagger) to return `STQT`,
`ALQT`, `ITTY`, and 60+ other fields, none of which are pre-computed (arithmetic like `STQT-ALQT`
still needs the Retrieve function's Java either way). Superseded `EXPORTMI` entirely for 3 of 5
calculation-method branches on `InhouseInventoryDataExport4` that read `MITLOC` in bulk. The
general lesson: a "List by warehouse" or "List by facility" business MI transaction existing
*at all* for a table is a strong signal it was designed for exactly this bulk-discovery shape —
check the MI Swagger/source for such a transaction on the driving table before assuming `EXPORTMI`
is needed, even though `EXPORTMI` would also technically work. Two confirmed uses of `LstBalID` now
in this project (`TC_MESMOInboundData_Process_In_1_0_0`, `InhouseInventoryDataExport4`).

### Dynamic per-item filter fields (e.g. a trigger's `DATAFILTER`) need a per-item lookup, not a join
When on-prem SQL's dynamic WHERE fragment (a value passed in from the trigger/request, not a fixed
condition baked into the map) references columns from a table the driving table doesn't itself
carry — confirmed case: `InhouseInventoryDataExport4`'s `DATAFILTER` filters on `MITMAS.MMCFI5`/
`MMITTY`, but 4 of 5 branches drive off `MITBAL`/`MITATP`/`MITLOC`, none of which carry those
columns — the fix is **not** to add the referenced table as a join (EXPORTMI's `QERY` is
single-table, no confirmed join support) but a **per-item single-row lookup** on that table,
evaluated in Groovy against the dynamic filter string. Two real production trigger-file samples
confirmed the shape stays fixed even though the *values* vary:
`(FIELD='v1' OR FIELD='v2' [OR...]) AND FIELD2 NOT IN ('v1','v2',...)` — build a targeted parser
for the confirmed shape, not a generic SQL-WHERE evaluator, and treat "does this shape hold across
every trigger-generating scenario" as an explicit open item rather than an assumption (only
confirmed so far for one specific calculation-method value on that map).

---

## 7. Custom SOAP Webservice → XtendM3 Replacement Pattern
*(manual step)*

On-prem sometimes calls a legacy custom SOAP wrapper — confirmed signature:
`com.karl.webservices.M3Webservice.CallWebservice(url, username, password, webserviceName,
webserviceOperation, company, null, m3Program, HashMap<String,String> params)` — to invoke a
standard M3 program with no direct Cloud-callable path. When a corresponding XtendM3 transaction
has already been custom-built and confirmed for Cloud, replace the webservice call with a native
M3 API node calling that transaction directly.

**Confirmed on KL DOImport: MMS100 `UpdateDO`/`UpdateDOWithEPanel` → `EXT100MI/UpdDOHeader`**
- **Treat the XtendM3 transaction's own confirmed `inputFields`/`outputFields` as source of truth**
  for what's actually supported — not the old webservice's parameter list. Check for feature gaps
  before treating it as a like-for-like swap. Confirmed gap: old webservice sent a `Season`
  parameter the new transaction had no equivalent for at all. Flag explicitly rather than silently
  dropping or fabricating a workaround — resolving it is a business decision, not migration
  mechanics.
- **Retry logic wrapping the old webservice call is almost always specific to the old session
  mechanism** — confirmed safe to drop entirely (e.g. catching `"User must log on to Movex"` and
  sleeping+retrying doesn't apply to a native M3 API call).
- **Type-based parameter branching may be a technical limitation of the old mechanism, not a
  business rule — confirm before dropping.** E.g. old code sent `ReceivingDate` for only one of two
  webservice operations, likely because the *other* operation's SOAP signature didn't accept it —
  not necessarily a business restriction. A single native MI call taking a superset of fields
  usually removes the need for the restriction, but check first.
- **Field-format handling can change shape entirely, not just improve.** On-prem manually
  reformatted dates (`DMY`/`YMD`) based on the *target program's* expected format; the new
  XtendM3 transaction instead validates/converts using `mi.getDateFormat()` — the *calling
  session's* configured format, a different input entirely. Trace what the new transaction's
  source actually does; build a small normalization Function that logs the raw incoming value
  either way so the actual shape is visible in testing.
- **Result-checking uses `isLastAPICallOK()`/`getLastAPIMessage()`** like any other native M3 API
  call — collect into `LL_Errors` on failure, consistent with §6's house convention.

---

## 8. Inbound Integration Pattern (File → M3, Process/Acknowledge)

Everything in §4–6 was confirmed on **outbound** maps (M3 → ION → external). This section covers
**inbound** (external file → ION → M3), confirmed end-to-end on KL Bleckmann StockAdjustment.
Overall shape, run once per file:

```
External file
  → File Connection Point (Sync BOD)
  → XSLT mapper: Sync BOD → Process BOD          (Data Flow-level XML_MAPPER activity)
  → M3 Application connector (Process BOD in, Acknowledge BOD out)
      → this is the MEC map: KL_<BODNoun>_Process_In_1_0_0
  → XSLT mapper: Acknowledge BOD → Sync BOD       (Data Flow-level XML_MAPPER activity)
  → Workflow activity (email notification)
```

In parallel, a **companion MEC map** (`KL_<BODNoun>_Acknowledge_Error_Out_1_0_0`) handles the case
where the message fails validation/processing *before* the main map's logic runs — see below.

### Object Schema (Data Catalog) vs. Business Document Mapper schema — separate artifacts
Even though both are "the schema for Noun X", they're built/maintained independently and can
legitimately have different field shapes for different verbs of the same Noun:
- **Data Catalog Object Schema** (from a File Template's sample XML, or hand-built) — what the
  File Connection Point uses to wrap an incoming raw file into a **Sync** BOD. Matches the
  *source* file's own structure.
- **Business Document Mapper's `SchemaIn`/`SchemaOut`** (`BODs-<Verb><Noun>_hash.xsd` /
  `Nouns-<Noun>_hash.xsd` in the `.zap`) — what the MEC map uses for its **Process**/**Acknowledge**
  verbs. Matches whatever the XSLT transform actually produces — often a *reshaped* structure from
  the Sync-verb source shape.

Do not assume a single shared schema covers both — build/verify each independently.

### BOD envelope XSD structure (Process and Acknowledge verbs)
```
BODs-Process<Noun>_hash.xsd          (or BODs-Acknowledge<Noun>_hash.xsd)
  <xs:include schemaLocation="Nouns-<Noun>_hash.xsd"/>       <- business data shape
  <xs:include schemaLocation="Resources-Meta_6ebd19dc.xsd"/> <- generic OAGIS/Infor plumbing, ALWAYS reuse verbatim
  <xs:element name="Process<Noun>" type="Process<Noun>Type"/>
    complexContent extension of BusinessObjectDocumentType (from Resources-Meta)
    DataArea: <xs:element ref="Process"/> + <xs:element ref="<Noun>" maxOccurs="1"/>
```
`Resources-Meta_*.xsd` is generic across every integration (`ApplicationArea`,
`BusinessObjectDocumentType`, `Sender`, `LogicalID`, etc.) — never customer/Noun-specific; copy it
byte-for-byte from a working reference.

**Critical naming rule:** root element name is `<Verb><Noun>` **concatenated, no separator** — e.g.
`ProcessBleckmannInventoryAdjustment`, not `Process.BleckmannInventoryAdjustment` or
`Process_BleckmannInventoryAdjustment`. A period/underscore breaks MEC's XPath resolution
(`/ProcessX/ApplicationArea/...` matches nothing), surfacing as a confusing null-pointer on the
first field read from `ApplicationArea` (e.g. `iLogicalID` NPE) rather than an obvious naming error.

**Acknowledge** differs from **Process** in one place: `DataArea` uses `<xs:element ref="<Noun>"
maxOccurs="unbounded"/>` (repeatable), where Process uses `maxOccurs="1"`.

### `CRS881MI.GetTranslData` — reusable within one map, not single-purpose
Generic translation-table lookup. The same map can call it multiple times for unrelated lookups:

| Use case | `MSTD` | `BMSG` | `ELMP` | `ELMD` | `MBMD` |
|---|---|---|---|---|---|
| Business-code translation (e.g. transaction reason) | `<standard code>` | `<business object>` | `Defaults` | `Defaults` | `<field name>` |
| Notification email recipient lookup | same `MSTD` as above | `Generic` | `Error` | `NotificationEmail` | `NotificationEmail` |

`TRQF`, `MVRS`, `IBOB` typically constant (`0`, `1`, `I`) across lookups in a map. Output `MVXD`
carries the translated value — capture into a dedicated Variable per lookup, don't reuse one
Variable for two different lookups. **Placement:** if the lookup's keys don't depend on per-line
data, call it once outside the loop, not once per line.

### `ConfirmBOD` → Acknowledge-with-error companion map
A **separate** map, `KL_<BODNoun>_Acknowledge_Error_Out_1_0_0`, handles platform-level failures
(message failed before your own map's logic ran).
- `SchemaIn` = `BODs-ConfirmBOD_*.xsd` (includes `Nouns-BOD_*.xsd` + `Resources-Meta_*.xsd`) —
  fully generic, identical across every integration; reuse verbatim, never rebuild.
- `SchemaOut` = the **same** `BODs-Acknowledge<Noun>_*.xsd` the main Process_In map already uses —
  don't build a second Acknowledge schema. Reuse the live project one (watch the re-hashing gotcha,
  §5 item 18).
- Function pattern: `SetHeader` (OAGIS envelope) → `SetAcknowledge` (correlation ID, action code,
  accounting entity from original `ApplicationArea` via `IONApplicationArea`) →
  `SetOutboxHeaderData` (`ionBODType` = `"Acknowledge.<Noun>"` — **dotted**, unlike the concatenated
  root element name) → `SetReason` (first line of
  `/ConfirmBOD/DataArea/BOD/BODFailureMessage/ErrorProcessMessage/Description`).
- **When adapting a reference map for a new Noun, check for dead/leftover logic before copying
  forward.** Confirmed: an `OrderID`-driven `If`-block feeding `Message_Id` was wired but never
  populated anywhere (inert copy-paste leftover); also watch for stray fields referencing an
  unrelated BOD (e.g. `SupplierPartyMaster/PartyIDs/ID` inside an inventory-adjustment map's
  `SetAcknowledge`). Trace whether a field is actually populated before reproducing it.
- **This map is a genuine Cloud Agreement prerequisite, not just a recommended companion.**
  Publishing a Process_In map before its companion exists fails: `"An agreement cannot be
  generated yet. No available Acknowledge Error Mapping for Inbound Process Mapping with noun
  <Noun>."` — hard publish-time dependency, confirmed on KL DOImport and independently on the
  Bleckmann/TC_MESMO Process↔Acknowledge pairs — always build/publish the Acknowledge_Error_Out
  map first.
- **`EMAIL_*` fields are never touched here** — purely a system-fault catcher, distinct from the
  `LL_Errors`-driven mechanism (§6). Only `ApplicationArea`, `ConfirmationCode` (`"OnError"`), and
  `ResponseCriteria/ChangeStatus/Reason` get populated. `DataArea/<Noun>` stays empty (no real
  business data available when this fires).
- **Caution — a hand-cloned zap is not guaranteed to register as a usable Mapping, even if it
  passes every static check.** One risk-reducer: the `H<digits>:` namespace-prefix in every
  `FormattedPath` is fixed per namespace URI, not randomly per-import, so a straight
  clone-and-rename of a working reference (same `SchemaIn`/`SchemaOut` pairing) avoids the
  namespace-prefix-unpredictability problem elsewhere in this file. **However**, a well-formed,
  fully cross-referenced, correctly-encoded hand-cloned Acknowledge_Error_Out map still **failed to
  appear in Mapper's own Mapping Explorer** twice, even after clean delete + re-import — visible in
  Package Explorer and on disk, but Mapper's internal database never registered it.
  **Recommendation: build this specific artifact through Mapper's own "New Mapping" + GUI
  schema-import flow, not a hand-cloned zap**, even when the clone appears structurally correct.

### Data Flow shape — "Pattern F"
Entry `FILE` activity (Sync BOD) feeds a `PARALLEL_FLOW` with two branches: main processing chain
(`XML_MAPPER` Sync→Process → `APPLICATION` m3 → `XML_MAPPER` Ack→Sync → `WORKFLOW` email) alongside
a simple `FILE` **Archive** branch moving the original source file to archive. The branches don't
depend on each other.

- **The second `XML_MAPPER` (Ack→Sync) is not optional** — don't feed the raw Acknowledge BOD
  straight into `WORKFLOW`. Its job is reshaping the Acknowledge into a new Sync BOD carrying just
  the notification-relevant fields (Subject/Body/recipient-selection flags).
- **`WORKFLOW` isn't only email** — the same Acknowledge-driven shape can route to SFTP or other
  outputs depending on what the Workflow activity is configured to do; "email" is the common case,
  not the only one.
- **Conditional notification (not every message needs one):** gate the `WORKFLOW` step behind a
  `CBR_FILTER` (`AttributeExistence` condition, branching on whether a flag/field is present) when
  the on-prem logic only notifies on specific conditions rather than every successful message.
- **Compose Subject/Body in the Mapper itself** (the MEC map's own Java functions), not later in
  the XML_MAPPER/Workflow layer — carries forward on-prem's exact working text/logic at lower risk
  than re-deriving it downstream. The Acknowledge schema needs dedicated fields for these.
- **`EMAIL_RECEPIENT` is conventionally left unwired in the map** — the ION Workflow activity owns
  the recipient address, not the MEC map.
- **Flag fields (e.g. `IsErrorFound`-style booleans surfaced to the BOD) should be `String`, not
  `Boolean`**, to match `NormalizedStringBaseType` in the BOD schema — confirmed gotcha, a real
  `Boolean`-typed output field caused a schema mismatch.
- **Pattern F variant — Load verb, no Acknowledge/email:** when the integration doesn't need a
  confirmation-back-to-sender loop, the shape simplifies to a single chain, no parallel branches:
  `FILE (Sync)` → `XML_MAPPER (Sync→Load)` → `APPLICATION (m3)`, no `WORKFLOW`, no Archive branch,
  no `ConfirmBOD` companion map. Choose based on whether the requirement needs Acknowledge-driven
  status writeback (→ Process verb, full Pattern F) or not (→ Load verb, this variant — see §3.2).

### Variant — file-triggered outbound extract (Process/Acknowledge, but the business data flows M3 → file, not file → M3)
Everything above in §8 assumes the inbound file *carries the business data* being loaded into M3.
A different but structurally similar case: the inbound file carries only **request/filter
criteria** (warehouse, calculation method, date range, etc.), and the map's real work is an
**outbound** M3-data-to-file export, done inside the same `Process_In` map. Confirmed design
(not yet built) on `InhouseInventoryDataExport4`:
```
External system drops a request file (SFTP)
  → ION Data Flow converts it into a Process BOD (same XSLT-mapper mechanism as the standard case)
  → this is the MEC map: KL_<Name>_Process_In_1_0_0
      — reads the Process BOD's request/filter fields (not business data to load)
      — runs whatever M3 read/query logic the request calls for (see §6 for the SQL-replacement side)
      — produces the actual export data as this map's own output
  → companion KL_<Name>_Acknowledge_Error_Out_1_0_0 still required (same publish-time dependency, §8)
```
The distinguishing signal vs. genuine Load/Process-with-inbound-data: check what `SchemaIn`'s
fields actually *are* — filter/criteria fields (warehouse, date, a named calculation method) point
to this variant; business entity fields (order lines, item data to persist) point to the standard
inbound case. Still Process/Acknowledge either way, per the Sync decision rule in §3.1 — the
determining factor is "does Acknowledge need to report success/failure back", not which direction
the bulk of the data flows.

---

## 9. Load BOD XSD Envelope Pattern
*(manual step — for `_Load_In` maps whose on-prem `SchemaIn` is flat/non-BOD-shaped)*

**Corrected shape** (confirmed against `M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0` /
`LoadNewStoreFulfillmentCompleted_659a998f.xsd` — a flat shape with no `ApplicationArea` was
confirmed incomplete and causes "Input Document Missing Root Element Error... Mapping element
'Trigger' is not in schema elements"):

```
Load<Noun>
  ApplicationArea
    Sender
      LogicalID (string)
      ConfirmationCode (string)
    BODID (string)
  DataArea
    Load
      ActionCriteria
        ActionExpression (string)
    <Noun>                      <- no verb prefix here
      Load<Noun>                <- verb prefix reappears here, matches root element name
        <repeating group, preserving on-prem's own field set/types/required-ness exactly>
```

**`ApplicationArea`/`Sender`/`BODID`/`Load`/`ActionCriteria`/`ActionExpression` need no `Record`
entries at all** — zero Links in the working reference; they exist for OAGIS structural compliance
only. Only build Records/Links for genuine business fields under `<Noun>/Load<Noun>/...`.

If a Load BOD envelope was built with the old flat shape before this correction, it's worth
re-verifying via a fresh re-import in Mapper.

**Critical limitation:** only the `MappingMeta/SchemaIn` pointer is safe to hand-edit outside the
tool. Field-level Links must be built via Mapper GUI for namespaced schemas — safe to hand-edit
only when the schema has no `targetNamespace`.

### Encoding for MEC XSDs
Same UTF-16BE, single `FE FF` BOM convention as `.map` files (§0, §17 double-BOM gotcha applies
equally here).

---

## 10. Tag Inconsistency Note
This map XML format mixes `<Name>X</Name>` and other short-tag forms for logically equivalent
entries — sometimes within the same file. Function-level name matching (`VersionLog`, `GetHead`)
specifically requires `<Name>`. When writing new detection logic, check both forms rather than
assuming one.

---

## 11. Known Limitations of the Automated Script
- The v2.0.9 EventData semi-auto fix (§5 item 7) depends on a bundled asset
  (`assets/EventData_46e58dff.xsd`); if Infor issues a newer EventData schema revision, replace the
  asset file and the fix picks it up automatically — the script does not fetch/validate against a
  live source.
- Unused imports outside the function body — NOT auto-fixed, unverified. Every generated `.java`
  file states "All code outside the function body is automatically generated and will NOT be
  kept" — Mapper may regenerate the full import block on save regardless. Do not automate this
  until confirmed against a real save/republish cycle.
- The mid-expression `+ ""` cosmetic artifact (§4 item 3).
- Tier 2 detections (§5) are heuristics — note any case that should have been flagged but wasn't,
  or a noisy false positive.
- "Crossing output link" is not detected at all (§5 item 11).

---

## 12. Reference Maps & Assets (confirmed working examples)
| Reference | Use for |
|---|---|
| `CNG_PackageETRNDetails_Sync_Out_1_0_0` | Error-capture pattern, SortingStructure loop |
| `KL_BatchInventory_Sync_Out_1_0_0` | EventData wiring reference (TenantId/EventId consumption) |
| `M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0` | Load BOD envelope shape (corrected) |
| DSV NL project | Established reference implementation for architectural patterns |
| Bleckmann StockAdjustment (`KL_BleckmannInventoryAdjustment_Process_In_1_0_0` / `_Acknowledge_Error_Out_1_0_0`) | Inbound integration reference pattern, full end-to-end |
| KL AutoMoveFromLocation (`GetStockToBeMovedFromM3DB`) | EXPORTMI SQL-replacement pattern origin |
| KL DOImport | Multi-query EXPORTMI build, custom-webservice replacement, Acknowledge_Error_Out companion, `LL_Errors` convention origin |
| `OIS100MI.zap` (bundled skill asset) | API reference — GetOrderHead / GetLine |
| `EventData_46e58dff.xsd` (bundled skill asset) | Canonical current EventData schema |
| `KL_AllocationStatusShopify_Sync_Out_1_0_0` | Full Sync-Out map reference — EventData→Sync BOD envelope (§3.1), a real multi-row EXPORTMI usage (`Create_DLIX_Query`→`SelectPad`(ARI)→`Function_1`), and confirmed `EXT101MI/UpdCODetails` usage in a line loop |
| `KL_AddLinesToExistingDO_Load_In_1_0_0` | Load-In map reference — confirms Load never sends Acknowledge; introduces `MDBREADMI/Get<Table>00`/`Lst<Table>00` as a simpler key-lookup alternative to EXPORTMI (§6.2) — **NB: this map's input XSD is flat, no `ApplicationArea`, contradicting §9's confirmed envelope shape. Published but not yet tested end-to-end — treat as unverified, not as a valid alternative envelope, until confirmed running.** |
| `M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0` | Confirmed **running** Load-In reference — validates §9's envelope shape exactly (`ApplicationArea`/`Sender`/`BODID` + `DataArea/Load/ActionCriteria/ActionExpression` + `DataArea/<Noun>/Load<Noun>/...`). Rich API set — batch order creation (`OIS100MI/AddBatchHead`→`AddBatchLine`→`Confirm`), `CUSEXTMI` custom-field family, `MMS310MI`, `MMS850MI/AddAdjust` |
| `KL_BleckmannInventoryAdjustment_Process_In_1_0_0` / `_Acknowledge_Error_Out_1_0_0` | Process/Acknowledge pair — origin reference for §8's envelope/companion-map pattern; Acknowledge map has zero real API calls (confirmed: purely a system-fault catcher) |
| `TC_MESMOInboundData_Process_In_1_0_0` / `_Acknowledge_Error_Out_1_0_0` | Large manufacturing-domain Process/Acknowledge pair (34 APIs — `PMS`/`ATS`/`MMS` operation-reporting families) — second confirmation of the Ack-before-Process publish dependency; Acknowledge map here does call `PMS100MI/GetUserInfo` (minor variant on the usually-zero-API Acknowledge shape) |
| `InhouseInventoryDataExport4` (design confirmed 20260905, build not yet started) | File-triggered outbound extract variant of Process/Acknowledge (§8) — 5 calculation-method branches, each a separate SQL-to-API redesign. Origin of: the `MMS060MI/LstBalID`-over-EXPORTMI worked example, the dynamic-per-item-filter (`DATAFILTER`) pattern, and the Sync-vs-Process decision-rule correction (§3.1). Full worked spec: `InhouseInventoryDataExport4_CloudMigration_TechSpec_v2.docx` (Abhishek's local project folder) |

---

## 13. API Reference Index
Full input/output field definitions for every API below live in the companion file
**`Infor_M3_API_Reference_Library.md`** — kept separate so this master file stays fast to load;
pull up the companion file only when a specific API's fields are actually needed.

**Beyond confirmed-used transactions:** for `MMS025MI`, `MMS200MI`, `CRS610MI`, `PPS001MI`,
`PPS200MI`, `OIS100MI`, `MMS100MI`, the companion file also has a **full transaction index**
(376 transactions total, name + one-line summary, sourced from official MI Swagger metadata) —
only the 14 below have full field tables (now upgraded to Swagger data); the rest expand on demand
when a map actually needs them. Also documented once (not per-program): 9 **standard MI utility
transactions** (`GetUserInfo`, `GetServerTime`, `FpwVersion`, `GetCurrentUser`,
`GetFieldHeading`, `GetFixLevel`, `GetMIBuild`, `GetMessageText`, `ServerTimeZone`) — confirmed
identical across every M3 program, callable on any of them.

| API | Type | Confirmed used in |
|---|---|---|
| `/MMS200MI/GetUserInfo` | AVM | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/OIS100MI/GetOrderHead` | AVM | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/CRS610MI/GetAddress` | AVI | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/CRS881MI/GetTranslData` | AVI | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/CUSEXTMI/GetFieldValue` | AVI | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/OIS100MI/LstLine` | ARM | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/EXT101MI/UpdCODetails` | AVM | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/CMS100MI/LstOOLINEWhoSel` | ARM | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/MMS025MI/GetAlias` | AVI | KL_AllocationStatusShopify_Sync_Out_1_0_0 |
| `/MMS100MI/GetHead` | AVI | KL_AddLinesToExistingDO_Load_In_1_0_0 |
| `/MDBREADMI/GetMGHEAD00` | AVM | KL_AddLinesToExistingDO_Load_In_1_0_0 |
| `/MDBREADMI/LstMMIPPT00` | ARM | KL_AddLinesToExistingDO_Load_In_1_0_0 |
| `/MHS850MI/AddDO` | AVI | KL_AddLinesToExistingDO_Load_In_1_0_0 |
| `/MNS150MI/GetUserInfo` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/MNS150MI/GetServerTime` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/MMS005MI/GetWarehouse` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/CUSEXTMI/LstFieldValue` | ARM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/CUSEXTMI/DelFieldValue` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/CUSEXTMI/AddFieldValue` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/CMS100MI/LstDivFromWH` | ARM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/OIS100MI/AddBatchHead` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/OIS100MI/AddBatchHeadChg` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/CUSEXTMI/ChgFieldValue` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/CUSEXTMI/GetFieldValueEx` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/MMS310MI/Get` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/MMS850MI/AddAdjust` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/OIS100MI/AddBatchLine` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/MMS200MI/GetItmBasic` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/OIS100MI/AddBatchLineChg` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/OIS100MI/Confirm` | AVM | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/MMS310MI/Update` | AVI | M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0 |
| `/ATS101MI/GetAttributes` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/ATS101MI/SetAttrValue` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/CMS100MI/LstDrawingMes1` | ARI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/CMS100MI/LstReWork_1` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/CUSEXTMI/ChgAlphaKPI` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS015MI/Get` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS015MI/Lst` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS060MI/LstBalID` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS060MI/SetBalIdAloc` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS120MI/DeAllocateOrLne` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS130MI/RclLotSts` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS200MI/Get` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS235MI/GetItmLot` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS360MI/UpdCatchWeight` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS470MI/GetPackageStk` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MMS850MI/AddMove` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/MNS150MI/GetUserData` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/OIS100MI/GetLine` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PDS010MI/Get` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS050MI/RptReceipt` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS060MI/RptIssue` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS070MI/CloseOperation` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS070MI/GetOperation` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS070MI/RptOperation` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS080MI/RptByProduct` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/AddMOComponent` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/AddOperation` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/Get` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/GetUserInfo` | AVM | TC_MESMOInboundData_Acknowledge_Error_Out_1_0_0 |
| `/PMS100MI/LstMaterials` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/LstOperations` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/SearchMO` | ARI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/SearchOperation` | ARM | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/UpdMO` | AVI | TC_MESMOInboundData_Process_In_1_0_0 |
| `/PMS100MI/UpdOperation` | AVM | TC_MESMOInboundData_Process_In_1_0_0 |

---

---

## 14. ION / Infor OS Platform Reference
*(Broader ION/Infor OS platform — Data Flow architecture, Workflow, Scripting, API Gateway,
security, and adjacent Infor OS surface. Originally Abhishek's separate cross-project skill file;
merged in here per request so everything lives in one place. Sections below keep their own
14.N numbering for stability if referenced elsewhere.)*

### 14.1 ION Architecture — Core Concepts

#### Components
- **ION Connect** — routes BODs and documents between applications via data flows
- **ION Workflow** — BPMN-based human task / automation engine
- **ION Scripting** — Python-based transformation engine embedded in flows
- **API Gateway** — exposes M3 and other Infor app APIs via REST/OAuth; acts as reverse proxy
- **Event Management** — monitors Sync BODs and generates alerts
- **IFS** — Identity Federation Service; manages users, roles, service accounts

#### Document Types in ION
| Type | Description |
|------|-------------|
| BOD | Standard OAGIS or custom M3 EDI BOD with Noun + Verb |
| JSON | JSON schema document |
| AnyData | Unstructured trigger signal — no schema required |
| DSV | Delimiter-separated values |
| ANY | Raw binary or untyped — preserves native binary format (use for binary uploads) |

#### BOD Verbs — When to Use Which
| Verb | Use When |
|------|----------|
| **Sync** | Owner publishes change. No response expected. M3 informing others. |
| **Process** | Requesting owner to create/update. Triggers **Acknowledge** back. |
| **Load** | Creating object, ownership handed to receiver. No Acknowledge. Fire-and-forget. |
| **Acknowledge** | Response to Process. Contains success/failure. |
| **Get / Show** | Request + response for reading data |
| **Confirm** | ION-internal failure notification. Never routed externally. |

**Rule of thumb:** Inbound to M3 creating orders → use **Load** (high volume, no confirmation needed) or **Process** (when you need Acknowledge back for status writeback). M3 publishing outbound → **Sync**.

---

### 14.2 Data Flow Types

#### DATA_FLOW vs DOCUMENT_FLOW
| | DATA_FLOW | DOCUMENT_FLOW |
|---|---|---|
| Purpose | Complex processing: scripts, APIs, splitting, non-BOD | BOD-to-BOD routing between Infor apps |
| Structure | PARALLEL_FLOW containers, rich activity palette | Simpler, flatter |
| Activity types available | All (including ION_API, SPLITTER, DATA_LAKE, WORKFLOW) | Subset |
| When to use | Most custom integrations | Standard Infor app-to-app flows |

All real-world custom integrations built in this project use DATA_FLOW.

---

### 14.3 Activity Types — Full Reference

| ActivityType | Purpose | Key Config |
|---|---|---|
| **FILE** | Read from / write to file connection point | `<FileConnectionPoint>` name |
| **APPLICATION** | Publish to / receive from M3 or IEC | `<ConnectionPoints>m3` |
| **SCRIPTING** | Run ION Python script | `<ScriptName>`, input/output variable mapping |
| **XML_MAPPER** | Transform BOD verb or structure | Noun/verb conversion (e.g. Load→Sync) |
| **ION_API** | Call API Gateway endpoint mid-flow | `<IonApiConnectionPoint>`, `<Intermediate>` flag |
| **SPLITTER** | Split batch document into individual records | XPath (XML) or JSONPath (JSON) split path |
| **WORKFLOW** | Call ION Workflow synchronously, get result back | `<WorkflowName>`, bi-directional XPath parameter mapping |
| **CBR_FILTER** | Content-based routing filter (branch on attribute existence/value) | `AttributeExistence` or `AttributeComparison` condition |
| **DATA_LAKE** | Retrieve from or ingest to Infor Data Lake | Query, Retrieve, or Ingest sub-type |

#### PARALLEL_FLOW Container
Multiple independent branches run simultaneously within one data flow.
XML structure: `<FlowPartContainerType>PARALLEL_FLOW</FlowPartContainerType>` wraps sibling `SEQUENTIAL_FLOW` containers.
Real example: DF_PrtSealTracker — three parallel branches (MMS480PF, OIS641PF, MWS616PF) each running independently.

---

### 14.4 Connection Point Types

#### Standard types (always available)
| Type | ION Name | Real Usage |
|---|---|---|
| SFTP | FILE | NewStore — JSON files dropped by external system |
| CFT/AWS SharedFolder | FILE | H.H. Brown — M3 print output picked up via Cloud File Transfer |
| File (IDM XML) | FILE | Hydrite — `file_IDM_XML` CP for M3 output XML files |
| ION API (external) | ION_API | NUOrder — polling external API, OAuth-authenticated |
| ION API (IDM) | ION_API | Hydrite — `AC_LIS602PFWasteLabel_IDM` posts print jobs to IDM |
| Application (M3) | APPLICATION | Standard M3 BOD publish/receive |
| Application (IEC) | APPLICATION | `Infor IEC` — delivers to MEC/IEC for M3 API mapping |

#### Additional connection point types (from ION Technology Connectors guide)
| Type | Purpose | Notes |
|---|---|---|
| **API Gateway CP** | Call any REST API registered in API GW from a data flow | Three scenarios: Send to API, Get from API, Trigger API. Logical ID: `lid://infor.api.<name>` |
| **Database CP** | Read/write relational DB directly from ION | AnySQL Modeler for complex queries; Data Loader for incremental loads |
| **Message Queue (JMS)** | Read/write IBM MQ, TIBCO EMS, ActiveMQ, Oracle AQ | Full BODs or raw XML (auto-wrapped). Logical ID: `lid://infor.jms.<name>` |
| **Kafka** | Produce/consume Kafka topics | Rewind incremental key available |
| **Kinesis Stream** | AWS Kinesis integration | IAM credential or IAM role authentication |
| **BaaS CP** | Trigger or subscribe to BaaS service events | Requires BaaS license |

#### API Gateway Connection Point — Key Rules
- Service account must have its **description field filled** — ION requires it.
- **Define one API per connection point** — errors in one API affect all APIs in the same CP.
- Binary content must use `application/octet-stream` or `multipart/form-data`. Cannot use `application/x-www-form-urlencoded`.
- When sending binary via multipart/form-data from a BOD input: content is base64-encoded. Use **ANY document** instead if target expects raw binary bytes.
- Same service account can be reused across multiple API GW connection points.

#### File Connection Point — PGP
Files can be decrypted after read (inbound) or encrypted + signed before write (outbound). Configure in the File CP PGP section. Useful for SFTP integrations with external partners requiring encrypted files.

---

### 14.5 Real-World Data Flow Patterns

#### Pattern A — M3 Print Output → IDM Archive + Print
**Used in:** Hydrite DF_PrtSealTracker (MMS480PF, OIS641PF, MWS616PF)
```
FILE (file_IDM_XML)
  → SCRIPTING (format/clean XML)
  → XML_MAPPER (Load→Sync verb conversion)
  → WORKFLOW (WF_GetPrinterID — look up printer ID from printer name)
  → SCRIPTING (build IDM API payload = API_IN_PARAM_CARRIER noun)
  → ION_API (post to IDM via AC_LIS602PFWasteLabel_IDM connection point)
```
Key points:
- Source document is a custom M3 BOD (e.g. `MMS480PF_SealTracker`) from M3 print subsystem
- IDM posting always uses SCRIPTING → ION_API as a pair
- Workflow called synchronously to resolve PrinterName → PrinterID via CRS290MI/GetPrinter
- `PrinterAddress` XPath in BOD receives the resolved PrinterID as output from workflow
- **Strip `<Media>` block from `<Document>` before base64 encoding** — leaving it causes rogue null-printer print targets in IDM

#### Pattern B — Third-Party API Inbound with OAuth + Status Writeback
**Used in:** Steve Madden FTD012_SME_ORDER_NUORDER_M3
```
ION_API (AnyData trigger — kicks off the cycle)
  → SCRIPTING (OAuth token generation — calls external auth endpoint)
  → ION_API (Intermediate=true — fetch order batch as JSON)
  → SPLITTER (JSON split by $[*]._id — bursts array into individual orders)
  → SCRIPTING (JSON → Process.CustomBOD transformation)
  → APPLICATION (MEC — delivers to MEC for M3 API calls)
  → SCRIPTING (generate new OAuth token for status update)
  → ION_API (post status back to third-party)
```
Key points:
- OAuth done in SCRIPTING step, not in ION_API step — ION API connection points don't manage token refresh
- `<Intermediate>true</Intermediate>` on mid-flow ION_API — output passes forward, not terminal
- `AnyData` document type for trigger when there's no structured incoming payload
- MEC receives the custom BOD, executes M3 APIs, returns Acknowledge BOD
- Full circle: external trigger → fetch → transform → M3 → acknowledge → status writeback

#### Pattern C — SFTP JSON Inbound (Simple)
**Used in:** NewStore DF_NewStore_SalesOrder_TO_M3, DF_NewStore_FulfillmentCompleted_to_M3
```
FILE (SFTP)
  → SCRIPTING (JSON → BOD conversion)
  → APPLICATION (M3)
```
Key points:
- `<HeadersType>fromInputDocument</HeadersType>` — preserves source message headers through transformation
- Use **Load** verb when no Acknowledge needed (high-volume order inbound)
- Use **Sync** verb when informing M3 of an event (fulfillment completion)
- Simplest possible inbound pattern — baseline before adding complexity

#### Pattern D — Data Lake Retrieve → IEC
**Used in:** H.H. Brown DL_FlagCOLines
```
DATA_LAKE (Retrieve — custom SQL query, returns JSON)
  → SCRIPTING (JSON → XML conversion)
  → APPLICATION (Infor IEC)
```
Key points:
- Data Lake returns JSON — IEC expects XML — SCRIPTING step is mandatory bridge
- Custom noun naming convention: `GetRSCD` (Lake) → `GetRSCDXML` (after transform)
- IEC then maps XML to M3 API calls

#### Pattern E — M3 BOD → CBR_FILTER → Workflow (with error branch)
**Used in:** CNG DF_PackageETRNDetails
```
APPLICATION (M3 publishes Sync.PackageETRNDetails)
  → [Branch 1] CBR_FILTER (IfNoError: ETRN field DoesNotExist)
      → WORKFLOW (WF_SendPackageETRNDetails — send email with package data)
  → [Branch 2] CBR_FILTER (IfErrorExists: ETRN field Exists)
      → WORKFLOW (WF_PackageETRNDetails_Error — error notification with APIErrors tree)
```
Key points:
- CBR_FILTER uses `AttributeExistence` condition — checks presence/absence of a field
- Error branch passes a nested `WorkflowTree` structure (not flat scalars) into workflow
- `WorkflowTree` used when passing repeating groups or nested XML nodes to workflow parameters

#### Pattern F — File Inbound to M3, Process/Acknowledge, with Error and Archive branches
**Full detail is in §8 above** ("Inbound Integration Pattern" / "Data Flow shape — Pattern F") — not repeated here to avoid two copies drifting out of sync. One config detail from this file not yet folded
into that section: **File Connection Point `Read Location`/`Error Location`/`Archive Location`
should be distinct subfolders** — pointing all three at the same path, combined with `After Read
= Move File`, risks a processed file being picked up and reprocessed in a loop.

#### Pattern F variant — Sync→Load, no Acknowledge/email
See §3.2/§8 above — same content, not repeated here.

---

### 14.6 ION Scripting — Rules and Patterns

#### Language and Runtime
- Python only (no JavaScript, no Groovy)
- Max execution time: **15 seconds**
- Max input payload: **5 MB**
- Max output payload: **5 MB**
- No external network access from scripts
- Scripts must be **Approved** before they work in an active data flow

#### Variable Naming
- Input variable name declared in script must match what's used in code exactly
- Output variable name declared must be assigned in code
- ION does NOT validate variable usage — silent failure if name mismatches

#### Input/Output Parameter Mapping in Data Flow XML
```xml
<ScriptingActivityInputParameters>
  <ScriptingActivityInputParameter>
    <FromType>inputDocumentContent</FromType>
    <FromValue>inputDocumentContent</FromValue>
    <ToType>parameter</ToType>
    <ToName>salesorder_in</ToName>       <!-- must match Python variable name -->
    <ToDataType>STRING</ToDataType>
  </ScriptingActivityInputParameter>
</ScriptingActivityInputParameters>
<ScriptingActivityOutputParameters>
  <ScriptingActivityOutputParameter>
    <ContentName>salesorder_out</ContentName>   <!-- must match Python variable name -->
    <ContentType>parameter</ContentType>
    <ContentDataType>STRING</ContentDataType>
    <HeadersName>From Input Document</HeadersName>
    <HeadersType>fromInputDocument</HeadersType>  <!-- preserves source headers -->
  </ScriptingActivityOutputParameter>
</ScriptingActivityOutputParameters>
```

#### `fromInputDocument` Header Pattern
When `<HeadersType>fromInputDocument</HeadersType>` is set, the outgoing BOD's message headers (Tenant, LogicalID, AccountingEntity) are carried from the incoming document. Use this on inbound integrations to preserve message traceability. Omit it when generating fresh BODs.

#### Runtime Error Behaviour
If a script fails, ION publishes a **ConfirmBOD** — not a crash. The flow stops for that message. Check ION OneView for ConfirmBODs to diagnose script failures.

---

### 14.7 ION Workflow — Complete Reference

#### Workflow Step Types
| Type (XML) | Purpose |
|---|---|
| `IonApiExitPoint` | Call API Gateway. Full API definition embedded as JSON in `<IonApiMethod>` |
| `Scripting` | Run ION Script. Config embedded as JSON in `<ScriptingConfiguration>` |
| `Assignment` | Set variable value. Expression syntax: `[VariableName]` |
| `UserTask` | Human task or notification. `UserTaskType`: TASK or NOTIFICATION |
| `Decision` | Condition branch — Yes/No |
| `SetParameter` | Assign value, expression, or IFS user common name |

#### Variable Data Types
| Type | Notes |
|---|---|
| String | Max 4000 chars |
| Integer | 64-bit signed |
| Decimal | 64-bit double |
| Boolean | True/False |
| Date | Date only |
| DateAndTime | Date + time |
| **Hyperlink** | String starting with http/https/ftp. Renders as clickable link in notifications. |
| User | IFS personid |
| DistributionGroup | IFS group |

**Critical:** Use **Hyperlink** type (not String) for URLs you want clickable in email/task notifications. Then use an Assignment step with expression `[URLVariable]` to copy into the Hyperlink variable.

#### IonApiExitPoint — JSON Structure (key fields)
```json
{
  "productLogicalId": "infor.m3",
  "operationProxyPath": "M3/m3api-rest/v2/execute/CRS290MI",
  "operationRestPath": "/GetPrinter",
  "httpMethod": "GET",
  "input": [
    {
      "wfVariableName": "PrinterName",
      "name": "DEV",
      "type": "QUERY"
    }
  ],
  "output": [
    {
      "wfVariableName": "PrinterID",
      "type": "BODY",
      "path": "$.MIRecord[0].NameValue[?(@.Name==\"IDPR\")].Value",
      "optional": false
    }
  ]
}
```

#### Calling a Workflow from a Data Flow (WORKFLOW activity)
The WORKFLOW activity in a data flow calls a workflow **synchronously** — the flow pauses until the workflow completes and returns output.

Parameter mapping:
- **Input to workflow**: XPath from BOD node → workflow input variable (`WorkflowParameterType=3` = input)
- **Output from workflow**: workflow output variable → XPath in BOD node (`WorkflowParameterType=2` = output)

Real example (WF_GetPrinterID called from DF_PrtSealTracker):
- Input: `DeliveryNoteMMS480PF/M3OutDocument/DataArea/Document/Media/Printer/PrinterName` → `PrinterName`
- Output: `PrinterID` → `DeliveryNoteMMS480PF/M3OutDocument/DataArea/Document/Media/Printer/PrinterAddress`

#### WorkflowTree — Passing Nested Structures
When a workflow needs a repeating group or nested XML node (not just scalar fields), use `<WorkflowTrees>` in the WORKFLOW activity configuration. The tree maps a parent XPath and its children recursively. Used in DF_PackageETRNDetails to pass the full `APIErrors` structure to the error notification workflow.

#### API Step Error Handling
- `IgnoreErrors=True` — workflow continues even if API call fails (output variables unchanged)
- `optional=true` on output mapping — if path not found in response, workflow continues without failing
- **Mark numeric fields as optional=true** — if field is absent or empty, ION throws a parse error and terminates the workflow. Always mark: DATE, QTY1-6, GRWT, PRSP, STAT fields as optional.
- Response code -1 = connection exception; 503/504 = max retries exceeded

---

### 14.8 API Gateway — Patterns and Rules

#### M3 API Path Structure
```
M3/m3api-rest/v2/execute/{ProgramName}/{TransactionName}
```
Examples:
- `M3/m3api-rest/v2/execute/EXT121MI/GetNewRequest`
- `M3/m3api-rest/v2/execute/CRS290MI/GetPrinter`

**Use v2 path** — not the older non-versioned path. The path used in workflows must come from API Gateway swagger, not from ION Desk.

#### JSONPath for M3 API Response Extraction
M3 API responses follow this structure:
```json
{
  "MIRecord": [
    {
      "NameValue": [
        {"Name": "IDPR", "Value": "HP001"},
        {"Name": "DEV", "Value": "PRINTER1"}
      ]
    }
  ]
}
```
JSONPath to extract a specific field by name:
```
$.MIRecord[0].NameValue[?(@.Name=="IDPR")].Value
```

For EXT121MI/GetNewRequest (used in WF_TriggerEXT120Email):
```
$.results[0].records[0].FIELDNAME
```

#### Service Account Setup
- Each environment (TST, PRD) needs its own `.ionapi` credentials file
- Service account must have API Gateway access for the target environment
- In workflows: set at step level (`Use custom Service Account`) or model level (`Workflow Properties > Service Account`)
- **CONO must be passed explicitly** as a literal value in ION API steps — it is not inherited from context
  - PRD CONO: `100`, TST/TRN CONO: `500` (verify per customer)

#### .ionapi Credential File — Fields
When you download credentials for a Backend Service authorized app, the file contains:

| Field | Description |
|---|---|
| `ti` | Tenant identifier |
| `cn` | Application name |
| `ci` | Client ID |
| `cs` | Client Secret |
| `iu` | Base URL for API Gateway |
| `pu` | Base URL for authorization server |
| `oa` | Path to append to `pu` for Authorization URL |
| `ot` | Path to append to `pu` for Token URL |
| `or` | Path to revoke a token |
| `SAAK` | Service Account Access Key |
| `SASK` | Service Account Secret Key |

**To generate a token in Postman:** Token URL = `pu` + `ot`; Client ID = `ci`; Client Secret = `cs`; grant_type = `client_credentials`.

#### OAuth Grant Types — Decision Guide
| Client Type | Grant to Use |
|---|---|
| Native mobile / desktop app | Authorization Code |
| Web app integrated with Infor Ming.le | SAML Bearer |
| Single Page App | Implicit |
| Backend service (system-to-system) | Resource Owner with Service Account |
| Machine-to-machine (no user context) | Client Credentials |

**Access token lifetime:** 2 hours by default (customizable per authorized app). Use `expires_in` from token response; obtain a new token ~5 minutes before expiry. **Do not obtain a new token per API call** — this is an anti-pattern.

---

### 14.9 Known Gotchas — Hard-Won Lessons

These are patterns that caused real failures in production. Check this list before implementing.

#### ION Scripting
1. **IEC cloud security scanner rejects ternary operators** in output variable assignments. Also rejects output variable (`o`-prefixed) assignments inside if/else blocks. Fix: compute via local variable, assign output once at top level outside conditionals.
2. **Script must be Approved** in ION Scripting UI before it works in an active data flow. After any code update, logging must be reconfigured in Business Engine Jobs before next run (XtendM3 batch — same principle applies).
3. ION Desk test "too long" error: use minimal test XML with only fields the script actually reads.

#### ION Workflow
4. **CONO must be a literal value** in ION API steps — hardcode `100` for PRD, `500` for TST. Never use a variable that might be empty.
5. **Numeric fields must be `optional=true`** (DATE, QTY1-6, GRWT, PRSP, STAT) — if absent in response, workflow terminates with parse error.
6. **Use Hyperlink data type** (not String) for clickable URLs in email notifications. Bridge using Assignment step with `[URLVariable]` expression.
7. **ION API path must come from API Gateway** (M3/m3api-rest/v2/...) — not from ION Desk URL. Wrong source causes output parameters to be silently ignored.
8. **Extra test steps on workflow canvas** cause repeated confusion during testing — remove all manually-added test ION API steps before deploying.
9. **Service account needs .ionapi file per environment** — deploying to PRD without importing PRD .ionapi file for the service account will cause the ION API step to fail with auth error.

#### ION Data Flows — IDM Integration
10. **Strip `<Media>` from `<Document>` before base64 encoding** for IDM submission. Leaving `<Media>` in causes a rogue null-printer-ID print target in IDM alongside the correct target.
11. **Encode `M3OutDocument` node, not the outer root** when building IDM base64 payload.
12. **Adding Media-stripping logic to MWS616PF caused complete job failure** (no email, no print, no archive) — root cause unresolved as of May 2026. Possible silent exception or different Media block structure vs MMS480PF. Investigate before touching MWS616PF script.

#### MEC / IEC
13. **MEC XSD must use `elementFormDefault="qualified"`** with NO `form="unqualified"` on individual elements — adding `form="unqualified"` silently breaks all FormattedPath namespace prefixes and map links.
14. **After any XSD reimport in MEC**, all affected schema links break and must be manually rewired. Delete old stale links before drawing new ones.
15. **All XSD files for MEC must be UTF-16 BE encoding with `feff` BOM**.
16. **XSLT root element must not contain a period** — e.g. use `ProcessDSVM3ImportStockLevel` not `Process.DSVM3ImportStockLevel`. Period causes MEC XPath match failure.
17. **ION XSLT**: use `*[local-name()='...']` predicate syntax for reliable namespace-agnostic XPath in ION engine.
18. **MEC dual loop wiring**: drop element onto loop block title bar, not onto parameters inside the block.

#### BOD / IEC General
19. **ION does not guarantee message order.** For M3 integrations where order matters, use IEC Reorder Process as the first process in the mapping. Minimum 120 seconds hold time in reorder queue.
20. **CRS881/CRS882 translation table limit**: IEC loads max 20,000 entries from CRS882 into memory. Do not use CRS882 as a generic data holder — use XtendM3 extension tables instead.
21. **Correlation rules** reduce duplicate BOD events: TimeCorrelation (same key + time window = one event), EventCorrelation (wait for trigger event before publishing). Not for delay — for deduplication.

#### ION API / Connection Points
22. **Intermediate=true on ION_API** marks a mid-flow API call whose output passes to the next activity. Without it, ION treats the step as a terminal publisher.
23. **AnyData document type** for trigger signals with no structured payload — cannot use BOD or JSON if no schema exists.
24. **fromInputDocument headers** — set `<HeadersType>fromInputDocument</HeadersType>` on SCRIPTING output when you want to preserve source message headers (Tenant, LogicalID, AccountingEntity) through transformation.
25. **ION File CP test failure showing `STATUS_BAD_NETWORK_NAME`** — may indicate Write File Settings or scenario type mismatch (Read+Write vs Read-only).

#### API Gateway Scopes (NEW)
26. **Scope names are case-sensitive** — `Infor-Mingle` and `infor-mingle` are treated as different scopes. Mismatched casing causes `invalid_scope` error and no token is issued.
27. **After any scope change, existing tokens must be replaced** — tokens do not automatically reflect updated scope assignments. This is the most common cause of unexpected HTTP 403 errors after scope reconfiguration.
28. **Scope intersection rule**: the token only contains scopes present in ALL THREE of: authorized app scopes, requested scopes in token call, and service account scopes. All three must be aligned or the missing scope is silently dropped from the token.
29. **Client credentials grant has no user context** — UserSecurityClaims policy, user-level Quota policy, and IONAPI Bridge features (User Impersonation, ID Translation, Upload Public Key) are all disabled/non-functional for this grant type.
30. **Refresh tokens recalculate scope intersection** at refresh time — a refreshed token may have different scopes than the original if scope assignments changed.

#### Service Accounts (NEW)
31. **Service account credentials are downloadable only once** — at creation time. If lost, the service account must be deleted and recreated. Store credentials securely immediately after download.
32. **Service account for ION only publishes Sync.BOD** — Process.BOD is not supported for service accounts.

#### ION Scripting — MT-Specific Limits (NEW)
33. **30-second test limit vs 15-second runtime limit** — a script that completes in 20 seconds will PASS the Testing tab but FAIL when running in an active data flow. The Testing tab is NOT a reliable pass/fail gate for runtime performance. Always target < 15 seconds in real execution conditions.
34. **Scripts cannot call external APIs or anything outside the ION network** — scripting runs inside AWS Lambda as a closed box; it can only manipulate the data passed into it. Use an `ION_API` activity for any external API calls.
35. **AWS Lambda concurrency cap**: 1000 concurrent script executions across the tenant. Exceeding this causes AWS to throttle. High-volume flows with scripting steps may hit this under peak load.
36. **Script size and memory limits**: max 6 MB per script file; 1 GB memory for execution. Practically never hit, but be aware.
37. **Multiple approved versions**: if more than one version of a script is approved, the **last approved version** is used. Earlier approved versions are silently ignored.
38. **Libraries must be pre-loaded to the tenant** — e.g. `xmltodict` (XML↔JSON conversion), `createfullBOD` (JSON→OAGIS Full BOD XML). You cannot import arbitrary Python packages; only tenant-provisioned libraries appear in the library picker in the Scripts UI.

#### Business Document Mapper — Checksum Caching / New Function Output Parameters Default to String
Both covered in §5 items 23–24 above — not repeated here.


#### Enterprise Collaborator Configuration — Documents Tab (NEW)
39. **An EC Config → Documents entry can silently disappear even after months of working correctly**, breaking the flow with ION error `"No channel is available for the assigned document name... not configured in any IMS channel"`. Confirmed case: `Process.DSVM3ImportStockCorrection` (DSV NL Stock Correction flow) vanished from EC Config → Documents in TRN after ~2 months in production, while the ION connection point still showed the document correctly (config there was not the problem — the gap was purely on the M3/IEC side). Per the M3 Core Admin Guide, this entry cannot be deleted while its Send/Receive checkboxes are checked, so a disappearance implies either a deliberate two-step removal or an environment-level event (refresh/restore/patch) — root cause not confirmed in this case. **Fix: republish the underlying IEC mapping** — this automatically recreates the missing Documents entry and its channel (e.g. `IMSBODIn`). The Documents tab's Add button exists but cannot be used to manually recreate the entry, since a document entry requires an underlying IEC mapping/schema link, not just a name. When troubleshooting this error, check EC Config → Documents on other environments (e.g. PRD) where the same flow runs — if present there but missing only in TRN, it points to an environment-specific refresh/restore rather than a global mapping issue.

---

### 14.10 Customer-Specific Context — Other Fortude Accounts (Not KL)

> **Note (added for KL Cloud Migration project copy of this file):** Everything below in this section is customer-state for other Fortude ION/OS engagements (Hydrite, CNG, Steve Madden, H.H. Brown, NewStore, DSV NL) — not KL-specific. Kept for pattern reference (flow architecture, gotcha precedent) rather than stripped. KL-specific ION/OS project state should be tracked in a separate KL context file, not added here.

#### Hydrite Chemical
- **Project**: SealTracker (DF_PrtSealTracker)
- **Pattern**: M3 print → IDM archive + physical print + email
- **Programs**: MMS480PF (Delivery Note), OIS641PF (Pro Forma Invoice), MWS616PF (Warehouse Loading)
- **IDM Connection Point**: `AC_LIS602PFWasteLabel_IDM`
- **File CP**: `file_IDM_XML`
- **Known cosmetic issue**: Archived docs show "Waste zzService" as Created By — OAuth service account display name. Fix: rename service account display name in Infor OS. Pending Derek/Rick decision.
- **Open issue**: MWS616PF Media-stripping causing complete job failure — root cause unresolved
- **Stakeholders**: Derek, Rick (client), Srija Sivakumar (testing)

#### CNG (Central National Gottesman)
- **Project**: EXT120 Item Creation Email Workflow (WF_TriggerEXT120Email)
- **Pattern**: EXT121MI triggers workflow → ION API fetches EXT120 data → builds clickable URL → email notification
- **PRD values**: TENANT = `RSH9R79DG6BC6P8R_PRD`, UUID = `2a181d1f-9053-485c-99d3-64794f69b94b`
- **CONO**: 100 (PRD), 500 (TST)
- **API path**: `M3/m3api-rest/v2/execute/EXT121MI/GetNewRequest`
- **Response path**: `$.results[0].records[0].FIELDNAME`
- **ION Script**: `buildURL` (takes RQNO, returns URL string)
- **Status**: Deployed to PRD and working as of June 2026. Service account needs .ionapi per env.
- **Data flow**: DF_PackageETRNDetails (Sync BOD → CBR_FILTER → WF_SendPackageETRNDetails or WF_PackageETRNDetails_Error)

#### Steve Madden
- **EU and Americas** implementations
- **NUOrder integration** (FTD012_SME_ORDER_NUORDER_M3): OAuth poll → JSON split → MEC → status writeback
- **MEC PO Receipt mapping** (SM_POASNReceiptCasePack): SQL JOIN on mpline/mphead, BANO via CASE WHEN, MHS850MI/AddPOReceipt
- **Consultant**: Prabhath (requirements)

#### H.H. Brown
- **Flows**: Transfer_OIS606PF_to_IDM, Transfer_OIS199PF_to_IDM, DL_FlagCOLines
- **Pattern**: CFT AWS SharedFolder → XML Mapper → IDM | Data Lake → JSON→XML → IEC
- **Custom BOD nouns**: `ORDCONFIRMOIS606PF`, `InvoiceOIS199PF` (M3 EDI BODs, not standard OAGIS)

#### NewStore
- **Flows**: DF_NewStore_SalesOrder_TO_M3, DF_NewStore_FulfillmentCompleted_to_M3
- **Pattern**: SFTP JSON → SCRIPTING → M3 APPLICATION (DOCUMENT_FLOW)
- **SalesOrder verb**: Load (no Acknowledge needed)
- **FulfillmentCompleted verb**: Sync

#### DSV NL
- **Pending**: CRS881MI translation table entry (MBMD=1202+, ELMD=TransactionReason, EXTP=DSV_NL)
- **Status**: Awaiting M3 reason code confirmation from Prabhath

---

### 14.11 Updating This Skill

When new patterns, gotchas, or customer developments are completed:
1. At end of the session, say "update the skill file with what we learned"
2. I will produce an updated version of this file
3. Download it and replace the existing file in the project Files section

Sections most likely to grow: Section 9 (Gotchas), Section 10 (Customer context), Section 5 (new flow patterns).

---

### 14.12 API Gateway Policies (NEW)

Policies are applied to API suites or individual endpoints in API Gateway to control traffic, transform data, and enforce security. Configured via Admin UI or XML.

#### Throttling Policy
Controls request rate. Two mechanisms:
- **Rate Smoothing**: delays requests after N requests in a time window. Config: `<delayAfterCount>`, `<delayFactorInMilliseconds>`.
- **Spike Arrest**: rejects requests exceeding a max count with HTTP 429. Config: `<maxRequestsPerPeriod>`.

```xml
<throttling name="throttling-example" enabled="true" version="1.0">
  <timePeriodInMilliseconds>60000</timePeriodInMilliseconds>
  <rateSmoothing>
    <delayAfterCount>5</delayAfterCount>
    <delayFactorInMilliseconds>1000</delayFactorInMilliseconds>
  </rateSmoothing>
  <spikeArrest>
    <maxRequestsPerPeriod>20</maxRequestsPerPeriod>
  </spikeArrest>
</throttling>
```

#### Quota Policy
Enforces a maximum number of API calls per app over a defined period. Enforced at tenant level when using client credentials grant (no user context available).

#### Header Policy
Inject, modify, or remove HTTP headers on requests or responses passing through API Gateway. Used to pass contextual values to backend services without modifying the client.

#### Transformation Policy (Handlebars-based)
Transforms request or response payloads using Handlebars templates. Supports:
- XML → JSON conversion
- JSONPath field extraction and restructuring
- URL path modification (`{{trimUrlPath}}`)
- Mathematical helpers: `{{sum}}`, `{{min}}`, `{{max}}`, `{{avg}}`, `{{median}}`
- String helpers: `{{uppercase}}`, `{{lowercase}}`, `{{length}}`
- Context access: `{{requestVars 'context.user.Identity2'}}`, `{{responseVars 'response.status'}}`
- Set headers/query params: `{{SetReqHeader 'name' value}}`, `{{SetReqQuery 'name' value}}`

`continueOnError="true"` — passes through original payload if transformation fails instead of returning error.

Apply in request flow (before backend call) or response flow (after backend response).

#### UserSecurityClaims Policy
Retrieves IFS user claims and injects them as HTTP headers on the outbound request to the backend, so backend services don't need to validate the token themselves.

Common claims:
- `http://schemas.infor.com/claims/SecurityRole` → inject as `roles` header
- `http://schemas.infor.com/claims/AccountingEntity` → inject as `accounting-entity` header

Supports include/exclude filters (regex supported) and `maxItems` to cap number of role values.

**Critical**: Does NOT work with client credentials grant — that grant has no user context, so no user claims exist. Only use with grants that include user authentication (SAML Bearer, Authorization Code, Implicit, Resource Owner).

#### Target Timeout Policy
Configures how long API GW waits for a backend response before returning a timeout error. Apply when backend APIs have long-running operations.

#### OAuth 2.0 Scope Enforcement
Two-toggle system at tenant + app level:
1. **Enable Scopes per authorized app** — tenant-wide setting; enables scope selection list on Authorized Apps page.
2. **Enforce Scopes** — per-app setting; when enabled, gateway validates scope on every request. If required scope missing from token → HTTP 403.

**Configuration steps for a backend service app:**
1. Turn on "Enable Scopes per authorized app" in API GW → Configuration → OAuth 2.0 Settings.
2. Assign required scopes to the authorized app on the Authorized Apps page.
3. Assign the same scopes to the service account in IFS Security.
4. Turn on "Enforce Scopes" on the authorized app.
5. Include the scopes in each token request (space-delimited in `scope` parameter).
6. Request a new token and verify its `scope` field in the response.

**Scope types:**
- Standard Infor scopes — for Infor-provisioned and Non-Infor API Suites; enabled via Infor Registry.
- Custom scopes — for Non-Infor API Suites; created and associated in API GW UI. Max 100 custom scopes per tenant.

#### Auditing API Gateway Events
API GW publishes all configuration change events to Infor OS Security Auditing and Monitoring.

To view: OS → Security → Auditing and Monitoring → Audit Event Search → filter by Logical ID `lid://infor.ionapi.ionapi`.

Required roles: `IFS-AuditReportUser` or `IFS-AuditAdministrator`.

Audited events include: authorized app create/edit/delete/download credentials, API suite create/update/delete, policy changes, TLS config changes, scope changes.

---

### 14.13 IFS Security Roles Reference (NEW)

Complete reference of standard Infor OS security roles relevant to ION/OS/IDM work.

#### IFS Core Roles
| Role | What It Grants |
|---|---|
| `Infor-SystemAdministrator` | System-wide admin across all Infor applications. Cannot be self-removed. |
| `IFS-UserAdmin` | Manage users, ERP person IDs, contact groups, service accounts, SCIM accounts. |
| `DataAdministrator` | Manage security roles, accounting entities, locations, custom master data types, document authorizations. |
| `IFSAdminContact` | Included in administrative notification emails. |
| `IFS-AuditAdministrator` | Configure audit report settings and view audit reports. |
| `IFS-AuditReportUser` | View-only access to audit event search. |
| `IFS-MonitorAdministrator` | Configure monitoring report settings. |
| `IFS-MonitorReportUser` | View-only access to monitoring event search. |
| `IFS-PasswordAdmin` | Manage passwords for all users. |
| `IFS-EEPasswordAdmin` | Manage external passwords for users. |
| `IFS-ReadOnlyUser` | Read-only view of users — cannot edit or delete. |
| `IFS-ReadOnly` | Read-only across all Manage pages; can export. |

#### Infor OS Portal Roles
| Role | What It Grants |
|---|---|
| `Infor-SuiteUser` | Default end-user role. Access to portal only. No ION-related features. |
| `MingleAdministrator` | Portal admin: manage applications, widgets, pages, workspaces, drillbacks. |
| `Portal-ContentAdministrator` | Create/edit/delete any published workspaces or widgets. |

#### ION Roles
| Role | What It Grants |
|---|---|
| `IONDeskAdmin` | Full access to ION Desk except security admin pages. Model and manage flows. |
| `IONDeskSecurityAdmin` | Create profiles controlling ION Desk access levels; link to IFS roles. |
| `IONContentProvider` | Export protected content from ION Desk. |
| `IONDeskOAuthGenerator` | Generate OAuth credentials in ION Desk. |

#### API Gateway Roles
| Role | IONAPI-Administrator | IONAPI-Tracing | IONAPI-User |
|---|---|---|---|
| View APIs | ✓ | ✓ | ✓ |
| Use APIs | ✓ | ✓ | ✓ |
| View/Download credentials | ✓ | ✓ | ✓ |
| Import/Export APIs | ✓ | | |
| Add/Edit/Delete API & Apps | ✓ | | |
| Edit general settings | ✓ | | |
| Monitoring UI | ✓ | ✓ | |
| Tenant-level auth/revoke | ✓ | | |

Additional BaaS-specific roles:
- `IONAPI-BaaS-Administrator` — manage deployed BaaS services (import/export/delete)
- `IONAPI-BaaS-Developer` — build and deploy BaaS services via SDK
- `IONAPI-BaaS-DataAdministrator` — manage BaaS service storage and Cassandra data
- `IONAPI-BaaS-User` — view deployed BaaS services

#### IDM / Document Management Roles
| Role | What It Grants |
|---|---|
| `IDM-User` | Required for IDM UI and API access. Grants access to all docs without specific ACL restrictions. |
| `IDM-AdvancedUser` | Mass update, mass delete, export. Includes IDM-User. Use carefully. |
| `IDM-Administrator` | Create/alter document types, configure IDM. Includes IDM-AdvancedUser. |
| `IDM-SuperUser` | **Bypasses ACL entirely** — full access to all documents regardless of ACL. Use with extreme caution. Includes IDM-User. |
| `IDM-RelatedInformationUser` | Access to Document Management Related Information contextual app only. |

#### Functional Security Roles
Separate from standard security roles — define access to specific business functions within applications.
- **Assigning a functional role does NOT automatically grant app access** — user must also have the appropriate security role.
- Functional roles supplement or restrict access granted by standard roles.

---

### 14.14 Infor OS Security — Administration Reference (NEW)

#### Service Accounts vs Service Users
- **Service Account**: created under Manage → Service Accounts. Used by applications to obtain OAuth tokens (Resource Owner grant). Generates an access key + secret key pair. For ION API calls from data flows/workflows.
- **Service User**: a human-type user record used as a service identity in some scenarios. Has security roles, accounting entities, locations, groups tabs — similar to a regular user but designated as a service identity.

#### Service Account — Key Facts
- Credentials (access key + secret key) are **downloadable only once** at creation time. If lost, delete and recreate.
- Supports Resource Owner grant only.
- Only publishes **Sync.BOD** — Process.BOD is not supported.
- Can be Enabled/Disabled without deletion.
- Disabling a service account immediately prevents any application using it from obtaining new tokens.

#### M3 User Alias
- Max 10 characters, uppercase only.
- UTF-8 supported except: `( / ? < > \ : * | " )`
- **Cannot be changed once set** — if set incorrectly, a new user/service user must be created.
- Defined as optional or mandatory in Metadata → User Properties.

#### MFA (Multi-Factor Authentication)
- Max **3 devices** per user.
- Admin can reset MFA for a user: sets status to Enabled, resets device count to 0, removes all registered devices.
- **Users cannot reset their own MFA.**
- MFA columns visible in user grid when MFA is enabled for the tenant: Last MFA Login, No. of MFA Registered, MFA Status.

#### SCIM (System for Cross-domain Identity Management)
- Used to load users from third-party LDAP/directory systems into Infor OS Portal automatically.
- Infor OS works with **Microsoft Active Directory** natively; SCIM enables connection to generic LDAP providers.
- SCIM credentials (user identifier + password) are separate from regular user credentials.

#### Security Overview Dashboard
Shows compliance status:
- **MFA** — Green = enabled; Red = disabled.
- **Service Accounts** — Green = at least one created and in use; Red = none.

---

### 14.15 M3 Cloud Architecture — Deployment Types (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024

#### Three Architecture Types
| Type | Description |
|---|---|
| **On-premises** | Customer owns servers, network, database. N-tier architecture for scalability. LCM used for administration. |
| **Single Tenant (ST)** | Cloud-hosted but dedicated instance per customer. Customer gets own environment. |
| **Multi-Tenant (MT)** | Single shared software instance serves multiple customers. Logical data isolation per tenant. No customisations allowed at code level. |
| **Hybrid** | MT combined with ST. Requires a customer-specific reference architecture. |

#### Multi-Tenant Key Facts
- Runs on **global AWS platform** — Infor maintains a **Virtual Private Cloud (VPC) per CloudSuite** so upgrades to one CloudSuite do not impact others.
- **Elasticity** via **AWS Elastic Load Balancer (ELB)** and **Elastic Compute Cloud (EC2)** — auto-scales capacity up/down to accommodate tenant changes.
- Data is **logically isolated** and invisible between tenants.
- Infor DevOps team monitors and maintains the MT farm — customers do not touch infrastructure.
- A **topology diagram** documents all interactions within a specific RA module (e.g. M3 Cloud Core). Each application block has its own topology diagram.

#### When a Customer-Specific Reference Architecture is Required
- Hybrid deals (MT + on-premises combination).
- Two or more cloud applications integrated together (e.g. M3 CE + Infor Factory Track, or M3 CE + Infor CPQ).

#### On-Premises N-Tier Architecture Advantages
- Industry standards: Java runtime, LDAP for security.
- Robust scalability — supports millions of transactions per hour, 24/7 high availability.
- Full role-based security, audit trails, document archiving.
- Full API/Web Services/XML/EDI access for interoperability.
- Grid-enabled — LCM provides runtime overview, alerts, patch management.

#### M3 CE Cloud Value Points
- **Single version of the software** — Infor maintains it; no major customer-driven upgrades.
- New functionality injected monthly; customers can test in TRN and toggle on in PRD when ready.
- Deployed and provisioned on AWS — low TCO, reduced operating expenses.
- Best-in-class resilience: fault-tolerant infrastructure with backup regimes for low RPO.

---

### 14.16 M3 H5 Extensibility Tools — Comparison Reference (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024

| Tool | Programming Skill Required | Key Use Cases |
|---|---|---|
| **Custom Fields** | None | Add fields to existing M3 panel; read/write data to open panel fields; logic at Presentation Layer |
| **Custom List** | None | Add column from key/other tables; create custom M3 APIs |
| **Mforms Automation** | None | Read/write data to M3 panel fields when panel is NOT open |
| **H5 Script** | JavaScript | Add fields to panel; read/write open panel fields; call M3 APIs; call ION APIs; custom business logic; trigger Workflows; read/write files; add columns from tables |
| **Experience Designer** | None | Configure your own M3 applications without coding |
| **XtendM3** | Groovy | Read/write open panel fields; call M3 APIs; call ION APIs; custom logic; read/write files; logic at Application Layer; add columns; create custom tables; CRUD on M3 database; create custom M3 APIs |

#### Context: SaaS vs On-Premises Extensibility
- On-premises M3 historically supported **source code modification** via tools like M3 Adapter Kit (MAK) and H5/Smart Office personalization.
- In M3 CE (SaaS/cloud), **source code modification is no longer supported**.
- Personalization via Infor OS is fully supported with extended functionality.
- Cloud multi-tenancy means no single customer's extension can impact stability or performance for other tenants, and extensions must not block continuous delivery updates.

#### M3 H5 Feature Highlights
- HTML5-based web client — no local installation required for users.
- Supports multiple browsers and devices.
- Bookmarks, shortcuts, drillbacks, context publishing to contextual web parts (JSON format).
- ION Enterprise Search capabilities within functions.
- Export to Microsoft Excel from H5 client.
- Can run standalone or embedded inside Infor OS Portal.
- Supports web mashups and M3 H5 SDK for programming extensions.
- Personalizations stored on the **M3 UI Adapter server**; applied when a program starts.

#### H5 Personalization Categories
Visual changes: conditional styles, label texts, show/hide fields.
Behavior changes: hyperlinks in lists, links in toolbox area, panel order, tab order, scripts, saved searches, document links.

---

### 14.17 Infor OS Portal — Feature Reference (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024

Infor OS Portal is the **single point of entry for all Infor applications**. Administrators can configure it to also host non-Infor applications.

#### Portal Features Available to All Hosted Applications
- **Single sign-on (SSO) and single logout** across all hosted apps.
- Standardised UI/UX: context sharing, shortcuts, drill backs, context utilities.
- Ability to run **multiple applications simultaneously**.
- Support for multiple deployment modes: Infor provisioned and Infor non-provisioned.

#### M3 Workspace Widgets (activated when M3 runs inside Infor OS)
| Widget | Purpose |
|---|---|
| **M3 Menus** | Navigation menu for M3 programs |
| **M3 Application Messages** | Displays M3 system messages |
| **M3 Information Viewer** | Generic configurable viewer of M3 data |
| **M3 Monitor** | Generic monitor — displays aggregated M3 data as alerts |
| **M3 Environment** | Environment/company selector |
| **M3 Information Editor** | Like Viewer but allows editing |
| **M3 Information Creator** | Like Viewer but for creating new records |

Custom widgets can be created by duplicating and modifying existing widgets; they can be locked or configurable, shared or private.

#### Infor Search (IES — Infor Enterprise Search) in H5
Two search types:
- **Narrow-down (functional) search** — runs within an M3 function, searches within relevant context, no need to know system-specific field names.
- **Cross-application search** — searches across M3 and other Infor applications.

Saved searches can be used as to-do lists; Alert widgets can direct users to programs requiring action.

---

### 14.18 Event Hub and Event Analytics — Detailed Mechanics (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024

#### Event Hub
- A **publisher-subscriber framework** (generic grid extension) for sending events between Infor applications.
- Publishers and subscribers use simple Java classes; **performance penalty is very low** — safe to implement without impacting end-user performance.
- **Metadata-driven by subscriptions** — publisher application code does not need to change per customer (supports mods-free applications).
- Publishers and subscribers can **dynamically connect and disconnect**.
- If a subscriber goes down, the Event Hub **persists new event data** until the subscriber reconnects — no event loss.
- Triggers: any M3 database operation (create, update, delete on most M3 DB records), entering/exiting a program or panel.

#### Event Analytics
- Sits **between Event Hub and IEC** — receives events from Event Hub, filters/processes them, posts refined events back.
- Uses **Drools Expert by JBoss** as its rules engine.
- Events are inserted into the rules engine as **facts**; rules fire based on matching filter conditions.
- Rules can be based on events, time, or custom-declared fact types.
- A rule can: post events back to Event Hub, create new events, store data, execute Java code.
- Example use: fire only when M3 item status changes from <20 to exactly 20 (item released) — ignore all other status updates.
- Contains a **TimeCorrelation** mechanism for time-based event correlation.

#### M3 BOD Publishing Chain (full flow)
```
M3 BE database change
  → Event Hub (raw DB event)
  → Event Analytics (filter/enrich events via Drools rules)
  → IEC (receives filtered event, builds BOD)
  → ION (routes BOD to subscribers)
```

---

### 14.19 IEC (Infor Enterprise Collaborator) — Full Definition (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024

IEC is a **lightweight message broker** and Infor M3 integration platform. It enables communication and integration of M3 with internal and external resources through passing of messages/documents (XML or flat file), and provides message-based integration between M3 and other external applications.

IEC includes:
- Ready-made, industry-standard interfaces (business messages).
- Enabling technology and flexible development tools.

#### IEC Tool Sets

**Client tools (development-time):**
| Tool | Purpose |
|---|---|
| **Mapper** | Map M3 data to outbound/inbound XML or flat file structures |
| **Designer** | Design IEC message flows and routing |
| **Flat File Repository Manager (FFRM)** | Develop flat file definitions (FFDs) for transforming flat files to/from XML |

**Server tools (runtime administration):**
| Tool | Purpose |
|---|---|
| **Enterprise Collaborator Administration** | Web-based tool for managing server activities: messages, server config, communication, events |

#### IEC Role in M3 ION Enablement
IEC is one of the two components of M3 BE ION enablement (the other being Event Hub/Event Analytics). IEC receives events from Event Hub/EA, **builds the BOD**, and sends it to ION. On the inbound side, IEC receives BODs from ION and maps them to M3 API calls.

---

### 14.20 Interactive Program Services (IPS) — Full Reference

Sources: M3 Core Administration Guide 2026.x (m3coretech_2026.x_m3cecoreag_cloud_en-us), M3 Cloud Introducing the Technology Workbook 2024, Fazlan Haniffa LinkedIn post (practical use case)

IPS is a tool built into M3 BE that enables **automated execution of interactive M3 BE programs without using the UI**.

#### How It Works
- Create a **service** containing all required metadata using the **IPS Designer** (web-based UI).
- The service is exposed as a **SOAP web service**.
- A SOAP request is sent to M3 BE with input variables; the result is returned in a SOAP response.
- Legacy MPD format (from the old M3 Web Services tool) is also supported via REST API.

#### Key Facts
- IPS **replaces the old M3 Web Services M3 Program Definition (MPD)** — MWS was available in versions prior to M3 CE.
- Legacy MWS MPDs **can be imported** into IPS (auto-converted from `.mpd` to `.json` on import).
- **Rule**: if an MI program or transaction already exists for the target M3 BE program, **use MI instead of creating an IPS web service** — MI is simpler and the preferred approach. The IPS Designer itself will warn you if a corresponding MI program exists when you try to add a program.
- IPS is used when you need to automate an interactive program for which **no MI exists**.
- An IPS web service scripts the current state of an M3 BE program — if the M3 BE program is modified later, the IPS web service **may need to be updated** to continue working.

#### IPS Access
- Accessed via **Administration Tools > Business Engine Interactive Program Services** from the M3 menu in Infor OS Portal.
- Requires `M3BE-ServicesAdmin` IFS role (note: "Services" is plural — common typo to write "ServiceAdmin").

#### Preparation Before Building an IPS Service
Before opening the IPS Designer, do this groundwork manually:
1. Run the target M3 BE program in H5 / Infor OS Portal and walk through the full program flow you want to automate.
2. Note every **panel** the flow passes through and the **function key** used to move between panels (e.g. ENTER, F3).
3. Note the **input fields** on each panel that control the flow — these are typically on the A and B panels.
4. Note the **output fields** you want to extract.
5. To get the exact field ID of any H5 field: hover over the field and press **F1**. Use this field ID in the IPS Designer to ensure the correct field is mapped.

#### Building Blocks Hierarchy
```
Service
  └── Method
        └── Program(s)  [one Main + optional Subprograms]
              ├── Panel Sequence
              ├── Input Parameters
              └── Output Parameters
```
- **Service** — the container; holds one or more methods. Created with a Name and System Configuration.
- **Method** — defines which program(s) to execute and their relationship. One main program is always the starting point; subprograms can be added.
- **Program** — defines the panel sequence to follow plus the input/output parameters for that program.

#### Panel Sequence
Each entry in the panel sequence is a **Panel + Function Key** pair:
- Example: Panel A → ENTER, Panel E → F3
- The sequence you define determines which input and output fields become available.
- Panels can be reordered with Up/Down buttons.

#### Input Parameter Constraints
When adding fields to Selected Inputs, each field must be assigned a **Constraint**:

| Constraint | Behaviour |
|---|---|
| `CONSTANT` | Value is hardcoded in the service definition; the SOAP caller **cannot override** it. Use for fixed values (e.g. Option=5, PanelSeq=E). |
| `MANDATORY` | The SOAP caller **must supply** this value at runtime. |
| `OPTIONAL` | The SOAP caller **may supply** this value; if not provided, the Default Value is used. |

A Default Value can be set for CONSTANT and OPTIONAL fields.

#### Output Parameters
Select fields from Available Outputs → Selected Outputs. These are returned in the SOAP response after execution.

#### Example Service Definition (CRS055 — Currency Display)
| Definition | Value |
|---|---|
| Service | CRS055Demo |
| Method | Display |
| Wrapped program(s) | CRS055 |
| Panel Sequence | A (ENTER), E (F3) |
| Input | WQCUCD — A-Panel, Mandatory |
| Input | WWOPT2 — A-Panel, CONSTANT=5 |
| Input | WWPSEQ — A-Panel, CONSTANT=E |
| Output | WTTX40 — E-Panel |

#### Testing a Web Service
- Create a named test case inside the Designer (New > Test Case).
- **Critical**: save the service before executing a test — the test runs against the **saved** version, not the current unsaved state.
- Supply Company/Division and input values, then click Execute Service.

#### Export / Import
- **Export**: File > Export → produces a `.json` file.
- **Import**: File > Import → accepts `.json` (standard) or `.mpd` (legacy M3 Web Services format, auto-converted to `.json` on import).
- **Rename**: File > Rename (load the service first).
- **Delete**: File > Delete (irreversible — warning is shown).

#### Consuming the IPS Service (ION API Endpoint)
After an IPS definition is saved/imported, it is published in ION API at:
```
<server-access-path>/M3/ips/<servicename>
```
The server access path is environment-specific — obtain from the system administrator.

#### Practical Integration Pattern (IPS in a Full ION Pipeline)
IPS is rarely called directly in isolation. The typical production pattern when there is no MI for an operation:

1. **IPS** — create the web service for the M3 program action (e.g. close a DO via MMS480).
2. **ION API** — the IPS endpoint is exposed and called via ION API Suite.
3. **MNS260 (Schedule Jobs)** — create a scheduled job to trigger the process (e.g. nightly).
4. **Event Analytics** — create an event trigger on the scheduled job.
5. **Custom BOD (XtendM3 or similar)** — reads the M3 table for eligible records and publishes a BOD containing all records to process.
6. **ION Data Flow** — splits the custom BOD per record and calls an ION Workflow for each.
7. **ION Workflow** — calls the ION API (backed by the IPS service) to perform the M3 action on each record.

Use case example: auto-close Distribution Orders older than 30 days that have not been delivered (no standard MI exists for DO closure).

---

### 14.21 M3 BE Administration Tools — CE Reference (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024

In M3 CE (Cloud Edition), the old **LifeCycle Manager (LCM)** client is no longer used for administration. It is replaced by a **web-based Admin UI** accessed via the Infor M3 menu in Infor OS.

Note: not all LCM tasks have been migrated — some were made redundant by CE redesign (e.g. MCP/MCE update tasks are now automated).

#### Administration Tools Available in M3 CE

| Tool | Purpose |
|---|---|
| **Business Engine Jobs** | View, kill, configure logging/log levels and profiling for M3 BE jobs. Per-user and all-users views. |
| **Business Engine Logs** | View and download BE dump logs via browser; open with any text editor. |
| **Business Engine Configuration Data** | Import configuration data (e.g. ad hoc reporting data) from a `.zip` file to the BE database. Exported tab shows files exported via M3 programs; Content tab shows files delivered by Infor automatically at tenant creation or maintenance updates. First introduced in M3 13.2. |
| **Business Engine Data Management** | Read and write operations on the M3 BE database directly (requires appropriate role). |
| **Business Engine Files** | Manage configuration data and export files. |
| **Business Engine Field Audit Trail** | Enable and manage field-level audit logging on M3 database fields. |
| **Business Engine Authentication** | Manage BE authentication settings. |
| **MetaData Publisher (MDP)** | Publish metadata updates. |
| **M3CE About** | Version and environment information for the M3 CE tenant. |

Access to each tool is controlled by IFS roles — the Administration Tools submenu entries are only visible to users with the required role assigned.

---

### 14.22 M3 BE IFS Security Roles (NEW)

Source: M3 Cloud Introducing the Technology Workbook 2024 / Infor OS Admin Training 2023

These roles are **M3 Business Engine-specific** and supplement the general Infor OS roles listed in Section 13.

#### Business Engine Jobs and Logs
| Role | What It Grants |
|---|---|
| `M3BE-FndAdmin` | List/kill/configure logging, log levels, and profiling for **all** BE jobs; download logs for any BE user. |
| `M3BE-FndUser` | List/kill **own** BE jobs only; download own dump logs. |
| `M3BE-LogEnabler` | Configure logging, log levels, and profiling for **own** BE jobs only. |

#### Business Engine Configuration Data
| Role | What It Grants |
|---|---|
| `M3BE-ConfigAdmin` | Import BE configuration data as any M3 user; manage configuration data files on BE Files page. |
| `M3BE-ConfigUser` | Import configuration data; view and download configuration data files on BE Files page. |

#### Business Engine Database Management
| Role | What It Grants |
|---|---|
| `M3BE-DBViewer` | Read-only operations on M3 BE database via Update Database admin tool. |
| `M3BE-DBAdmin` | Read and write operations on M3 BE database; manage BE data management files on BE Files page. |
| `M3BE-DBAdmin-ReadToken` | Create and revoke read tokens required for direct data copy in BE Data Management pages. |

#### Business Engine Field Audit Trail
| Role | What It Grants |
|---|---|
| `M3BE-FATAdmin` | Administer field audits on BE Field Audit Trail page. |
| `M3BE-FATAdmin-Exporter` | Export field audit data; manage FAT export files on BE Files page. |

#### Interactive Program Services
| Role | What It Grants |
|---|---|
| `M3BE-ServiceAdmin` | Administer interactive program services on the BE Interactive Program Services page. |


### 14.23 Enterprise Connector (EC) — MT Cloud Only (NEW)

Source: Infor OS Foundation Differences for Multi-Tenant Workbook, Dec 2025

#### What It Is
The Enterprise Connector bridges ION Cloud Edition (CE) and on-premises resources — file shares, databases, application servers — **without requiring any inbound firewall ports**. Only port 443 outbound from the on-prem server is needed. **Available only in MT/CE environments** (not available on-prem or ST). Access: OS > ION > Connect menu. Requires `IONDeskAdmin` role to provision Enterprise Locations.

#### How It Works
- EC is a **Java JAR installer** that runs on the on-premises server.
- Uses **AWS SQS** (asynchronous queuing service) to relay messages between on-prem resources and ION Cloud.
- Uses **SQL or PostgreSQL** for its local database tables.
- EC is **grid-enabled** — exposes a web-based Grid UI on the server. Default Grid ports: **28089, 28090, 28091** (changeable if ports conflict).

#### Key Rules
- **One tenant per EC physical instance** — you cannot have two tenants using the same EC. Each tenant needs its own EC install.
- EC must be updated **manually** with each Infor OS release if a new EC version is packaged in that release.
- Install EC **as close to the resources it serves as possible** (fewest network hops = best performance).
- Automate installation and upgrade via script (supports headless/Windows Core installs with no GUI).

#### When to Use Multiple EC Instances
Use additional EC instances when:
- Resources span different **domains or countries**.
- Data volumes are high: **> TB/year**, **> 10 GB/day**, or **> 100K messages/day**.

#### Supported Connectors
EC works with: File, Application, Database, Message Queue, IMS, LN.
When opening any of these connectors in an MT environment, a **Location** dropdown appears — select the EC location for the on-prem resource.

#### Enterprise Locations and Credentials
- Define an **Enterprise Location** in ION first (OS > ION > Connect > Enterprise Locations): name it, provision it.
- Credentials = **LocationID** + **Location Secret Key** (downloadable as a CSV file).
- **Credentials can be regenerated** if lost: highlight the Enterprise Location and click **Recreate Credentials**.
- **Red entries** on the Enterprise Locations page = EC version is outdated and needs an update.
- Status columns show: Connection Status, Version, Host name, and how many connectors/services are using the EC.

#### EC + IDM Cloud Print
EC enables printing from IDM directly to a local on-premises printer (Document Management Cloud Print feature):
- **Windows only** — not supported on Linux.
- Application sends an XML file to IDM with the print layout definition.
- Print requests are **asynchronous** — multiple requests can be queued without waiting for each response.

---

### 14.24 ION Messaging Service (IMS) — Reference (NEW)

Source: Infor OS Foundation Differences for Multi-Tenant Workbook, Dec 2025

#### What IMS Is
IMS is a connector that allows applications to integrate with ION through REST/JSON APIs **without requiring direct database access** (unlike the IO Box connector which uses JDBC to shared tables). IMS communicates via secured HTTPS, OAuth 1.0, or ION API for authentication.

IMS supports document types: BOD, JSON, ANY, DSV.

#### Two IMS Connection Point Types
| Type | Requires EC? | Requires direct network? | Failure retry |
|---|---|---|---|
| **IMS (via EC)** | Yes — EC must be installed on-prem | No VPN/firewall changes needed; bi-directional via port 443 outbound | ION retries automatically |
| **IMS via API Gateway** | No | Yes — secure direct connection; one-way needs no VPN; two-way needs DMZ port exposure | **Client application must retry** |

**When to use which:**
- Use **IMS via EC** for Infor applications or custom software with high-reliability queuing requirements.
- Use **IMS via API Gateway** for third-party cloud apps where a direct HTTPS connection is feasible and you don't want EC overhead.

#### IMS from the ION Perspective (Setup)
- In ION > Connect > Connection Points, select **Add Connection Point** → choose **IMS** or **IMS via API Gateway**.
- On the Connection tab, check **Application has IMS End Point**.
- The IMS Endpoint fields become mandatory — fill in Target Endpoint details and import service account credentials.
- For IMS via API Gateway: import the Swagger for the target app's IMS services (`/ping`, `/protocol`, `/v3/multipartmessage`).
- For a Backend Service Authorized App (required for IMS via API Gateway): create app in API Gateway → download .ionapi file → the **ClientID (`ci`)** property value is the key required field.

#### IMS API: /v3/multipartmessage Parameters
The primary message service for IMS v3. Requires two parameters per call:
- **ParameterRequest** (JSON): message header attributes ION reads.
- **MessagePayload**: the actual document content.

**ParameterRequest required properties:**
| Property | Description |
|---|---|
| `documentName` | Registered object schema name in the Data Catalog |
| `fromLogicalId` | Logical ID from the IMS via API Gateway connection point in ION |
| `encoding` | `"NONE"`, `"GZIP"`, or `"DEFLATE"` |
| `characterSet` | `"UTF-8"` only |

**ParameterRequest optional properties (treat marked ones as required in practice):**
| Property | Description |
|---|---|
| `messageId`* | Unique ID for this message. If blank, ION generates one. |
| `toLogicalId`* | Default: `"lid://default"` |
| `documentId`* | ID for the data payload — enables troubleshooting in OneView |
| `variationId`* | Ensures same-type data is processed sequentially by applications |
| `instances`* | Number of unique records in the document |

**Batch properties** (for large data split across multiple files):
`batchId`, `batchSequence`, `batchSize`, `batchRevision`, `batchAbortIndicator`

#### IMS API: /v2/message
Older service (compatible with v1). Single `message` parameter — JSON or XML payload with document content embedded. If using JSON, base64 encoding may be required to remain JSON-compliant.

#### IO Box — Contrast with IMS
For context: IO Box (Inbox/Outbox connector) uses **JDBC** to shared database tables.
- **Outbox**: application writes messages here → ION owns and clears the outbox.
- **Inbox**: ION writes messages here → application owns and must consume + clear the inbox.
- No additional libraries needed; tables are created by OS-supplied scripts directly in the app's database.
IMS is the **cloud successor to IO Box** — same role, no database access required.

---

### 14.25 API Flows — ION API Orchestration (NEW)

Source: Infor OS Foundation Differences for Multi-Tenant Workbook, Dec 2025

#### What API Flows Are
ION API Flows (also called API Orchestration) allow multiple API calls to be **chained together with logical elements** into a single **fully synchronous** flow. The entire chain executes as one API call from the caller's perspective.

Each API Flow is **exposed as a new ION API** in API Gateway — discoverable, secured, and documented like any other Infor API.

**Example use cases:**
- Get employee details by name: chain "Get Employee GUID" → "Get Details by GUID".
- Look up data from multiple systems: original input → System A → System B → combined output.
- Retrieve a maintenance schedule for an employee's company car from three separate systems in one call.

#### Architecture
- Modelled within ION Desk (same UI as Document/Data Flows).
- Follows the same lifecycle: Draft → Test → Activate.
- Timeline and usage details visible in API Gateway Monitoring section.
- Subject to same security policies as other ION APIs.
- Supports debug/monitoring of running API flows.

#### Variables in API Flow Modeling
| Variable Type | Syntax | Scope |
|---|---|---|
| Global input variables | `${input.<Parameter>}` | Defined at flow level; available throughout |
| Local (step) variables | `${<step name>.<Parameter>}` | Defined per step; available throughout the whole flow |

All variables are available across the entire flow context (not just their defining step). Each variable name must be unique across the flow. Values from request/response bodies are addressed by JSONPath within variable expressions.

#### Key Rules
- API Flows are **synchronous by default** — the caller waits for the full chain to complete.
- Ability to test individual steps while still in modeling phase.
- API Flows appear as a suite tile in API Gateway (only visible once at least one active API Flow exists — may need browser refresh).

---

### 14.26 Infor Data Fabric — Reference (NEW)

Source: Infor OS Foundation Differences for Multi-Tenant Workbook, Dec 2025

#### What Data Fabric Is
Infor Data Fabric is the unified suite of cloud-native data platform capabilities within Infor OS. It centralises common data requirements, development patterns, and tooling. **Data Lake** is one component of Data Fabric — the object storage platform built on AWS S3 under Infor's account; all access is only via Infor OS UI or APIs (never direct S3 access).

**Data Lake is not a database** — it is an object storage facilitator. Any data type can be stored, but only **NDJSON** and **DSV** can be queried in a SQL-like manner.

#### Data Fabric Components
| Component | Purpose |
|---|---|
| **Data Catalog** | Central metadata registry: defines object schemas, attribute definitions, metadata properties, schema extensions (OAGIS BOD extensions), locale selections (ISO language groupings). Accessible via API or UI. |
| **ION Connection Points** | Define the data source generating data to be stored in Data Fabric |
| **ION Data Flows** | Model ingestion flows (connection point → Data Lake) and retrieval flows (Data Lake → connection point or back to Data Lake) |
| **ION OneView** | Investigate timeline/outcome of data flows; identify data objects in Data Lake |
| **Data Lake** | Object storage — delete objects, run SQL queries on NDJSON/DSV data |

#### Data Object Types Supported
Can be stored in Data Lake: JSON, NDJSON, DSV, XML, PDF, Binary, BODs, Documents, MS Office files, images.
Only queryable in SQL-like fashion: **NDJSON** and **DSV**.
Data is stored as-is (raw) — no automatic transformation on ingest.

#### Ingestion Technologies
| Technology | Notes |
|---|---|
| IMS | REST API ingest from any application |
| AnySQL | Database connection via Enterprise Connector to on-prem DB → stored as NDJSON |
| FTP / File | File-based ingestion |
| Database (JDBC) | Direct DB connector |
| JMS | Message queue ingest |
| IO Box | Standard Infor app connector |
| Bulk Ingestion API | CloudSuite adoption path; large-volume batch ingest |

Ingestion setup requires: Catalog → Management → Locales → Security → APIs all configured first before a connection to Data Lake can be established.

#### Extraction Services
ION can push any file from Data Lake to a consumer via:
- **APIs** (File Request)
- **Compass** (Infor analytics tool)
- **ETL** (classic extract-transform-load pull)

---

### 14.27 Infor AI — GenAI and RPA Reference (NEW)

Source: Infor OS Foundation Differences for Multi-Tenant Workbook, Dec 2025

> Note: As of the Dec 2025 workbook, Coleman Digital Assistant content has been **removed/deprecated**. Coleman is replaced by GenAI. References to Coleman in earlier sections of this skill (Sections 12 in the Developer Portal index) reflect older documentation.

#### Infor GenAI
Infor GenAI is the generative AI platform within Infor OS, leveraging **Large Language Models (LLMs)** to enable Infor and third-party applications to use generative AI capabilities.

**What GenAI does:**
- Data and text generation, summarization, translation, contextualization, analysis.
- NLP-based interaction with enterprise systems via typed or spoken input.
- Data retrieval from business documents, articles, booklets.

**How it's accessed:**
- Via APIs that CloudSuite solutions invoke with business context.
- Results delivered as **embedded experience** — either a widget or a chat session inside Infor OS.

#### Infor RPA (Robotic Process Automation)
Software bots that automate business processes. Bots mimic human behaviour across multiple applications.

**Key use cases:**
- Automate processes requiring access to multiple software applications simultaneously.
- Automate tedious data entry tasks.
- Define rule-based processes (invoice processing, data analysis, transformation).
- Define **intelligent bots** for advanced flows involving machine learning (e.g. document classification, data extraction).

#### Infor Go (Mobile) — Additional Detail
Supplements Section 17. Key facts not previously captured:
- **MT-only** — available only for multi-tenant (cloud) customers. Not available for on-prem or ST.
- Supported platforms: **iOS and Android**.
- Users can receive **push notifications** for tasks, alerts, and notifications.
- Infor Go **Guided Help**: built-in guided walkthrough feature for navigating screens.
- Uses **Infor Federation Services** for centralised auth — same access level from mobile and web.

---

### 14.28 Custom Fields (CMS080) — No-Code Table Extension (NEW)

Source: Vince Software blog, "Extend your Infor M3 tables with custom fields"

Custom fields let you extend an existing M3 table **without a direct schema change**. M3 links your table to a **CUGEX table** (a generic, pre-built "blank spreadsheet" table) instead of adding a real column.

#### CUGEX1 vs CUGEX2 vs CUGEX3
| Table | Field naming | Visible/editable directly in H5 program via personalization | Notes |
|---|---|---|---|
| **CUGEX1** | `F1CHB1`-`F1CHB9` (boolean), `F1DAT1`-`F1DAT9` (date), `F1N096`-`F1N996` (numeric), `F1A030`-`F1A930` (text) | Yes | Limited/scarce — treat as premium real estate |
| **CUGEX2 / CUGEX3** | Same pattern, own field ranges | No — requires scripting (H5 Script) to display | Effectively unlimited — use for everything that doesn't need native panel visibility |

**Resourcing rule of thumb:** reserve CUGEX1 only for fields that must appear as editable fields directly on an M3 panel. Push everything else to CUGEX2/CUGEX3.

#### Setup Steps (CMS080)
1. Go to **CMS080**, enter the target M3 table (e.g. `MITFAC`).
2. Choose a CUGEX1 field type/range matching the data type needed (boolean/date/numeric/text ranges above).
3. Create the connection (Ctrl+1).
4. In **CMS080/E**, set description, category, and field-specific validation:
   - Boolean: set upper limit to **1**.
   - Date: limited config — M3 already knows it's a date.
   - Numeric: digit checks, validation rules.
   - Text: force uppercase, character limits.
5. (Optional) **CMS081 — Value map**: right-click the CMS080 entry → Related options → Value map, to define a fixed drop-down list of permitted values and their display sequence order. Only the stored value goes into CUGEX1 — the description is just the drop-down label.

#### Making Custom Fields Visible on an M3 Panel (H5 only)
1. Open the target M3 program (e.g. `MMS003`) and navigate to the relevant panel.
2. Tools → Personalize → Custom fields.
3. Drag fields from the right-hand panel onto the (invisible grid) layout.
4. Share the personalization with other users/groups if desired (requires admin rights for universal sharing).

Note: Smart Office also supports this but requires scripting; H5 is the no-code path.

#### Advanced Uses
- **Program views**: custom fields can be added to program views via **CMS005**, but only for programs Infor permits in that list.
- **Custom APIs**: CUGEX1/2/3 fields can be linked to an information category in **CMS010**, then exposed through a custom list API in **CMS015** (see Section 29). CMS080 connections are not a prerequisite — CUGEX fields can be linked directly to other tables inside CMS010 if needed.

---

### 14.29 Custom List APIs (CMS010 / CMS011 / CMS015) — No-Code API Creation (Part 1 of 2 — NEW)

Source: Vince Software blog, "How to Create Custom List API's – A StepbyStep Example, Part 1"

**IMPORTANT — this section is incomplete.** The source material is explicitly Part 1 of a two-part series; Part 1 stops right before CMS015 (where the API itself is actually created and published). Part 2 has not been provided to this project — only its existence is confirmed (the Part 1 document links to it). Update this section once Part 2 is supplied; do not treat Section 29 as covering CMS015 configuration.

#### Concept
A **Custom List MI** is a no-code way for M3 customers to build their own list-transaction MI APIs (no M3 development/coding required), for cases where standard delivered APIs don't expose the fields or filters needed (e.g. for Vince Excel or other third-party integrations).

#### Step 1 — Create an Information Category (CMS010)
- An information category is effectively a **custom table definition**: a master M3 table plus optional related tables **left-joined** to it.
- Pick the **master table** based on the primary entity you're filtering/selecting on (e.g. `MCHEAD` if filtering by costing type, facility, item number, and a date range).

#### Step 2 — Add Related Tables (CMS011/B1)
- A related table is a **left join** onto the master table. Add one via "Create New," or by entering the table name + a prefix (`Pfx`).
- Using different prefixes lets you join the same table more than once if needed.
- After adding a related table, go to **CMS011/F** to match key fields between the related table and the master table — conceptually the same as an SQL `ON` clause.
- Then use **option 7 ("Add field to field group")** in CMS011/B1 → **CMS011/N** to pick the specific fields you want from that related table (e.g. `UCOS` cost price from `MITFAC`).

#### Step 3 — Set the Sorting Order (CMS010, option 23 "Related options")
- The sorting order determines **which fields the API can filter on** — this is the critical, easy-to-miss step.
- Fields intended for **range filtering** (e.g. item number, date range) do not need to be part of the sorting order.
- Fields intended for **exact-match filtering** (e.g. cost type, facility) **must** be the first keys in a sorting option.
- The master table's existing sorting options (per `CRS021`) are inherited automatically — but if none of them has your required filter fields as the leading keys, **create a new sorting option from scratch** with those fields first.
- Create a sorting order that uses this new sorting option. Attaching a view (see Step 4) to the sorting order at this stage is optional — the view can be overridden later when the API itself is created in CMS015.

#### Step 4 — Create a View (CMS010, option 22 "View")
- The **API's output fields are determined by this view**, not by everything present in the information category — so the view must contain every field you want the API to return.
- Built the same way as any other program view, via **CRS020 / CRS016**.

#### What's Next (Part 2 — not yet documented)
CMS015 itself: connecting the information category + sorting order + view into a published custom list MI transaction, and testing/consuming it. Add once Part 2 is available.

#### Link to Custom Fields (Section 28)
CUGEX1/2/3 custom fields can be added to an information category's related tables in CMS010, making custom-field data available for export through a CMS015 custom list API — this is the main integration use case for custom fields.

### 14.30 Business Context Model (BCM) — Adding Document Context to Any M3 Program (NEW)

#### What BCM Does
Infor applications publish a **Business Context** JSON message per screen/record (`entityType`, `accountingEntity`, `id1`/`id2`/`id3`..., `drillbackURL`, `visible`). IDM's **Business Context Model** maps that JSON to a document search query, so the correct IDM documents surface as a context-viewer / widget option in that M3 program. Architecture: `Infor Application → JSON (Business Context Message) → BCM mapping → IDM Document ↔ Document Repository`.

#### The Three Parts of Every BCM Mapping
1. **Key** — `Entity : Product : Screen : Document Type` (all four optional; more specific = narrower match; case-sensitive).
   | Key form | Applies to |
   |---|---|
   | `entity:product:screen` | one entity, one screen, one program |
   | `entity:product` | one entity, all screens, one program |
   | `entity` | one entity, all products/screens |
   | *(blank)* | all entities, all products, all screens — avoid in practice |
   - `Screen` accepts either a specific panel (`PPS200_B`) or a wildcard (`OIS300*`). Neither is universally preferred — use a specific panel when the mapping should apply to exactly one panel; use a wildcard when it should apply across all variants of a screen. A real working example (Steve Madden `SAFPurchaseOrder:m3:PPS200_B:SAF_Purchase_Order`) uses a specific panel, while sibling entries on the same BCM list (`SAFSalesOrder:m3:OIS300_*:SAF_Order_confirmation`) use a wildcard — both are valid, chosen deliberately per case.
2. **Mapping (XQuery)** — a search query using the JSON fields as parameters, e.g. `/Supplier_Delivery[@M3_PUNO="{id1}" AND @M3_REPN="{id2}"]`. The attribute names in the XQuery must exactly match the Document Type's Attribute **Name** field (not the Display Name). Multiple documents can be linked in one mapping with `UNION` (e.g. `/MDS_File[...]UNION/MDS_Image[...]`).
3. **ACL (optional)** — restricts document visibility. Can be a literal ACL name, a JSON parameter (e.g. `{id2}`, must resolve to a valid ACL name), or a mix of text and parameters. If omitted, the user picks an ACL manually at upload time. Two global ACLs always exist: **Private** (last modifier only) and **Public** (all users, read/edit).

#### Critical Concept: What MNS035MI `AddEntityMap` Actually Does
`AddEntityMap` does not merely "register a document type under an existing entity" — **it creates and publishes a brand-new `entityType` into the program's own JSON context message**, as a sibling to whatever entities that program already natively publishes (e.g. `InforSalesOrder`). Proof: capturing OIS300's full Context Viewer JSON after registering a custom entity shows it as an independent top-level array item —
```json
{ "entityType": "InforSalesOrder", "id1": "3002013201", ... },
{ "entityType": "CNG_Proforma_Invoice", "accountingEntity": "500_100", "id1": "3002013201", ... }
```
— not nested inside `InforSalesOrder`. This has a direct, load-bearing consequence for BCM:

**The BCM `Entity` field must equal the `ISEC` value used in `AddEntityMap` exactly** — not a native Infor entity like `InforSalesOrder`, `InforPurchaseOrder`, etc., unless you are deliberately using Path B (below). Per Infor's own IDM documentation: *"Entity — this is the name of the entity (item master). This key part is determined by the publishing system"* — it is not a free-text label you choose independently; it must match what the program actually emits. A working reference example (Steve Madden EU) confirms this pattern exactly: `ISEC = SAFPurchaseOrder` in MNS035MI, and the BCM `Entity = SAFPurchaseOrder` — a custom entity name, not `InforPurchaseOrder`.

**Consequence of getting this wrong:** setting BCM Entity to a native entity (e.g. `InforSalesOrder`) when MNS035MI actually registered a different custom `ISEC` (e.g. `CNG_Proforma_Invoice`) causes a specific, hard-to-diagnose symptom — the document *appears* to work (shows under "All" in the Related Information widget, since that mode aggregates loosely) but **fails when the specific document type is selected directly** in the same dropdown ("No results found"), because the exact-match lookup can't find a BCM row whose Entity matches the real published `entityType`.

#### Path A — Add a Brand-New Document Type, Manual Upload
Use this when a program needs a new upload/context slot and documents will be added manually by a user through the widget (not auto-generated by a print job — see Path C for that).

1. **Create the Document Type** — Document Management → Control Centre → Administration → Document Type. Easiest approach: copy an existing similar type, then rename.
2. **Configure Attributes** — Attributes tab. Add the field(s) that key the document to the M3 record, using a clean, descriptive naming convention: `M3_<FieldName>` (e.g. `M3_AccountingEntity`, `M3_OrderNumber`, `M3_PurchaseOrderNumber`) — confirmed as the standard pattern by a real working example (Steve Madden's `SAF_Purchase_Order` type: `M3_AccountingEntity`, `M3_Company`, `M3_Division`, `M3_PurchaseOrderNumber`, `M3_Supplier`). Avoid naming an attribute identically to the document type itself (self-referential naming, e.g. an attribute literally named the same as its own document type) — it works technically but produces confusing XQuery like `/X[@X="{id1}"]` and signals an inconsistent setup.
   - Set **Document title** (General tab) to the key field — leaving it as "Filename" or "No document title" makes uploaded documents hard to identify later.
   - Mark key field(s) **Required** where the document cannot exist without them.
   - `AccountingEntity` alone (format like `500_100`) already encodes company+division together — don't add separate Company/Division attributes unless there's a specific reason; that's redundant with a working reference pattern.
3. **Build the XQuery** — reference JSON context fields as `{id1}`, `{id2}`, `{accountingEntity}`, etc. Example: `/CNG_Proforma_Invoice[@M3_AccountingEntity="{accountingEntity}" AND @M3_OrderNumber="{id1}"]`.
4. **Register the entity in MNS035MI** (`AddEntityMap` transaction). This creates the new `entityType` — see critical concept above.
   | Field | Meaning | Example |
   |---|---|---|
   | FLDI | The M3 field acting as the key (bare field name, not the JSON-prefixed tag — e.g. `ORNO`, not `OAORNO`) | `ORNO` |
   | PGNM | Program name | `OIS300` |
   | VFLD / VFVA | Optional validate field name/value | *(blank unless conditional)* |
   | SQNR | Sequence number | `1` |
   | ISEC | The new entity name — this becomes the BCM `Entity` value | `CNG_Proforma_Invoice` |
   - **Row count does not scale with the number of XQuery attributes.** A real working example (`SAF_Purchase_Order`) has a 5-attribute XQuery but only **one** MNS035MI row (`FLDI=PUNO`), tied to the program's primary business key. Only add multiple rows when there's a specific reason to register multiple distinct key fields (rare in practice).
   - `LstByEntity` (used to verify a row landed) does **not** reliably filter by the `ISEC` input — it has been observed returning a fixed, broader set of rows regardless of the ISEC value entered. Don't treat an unexpected/unrelated row list as proof something is missing; check the specific `PGNM`/`FLDI`/`ISEC` combination in the results instead of trusting the input filter.
5. **Configure the Business Context Model** — Configuration → Business Context Model → Add. `Entity` = the exact `ISEC` from step 4 (not a native entity, unless Path B). Paste the XQuery from step 3.
6. **Verify in Context Publisher** — open the M3 program → Tools → Context Publisher → Infor Business Context. The new entity should appear as its own checkbox (a sibling to native entities like `InforSalesOrder`, not nested under them). **This dialog's Save applies globally to every user of the program, not just the current session** — never uncheck/disable existing entities to "isolate" a test; doing so turns off other users' working document types and widgets platform-wide. Only add the new checkbox; leave all existing ones exactly as found.
7. **Test** — select a record, open the widget, upload a file, confirm it lands in IDM with attributes populated, and confirm it's retrievable both under "All" and under the specific document type selected directly (not just one or the other — see Critical Concept above for why these can diverge).

#### Path B — Extend an Existing Document Type to a Second Program via a Native/Standard Entity
Use this when a document already captured against one program should also become visible in a **different** program through one of Infor's **native, out-of-the-box** entities (e.g. `InforPurchaseOrder`, `InforSalesOrder`, `InforVendor`) — not a custom entity created via `AddEntityMap`. No new MNS035MI entry is needed here, because native entities are already published by Infor's own screens.

1. Confirm the Document Type's Attributes already include the field the second program will key on.
2. Add a new BCM entry: `Entity` = the native entity name (e.g. `InforPurchaseOrder`), `Screen` = the second program's screen id, `Document Type` = the same document type as the original capture, XQuery scoped to the fields relevant in that second context.
3. Test from the second program: confirm the published `entityType` matches the native name used in the BCM entry.

#### Path C — Automatic Print-to-IDM Archival (Output Management)
Use this when the document should be **auto-captured when a user prints/generates it** through a standard M3 print program — no manual upload — e.g. a Proforma Invoice or Purchase Order PDF that's archived into IDM automatically the moment it's printed. This requires everything in Path A **plus** M3-side output routing configuration; skipping the M3 side means printing produces the output normally but nothing lands in IDM, regardless of how correct the IDM-side Document Type/BCM/MNS035MI setup is.

1. Complete Path A in full first (Document Type, Attributes, XQuery, MNS035MI, BCM) — Output Management archives *into* this structure, it doesn't replace it.
2. **CMS006 (XML Structure)** — locate the entry for the actual print program's printer file (e.g. `OIS641PF` for a CO Invoice/Proforma Invoice print). On the **Archive** tab, set:
   - `Document type` = the IDM Document Type's Name (e.g. `CNG_Proforma_Invoice`)
   - `Archive` = `3-Both original and copies` (or as required)
   - `File type` = `1-PDF` (or as required)
   - **Archive Attributes** — map each Document Type attribute to its source field position on the print layout via `Attribute ID` + `Secti`/`E seq` (section/element sequence), e.g. `M3_AccountingEntity` → Secti 0, `M3_OrderNumber` → Secti 6/Eseq 2. These positions must correspond to where that data actually appears in the XML/print structure — this is the mechanism that populates the Document Type's attributes automatically on archive, replacing the manual entry a user would otherwise type during upload.
3. **MNS204 (Output Service Selection)** — confirm the printer file (e.g. `OIS641PF`) is mapped to an Output Service ID configured for IDM (e.g. `M3_IDM_XML`). Division-specific; check the row exists for the correct division.
4. **MNS216 (Output Service)** — confirm the Service ID used in step 3 has `Commun type = 3-IDM Output Management, single interface`. This is what actually routes the print output to IDM rather than a physical/email printer. The "Document types" priority list here (Priority 1–6, e.g. `M3_LAYOUT`, `M3_DEF`) governs which output template/layout is used, in priority order.
5. **Test** — print the document through its normal M3 print program/menu option, then confirm it appears in IDM (Created By will show a system/integration account, e.g. "M3 Integration User" — not the printing user, since this is an automated archive, not a manual upload) and in the program's Related Information widget once a record is selected.

#### Gotchas
- **XQuery attribute names are case- and name-exact** — must match the Document Type's Attribute Name, not Display Name; a mismatch causes silent non-surfacing, no error.
- **BCM Entity must equal the real published `entityType`** (the `ISEC` from `AddEntityMap` for custom entities, or the exact native entity name for Path B) — not an assumed/native entity name chosen by habit. Getting this wrong produces the "works under All, fails under specific type" symptom described above.
- **MNS035MI row count typically does not scale with XQuery attribute count** — one row per primary key field is the common working pattern; don't over-register rows without a specific reason.
- **`LstByEntity` does not reliably filter by the ISEC input** — verify by reading the specific row in results, not by trusting an empty/unexpected result set.
- **Context Publisher's Infor Business Context dialog is global, not per-session** — unchecking other entities to "test in isolation" disables them for every user of that program. Only add, never remove, unless a removal is deliberately intended platform-wide.
- **"Auto Publish" in Context Publisher** matters for the widget populating without a manual re-apply per session.
- **Document Title field** should be set to the key attribute — leaving it "Filename" or "No document title" makes uploaded documents hard to identify in IDM's list view.
- **Manual upload vs. Print-to-IDM (Path C) are different builds** — confirm which one the requirement actually needs before starting; Path A alone does not enable auto-archival on print, and Path C's M3-side config (CMS006/MNS204/MNS216) is a separate, non-optional layer on top of Path A, not an alternative to it.
- **Screen wildcards vs. specific panels**: both are valid; choose deliberately based on whether the mapping should apply to one panel or every variant of a screen — don't default to either.

---

### 14.31 Data Catalog — Object Schema Building for Custom BOD Nouns (NEW)

Section 26 above covers Data Catalog's role in **Data Fabric / Data Lake ingestion**. This section
covers a different, more common use: building a **custom Object Schema for a Noun used in a normal
BOD-based Data Flow** (Pattern F above) — e.g. wrapping an external partner's file format as a
Sync BOD, or defining a Process/Acknowledge BOD pair for a MEC map. Confirmed 20260824, KL
Bleckmann StockAdjustment.

#### Two independent schema layers for "the same" Noun
A single Noun name (e.g. `BleckmannInventoryAdjustment`) can legitimately have **two separate,
independently-maintained schema artifacts**, and they are not required to share the same field
shape:
- **The Data Catalog Object Schema** — built from a File Template's sample XML (via "Generate
  Metadata"), or hand-built as an Object Schema zip. This is what a File Connection Point uses to
  wrap an incoming raw file into a Sync BOD. Its shape matches the *source* file.
- **The Business Document Mapper `SchemaIn`/`SchemaOut`** — the `BODs-<Verb><Noun>_hash.xsd` /
  `Nouns-<Noun>_hash.xsd` pair bundled inside a MEC `.zap`. This is what the MEC map uses for its
  Process/Acknowledge verbs, and its shape matches whatever the upstream XSLT transform actually
  produces — very often reshaped (different field names) from the Sync-verb source shape.
Don't assume one schema file covers both; verify each independently when troubleshooting a field
that "should" be there but isn't showing up in Mapper.

#### Object Schema zip structure (for hand-building or verifying an import)
```
BOD/<NounName>/<NounName>.xml   — NounMetadata: NounName, IDXPath, SupportedVerbs
BOD/<NounName>/<NounName>.xsd   — the actual field structure
```
`IDXPath` should point at whatever field genuinely functions as a unique identifier for that
document instance (used in ION's monitoring/tracking screens) — not necessarily the first field in
the schema. `SupportedVerbs`: real confirmed zips (StockOnHand, InventoryMaster, MPNoInventory,
AutoMoveFromLocation) consistently use the 4-verb set **Sync, Acknowledge, Load, Process** — not
the full 8-verb OAGIS set — regardless of which single verb the integration actually exercises.

**Confirmed `NounMetadata` XML template** (KL convention, consistent across every zip built to
date):
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:NounMetadata xmlns:ns2="http://schema.infor.com/InforOAGIS/2">
    <Noun>
        <NounName>AutoMoveFromLocation</NounName>
        <IDXPath>/*/DataArea/AutoMoveFromLocation/AutoMoveFromLocation/Type</IDXPath>
        <SupportedVerbs>
            <SupportedVerb>Sync</SupportedVerb>
            <SupportedVerb>Acknowledge</SupportedVerb>
            <SupportedVerb>Load</SupportedVerb>
            <SupportedVerb>Process</SupportedVerb>
        </SupportedVerbs>
    </Noun>
</ns2:NounMetadata>
```
Note the `ns2:` prefix on the root element and the nesting under a single `<Noun>` wrapper — both
easy to get wrong when reconstructing from memory rather than a known-working reference.

#### Load BOD envelope shape (Data Catalog Object Schema)
Full corrected shape is in §9 above ("Load BOD XSD Envelope Pattern") — not repeated here.

#### Confirmed real-world divergence between the two schema layers (KL AutoMoveFromLocation, 20260825)
Direct confirmation of the "two independent schema layers" principle above: for this integration,
the **Data Catalog Object Schema** (built first, for the File Connection Point / Sync BOD wrapping)
was a simple flat shape with no `ApplicationArea` envelope at all, while the **MEC map's `SchemaIn`**
(built afterward, for the Load BOD the map actually consumes) required the full envelope described
just above. Both are legitimately correct for their own purpose — the Object Schema's job is only
to describe the *source file's* shape for the File Connection Point, not to predict what shape the
downstream MEC map will eventually need. Don't assume building one first tells you what the other
should look like.

#### No-namespace schemas: field-level `Record`/`Link` rewiring CAN be done by hand — narrower than
#### previously documented
The "Critical limitation" note below (and the equivalent note under "Load BOD XSD Envelope
Pattern") states that field-level `SchemaIn`/`Record` entries and `Links` are never safe to
hand-edit, because Business Document Mapper assigns opaque internal namespace prefixes to every
path segment at XSD-import time. **This is only true when the schema declares a target
namespace.** Confirmed 20260825 on KL AutoMoveFromLocation: when the XSD has **no** `targetNamespace`
(no `xmlns="..."` default namespace, just the bare `xmlns:xs="http://www.w3.org/2001/XMLSchema"`),
the map's `FormattedPath`/`PATH` values in `SchemaIn/Record` are plain, deterministic text with no
prefix at all — confirmed by diffing a real working reference
(`M3BOD_NewStoreFulfillmentCompleted_Load_In_1_0_0`, itself a no-namespace schema) and by
successfully hand-rewriting our own map's `Record` `PATH`/`FormattedPath` values after a schema
swap, with the pre-existing `Links` (which reference `Record`/`Parameter` IDs, not paths)
resolving correctly with zero changes needed.
**Practical rule:** before assuming field-level rewiring needs the Mapper UI, check whether the
XSD declares a `targetNamespace`/default `xmlns`. No namespace → safe to hand-rewrite `Record`
`PATH`/`FormattedPath` text (keep the same `ID_M`/`ID_P` IDs, just repoint the path strings; leave
`Links` untouched). Has a namespace (e.g. the InforOAGIS `EventData`/BOD schemas) → the original
caution still applies, opaque prefixes are still unpredictable outside the tool.
**Separately, and unrelated to namespaces:** Business Document Mapper can cache import state by
filename/checksum. Re-importing a `.zap` over an already-existing map of the same name can leave a
stale checksum, producing the same "Input Document Missing Root Element" error and unresolved
`Broken Links` even after the schema and `Record` fix are genuinely correct. **Fix:** delete the
cached checksum for the map's folder, re-import fresh, then use **Documents → Update Checksums**
in the Mapper before re-checking Broken Links/Validation.

#### File Template "Generate Metadata" — numeric-type inference gotcha
Same content as §5 items 19–20 above (the "too many passes" trigger and numeric-type inference) — not repeated here.

#### BOD envelope XSD structure (Process/Acknowledge verb pair), `ConfirmBOD` companion map,
#### `CRS881MI.GetTranslData` pattern, and schema packaging gotchas (double-BOM, re-hashing)
All of these are covered in §8 and §5 above — not repeated here.

---

*(This file is built incrementally — §3 (map types) grows and §13's index gets new rows as more
sample maps are shared; full API field definitions go in the companion `Infor_M3_API_Reference_
Library.md`, not here. §14 is the merged ION/Infor OS platform reference.)*

---

## InhouseDESADVExport8 — Map1 Cloud Migration Analysis (20260917)

### Overview

| Item | Detail |
|---|---|
| Map name | InhouseDESADVExport8 (Map1) |
| Message type | Outbound DESADV / ASN (Despatch Advice) |
| On-prem trigger | MBM from program `MWS620PF`; key field `OQDLIX` = DLIX (delivery note number) |
| Cloud trigger | ION EventData carrying CONO, DIVI, OQDLIX |
| Primary driver | DLIX — all 16 source tables resolved through delivery note number |
| On-prem structure | 30 functions (FID1–FID30), 4 loops, 265 links; entire SQL in FID5 (14,907 chars) |
| Reference map | POToInhouseDESADV4 (Map2) — already completed cloud version; used as structural reference |

### On-Prem SQL — Key Design Points

- Single monolithic SQL in FID5 joins all 16 tables in one query via JDBC to AS400
- `RORC` (Reference Order Category) determines order type: 3=customer order (OOHEAD/OOLINE), 4/5=distribution orders (MGHEAD/MGLINE)
- `MITPOP` joined twice (alias `ean` and `upc`) for EAN13 and UPC barcodes separately
- `OCUSMA` joined twice (alias `cust` for buyer, `invrec` for invoice recipient)
- `CUGEX1` join is conditional: only when `OQRORC=3` (customer order); reads F1A130 = UltimateConsignee from OOHEAD extension table
- `MFTRNS` is a LEFT OUTER JOIN for package-level data; `OSDLQT` used if non-null, otherwise falls back to `URTRQT`
- ColourDescription from MPDOPT has `substring(4)` applied in Java (first 4 chars stripped)

### 16-Table Cloud API Decomposition

| # | M3 Table | Cloud API | Transaction | Inputs (from SQL) | Outputs used (from SQL) |
|---|---|---|---|---|---|
| 1 | MHDISH | MWS410MI | GetDeliveryHead | CONO, DLIX=iDeliveryNumber | OQDLIX, OQRGDT, OQDSDT, OQWHLO, OQGRWE, OQRORC, OQCONA, OQINOU |
| 2 | MHDISL | MWS420MI | GetDeliveryLine | CONO, DLIX (join URDLIX=OQDLIX) | URITNO, URRIDL, URRIDX, URTRQT, URRORC, URRIDN |
| 3 | MFTRNS | MWS420MI | GetDeliveryLine (pkg) | CONO, DLIX, RORC=URRORC, RIDN=URRIDN, RIDL=URRIDL, INOU=OQINOU, WHLO=OQWHLO | OSPANR (PackageNumber), OSGRWE (PackageWeight), OSDLQT (DeliveredQty) |
| 4 | MITPOP (ean+upc) | OIS010MI | LstItmAlt | CONO, ITNO=URITNO, ALWT=2, ALWQ='EA13' / 'UPC' | MPPOPN → EANCode / UPCCode |
| 5 | OCUSIT | OIS005MI | Get | CONO, CUNO=OQCONA, ITNO=URITNO | ORPOPN → CustomerItemNumber |
| 6 | MGHEAD | MMS100MI | GetHead | CONO, TRNR=MGTRNR | MGRIDT, MGRGDT, MGREMK, MGTWLO, MGTRTP, MGTOFP |
| 7 | MGLINE | MMS100MI | GetLine | CONO, TRNR=MRTRNR, PONR=MRPONR, POSX=MRPOSX | MRTRQT (OrderLineQuantity), MRREFE (OrderLineReference) |
| 8 | CSYTAB | CRS175MI | GetGeneralCode | CONO, DIVI='', STCO='TOFP', STKY=MGTOFP, LNCD='' | CTTX15 → OrderSeason |
| 9 | OOHEAD | OIS100MI | GetOrderHead | CONO, ORNO=OAORNO | OAORTP, OARLDZ, OAORDT, OAOREF, OAYREF, OACUOR, OACUNO, OAINRC, OAPROJ, OAADID |
| 10 | OCUSMA (buyer) | CRS610MI | GetBasicData | CONO, CUNO=OACUNO | OKCUNO → BuyerID |
| 11 | OCUSMA (invrec) | CRS610MI | GetBasicData | CONO, CUNO=OAINRC | OKEALO → InvoiceRecipient |
| 12 | OCUSAD | CRS610MI | GetAddress | CONO, CUNO=OACUNO, ADRT=1, ADID=OAADID | OPEALO → DeliveryParty |
| 13 | OOLINE | OIS100MI | GetLine | CONO, ORNO=OBORNO, PONR=OBPONR, POSX=OBPOSX | OBORQA (OrderLineQuantity), OBCUOR (OrderLineReference) |
| 14 | MITMAS | MMS200MI | GetItmBasic | CONO, ITNO=URITNO | MMUNMS, MMITDS, MMCFI4, MMSPE2 |
| 15 | MITMAH | MMS200MI | LstStyle | CONO, STYN=HMSTYN (from MITMAH join MMITNO) | HMSTYN, HMOPTY, HMOPTX, HMTX15 |
| 16 | CUGEX1 | CUSEXTMI | GetFieldValue | CONO=OQCONO, FILE='OOHEAD', PK01=URRIDN (only when OQRORC=3) | A130 → UltimateConsignee |

### MVX.java Confirmation Status

| API | Confirmed via |
|---|---|
| OIS005MI/Get | OIS005MI_MVX.java (CUSIT.CHAIN by CONO+CUNO+ITNO) |
| CRS610MI/GetBasicData, GetFinancial, GetAddress | CRS610MI_MVX.java |
| MMS100MI/GetHead | MMS100MI_MVX.java (RHEAD, GHEAD.CHAIN by CONO+TRNR) |
| MMS100MI/GetLine | MMS100MI_MVX.java (GLINE.CHAIN) |
| CRS175MI/GetGeneralCode | CRS175MI_MVX.java (RGETA, SYTAB.CHAIN by CONO+DIVI+STCO+STKY+LNCD) |
| MMS200MI/GetItmBasic | MMS200MI_MVX.java (ITMAS.CHAIN by ITNO) |
| MMS200MI/LstStyle | MMS200MI_MVX.java (ITMAH.SETLL+READE by STYN) |
| PDS050MI/Get | PDS050MI_MVX.java (PDS050BE, PDOPT.CHAIN by CONO+OPTN) |
| CUSEXTMI/GetFieldValue | CUSEXTMI_MVX.java (UGEX1.CHAIN by FILE+PK01..PK08) |
| MWS410MI/GetDeliveryHead | API Ref Library (pattern — MVX not yet decoded) |
| MWS420MI/GetDeliveryLine | API Ref Library (pattern — MVX not yet decoded) |
| OIS010MI/LstItmAlt | API Ref Library (pattern — MVX not yet decoded) |
| OIS100MI/GetOrderHead | API Ref Library (pattern — MVX not yet decoded) |
| OIS100MI/GetLine | API Ref Library (pattern — MVX not yet decoded) |
