# 07 — Standard M3 MI APIs (from the m3api-rest swagger export)

Source: `mi-swagger_1_1.zip` — one swagger 2.0 file per MI program, exported from tenant
`ZSRS8S9P7FNWUDGC_TRN` (`/M3/m3api-rest/v2/execute/<PGM>`). Normalised into `mi/mi_catalog_full.json.gz`
(880 KB) by `tools/build_mi_catalog_from_swagger.py`. Query it with `tools/mi_lookup.py`; the mapping
compiler (`tools/mapbuild.py`, see `08`) reads it to create API functions.

## 1. What is in the catalog

| | Count |
|---|---|
| MI programs | 1,310 (+ `GENERAL`) in 120 module prefixes — see `mi/mi_modules.md`, full list `mi/mi_programs.md` |
| Business transactions | 9,064 (2,221 `Lst*`, 1,531 `Get*`, 1,312 `Add*`, 953 `Upd*`, 682 `Dlt*`, 302 `Cpy*`, 300 `Del*`, 161 `Chg*`, 139 `Sel*`, …); 8,866 standard + 198 tenant-specific |
| List-type (repeating) transactions | 2,571 (heuristic, §4) |
| Field definitions | 78,327 inputs, 100,027 outputs |
| Version stamps | `1600` (894 programs), `6400`–`6404`, `14.x`, `13.1`, … |

**GENERAL transactions** exist in *every* MI program: `GetUserInfo`, `GetServerTime`, `ServerTimeZone`,
`GetCurrentUser`, `GetFieldHeading`, `GetMessageText`, `GetFixLevel`, `GetMIBuild`, `FpwVersion`. That is why
the sample maps call `PPS200MI/GetUserInfo`, `MHS850MI/GetUserInfo`, `MWS410MI/GetServerTime` etc. — any program
works; use the one already in the map. `GetUserInfo` returns the MEC user's defaults: `ZZUSID`, `ZDCONO`,
`ZDDIVI`, `ZDFACI`, `ZZWHLO`, `ZDLANC` (language → BOD `languageCode`), `ZDDTFM` (date format), `DSEP`/`TSEP`
(separators), `TIZO` (time zone), `USFN`, `ZDAUPF`, `ZDREPF`.

**Tenant-specific programs** (flagged `tenant_specific` / ⚠): `CMS100MI` (169 custom lists of *that* tenant),
`MDBREADMI` (7 generated table reads), `EXT001MI`–`EXT007MI` (M3 Extensibility APIs). They differ per tenant —
the sample maps' tenant has 34 other `CMS100MI` lists and 8 other `MDBREADMI` reads. Never assume they exist in the
target tenant: confirm them (`mapbuild.py` warns), and supply any that are not in the catalog in `api_fields`.

## 2. Swagger → catalog mapping (how to read the raw files)

| Swagger | Catalog | Notes |
|---|---|---|
| `info.title` = `"MMS200MI - Item toolbox interface"` | program `title` | |
| `paths./<TRN>.get.description` | transaction `desc` | |
| query parameter, `required: true/false`, `description: "Item number(15)"` | input `[name, label, length, mandatory, type, basis]` | uppercase names only |
| `responses.200…records.items.properties.<FLD>` with `format: numeric` / `mvxdate` | output `[name, label, length, type]` | type `N` numeric, `D` date, `A` alpha |
| `…results.items.properties.parameters.example` | input **order** | query params are listed *required-first*; the example keeps the true MI field order (223/226 = Mapper order) |
| REST control params `cono, divi, lanc, locale, timeZone, maxrecs, dateformat, excludeempty, righttrim, returncols, format, extendedresult`, header `positionkey` | dropped | REST-only; MEC sets company/division through **M3 Settings** |

Input types are not in the swagger; they are inferred (same field in the transaction's outputs → program →
whole catalog → sample-map metadata → 1-char input-only fields = numeric flag, else alpha). Fair test against
3,260 Mapper-embedded inputs: **96.6 % correct**, residual errors only affect the parameter description text.

## 3. Swagger vs Mapper metadata (cross-check on 226 transactions used in the 80 sample maps)

| Aspect | Agreement | Consequence for generated maps |
|---|---|---|
| Field names (set) | outputs: 185/226 identical, 40 swagger superset (newer M3 version adds fields) | generated maps carry the newer field list — fine; Mapper "Update this" refreshes anyway |
| Input order | 207/226 identical after re-ordering by the `parameters` example | positions are cosmetic; MI is called by field name |
| Lengths | 99.0 % in / 99.4 % out | |
| Labels | 99.6 % in / 98.3 % out (spacing differences, e.g. `Suppliernumber`) | |
| Mandatory flag | 96.4 % | swagger (current release) marks e.g. `APS130MI/LstPayeeTotals` DIVI/PRPN/PYON mandatory where the older map did not |
| Dates | swagger `mvxdate` = Mapper **Alpha**, length 10 (or 8) | `mapper_desc()` writes dates as `type is Alpha` |
| Numeric/alpha outputs | 99.9 % | |

So the swagger catalog can stand in for the Mapper's own MI metadata when generating API functions. After
importing a generated map, run *Update all* on the MI programs in the Mapper if publish complains about fields.

