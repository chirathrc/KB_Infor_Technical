# MI API modules (from the m3api-rest swagger export)

1310 MI programs, 9064 business transactions (+ the 9 GENERAL transactions present in every program). Module = program-name prefix. Look up details with `tools/mi_lookup.py program <PGM>` / `search` / `show`.

| Prefix | Programs | Transactions | Example programs |
|---|---|---|---|
| CMS | 103 | 839 | CMS100MI Custom list designer MI; CMS210MI Manages the GDPR Data Subject Run in C; CMS474MI User Defined Fields |
| CRS | 127 | 814 | CRS610MI Customer interface; CRS230MI Technical documents; CRS420MI Application messages interface |
| OIS | 87 | 756 | OIS100MI Customer order interface; OIS215MI Cash sales open; OIS350MI Customer Order invoice interface |
| MMS | 65 | 487 | MMS200MI Item toolbox interface; MMS850MI Internal stock transaction interface; MMS240MI Item serialnumber/equipment interface |
| MOS | 53 | 416 | MOS300MI Service definition interface; MOS100MI Maintenance Work order; MOS170MI Maintenance order proposals |
| PPS | 50 | 411 | PPS360MI Delivery Note Interface; PPS200MI Purchase Order Information and Text In; PPS170MI Planned Purchase Order Information and |
| POS | 46 | 314 | POS100MI Project structure interface; POS130MI Manage purchase proposals; POS211MI Project order time planning lines inte |
| MWS | 33 | 261 | MWS423MI Package Interface; MWS410MI Delivery number toolbox interface; MWS420MI Picking List |
| PDS | 36 | 258 | PDS010MI Work Center; PDS002MI Product Connect Materials and Operatio; PDS001MI Product Structures |
| ARS | 45 | 240 | ARS300MI Bank remittance proposals; ARS200MI Customer invoice information; ARS651MI Manage payment reminder details |
| MNS | 38 | 232 | MNS260MI MBM Initiator; MNS150MI User; MNS051MI Manage Subsystem Job |
| STS | 48 | 224 | STS201MI Short term rental agreement Line; STS100MI Agreement Head - Short term rental; STS137MI Cash flow price list interface |
| APS | 33 | 221 | APS450MI Supplier Invoice Batch APL; APS130MI Supplier Payment Proposal; APS050MI Supplier invoice interface |
| COS | 28 | 209 | COS410MI Maintenance agreement interface; COS100MI Maintenance customer order interface; COS115MI Maintenance Quotation Information |
| MHS | 20 | 203 | MHS850MI Order initiated stock transaction inte; MHS001MI Interface Item Master; MHS800MI Expected receipts download interface |
| QUS | 31 | 178 | QUS100MI Quotation head; QUS120MI Related quotation; QUS121MI Grouped quotation |
| TXS | 29 | 172 | TXS005MI VAT report template; TXS100MI Electronic VAT report; TXS070MI VAT Registration Number |
| SOS | 14 | 162 | SOS100MI Service order interface; SOS200MI Service order inquiry interface; SOS350MI Service order invoice interface |
| QMS | 29 | 152 | QMS300MI QI Request Interface; QMS200MI Specification Interface; QMS400MI QI Request Test Result |
| PMS | 19 | 143 | PMS100MI Manufacturing Order; PMS104MI MO Operation Element Interface; PMS170MI Manufacturing Order Proposals |
| GLS | 21 | 140 | GLS060MI Allocation tables; GLS030MI Account Translation Scenario; GLS020MI Account addition table |
| DRS | 19 | 126 | DRS100MI Shipment; DRS045MI Time zone; DRS150MI Shipment Package Interface |
| ATS | 14 | 122 | ATS101MI Attribute Information Interface; ATS010MI Attribute; ATS050MI Attribute Model |
| IMS | 18 | 105 | IMS101MI Manage issue management lines; IMS102MI Manage issue management actions; IMS010MI Manage issue management types |
| ECS | 7 | 103 | ECS300MI Service definition revision interface; ECS200MI Engineering order revision interface; ECS420MI Engineering Change Order Head |
| RGS | 29 | 97 | RGS300MI Financial Report Header; RGS305MI Financial Report Group Run Header; RGS900MI Financial Report Header Specification |
| RPS | 14 | 80 | RPS045MI Planning Entity Interface; RPS300MI Transfer Macro Orders To Fashion Plann; RPS675MI Surplus Return |
| FAS | 17 | 77 | FAS001MI Fixed Asset Master; FAS660MI Manage FA under construction proposal ; FAS010MI Usage Based  and External User Defined |
| SES | 13 | 59 | SES403MI Functions per Role; SES400MI Manages the Permission Setup; SES300MI Manages the Keystore in CKEYST table |
| CBS | 10 | 56 | CBS002MI Api: Capability; CBS003MI Api: Capability range; CBS004MI Api: Capability definition |
| ABS | 7 | 55 | ABS180MI Bank statement reconciliation header; ABS100MI Bank statement; ABS185MI Bnk stmn recon, not reconciled trans i |
| EQINFOMI | 1 | 54 | EQINFOMI API interface equipment info |
| EVS | 7 | 52 | EVS002MI Send table data; EVS001MI Environment Interface; EVS006MI Manages the Initial Load |
| LTS | 6 | 51 | LTS101MI Api: LTR Agreement line; LTS200MI Api: LTR Funding; LTS100MI Api: LTR Agreement Head |
| TAS | 8 | 51 | TAS100MI Time accounting head; TAS101MI Time reports interface; TAS111MI Approve time repot lines |
| CSS | 7 | 49 | CSS006MI Machine/Engine pricing API; CSS204MI Api: SCORE Reporting; CSS300MI PoU Sales Order Interface |
| CRRU | 8 | 47 | CRRU01MI Manages the Russia Dvision Master; CRRU02MI RU Customer Master; CRRU03MI RU Supplier Master |
| MFS | 10 | 44 | MFS610MI Customer Local exception; MFS169MI Fixed Invoice Number Prefix; MFS025MI Cash Pooling and Loan Management IDs |
| CLAIMSMI | 1 | 43 | CLAIMSMI API interface Maint Claims |
| OSS | 6 | 42 | OSS401MI Dataset Information Interface; OSS420MI Sales Budget Interface; OSS402MI Dataset Keys And Accumulators Interfac |
| PCS | 12 | 40 | PCS115MI Material and Subcontract overhead; PCS120MI Costing Component. Create Cost Rates; PCS005MI Costing type |
| OPS | 10 | 38 | OPS270MI POS Sales Tickets interface; OPS500MI Retrieves Store Information; OPS600MI Fnc: POS - Filter records for Item and |
| MRS | 1 | 36 | MRS001MI MI-Repository interface |
| TMS | 3 | 35 | TMS006MI Time and Attendance; TMS200MI Absence stamps; TMS800MI Payroll Transaction |
| SPS | 4 | 33 | SPS101MI SCP Basic Data Interface; SPS300MI Manages SCP business area; SPS020MI Supply Chain Node Interface |
| EXT | 5 | 31 | EXT007MI Extensibility defined EXT MI program; EXT001MI Extensibility defined EXT MI program; EXT002MI Extensibility defined EXT MI program |
| TXBR | 5 | 31 | TXBR14MI Classification code selection manageme; TXBR10MI CBS/IBS Classification Code; TXBR11MI IS classification code management |
| CUSEXTMI | 1 | 30 | CUSEXTMI Customer generic extension table |
| CRSPCIMI | 1 | 29 | CRSPCIMI EQM configurator API |
| INVBODMI | 1 | 28 | INVBODMI Api:Common Invoice |
| XBR | 1 | 26 | XBR001MI Basic data information for Brazil |
| CRBR | 4 | 22 | CRBR04MI Manage extra information of items; CRBR60MI From To Federation Unit interface; CRBR11MI Basic customer data information for Br |
| SAS | 5 | 22 | SAS018MI STR Rates:Contract Item Price; SAS460MI Manages the SARPIT table - Contract it; SAS100MI Api: Agreement Head |
| RSS | 1 | 21 | RSS110MI Customer delivery schedule interface |
| AEMAPIMI | 1 | 20 | AEMAPIMI AEM telematics standard for equipment  |
| CAS | 4 | 20 | CAS025MI API Settings - Inventory Valuation; CAS030MI API Settings - WIP Valuation; CAS310MI Release / Hold Order costing |
| MTS | 1 | 20 | MTS300MI Manages the Performance Benchmark Refe |
| OIBR | 4 | 20 | OIBR03MI CO. Conn Reference Information; OIBR04MI CO Line. Conn Export Information; OIBR05MI CO Line. Conn Import Information |
| AAS | 7 | 19 | AAS390MI Online Invoicing Transaction; AAS910MI Electronic Bank Reporting Reason Codes; AAS320MI Claim/Liability Reports |
| DPS | 3 | 19 | DPS170MI Planned distribution orders interface; DPS001MI Distribution relation interface; DPS910MI Recreate Distribution Level |
| BUS | 1 | 17 | BUS100MI Budget Definition |
| QQS | 3 | 17 | QQS001MI Tool management; QQS005MI Template item management; QQS011MI Tool and connected template items mana |
| AHS | 4 | 15 | AHS100MI Ad-hoc Report Group; AHS110MI Ad-hoc Report Version; AHS150MI Run Ad-hoc Report |
| AMS | 1 | 14 | AMS100MI Archiving Toolbox interface |
| MYS | 2 | 14 | MYS450MI Transport Operation Planning; MYS500MI TEI Transfer |
| MWSLWMMI | 1 | 13 | MWSLWMMI LWM List expected receipts |
| RMS | 2 | 13 | RMS440MI Tickler notes; RMS120MI Future rate agreements |
| AGS | 4 | 12 | AGS100MI Financial Agreement; AGS101MI Financial Agreement Line; AGS130MI Financial Agreement Connected Invoice |
| APAT | 1 | 11 | APAT13MI Supplier payment interface in market A |
| CRCCINMI | 1 | 11 | CRCCINMI Credit Card Interface |
| CRIT | 2 | 11 | CRIT24MI Supplier ITA Information; CRIT10MI COUNTRY: Customer ITA-information |
| CTS | 2 | 11 | CTS040MI Supply Model Information; CTS095MI ATP Safety stock protection |
| MNGDIMMI | 1 | 11 | MNGDIMMI Initiate Browse on error codes |
| CMBR | 2 | 10 | CMBR01MI Custom Declaration Info Header; CMBR02MI Custom Declaration Info Lines |
| APBR | 4 | 9 | APBR30MI Get and list payment proposal informat; APBR50MI Add an invoice batch head; APBR51MI Add an invoice batch line |
| FCS | 3 | 9 | FCS330MI Forecast Distribution Table Interface; FCS350MI Manual Forecast; FCS366MI Forecast Pacing |
| BROWSEMI | 1 | 8 | BROWSEMI Browse functionality for clients |
| CEVENTMI | 1 | 8 | CEVENTMI Eventstore |
| CODEXPMI | 1 | 8 | CODEXPMI Generic API to interact with Configura |
| EUS | 1 | 8 | EUS001MI Manages the Tools (Education) |
| BOOKMKMI | 1 | 7 | BOOKMKMI Bookmark metadata interface |
| MDBREADMI | 1 | 7 | MDBREADMI Generic MI for reading tables |
| ARBR | 2 | 6 | ARBR01MI COUNTRY:Bank remittance proposal inter; ARBR75MI Batch payment types for Brazil |
| CPWAPPMI | 1 | 6 | CPWAPPMI CPW settings management |
| CUGEXTMI | 1 | 6 | CUGEXTMI Customer generic extension tables |
| IPWAPPMI | 1 | 6 | IPWAPPMI IPW settings management |
| MNTAGRMI | 1 | 6 | MNTAGRMI Agreement Line |
| PPSEPRMI | 1 | 6 | PPSEPRMI M3 e-Procurement Interface |
| PSWAPPMI | 1 | 6 | PSWAPPMI PSW settings management |
| CRAR | 1 | 5 | CRAR03MI Manage country specific customer infor |
| CRJP | 1 | 5 | CRJP01MI Manage country specific customer infor |
| CRPT | 1 | 5 | CRPT03MI Manage country specific customer infor |
| GTCN | 1 | 5 | GTCN10MI Golden Tax |
| MFBR | 1 | 5 | MFBR01MI Manage country specific customer local |
| OIAR | 1 | 5 | OIAR01MI Customer Order type BR |
| PPSSPPMI | 1 | 5 | PPSSPPMI Supplier Portal Interface |
| SHS | 1 | 5 | SHS010MI Manage the job schedule entries |
| TEMPLATEMI | 1 | 5 | TEMPLATEMI MI Component template |
| APCH | 1 | 4 | APCH01MI Supports UTC for selected transactions |
| AUTCHKMI | 1 | 4 | AUTCHKMI Check authority |
| EXPORTMI | 1 | 4 | EXPORTMI Data export |
| FLS | 1 | 4 | FLS001MI Operational log sequence interface |
| CPS | 2 | 3 | CPS100MI Load and capacity; CPS170MI Person Capacity |
| GMS | 1 | 3 | GMS200MI Group Consolidation |
| QPS | 1 | 3 | QPS115MI Sales Quotation Information |
| TXIT | 1 | 3 | TXIT40MI Electronic VAT report - White List |
| CRTVSUMI | 1 | 2 | CRTVSUMI Retrieves supplier number from an alte |
| CSSEITMI | 1 | 2 | CSSEITMI Api: External Temporary order informat |
| ENS | 1 | 2 | ENS100MI Api: Eco Transaction |
| FACETMI | 1 | 2 | FACETMI Facets interface |
| MLS | 1 | 2 | MLS170MI Maint CO Invoice Specification Interfa |
| REFFLDMI | 1 | 2 | REFFLDMI Reference field interface |
| TXAT | 1 | 2 | TXAT30MI Austrian Intrastat Declarations |
| ARPT | 1 | 1 | ARPT01MI Payment receipt digital signature |
| BODCSSMI | 1 | 1 | BODCSSMI Business Object Documents |
| CCHKVOMI | 1 | 1 | CCHKVOMI Retrieve voucher number interface |
| CSSEIXMI | 1 | 1 | CSSEIXMI Api: External Supplier Information Tem |
| OSBSTDMI | 1 | 1 | OSBSTDMI Api: Sales Statistics Details |
| XFI | 1 | 1 | XFI100MI Get invoice reference in Finland |
