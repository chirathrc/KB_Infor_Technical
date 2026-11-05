# 06 — M3 API usage patterns

Which MI programs the samples use for what, plus the special-purpose MI programs that make custom mappings
possible. Field-level metadata: **all 9,064 transactions** in `mi/mi_catalog_full.json.gz`
(query with `tools/mi_lookup.py`, see `07`); the 269 used in the samples (older metadata) in `mi_catalog.json`.

## 1. Special-purpose MI programs

| Program | What it is | Usage pattern |
|---|---|---|
| **CMS100MI** | **Custom list APIs** defined per tenant (M3 "Custom lists"/MI builder). Transaction names (`LstPRDetail`, `LstStockLine`, `LstGLErrors`, …) and fields are **tenant-specific**; field names carry the table prefix (`SDITNO`, `MWDIVI`, `M2ATVA`). | Repeating (`ARM`/`ARI`) loops to join tables standard APIs can't. 34 transactions in the samples; the catalog has the 169 of the swagger export tenant. An FS that needs one must specify the list (tables, keys, output fields) — it must exist in the target tenant before the map is published. |
| `CMS100MI/SetLstMaxRec`, `MRS001MI/SetLstMaxRec` | Raise the max-records limit for subsequent list calls | Call once before a large list loop. Seen in the samples' tenant only — neither transaction is in the swagger export (its `MRS001MI` MI-Repository program has 36 other transactions), so confirm availability per tenant. |
| **MDBREADMI** | Generated table-read API: `Get<TABLE><index>` (single row) / `Lst<TABLE><index>` and `Sel<TABLE><index>` (rows) (e.g. `GetMHDISH00`, `GetMITAUN00`, `GetMWOHED55`, `GetODHEAD42`, `SelMBMTRD00`) | Direct key read when no business API returns the field. Index suffix = table access path. Outputs are named columns (no parsing), so prefer it to EXPORTMI for plain key lookups. |
| **EXPORTMI/Select**, **SelectPad** | SQL-like export: `SEPC` separator, `HDRS` headers, `QERY` query → `REPL` delimited reply row | Always inside a `WT` loop; split `REPL` in Java. For ad-hoc queries when no standard API, table read or custom list fits — details §5. |
| **CUSEXTMI** | Custom extension table (`FILE`, `PK01…`, `A030…A530`, `N096…` style fields) | `GetFieldValue` (AVI) → if missing init → `AddFieldValue`, else `ChgFieldValue`: persistent per-key config/state. |
| **CRS881MI** | Data translation (MBMTRN/MBMTRD) lookups: `GetTranslData`, `LstTranslData`, `LstTranslDataOB` | Config tables maintained by the business: bank → IBAN rule, plant → mill, division → e-mail group. Inputs via constants: `TRQF`, `MSTD`, `MVRS`, `BMSG`, `IBOB` (I/O), `ELMP`, `ELMD`, `MVXD`. |
| **CRS980MI** | Text blocks: `GetTextID` (FILE + KV01..), `SltTxtBlock` (TXID, LNCD, TFIL) list lines; `RtvNewTextID`, `AddTxtBlockHead/Line`, `SetTextID` to write | Read supplier/order texts into output; write notes on inbound documents. |
| **MNS260MI** | MBM initiation: `AddMBMInit` → `PrcMBMInit` → `DelMBMInit` | Raise a new MBM from a mapping (re-detect / chaining, F2). |
| `MNS150MI/GetUserInfo`, `GetUserData`; `<PGM>MI/GetUserInfo` | User defaults (language `ZDLANC`, date format) | BOD language code; e-mail of buyer/responsible. |
| `MNS100MI/GetBasicData` | Division data (currency, country, company name) | Header data. |
| `CRS111MI/Get` | E-mail address book | Recipients. |
| `ATS101MI/SetAttrValue` | Attribute values | Weighbridge tickets, receipt attributes. |

## 2. Domain sequences seen

