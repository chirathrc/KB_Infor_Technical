# Example F11 — inbound Load BOD → M3 (no Acknowledge)

`M3BOD_StockAdjustment_Load_In_Custom`: ION delivers a `LoadStockAdjustment` BOD; the map posts one
`MMS850MI/AddAdjust` per line. Load is fire-and-forget: no Acknowledge, no `_Acknowledge_Error_Out` map, no output
document (`schema_out: null`).

What it shows:
- the Load envelope (`03` F11): `ApplicationArea/Sender`, `DataArea/Load/ActionCriteria`,
  `DataArea/<Noun>/Load<Noun>` (repeating). Only the business fields get records and links; the envelope nodes need none;
- partner, message type and company as control properties;
- validate each line, post only valid lines (`IT` block), collect API errors with `isLastAPICallOK()`;
- at the end, `logWarn` every error and fail the message with `MeCError` so it is visible in EC Administration;
- code-like and quantity fields are `xs:string` in the repeating group (`01` §7) and parsed with `BigDecimal`.

Build and check:
```bash
python3 -I tools/mapbuild.py examples/load-in/spec.json out/
python3 -I tools/verify_rules.py out/
python3 -I tools/javacheck.py examples/load-in/spec.json /tmp/jc
```
Not yet import-tested: the schema category (`BOD`, allowed because the name follows the BOD pattern) and the
no-namespace envelope follow the reference's confirmed running Load-In map, whose category was not recorded.
