# IEC (MEC) Mapping Knowledge Base — v0.3

Purpose: everything needed to turn a **Functional Specification (FS)** into an Infor M3 Enterprise
Collaborator mapping (an importable `.zap` with `.map` + schemas). Built from 80 real Cloud mappings
(`TST_MEC_Mappers.zip`) and the standard MI API definitions (`mi-swagger_1_1.zip`, 1,310 programs). It is the
reference layer of the **iec-mapping-from-fs** skill and complements the generic `m3-enterprise-collaborator`
skill (agreements, processes, administration), which it does not repeat.

## KB policy
The KB keeps **everything from its two sources**: the MI swagger export (all programs and transactions, including
the tenant-specific `CMS100MI` lists, `MDBREADMI` reads and `EXTnnnMI` APIs of the export tenant) and the 80 sample
mappings. From later project work it takes only **common content**: file-format findings, usage patterns, coding
rules and tools. Custom APIs, customer names and field values met in new map generations are **not** added; they
change over time and stay in that project's delivery (spec `api_fields`, `DESIGN.md`).

## Changes in v0.3 (2026-11)
- Rules:
  - the schema category triggers the custom-BOD naming rule (01 §6);
  - fixed-width records are never trimmed (02 §4);
  - no bare `return;`, and `abort()` semantics (04 §6).
- Patterns:
  - flat-file inputs (02 §3.9);
  - one map = one output (02 §3.10);
  - ION data-flow notification with a Base64 CSV attachment (02 §3.11);
  - validate-all / no half results (02 §3.12);
  - GL interface posting with PARM rebuilt to the interface record (06 §4).
- Tools:
  - `javacheck.py`, `javasim.py`, `fs_extract.py`;
  - `mapbuild.py` checks: BOD category vs map name, bare return, loop/function name clash; clearer tenant-API warning;
  - `mapdump.py`: pipe-safe.
- New example `examples/item-details-event`.
- From a Cloud-migration reference (patterns only, no project APIs):
  - BOD verb decision, Sync rule, F11 Load family + example `examples/load-in`, Process/Acknowledge hard rules and
    the file-in data flow (03);
  - schema rules from publish failures (01 §7); IEC runtime facts (02 §3.13);
  - scanner-rejected Java (04 §6); EXPORTMI/SelectPad pattern and API-choice rules (06 §3, §5);
  - import/publish troubleshooting table (08 §6);
  - tools: `mapbuild.py`/`javacheck.py` block scanner-rejected classes; XSD checks; `verify_rules.py` BOM + XSD parse.

## Contents

| File | What it gives you |
|---|---|
| `01-zap-and-map-file-format.md` | Byte-level spec of `.zap` / `.map` (sections, IDs, type codes, links, hashing, encoding). Round-trip verified on all 80 files. |
| `02-building-blocks-and-design-patterns.md` | Execution semantics, API error-mode choice, control-flow idioms, abort/MeCError, triggers and input documents. |
| `03-mapping-families-and-templates.md` | BOD verb decision, the 10 sample families + F11 Load with canonical skeletons, naming rules, FS → family decision table. |
| `04-java-and-manifest-api.md` | Whitelist-safe Java surface actually used, helper classes, manifest keys, control properties. |
| `05-standard-snippets.md` | Verbatim template functions (SetHeader, SetSync, GetProcessHeader, SetAcknowledge, MBMInit, …). |
| `06-m3-api-usage-patterns.md` | Special MI programs (custom lists, table reads, EXPORTMI, CUSEXTMI, CRS881MI, CRS980MI, MNS260MI), per-domain API sequences, GL interface posting pattern. |
| `07-mi-api-reference.md` | **MI API catalog**: 9,064 transactions, how the swagger maps to Mapper metadata, accuracy, list/single, GENERAL transactions, tenant-specific programs, how to find the right API. |
| `08-mapping-spec-and-generator.md` | **Spec format + compiler**: FS → `spec.json` → `.zap`; validations; verification results; sample-to-template workflow. |
| `inventory.md` | The 80 samples by family, with in/out documents, size, APIs, control properties. |
| `mi/mi_catalog_full.json.gz` | Normalised catalog of all MI programs/transactions/fields (from the swagger). |
| `mi/mi_modules.md`, `mi/mi_programs.md` | Module summary (120 prefixes) and full program index. |
| `mi_catalog.json`, `mi_catalog_index.md` | The 269 transactions whose metadata the Mapper embedded in the samples (older MI version; used for cross-checks). |
| `examples/` | Buildable specs: `item-info` (catalog APIs, loops), `wb-outbound-1` (rebuild of a sample, `api_fields`), `item-details-event` (F4: M3 event → item details → custom Sync BOD; validation, abort/MeCError, collect-then-emit) and `load-in` (F11: Load BOD → MMS850MI/AddAdjust, no Acknowledge). |
| `samples/` | The 80 original `.zap` units — template library for `map2spec.py` (see `inventory.md`). |
| `tools/` | Python 3 utilities, no dependencies — below. |