| Domain | Calls (in order) | Families |
|---|---|---|
| Payment proposal → bank file | `APS130MI/GetHead`, `GetHead2`, `GetHeadAddress` → loop `LstPayeeTotals` → `LstPayeeTotals2` → `LstInvByPayee`; `CRS620MI/GetBasicData`, `GetSupplierRef`; `CRS690MI/GetBasicData` (bank); `CRS881MI/GetTranslData` | F1, F2, F3 |
| Warehouse transactions (receipts, picks, packs) | `MHS850MI/AddWhsHead` → `AddWhsLine`/`AddWhsPack` (loop) → `PrcWhsTran`; single-step `AddDOReceipt`, `AddPOReceipt`, `AddCOPick`, `AddDOPick`, `AddROPick`, `AddMOReceipt`; inputs `PRFL` (*EXE), `E0PA`/`E065` (partner/message type), `MSGN` (message no), `PMSN` | F5, F7 |
| Pick lists / deliveries | `MWS410MI/GetHead`, `RelForPick`; `MWS411MI/LstDeliveryLine`; `MWS422MI/LstPickDetail`; `MWS420MI/Confirm`, `PrtDocuments`; `MMS310MI/Update` | F7 |
| PO receiving | `PPS200MI/GetHead`, `LstLine`; `PPS001MI/NotifyLine`; `PPS330MI/ListPOTrans`, `DelPOTrans`; `PMS050MI/RptReceipt`, `PMS100MI/LstByRORN` | F5, F7 |
| Requisition / planned PO | `PPS170MI/LstPlannedPO`, `CrtPOP`; `CMS100MI/LstPRDetail`, `LstPOLast`, `LstCurrencyRate` | F4, F5 |
| Product structures (recipes) | `PDS001MI/List`, `Add`, `Copy`, `Update`, `Delete`; `PDS002MI/LstComponent`, `AddComponent`, `UpdateComponent`, `Delete`, `LstOperation`, `AddOperation` | F8 |
| Stock take | `MMS301MI/LstStockTakeDet` → `UpdStockTake`; `CMS100MI/LstStockLine` | F6 |
| Inventory adjustment | `MMS850MI/AddAdjust`; `MMS010MI/ListLocations` | F5 |
| GL journal upload | `GLS840MI/AddBatchHead` → `AddBatchLine` (loop) → `CtrlBatch` → `sleep` → `CMS100MI/LstGLErrors` → `UpdBatch` (§4) | F10 |
| Customer order batch (credit notes) | `OIS100MI/AddBatchHead` → `AddBatchLine` → `Confirm`; `CRS610MI/GetBasicData` | F10 |
| Customer credit / workflow | `CRS610MI/GetBasicData`, `GetFinancial`, `GetOrderInfo`; `CMS100MI/LstCLWF*`; `OIS100MI/GetOrderHead`, `GetOrderValue` | F4 |
| E-invoice | `OIS350MI/GetInvHead`, `ARS200MI/GetInvoice`, `GetInvTotInfo`, `ARS120MI/GetInvHead`, `LstInvLines`, `GLS200MI/LstVoucherLines`, `CMS100MI/LstVatRate`… | F4 |
| Item master (EAM) | `MHS001MI/Add|Chg|GetIntItmMst`, `MHS002MI` (whs), `MHS003MI` (facility), `MHS015MI` (alt UoM), `MHS025MI` (alias), `MHS200MI` (SKU/style) | F5 |

## 3. Rules of thumb for generated maps

1. Set `M3 Settings` before the first API (Company, and Division when division-scoped APIs follow).
2. Use `AVM` for mandatory lookups, `AVI` + explicit check for anything whose failure must be reported.
3. One repeating API per loop, as the first element; outputs to `Line_*` variables, consumed by `UV` functions
   in the same loop.
4. Pass constants for code-like API inputs (`KP` links) — keeps them visible in the Mapper.
5. Leave unneeded API inputs unlinked (M3 defaults); never invent field names — take them from
   `mi/mi_catalog_full.json.gz` (`mi_lookup.py show PGM/TRN`) or the tenant's MI metadata.
6. Tenant-specific APIs (`CMS100MI` lists, `MDBREADMI` reads, `EXTnnnMI`): the catalog holds those of the swagger
   export tenant. For any other, take the definition from the target tenant (MI metadata / swagger) and put it in
   `api_fields`. Either way, check that every API an FS names exists in the target tenant under that exact spelling,
   mark them as prerequisites in the design, and flag any field name that is assumed.
7. Check every **standard** transaction the FS names against the catalog: FS texts misspell them (e.g. a
   non-existent `CrtBatch` for `GLS840MI/CtrlBatch`).
