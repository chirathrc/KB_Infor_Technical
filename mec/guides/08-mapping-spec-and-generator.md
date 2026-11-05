# 08 — Mapping spec and generator (FS → spec → .zap)

The skill does not hand-write `.map` XML. It writes a **mapping spec** (JSON, readable, reviewable) and
compiles it with `tools/mapbuild.py`, which applies every rule in `01` (IDs, sequence numbers, link types,
schema records, FormattedPath prefixes, CRC32 schema names, UTF-16 encoding) and pulls the complete field list of
each M3 API from `mi/mi_catalog_full.json.gz` (`07`).

```
FS ──(analyse, 03 family + 07 APIs)──► spec.json + XSDs ──mapbuild.py──► <Name>.zap ──► Mapper: import, generate, publish
                                   ▲                                         │
               map2spec.py (start from the closest sample)          mapdump.py / verify_rules.py (review)
```

## 1. Verification status

| Test | Result |
|---|---|
| All 80 sample maps: `.map → map2spec → mapbuild → .map`, compared semantically (functions + Java + params, sequence, loops, variables, constants, properties, schema records, full link graph) | **79 / 80 identical**; the one difference is an anomalous variable→*output*-parameter link inside Infor's standard `PurchaseOrder_Sync_Out` map, which the spec does not express |
| `verify_rules.py` on the 80 rebuilt maps | every rule passes (same profile as the originals; schema CRC names now 233/233) |
| Hand-written spec of `M3FTD_GC_WB_CN_WBOutbound_1_V1_Custom` | decompiled view identical to the original; identical schema file names |
| Hand-written spec of a namespaced BOD error-acknowledge map (chained `xs:include`) | identical apart from variable order (not significant) |
| Faulty spec (unknown API field, wrong schema path, missing mandatory input, single API used as a loop) | build fails with precise messages + warnings |
| **Import of a generated `.zap` into the Business Document Mapper** | **import and validation confirmed** (2026-11): the unit loaded and Mapper validation ran. Its only finding was the schema-category naming rule (01 §6), now enforced by `mapbuild.py`. Generate → Publish is still to be confirmed. |
| Generated maps (3 builds, 2026-11) | all Java compiled against MEC API stubs (`javacheck.py`) and run against simulated MI results (`javasim.py` drivers) before delivery |
| Load-In example (`examples/load-in`, F11) | builds, all format rules pass, Java compiles; import not yet tested |

## 2. Spec reference

```json
{
  "name": "M3FTD_ACME_WB_DOReceipt_Custom",      // BOD rule for BOD maps: <Prefix>_<Noun>_<Verb>_<In|Out>_<Suffix>
  "version": "1.0", "namespace": "Test", "description": "FS-123 weighbridge DO receipt",
  "schema_in":  {"xsd": "WB_DO_In.xsd",  "name": "WB_DO_In",  "root": "WeighbridgeIn", "category": "Other"},
  "schema_out": {"xsd": "WB_DO_Out.xsd", "name": "WB_DO_Out", "root": "WeighbridgeOut"},   // or null (no output)
  "properties": [{"type": "CP", "name": "Company", "value": "100"}],        // CP / SO / CO
  "constants":  [{"name": "PRFL", "value": "\"*EXE\"", "desc": "Process flag"}],          // value = Java expression
  "variables":  [{"name": "g_CONO", "type": "String", "init": "\"\""},
                 {"name": "g_Lines", "type": "java.util.List<String[]>", "init": "new java.util.ArrayList<String[]>()"}],
  "api_fields": [ { "program": "MDBREADMI", "transaction": "GetMITAUN00", "list": false,
                    "in":  [{"name": "ITNO", "label": "Item number", "length": 15, "mandatory": true, "type": "A"}],
                    "out": [{"name": "COFA", "label": "Conversion factor", "length": 15, "type": "N"}] } ],   // only for APIs not in the catalog
  "extra_records": {"out": ["/X/UserArea/Property"]},   // rare: unlinked wildcard placeholders
  "sequence": [ ...items... ]
}
```

### Sequence items

