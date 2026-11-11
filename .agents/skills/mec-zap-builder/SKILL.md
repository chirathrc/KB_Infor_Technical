---
name: mec-zap-builder
description: >
  Create, extend or repair Infor M3 MEC mapping units (.zap / .map) for the Business Document Mapper (IEC / Infor OS / ION):
  custom or standard BODs (Sync, Process, Load, Acknowledge), event-triggered outbound maps (Event Analytics EventData -> Sync BOD),
  MBM / flat-file / XML integrations and inbound loads to M3. Use whenever the user asks to "create a ZAP", "build a MEC map",
  "generate mapping for an event on <table>", "find the MI API for <data>", or has a .zap that fails to import, generate or publish.
  Finds M3 MI APIs in the KB catalog, writes a reviewable spec.json plus XSDs, and COMPILES the .zap with the KB's mapbuild.py through
  scripts/mec_build.py (never by hand-writing XML), then verifies it. Trigger words: zap, .map, MEC, Mapper, BOD, Sync_Out, Process_In,
  EventData, Event Analytics, IEC, ION, MI API, M3FTD, M3BOD. For ON-PREM -> CLOUD migration of existing maps also read the skill mec-cloud-migration.
---

# MEC ZAP Builder

Knowledge base: https://github.com/chirathrc/KB_Infor_Technical (this skill lives in `.agents/skills/mec-zap-builder/` of that repo).
All paths below are relative to the repo root. Commands use `python`; on Linux/macOS use `python3`.
Let `BUILD = python .agents/skills/mec-zap-builder/scripts/mec_build.py`.

## 0. The rule that decides success or failure

**You NEVER write, edit, base64-encode or "show" the content of a `.map` / `.zap` yourself.**
A `.zap` is a zip of UTF-16BE XML with CRC32-named schema files, hashed path prefixes (`H<hash>:`), numbered links and sequence ids.
A model cannot produce this by typing it; every attempt gives a file the Mapper rejects ("Failed to load mapping model",
"Invalid Mapping Schema", broken links). The ONLY way to produce a ZAP is:

```
requirement -> (XSD files + spec.json)  --BUILD build-->  <Name>.zap   (written by the compiler, checked by 4 verifiers)
```

If a tool errors, **fix the cause and re-run. Do not fall back to writing XML.** If you have no shell/code tool at all, go to section 9.

## 1. Preflight (always first)

```
BUILD doctor
```
Must end with `RESULT: PASS`. If not, fix what it names (Python >= 3.8, repo cloned fully, catalog present). `javac` is optional but
without it the Java in the map is unchecked and you must say so at the end.
(Known repo quirk handled by the wrapper: tools expect `mec/mi/` but the repo ships `mec/mi-reference/`. Never call `mec/tools/*.py`
directly; always go through `BUILD`, which passes the right catalog path.)

## 2. Workflow (follow in order, do not skip a step)

**Step 1 - Classify the request** using section 3 (family F1-F11 + BOD verb). State your choice in one line, plus assumptions.
Ask the user ONLY blocking questions you cannot infer: trigger (event table / file / request), target system or BOD noun, key fields.
Otherwise proceed with stated assumptions; do not interrogate.

**Step 2 - Find the APIs (never guess an API or field name).**
```
BUILD api search <keywords> --single --verb Get     # or --list for list APIs
BUILD api program CRS610MI                          # every transaction of a program
BUILD api show CRS610MI/GetBasicData                # exact IN/OUT fields, * = mandatory
BUILD api field MAIL --given CUNO --single          # which API returns a field
```
Prefer the business interface program (CRS610MI, OIS100MI, MMS200MI, PPS200MI ...) over generic table reads. Order: standard `Get/Lst`
transaction -> `MDBREADMI` (tenant-specific, confirm it exists) -> `EXPORTMI/SelectPad` -> custom `CMS100MI`/`EXTnnnMI`.
The catalog covers 1,310 MI programs / 9,064 transactions. Tenant-specific programs (CMS100MI, MDBREADMI, EXT00xMI) must be flagged to the user.

**Step 3 - Start from the closest working example, never a blank page.**
- Event -> custom Sync BOD (most common): copy `examples/customer-details-event/` (tested end to end: spec.json, generator, XSDs, sample events).
  Second reference: `mec/examples/item-details-event/`.
- Other families: `BUILD fromsample mec/samples/<folder>/<closest>.zap work/<name>` gives an editable `spec.json`. Find the closest sample in
  `mec/guides/09-sample-inventory.md` or `mec/MEC_INDEX.json`.

