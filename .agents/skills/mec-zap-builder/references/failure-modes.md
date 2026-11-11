# Failure modes: why AI-generated ZAPs break, and the import/publish errors

## A. Why a model "does not create the ZAP properly" (root causes seen with the KB)

| # | Symptom | Root cause | Fix in this skill |
|---|---|---|---|
| 1 | Tool crashes with `FileNotFoundError ... mec/tools/../mi/mi_catalog_full.json.gz` | Tools look in `mec/mi/`, repo ships `mec/mi-reference/` | Always run via `scripts/mec_build.py` (finds the catalog, passes `--catalog`). Permanent repo fix: copy/rename `mec/mi-reference` to `mec/mi` or change the default path in `mapbuild.py`, `mi_lookup.py`, `map2spec.py` |
| 2 | Model prints `.map` XML or a base64 "zip" | Tried to author the file by hand after tool failure | Section 0 of SKILL.md: only the compiler writes the ZAP |
| 3 | Mapper says "Failed to load mapping model" / `mecModel is null` | Doubled BOM, UTF-8 instead of UTF-16BE, file re-saved in an editor | Never edit the built map; `build` checks `fe ff 00 3c` |
| 4 | Invented API/field names | Not looked up in the catalog | `api show` first; compiler rejects unknown fields |
| 5 | Wrong verb/family | Sync map with a non-EventData input, or Process without Acknowledge | Section 3 rules |
| 6 | Looks fine but fails at Publish | Forbidden Java (LinkedList, TimeUnit, Thread, JDBC) or stale API params | Compiler blocks these; run `javacheck` (needs a JDK) |
| 7 | "Done" claimed without verification | No gate | `RESULT: PASS` line is mandatory; list what was NOT tested |
| 8 | Model pastes 600 KB of map into chat | Dumped the `.map` | Use `<name>.dump.txt` pseudocode; show only the sequence summary |

## B. Import / Generate / Publish errors -> cause -> fix

| Message / symptom | Cause | Fix |
|---|---|---|
| "BOD Mapping Name ERROR - Invalid Mapping Name for a Custom BOD mapping" | schema category `BOD` but name not `<Prefix>_<Noun>_<Verb>_<In/Out>_<Suffix>` | Rename to the BOD pattern, or set the category to `Other` |
| "Invalid Mapping Schema" | BOD root has `.` or `_` (e.g. `Sync.Item`) | Root is `<Verb><Noun>` joined: `SyncItem` |
| Publish: "Mapping contains unauthorized code: ..." | `LinkedList`, `java.util.concurrent.*`, `Thread`, `System.out`, JDBC | `ArrayList`, millisecond maths, `sleep(ms)`, `logInfo` |
| Generate: "Input field:CONO doesn't exist. Generation aborted" | stale API parameter list (e.g. `OIS100MI/GetOrderHead` now takes only `ORNO`) | Re-fetch the API in the Mapper ("Update this"), re-link inputs; do not link CONO |
| Agreement: "Inbound Schema is not valid" | old EventData schema without `TenantId`, `EventId`, `OldValue` | Use `EventData_MT.xsd` (auto-staged, compiles to `EventData_46e58dff.xsd`) |
| Agreement: "No available Acknowledge Error Mapping for Inbound Process Mapping with noun ..." | `_Acknowledge_Error_Out` map not published | Publish the error map first |
| "Input Document Missing Root Element" / broken links after re-import over an existing map | stale checksum | Delete the map folder checksum, re-import, Documents -> Update Checksums |
| Links with `InFrom IDREF="brokenlink;..."` after a schema swap | orphaned duplicate links | Delete stub links; prefer rebuilding from the spec |
| Publish: "too many passes (>100) cyclic dependencies" | numeric XSD types inside repeating groups | `xs:string` for code-like fields |
| Compile: "cannot convert from Iterator to String" / Boolean function unusable as condition | parameter type left `String` / reverted to `Void` in the Mapper UI | Set the Data Type; give every non-String param a type in the spec (`types`) |
| ION: "No channel is available for the assigned document name" | EC Config -> Documents entry missing | Republish the map |
| BOD arrives with wrong type in ION | `MAP_ION_BOD_TYPE` wrong | Dotted `Sync.<Noun>` in `SetOutboxHeaderData` |
| Event produces nothing | Event Analytics rule/subscription or agreement not active; delete events `abort()` by design | Check rule, subscription, agreement status, ION OneView |

## C. Cloud-migration quick rules (when converting on-prem maps; full list: `mec/guides/10-cloud-migration-master-reference.md`)

- `cat.X(strUUID + ...)` logging -> `logWarn(...)`; `strUUID` -> `getMapUUID()`; `Thread.sleep(n)` -> `sleep(n)`.
- `IONToolbox.getSystemEnvironmentCode(myMap)` -> `getSystemEnvironmentCode()`; `getSenderLogicalID(myMap)` -> `getFromLogicalID()`;
  `getMappingVersion(myMap)` -> `getMappingVersion()`; `getBEVersion(myMap)` -> `getBEVersion()`.
- `new DataTranslator(myMap, ...)` -> `new DataTranslator(getManifestMap(), ...)`; `new IONApplicationArea(myMap, id)` -> `new IONApplicationArea(getIONAppAreaManifestMap(), id)`.
- `OIS100MI/GetHead` -> `GetOrderHead` (only `ORNO`). Direct SQL -> `EXPORTMI/SelectPad` or a standard MI.
- Map files: UTF-16BE, single `FE FF` BOM. Migration rename convention: `KL_<BODNoun>_<BODVerb>_<Direction>_1_0_0`.
- Transform migration maps with a script implementing the documented rules, never by hand-editing XML.
