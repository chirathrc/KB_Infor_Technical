# Example: M3 customer event -> CRS610MI reads -> custom Sync.CustomerDetails BOD (family F4)

Tested end to end offline (compile, format rules, Java compile, 11 simulated scenarios). Not yet imported into the Mapper.

Files
- `fieldmap.py`   one table per section: (BOD element, MI field). Edit here to add/remove fields.
- `gen_customer.py` writes `Nouns-CustomerDetails.xsd`, `BODs-SyncCustomerDetails.xsd` and `spec.json` from the field map; contains the
  generic F4 Java functions to copy for any other noun (event parsing, header, Sync, validation, collect/emit loops).
- `spec.json`    the generated spec (what `build` compiles).
- `samples/`     EventData test messages: OCUSMA update, CIDMAS create, delete (no BOD).

Reuse for another noun (e.g. supplier, item, warehouse):
1. `BUILD api search <topic>` / `BUILD api show <PGM/TRN>` to choose the reads.
2. Copy this folder, rename noun/keys in `gen_customer.py`, replace `fieldmap.py`, run `python gen_customer.py`.
3. `BUILD build spec.json --out out` until `RESULT: PASS`.

Build: `python .agents/skills/mec-zap-builder/scripts/mec_build.py build .agents/skills/mec-zap-builder/examples/customer-details-event/spec.json --out out`
(`EventData_MT.xsd` and `Resources-Meta.xsd` are copied in automatically from `mec/examples/item-details-event/`.)
