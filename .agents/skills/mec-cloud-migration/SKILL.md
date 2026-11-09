---
name: mec-cloud-migration
description: >
  Master reference for Infor M3 Cloud migration of MEC maps (.zap/.map) from on-prem to Cloud (MEC Mapper / XtendM3 / ION). Use for: migrating on-prem MEC maps to Cloud, Sync / Load / Process / Acknowledge BOD patterns, Tier-1 automated fixes (cat.* to logWarn, IONToolbox boilerplate, Thread.sleep, myMap constructor args, GetHead to GetOrderHead), publish-time errors (unauthorized code such as LinkedList/TimeUnit, Inbound Schema is not valid, brokenlink stubs, CONO on GetOrderHead, double-BOM UTF-16BE), replacing direct SQL with EXPORTMI.SelectPad or MDBREADMI, replacing custom SOAP webservices with XtendM3, inbound file->M3 Pattern F, ConfirmBOD companion maps, Load BOD XSD envelopes, plus ION / Infor OS reference (Data Flows, scripting, workflows, API Gateway, IFS roles, IMS, Data Fabric, BCM, Data Catalog). Trigger on 'MEC map', '.zap', 'Cloud migration', 'KL_ map', 'BOD', 'ION Data Flow', 'EXPORTMI', 'Event Analytics'. Refer to the GitHub Knowledge Base at https://github.com/chirathrc/KB_Infor_Technical.
---

# MEC Cloud Migration - Skill Pointer

The full authoritative content (about 2,500 lines, sections 0-14 plus map analyses) lives in the KB:

- **Master reference**: [`mec/guides/10-cloud-migration-master-reference.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/mec/guides/10-cloud-migration-master-reference.md)
- Other MEC guides: [`mec/guides/`](https://github.com/chirathrc/KB_Infor_Technical/tree/main/mec/guides)
- Samples (.zap): [`mec/samples/`](https://github.com/chirathrc/KB_Infor_Technical/tree/main/mec/samples) and index [`mec/MEC_INDEX.json`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/mec/MEC_INDEX.json)
- MI APIs: [`m3-api/mi-swagger/MI_CATALOG.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/m3-api/mi-swagger/MI_CATALOG.md)

Always read the relevant section of the master reference before answering; do not rely on this summary alone.

## Section map of the master reference
| Section | Topic |
|---|---|
| 1-2 | Project defaults (UTF-16BE, single FE FF BOM, rename `KL_<Noun>_<Verb>_<Direction>_1_0_0`) and interaction rules |
| 3 | BOD verbs: Sync (always EventData input), Load (no acknowledge), Process/Acknowledge |
| 4 | Tier-1 automated fixes applied to every map |
| 5 | Flagged manual fixes (items 6-26): CONO on GetOrderHead, EventData schema swap, MvxEnvelope conversion, brokenlink stubs, LinkedList/TimeUnit rejection, double-BOM, hash re-naming, checksum caching |
| 6 | Direct SQL replacement: `EXPORTMI.SelectPad` (ARM/ARI in a WT loop, `.trim()` REPL fields, `LL_Errors`), `MDBREADMI`, superseding MI transactions (`MMS060MI/LstBalID`, `CRS165MI/RtvNextNumber`) |
| 7 | Custom SOAP webservice to XtendM3 (`EXT100MI/UpdDOHeader`) |
| 8 | Inbound file to M3 (Pattern F), ConfirmBOD companion map, BOD envelope XSDs |
| 9-12 | Load BOD XSD envelope, tag notes, script limitations, reference maps |
| 13 | API reference index (confirmed MI transactions) |
| 14 | ION / Infor OS platform reference (14.1-14.31) |

## Non-negotiable rules (summary)
1. Step by step with confirmation; surgical edits only; show the plan before multi-step changes.
2. Transform `.zap`/`.map` via a script implementing the documented rules, never by hand-editing XML (except pointer swaps explicitly allowed).
3. Map files are UTF-16BE with one `FE FF` BOM; read decoded files with `utf-8-sig`; validate the final file with a real XML parser.
4. Cloud MEC forbids SQL: use `EXPORTMI.SelectPad` (project convention over `MDBREADMI`) or a superseding standard MI.
5. Unauthorized code at publish: `Thread` (use `sleep(n)`), `java.util.LinkedList` (use `ArrayList`), `java.util.concurrent.TimeUnit`.
6. Root BOD element names are `<Verb><Noun>` concatenated; manifest strings use dotted `Verb.Noun`.