8. `GetUserInfo` / `GetServerTime` exist in every MI program (GENERAL transactions) — no extra program needed.
9. **Stale API metadata fails generation**: "Input field:CONO doesn't exist. Generation aborted" means the map still
   declares a parameter the current transaction no longer has (e.g. `OIS100MI/GetOrderHead` takes only `ORNO`).
   Deleting the link is not enough; the parameter itself must go. Build from the current catalog (`map2spec.py
   --catalog-api` when starting from a sample); in the Mapper, re-fetch the API from the repository and re-link.
10. **Before EXPORTMI, look for a standard transaction that replaces the whole step**, not just its read: e.g.
    `CRS165MI/RtvNextNumber` (atomic next number instead of read + update + retry), or a "list by warehouse/facility"
    transaction such as `MMS060MI/LstBalID` for bulk reads of one table.
11. Before splitting a multi-column query into several API calls, check which columns are actually used downstream.
    A dynamic filter that references another table's columns needs a per-item lookup on that table, not a join.

## 4. GL interface posting through GLS840MI (finance interface batch)

Pattern: `AddBatchHead` (CONO, DIVI, KEY1, INTN = GLS850 interface name, DESC) → `AddBatchLine` per line (LINE,
PARM) → `CtrlBatch` → `sleep()` → read the batch's error/status records → `UpdBatch` → (optional) read them again.

- **PARM must match the interface's input record exactly**, as defined in GLS850 for that interface (record ID +
  field positions defined for that interface). If the source file follows a different layout
  (a field missing, a different order), rebuild PARM in the map. Verify by comparing a rebuilt PARM with a
  known-good record byte by byte.
- **INTN must match the GLS850 interface name exactly** (case included); keep it in a control property.
- **KEY1 identifies the batch.** Re-sending the same KEY1 makes `AddBatchHead` fail (key exists), which gives safe
  re-processing without duplicates. A failed batch stays in GLS840 until it is deleted (manually, or with
  `DelBatch` if the FS allows it).
- Post only a complete batch. Check every `AddBatchLine`, and never call `CtrlBatch`/`UpdBatch` after a line
  failed.
- Pre-checks worth doing in the map: debit = credit (`BigDecimal`), dates valid, division in every record equal
  to the header's, mandatory dimensions present.
- Results of `CtrlBatch`/`UpdBatch` are read after a wait (control property, default ~20 s). There is no standard
  list transaction for them, so projects use a tenant custom list (the samples use `CMS100MI/LstGLErrors`). Keep the codes to ignore (informational
  errors) in a control property. If the list cannot be read, do not post.
- `UpdBatch` OK is the normal "posted" signal; vouchers that fail later end in the GL error program for manual
  follow-up.

## 5. EXPORTMI/SelectPad — ad-hoc read pattern (Cloud allows no SQL in maps)

| Field | | Notes |
|---|---|---|
| `QERY` | in, mandatory, max 982 chars | `"<col1>,<col2> from <TABLE> where <cond> and <cond>"` — no `SELECT` keyword |
| `SEPC`, `HDRS` | in | normally blank / `0` |
| `REPL` | out, max 3,985 chars | one row: comma-separated, space-padded column values |

- Conditions: column against literal only (`=`, `>` confirmed), one table (no joins). Numeric columns are quoted like
  strings (`OBPONR = '10'`). Computed columns and column-vs-column comparisons go into the Java that parses `REPL`.
- Always inside a `WT` loop, as the controlling list API:
  - single row: `ARM`;
  - several rows: `ARI` — the Mapper calls it again on each pass and ends the loop when `REPL` comes back empty.
- Shape: `[UV] Query_<TABLE>` (builds `QERY`, clears the collection) → `LOOP[WT]` { `[ARI] EXPORTMI/SelectPad` →
  `[UV] Retrieve_<TABLE>` (if `REPL` not empty: split on `,`, `.trim()` every string field, parse numbers, add to the
  collection) } → after the loop, emit or use the collection (02 §3.5).
- Trim every parsed string: untrimmed values (e.g. an item number with trailing blanks) fail later API calls with
  errors far from the cause.
- On a failed lookup, add to the error list and continue (02 §3.7); abort only where continuing is unsafe.