## Tools

```bash
# find APIs
python3 -I tools/mi_lookup.py search <words> [--list|--single] [--verb Get,Lst]
python3 -I tools/mi_lookup.py show PGM/TRN | program PGM | field FLD [--given A,B] | label <words> | mapdesc PGM/TRN
# build and inspect mappings
python3 -I tools/map2spec.py <sample.zap|dir> <work_dir> [--catalog-api]   # sample -> editable spec
python3 -I tools/mapbuild.py <spec.json> <out_dir>                         # spec -> .map + XSDs + .zap
python3 -I tools/mapdump.py <file.map|.zap> [--no-java]                       # .map -> readable pseudocode
python3 -I tools/verify_rules.py <dir of unzipped units>                   # re-check every format rule
python3 -I tools/javacheck.py <spec.json> <tmp_dir>                       # compile all Java against MEC API stubs
python3 -I tools/javasim.py <spec.json> <tmp_dir>                         # runnable class + driver template (simulated MI)
python3 -I tools/fs_extract.py <FS.docx> <out_dir>                        # FS text, comments, embedded files, images
python3 -I tools/roundtrip_spec.py <dir of unzipped units> <work>          # regression: map->spec->map
# rebuild knowledge
python3 -I tools/build_mi_catalog_from_swagger.py <mi-swagger.zip|dir> mi/mi_catalog_full.json.gz [mi_catalog.json]
python3 -I tools/build_mi_indexes.py mi/mi_catalog_full.json.gz mi
python3 -I tools/build_inventory.py | build_mi_catalog.py | extract_snippets.py | javascan.py | mapstats.py   (sample analysis)
```
`mapmodel.py` (lossless `.map` read/write) and `xsdpath.py` (schema path resolver) are libraries used by the above.

## Key findings

1. A `.map` is a UTF-16BE XML graph (sequence, loops, functions, parameters, Java, variables, constants,
   referenced schema records, typed links). All rules are known and verified: parse → write is byte-identical
   for all 80 samples, and spec → compile reproduces 79/80 samples semantically.
2. Ten families cover all samples; each has a fixed opening/closing and a variable business middle.
3. API functions embed the **full MI field list**; the swagger catalog supplies it for 9,064
   transactions with ≥ 96 % agreement with Mapper metadata (newer M3 version: extra fields in some).
4. Tenant-specific APIs (`CMS100MI` custom lists, `MDBREADMI`, `EXTnnnMI`) differ per tenant: the catalog holds those
   of the swagger export tenant, the samples use others. Confirm them in the target tenant; supply any API that is not
   in the catalog through `api_fields`. The compiler flags them.
5. All live Java in the samples is Cloud-whitelist compliant.
6. Outside the `.map` an FS delivery also needs: event rule / Event Hub subscription or MBM set-up, custom BOD in
   BOD Processor, ION connection points/flows, partner agreement (detection, process steps, control-property
   values), tenant custom lists, CRS881 translation data.

## Open items
- Generate + Publish of a generated `.zap` (import and validation confirmed, 08 §1).
- Import a generated `_Acknowledge_Error_Out` map and the Load example: confirm they register in Mapping Explorer (08 §6).
- `java.util.Base64` and steps after a Send in one agreement: confirm on a real tenant.
- FS documents (ideally behind some of the samples) to calibrate the FS → spec step.
