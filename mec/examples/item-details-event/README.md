# Example: M3 event → item details → custom Sync BOD (family F4, standard APIs only)

FS pattern: an M3 item event (EventData) carries the item number. The map reads the item with several MMS200MI
calls (one Get plus three list loops), validates everything before writing output, and sends `Sync.ItemDetails`.

Shows:
- event parsing: ITNO/CONO, with or without the table prefix (`MMITNO`);
- delete → `abort()`; missing or invalid item → `MeCError`;
- list APIs positioned on a key, with rows of other keys filtered out;
- collect-then-emit iterator loops: no partial BOD on failure;
- a control property to choose fail vs. omit when a list API fails;
- generating the spec from a field map (`gen_spec.py fieldmap.json → spec.json`).

```bash
# Spec generation from field map:
python3 -I examples/item-details-event/gen_spec.py examples/item-details-event      # fieldmap.json -> spec.json

# Build .zap mapping unit package (Node.js or Python):
node tools/mapbuild.js examples/item-details-event/spec.json examples/item-details-event
# or:
python3 -I tools/mapbuild.py examples/item-details-event/spec.json out/

# Verification:
python3 -I tools/javacheck.py examples/item-details-event/spec.json /tmp/jc
python3 -I tools/javasim.py examples/item-details-event/spec.json /tmp/sim
```

## Generated Artifacts
- `M3BOD_ItemDetails_Sync_Out_Custom.zap`: Importable mapping unit for Infor MEC / IEC Mapper.
  - Contains `M3BOD_ItemDetails_Sync_Out_Custom.map` (UTF-16BE + BOM)
  - Hashed inbound event schema: `EventData_MT_73bfb117.xsd`
  - Hashed outbound BOD schemas: `BODs-SyncItemDetails_a5ec59df.xsd`, `Nouns-ItemDetails_6563ae2c.xsd`, `Resources-Meta_9d9e4cc9.xsd`
  - Manifest properties: `mapping.properties`