## 4. List vs single

The swagger has no single/multi flag. The catalog sets `list`:
1. from actual use in the sample maps (`AR*` = list) when available (226 transactions), else
2. by name: `Lst*`, `List*`, `Sel*`, `Slt*`, `Search*`, `Srch*`, `Select*` → list.
The prefix rule agrees with **all** 269 transactions used in the sample maps (81 list, 188 single, no
exceptions). `mapbuild.py` warns when the chosen mode (`AV*`/`AR*`) contradicts the catalog.

## 5. REST error types (useful when an API NOK shows up in the MEC log)

`ServerReturnedNOK` (transaction executed, result NOK — the normal business error: read `getLastAPIMessage()`),
`MandatoryInputFieldNotFound`, `InputFieldTooLong`, `TransactionNotFound`, `InvalidUserConoDivi` (company /
division not valid or no access — check **M3 Settings**), `InvalidSystemConfiguration`, `InvalidLanguage`,
`InvalidUser`, `InvalidTenant`, `RunAsNotAllowed`, `RunAsTenantNotAllowed`, `MalformedRequest`, `RequestIOError`,
`ServiceNotAvailable`, `BackendInternalError`, `InternalError`, `InvalidPositionKey`.

## 6. Finding the right API for an FS requirement

```bash
python3 -I tools/mi_lookup.py search delivery receipt distribution order        # ranked by desc/title/fields
python3 -I tools/mi_lookup.py search customer credit limit --single --verb Get
python3 -I tools/mi_lookup.py field ITDS --given ITNO,WHLO --single               # who returns ITDS keyed by what I have
python3 -I tools/mi_lookup.py label net weight                                    # field code for a label → NEWE
python3 -I tools/mi_lookup.py show MHS850MI/AddDOReceipt                          # all fields, * = mandatory
python3 -I tools/mi_lookup.py program APS130MI                                    # all transactions of a program
python3 -I tools/mi_lookup.py mapdesc MMS200MI/Get                                # descriptions as the Mapper writes them
```
Selection rules:
1. Prefer the *interface* program of the business object (`OIS100MI`, `PPS200MI`, `MMS200MI`, `CRS610MI`,
   `CRS620MI`, `MWS410MI`, `APS130MI`…) over generic table reads.
2. Prefer a `Get` keyed exactly by the identifiers the input provides (`field … --given …`).
3. For posting transactions from external systems use the **interface/transaction programs**: `MHS850MI`
   (order-initiated stock transactions: receipts/picks/packs, `PRFL=*EXE`), `MMS850MI` (internal stock
   transactions), `OIS100MI AddBatch*` (customer orders), `GLS840MI` (GL batch), `APS450MI` (supplier invoice
   batch), `PPS001MI` (PO notify/lines), `PPS360MI` (delivery-note receiving), `PMS050MI` (MO reporting).
4. When no standard transaction returns the data: first check for a standard one that replaces the whole step
   (06 §3 rule 10); then `MDBREADMI` for plain key reads, `EXPORTMI/SelectPad` for ad-hoc queries (06 §5), then a
   tenant custom list (`CMS100MI`) or an Extensibility API (`EXTnnnMI`) — both must exist first.
5. Check mandatory inputs (`*`) — the compiler warns when one is not linked (CONO is exempt: M3 Settings).

## 7. Program families worth knowing (from the catalog)

| Need | Programs (examples) |
|---|---|
| Item | `MMS200MI` (Get, GetItmBasic, GetItmWhsBasic, GetItmFac, Lst…), `MMS015MI` (alt UoM, Convert), `MMS025MI` (alias), `MMS060MI` (balance ID), `MMS010MI` (locations) |
| Customer / supplier | `CRS610MI`, `CRS620MI` (+ GetSupplierRef, LstAddresses), `CRS690MI`/`CRS692MI` (banks) |
| Customer orders / invoices | `OIS100MI`, `OIS350MI`, `ARS200MI`, `ARS120MI`, `OIS155MI` |
| Purchasing | `PPS200MI`, `PPS001MI`, `PPS170MI`, `PPS330MI`, `PPS360MI` (delivery notes), `PPS390MI` (claims) |
| Warehouse | `MWS410MI`, `MWS411MI`, `MWS420MI`, `MWS422MI`, `MWS423MI`, `MHS850MI`, `MMS850MI`, `MMS100MI` (DO/RO), `MMS301MI` (stock take), `MMS310MI` (balance update) |
| Manufacturing / structures | `PMS100MI`, `PMS050MI`, `PMS090MI`, `PDS001MI`, `PDS002MI` |
| Finance | `GLS840MI`, `GLS200MI`, `APS130MI`, `APS200MI`, `APS450MI`, `ARS300MI`, `CRS630MI` (accounting ids), `TXS*` (tax) |
| Basic data / system | `CRS111MI` (e-mail), `CRS175MI` (general codes), `CRS881MI` (translations), `CRS980MI` (texts), `MNS100MI` (division), `MNS150MI` (users), `MNS260MI` (MBM), `CUSEXTMI`/`CUGEXTMI` (custom extension tables), `ATS101MI` (attributes) |