**Step 4 - Write the inputs** in `work/<name>/` (UTF-8 is fine; the compiler converts to UTF-16BE):
1. XSDs: input schema + output schema (+ `Resources-Meta.xsd`/`EventData_MT.xsd` are auto-staged for BOD/event maps).
2. `spec.json` (reference: `references/spec-cheatsheet.md`). For many fields use a small Python generator (see the example's `gen_customer.py`)
   so field lists stay in one table (`fieldmap.py`) and cannot drift from the XSD.

**Step 5 - Build and verify.**
```
BUILD build work/<name>/spec.json --out work/<name>/out
```
It runs: compile -> independent zip/UTF-16BE check -> `verify_rules` -> Java compile (if `javac`) -> writes `<name>.dump.txt` pseudocode.
The last line is `RESULT: PASS` or `RESULT: FAIL - <reason>`. On FAIL: read the message, fix `spec.json`/XSD/Java, rebuild. Repeat until PASS.
Treat every compiler *warning* as a defect to fix or explicitly justify to the user.

**Step 6 - Review the logic** (not just the format): open `<name>.dump.txt`; check the sequence matches your intent (events parsed, M3 Settings before
the first API, validation before output, loops/controllers right). Optionally `BUILD sim work/<name>/spec.json` and run scenarios
(happy path, missing key, API NOK, empty list) - this is how the example was tested.

**Step 7 - Deliver** (section 8 template). Only a `RESULT: PASS` file is delivered.

## 3. Choose the family and verb

| Family | Trigger -> result | Input / Output |
|---|---|---|
| **F4 Event -> custom Sync BOD** | Event Analytics rule on an M3 table (customer, item, PO ...) -> read M3 via MI -> BOD to ION | `EventData` -> `Sync<Noun>` |
| F5 Standard BOD copy | Infor standard BOD (PurchaseOrder, SupplierInvoice ...) | very large; use as reference only |
| F6 Process + Acknowledge (+ `_Acknowledge_Error_Out`) | External system asks M3 to create/update, needs status | `Process<Noun>` -> `Acknowledge<Noun>` |
| F11 Load (no reply) | Bulk fire-and-forget create in M3 | `Load<Noun>` -> none |
| F1/F2/F3 MBM bank files | Payment proposal MBM -> bank file (pain.001), re-detector, status in | `EventData`/ISO XML |
| F7 XML request -> M3 -> XML response | Weighbridge / logistics | custom XML both ways |
| F8/F9 | BestMix recipes / request-driven BOD out | envelope XML |
| F10 Uploaded file -> validate -> post -> status | GL / credit-note uploads | file XML -> status doc |

**Verb rule:** Sync = M3 publishes a change, no reply. Process = sender needs a status back (always add the Acknowledge map AND publish
`_Acknowledge_Error_Out` first). Load = fire-and-forget. **A Sync map's input is always Event Analytics `EventData`.** If the input is a custom
trigger/request file, it is Process/Acknowledge even if data flows out of M3.

**Naming:** custom BOD map `<Prefix>_<Noun>_<Verb>_<In|Out>_<Suffix>` e.g. `M3BOD_CustomerDetails_Sync_Out_Custom`; error map
`<Prefix>_<Noun>_Acknowledge_Error_Out_<Suffix>`; non-BOD `M3FTD_<Client>_<Area>_<Flow>_Custom`. Schema category `BOD` is allowed ONLY when the
name follows the BOD pattern, otherwise `Other`. BOD root element = `<Verb><Noun>` joined, **no dot/underscore** (`SyncCustomerDetails`);
the manifest value uses the dotted form (`Sync.CustomerDetails`). For on-prem -> Cloud migration the team rename convention is
`KL_<BODNoun>_<BODVerb>_<Direction>_1_0_0` - if unclear which applies, ask the user once.

## 4. F4 recipe (event -> M3 reads -> Sync BOD) - function order to keep

`VersionLog` -> `InitEventData` -> loop `GetEventDataLoop`/`GetEventData` (name/value map; accept table prefixes e.g. `OKCUNO`, `MMITNO`) ->
`ManageEventData` (Delete `D` -> `abort(...)`; missing key -> `throw new MeCError(...)`) -> `GetCONO_DIVI_AE` -> **M3 Settings** -> `Init`
(`DataTranslator`, tenant id, control properties) -> `XXXMI/GetUserInfo` (language) -> API reads, each followed by a `Validate*` function
(`isLastAPICallOK()`; empty/mismatching key -> MeCError) -> list APIs in a `WT` loop with `ARI` + `Collect*` + `Check*` ->
`SetOutboxHeaderData` -> `SetHeader` -> `SetSync` -> section setters -> `PrepareOutput` -> emit loops (`HasNext*` UB + `Set*`) -> `LogResult`.
**Copy the Java bodies of the generic functions verbatim from `examples/customer-details-event/gen_customer.py`** and change only noun, keys
and prefixes. Validate everything BEFORE writing output so a failure never sends a partial BOD.

## 5. Spec essentials (full reference: `references/spec-cheatsheet.md`)

Items in `sequence`: `{"java": ...}` (UV), `{"bool": ...}` (UB, must `return`), `{"api": "PGM/TRN", "mode": "AVM|AVI|AVL|ARM|ARI|ARL", "in": {...}, "out": {...}}`,
`{"settings": {"Company": src}}`, `{"assign": {...}}`, `{"loop": ..., "cond": "WT|WF|IT", "ctl": ..., "body": [...]}`.
Sources: `"IN:/Root/A/B"`, `"IN:/Root/A[@attr]"`, `"$var"`, `"#CONST"`, `"Func.param"`, list, `null`. Targets: `["OUT:/..."]`, `["$var"]`, `[]`.
Single API = `AV*`; list API (`Lst*`/`Sel*`/`Search*`) = `AR*` inside a loop. Every `IN:`/`OUT:` path must exist in its XSD (compiler checks).
`CONO` is never linked: M3 Settings sets company.

## 6. Java rules for MEC (the compiler and publish scanner enforce these)

Allowed style: inputs are `String`, null-check + trim; fully qualify classes outside `java.lang`; `java.util.ArrayList/HashMap/Iterator`; `BigDecimal` for amounts.
**Forbidden (publish rejects):** `java.util.LinkedList`, `java.util.concurrent.*`/`TimeUnit`, `Thread` (use `sleep(ms)`), JDBC/SQL, file I/O, `System.out`,
on-prem `cat.*` logging (use `logDebug/logInfo/logWarn`). No bare `return;` in a void function (use if/else). Abort with no output: `abort("...")`;
failed message: `throw new MeCError("...")`. Give loops and functions different names.
Cloud API forms: `getSystemEnvironmentCode()`, `getFromLogicalID()`, `getMappingVersion()`, `getBEVersion()`, `getMapUUID()`,
`new DataTranslator(getManifestMap(), ...)`; never `IONToolbox.getSenderLogicalID(myMap)`, `strUUID`, `myMap`. `OIS100MI/GetOrderHead` takes only `ORNO` (no CONO).
Direct SQL does not exist in Cloud: use `EXPORTMI/SelectPad` or a standard MI.

## 7. Hard stops (if you are about to do one of these, stop and re-read section 0)

- Typing XML for a `.map`, or "creating" a `.zap` with `zipfile`/`zip` yourself.
- Inventing an API, transaction or field name not shown by `BUILD api show`.
- Calling a Sync map's input anything but EventData; using category `BOD` with a non-BOD name.
- Declaring done without `RESULT: PASS` from `BUILD build`, or hiding a warning/skipped check.
- Claiming the map was imported, generated, published or tested in M3/ION. You only verified it offline.
- Editing the built `.map` text, or re-saving it in an editor (breaks UTF-16BE/BOM). Change the spec and rebuild.

## 8. Deliverable template (always end with this)

1. File path of the `.zap` (+ spec.json, XSDs, generator if any).
2. Table: API -> BOD section -> number of fields (or key logic per function).
3. Verification actually done: `BUILD build` result line, Java check (run/skipped), simulation scenarios (if run).
4. NOT verified: Mapper import/Generate/Publish, live event (always list these).
5. Open decisions for the user (delete handling, field list, naming prefix, control properties).
6. Outside-the-map steps for F4: Event Analytics rule + subscription, ION Data Catalog object schema for a custom noun, BOD processor entry,
   agreement -> activate. Deployment order for Process maps: publish `_Acknowledge_Error_Out` first.

## 9. No shell / no code execution (e.g. chat-only Gemini)

You cannot compile, so you cannot produce a ZAP. Do NOT emit `.map` XML or base64. Instead deliver the exact inputs and the exact commands:
`spec.json` + XSDs (+ generator) in code blocks, then tell the user to run `BUILD doctor` and `BUILD build work/<name>/spec.json` in a clone of the
KB, and to paste back any `RESULT: FAIL` line so you can fix the spec. Say plainly that the ZAP itself is produced by the compiler step.

## 10. Where to read more (read the relevant file BEFORE answering a hard case)

`mec/guides/01-zap-and-map-file-format.md` (format, naming, schema rules) | `02` building blocks | `03` families + templates | `04` Java/manifest API |
`05` standard Java snippets (BOD header, acknowledge, MBM) | `06` M3 API usage patterns | `07` MI catalog | `08` spec + generator |
`09` sample inventory | `10` Cloud migration master reference | `references/failure-modes.md` (import/publish errors -> fixes).