| Item | Produces | Keys |
|---|---|---|
| `{"java": "Name", "in": {...}, "out": {...}, "code": "..."}` | `UV` Java function | optional `desc`, `pdesc` {param: desc}, `types` {param: "int"}, `id`, `reusable` |
| `{"bool": "Name", "in": {...}, "out": {...}, "code": "... return x;"}` | `UB` Boolean | as above; must `return` |
| `{"api": "PGM/TRN", "mode": "AVM", "in": {"FIELD": src}, "out": {"FIELD": [dst]}}` | M3 API (all catalog fields) | `mode` AVM/AVI/AVL (single) ARM/ARI/ARL (list); optional `name`, `id`, `fields` (per-call metadata) |
| `{"settings": {"Company": src, "Division": src}}` | M3 Settings | optional `name` |
| `{"assign": {"from": "IN:/…", "to": "OUT:/…"}}` | Assign | |
| `{"loop": "Name", "cond": "WT", "ctl": "IN:/…", "emits": ["OUT:/…"], "body": [...]}` | Loop / If | `cond` WT (while true), WF (while false), IT (if); no `ctl` → first body item (UB / AR* / AVI) controls it |

**Sources** (input values): `"IN:/Root/A/B"`, `"IN:/Root/A[@attr]"`, `"$var"`, `"#CONST"`, `"Func.param"` (output
param of an *earlier* function; use the item's `id` when names repeat), a list for several links, `null` for
unlinked. **Targets** (output values): `["OUT:/Root/X", "$var"]`, `[]` for unlinked. Function-to-function wires
are declared on the input side.

### What the compiler checks
- every `IN:`/`OUT:` path exists in its XSD (follows `xs:include`, refs, named types, extensions, wildcards) —
  with the list of valid children on failure;
- every API exists in the catalog, every linked field exists; warns on unlinked mandatory inputs (except
  CONO), tenant-specific programs, single/list mode mismatch;
- loop controllers are valid (UB / AR* / AVI first in body, or a repeating input element — warns if the XSD
  element is not repeating);
- Boolean bodies contain `return`; Java contains no `]]>`; function-to-function links run forward (warning);
- a schema with category `BOD` requires a BOD-pattern map name (error; 01 §6);
- tenant-specific programs (catalog or `api_fields`): warning to confirm them in the target tenant;
- warnings: bare `return;` in a `UV` function (04 §6); a loop with the same name as a function;
- Java and variable types the publish scanner rejects (`LinkedList`, `java.util.concurrent`/`TimeUnit`, `Thread`)
  and code Cloud does not allow (JDBC, file I/O, `System.out`, `cat.*`): error (04 §6);
- schema rules (01 §7): `.` in a BOD root (error); unqualified namespaced XSD, `form="unqualified"`, numeric types in
  repeating groups (warnings). `verify_rules.py` also checks for exactly one BOM and parses every XSD.

### What it produces
`<out>/<Name>/<Name>.map`, schema files renamed `<stem>_<crc32>.xsd` (UTF-16BE+BOM, includes rewritten to the
hashed names), `mapping.properties`, and `<out>/<Name>.zap`. Schema records = root + referenced nodes in document
order; `FormattedPath` with the `H<abs(hashCode(ns))>:` prefix; `MappingMeta/ID` = -1.

## 3. Working from a sample (recommended)

```bash
python3 -I tools/map2spec.py samples/M3FTD_GC_WB_DO_Mapping_Update_Custom.zap work/wbdo --catalog-api
#   edit work/wbdo/spec.json: name, schemas, API calls, Java, properties …
python3 -I tools/mapbuild.py work/wbdo/spec.json out/
python3 -I tools/mapdump.py out/<Name>/<Name>.map         # review the result as pseudocode
python3 -I tools/verify_rules.py out/                      # format rules
```
`--catalog-api` drops the sample's embedded (older) API metadata so the rebuilt map uses the current MI
catalog; omit it to keep the sample's exact metadata.

## 4. Writing Java for generated maps
- Reuse the template functions in `05` verbatim for BOD header/acknowledge/MBM parsing.
- Inputs are `String`; null-check and trim (`i = i == null ? "" : i.trim();`). Outputs must be assigned.
- Only the Java surface in `04` (whitelist-safe in M3 CE). Fully qualify classes outside `java.lang`.
- Shared state goes in variables (fields); lists/iterators for collect-then-emit (`02` §3.5).
- After `AVI` calls, check `isLastAPICallOK()` / `getLastAPIMessage()` in the next `UV`.
- `code` may be a string (JSON-escaped: `\n`, `\"`) or, more readably, a **list of lines** — the compiler joins
  them with newlines.

## 5. Offline verification before delivery

```bash
python3 -I tools/mapbuild.py work/<name>/spec.json out/        # build (errors / warnings)
python3 -I tools/verify_rules.py out/                           # file-format rules
python3 -I tools/mapdump.py out/<Name>/<Name>.map --no-java      # review the sequence
python3 -I tools/javacheck.py work/<name>/spec.json /tmp/jc      # compile every Java function against MEC API stubs
python3 -I tools/javasim.py work/<name>/spec.json /tmp/sim       # generate a runnable class + driver template
```

`javasim.py` writes `MapSim.java`, where every function is a method, outputs are captured in `outs`, and the MI result
is controllable (`apiOK`, `apiMsg`). It also writes a `Driver.java` template. Write one scenario per FS case: call
the functions in the sequence `mapdump` shows, set the simulated API result before each check function, and copy
outputs to variables where the map links them. Run it on the **real sample file** (all OK) and once for each error
path. Keep the results with the delivery.

`fs_extract.py` pulls everything out of an FS `.docx`:
- the text (markdown) and the review comments;
- embedded objects (sample TXT/CSV packages, Excel sheets);
- the images, with EMF converted to PNG.

Read them all; sample files and comments often contradict the FS text.

## 6. Import and publish troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Publish: "Mapping contains unauthorized code: …" | `LinkedList`, `TimeUnit`, `Thread` … | rewrite (04 §6); `mapbuild.py` blocks these |
| Generate: "Input field:CONO doesn't exist. Generation aborted" | stale API parameter list | re-fetch the API, re-link (06 §3 rule 9) |
| Agreement: "No available Acknowledge Error Mapping for Inbound Process Mapping with noun …" | error map not published | publish `_Acknowledge_Error_Out` first (03 F6) |
| Agreement: "Inbound Schema is not valid" | old EventData schema (no `TenantId`, `EventId`, `OldValue`) | use the current EventData schema |
| "BOD Mapping Name ERROR – Invalid Mapping Name for a Custom BOD mapping" | BOD category with a non-BOD name | 01 §6 |
| "Input Document Missing Root Element" + broken links after re-importing a `.zap` over an existing map | stale checksum in the Mapper | delete the map folder's checksum, re-import, **Documents → Update Checksums**; if it persists the schema/records really differ |
| Links with `InFrom IDREF="brokenlink;…"` after a schema swap | orphaned duplicates of working links | delete the stub links |
| "Failed to load mapping model" / `mecModel is null` | doubled BOM | 01 §7; `verify_rules.py` |
| Publish: "too many passes (>100) cyclic dependencies" | numeric types in repeating groups | `xs:string` for code-like fields (01 §7) |
| Compile: "cannot convert from Iterator to String", Boolean function not usable as a condition | parameter type left at `String` / reverted to `Void` in the Mapper UI | set the Data Type (04 §6) |
| ION: "No channel is available for the assigned document name…" | EC Config → Documents entry missing (can vanish, e.g. after an environment refresh) | republish the map — publishing recreates the entry and channel |
| Generated map visible in Package Explorer but not in Mapping Explorer | reported for a hand-cloned error-acknowledge map | create it with **New Mapping** + schema import, then paste the functions (open item: not yet seen with a generated `.zap`) |

The Mapper names schema files `<name>_<crc32>.xsd`; `mapbuild.py` computes the same CRC (01 §1). After an import,
still take file names from the Mapper before any further hand-edit.

Outside the map, also deliver: the ION Data Catalog **Object Schema** for a custom noun, which is a separate artifact
from the map's schemas (zip `BOD/<Noun>/<Noun>.xml` = `NounMetadata` with `IDXPath` and SupportedVerbs Sync,
Acknowledge, Load, Process, plus `BOD/<Noun>/<Noun>.xsd` describing the source file); the data flow (03 F6/F11); the
agreement, incl. the Reorder process when order matters (02 §3.13).
