# spec.json cheat sheet (compiled by `mec/tools/mapbuild.py` through `scripts/mec_build.py build`)

Authoritative detail: `mec/guides/08-mapping-spec-and-generator.md`. Working example: `examples/customer-details-event/spec.json`.

## Top level

```json
{
  "name": "M3BOD_CustomerDetails_Sync_Out_Custom",
  "version": "1.0", "namespace": "M3 BOD", "description": "FS ref + one-line purpose",
  "schema_in":  {"xsd": "EventData_MT.xsd", "name": "EventData_MT", "root": "EventData", "category": "Other"},
  "schema_out": {"xsd": "BODs-SyncCustomerDetails.xsd", "name": "BODs-SyncCustomerDetails", "root": "SyncCustomerDetails", "category": "BOD"},
  "properties": [{"type": "CP", "name": "StrictListCheck", "value": "true"}],
  "constants":  [{"name": "PRFL", "value": "\"*EXE\"", "desc": "Java expression"}],
  "variables":  [{"name": "CUNO"}, {"name": "g_Rows", "type": "java.util.List<String[]>", "init": "null"}],
  "api_fields": [],
  "sequence": [ ... ]
}
```
- `schema_in` / `schema_out`: paths relative to the spec; `schema_out` may be `null` (no output). Category `BOD` only if the map name follows the BOD pattern.
- `namespace`: `M3 BOD` for BOD maps, `FBM` for bank/MBM file maps, free Mapper folder name otherwise.
- `properties` types: `CP` control property (read with `getManifestInfo("agr:Name")`), `SO`, `CO` (Check Order).
- `variables` default type `String`, init `""`. Give every non-String type explicitly.
- `api_fields`: ONLY for APIs missing from the catalog (tenant-specific). Otherwise omit; fields come from the MI catalog.
- `code` in java/bool items may be a string (JSON-escaped) or a **list of lines** (preferred).

## Sequence items (executed top to bottom)

| Item | Meaning | Keys |
|---|---|---|
| `{"java":"Name","in":{},"out":{},"code":[..]}` | void Java function (UV) | `desc`, `pdesc`, `types` (e.g. `{"iCount":"int"}`), `id`, `reusable` |
| `{"bool":"Name","code":[..."return x;"]}` | boolean function (UB); must `return` | as above |
| `{"api":"PGM/TRN","mode":"AVM","in":{"FIELD":src},"out":{"FIELD":[dst]}}` | M3 API call | `mode`: single `AVM`(exit map on NOK) `AVI`(ignore NOK, check yourself) `AVL`; list `ARM` `ARI` `ARL` |
| `{"settings":{"Company":src,"Division":src}}` | M3 Settings (must precede API calls) | |
| `{"assign":{"from":"IN:/..","to":"OUT:/.."}}` | direct copy | |
| `{"loop":"Name","cond":"WT","ctl":"IN:/..","emits":["OUT:/.."],"body":[...]}` | loop (WT while true / WF while false / IT if) | no `ctl` -> first body item (UB or AR*/AVI) controls it |

## Sources and targets

- Sources (`in` values): `"IN:/Root/A/B"`, `"IN:/Root/A[@attr]"`, `"$var"`, `"#CONST"`, `"FuncName.param"` (output of an **earlier** function/API; use the item's `id`
  when names repeat), a list for several links, `null` = unlinked.
- Targets (`out` values): `["OUT:/Root/X"]`, `["$var"]`, both in one list, `[]` = unlinked.
- API output `{"ZDLANC": ["$LANC"]}` copies that field into variable `LANC`. An API with `"out": {}` still exposes all fields to later functions as `ApiName.FIELD`.
- Function parameter naming convention: inputs `iName`, outputs `oName`.

## Loops

- Loop over a repeating input element: `{"loop":"L","cond":"WT","ctl":"IN:/EventData/Document/ElementData","body":[ ... ]}`.
- Collect-then-emit (no partial BOD on failure): loop 1 = `ARI` list API + `Collect*` java adds rows to a `java.util.List<String[]>`; then a `Check*` function
  tests `isLastAPICallOK()`; loop 2 = `HasNext*` (bool, iterator) + `Set*` (java) with `emits` = the repeating output element.
- A loop must have exactly one controller. Do not give a loop the same name as a function.

## What the compiler rejects or warns about

Unknown `IN:`/`OUT:` path (lists valid children) | unknown API / field | unlinked mandatory API input (CONO exempt) | single/list mode mismatch |
loop controller invalid | Boolean without `return` | `]]>` in Java | forward function-to-function links (warning) | bare `return;` in void Java |
LinkedList / `java.util.concurrent` / Thread / JDBC / file I/O / `System.out` / `cat.*` | BOD root with `.` | schema category `BOD` with a non-BOD name |
unqualified namespaced XSD, `form="unqualified"`, numeric types inside repeating groups (warnings; use `xs:string` for code-like fields).

## Minimal fragments

```json
{"settings": {"Company": "GetCONO_DIVI_AE.oCONO"}},
{"api": "CRS610MI/GetBasicData", "mode": "AVI", "in": {"CUNO": "$CUNO"}, "out": {}},
{"java": "ValidateCustomer", "in": {"iCUNO": "GetBasicData.CUNO"},
 "code": ["if (!isLastAPICallOK()) {", "    throw new MeCError(\"GetBasicData failed: \" + getLastAPIMessage());", "}"]},
{"loop": "AddressLoop", "cond": "WT", "body": [
   {"api": "CRS610MI/LstAddresses", "mode": "ARI", "in": {"CUNO": "$CUNO"}, "out": {}},
   {"java": "CollectAddress", "in": {"iCUNO": "LstAddresses.CUNO", "iADID": "LstAddresses.ADID"}, "code": ["..."]}]}
```
