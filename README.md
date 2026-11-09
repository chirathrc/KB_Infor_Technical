# Infor M3 Technical & H5 Scripting Knowledge Base

Welcome to the **Infor M3 Technical Knowledge Base**. This repository is specifically curated and structured for AI agents, developers, and technical architects to perform semantic search, retrieval-augmented generation (RAG), and rapid reference lookup for Infor CloudSuite M3 client-side scripting (H5 SDK 10.4.1 / v2.0+), MEC mappings, and standard M3 MI APIs.

## Knowledge Base Architecture

```text
KB_Infor_Technical/
|-- README.md / llms.txt / KB_INDEX.json   # Entry points: catalog, LLM index, machine-readable script index
|-- GEMINI.md / .cursorrules / .github/    # AI assistant rules
|-- .agents/skills/h5script-master/        # H5 scripting master skill
|
|-- h5/                                    # ===== H5 SCRIPTING (client-side, SDK 10.4.1 / v2.0+) =====
|   |-- scripts/                           # 92 production & SDK sample scripts by domain
|   |   |-- finance/  sales-and-distribution/  manufacturing-and-purchasing/
|   |   `-- infor-samples/  utilities/
|   |-- sdk-reference/                     # h5.script.d.ts (v2.0+), controls typings, tsconfig.json, API_QUICK_REFERENCE.md
|   |-- guides/                            # Developer guide PDF, STANDARDS_AND_CONVENTIONS.md, CHANGELOG.txt
|   `-- design-specs/                      # DES-020 specs, SPECS_SUMMARY.md, Template/
|
|-- mec/                                   # ===== MEC (Mapping / Enterprise Connector) =====
|   |-- guides/  mi-reference/  examples/  tools/
|   |-- samples/                           # 80 .zap mappings by subject (bank, weighbridge, bestmix, ...)
|   `-- MEC_INDEX.json
|
`-- m3-api/                                # ===== STANDARD M3 APIs =====
    `-- mi-swagger/                        # MI_CATALOG.md/.json + 1,311 <PROGRAM>MI.json Swagger schemas
```

## AI Agent Retrieval & Usage Guide

When answering user queries or generating code for Infor M3, follow this systematic lookup pattern:
1. **Look Up Standard M3 MI APIs**: Check `m3-api/mi-swagger/MI_CATALOG.md` to identify the correct MI program (e.g. `MMS200MI` for Items, `OIS100MI` for Orders, `CRS610MI` for Customers) and inspect `m3-api/mi-swagger/<PROGRAM>MI.json` for transaction input/output field definitions.
2. **Locate Real-World Reference Implementations**: Find matching programs in `h5/scripts/<category>/` or `KB_INDEX.json` to understand existing business logic, validation patterns, locale formatting (`DCFM`/`DTFM`), and event bindings.
3. **Verify API Signatures**: Consult `h5/sdk-reference/API_QUICK_REFERENCE.md` and `h5/sdk-reference/h5.script.d.ts` for client-side H5 controller methods, IDS Web Component grid APIs, and UI element models.
4. **Check Coding Standards & Multi-Tenant Patterns**: Adhere to `h5/guides/STANDARDS_AND_CONVENTIONS.md` for Fortude JSDoc headers, synchronous `e.cancel` gate-and-replay, `<ids-data-grid>` Shadow DOM observers, and custom dropdown disabling.
5. **Review Design Specifications**: Check `h5/design-specs/SPECS_SUMMARY.md` when functional context or DES-020 business rules are requested.

## Standard Infor M3 MI Swagger Library (1,311 Programs)

The `m3-api/mi-swagger/` directory contains complete OpenAPI/Swagger JSON specifications for all 1,311 Infor M3 MI programs.
- **[MI_CATALOG.md](m3-api/mi-swagger/MI_CATALOG.md)**: Searchable index with descriptions and sample transactions.
- **[MI_CATALOG.json](m3-api/mi-swagger/MI_CATALOG.json)**: Machine-readable index for automated lookup.

## Financials (AP, AR, FAS, GLS) (23 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`APS100_Approver.ts`](h5/scripts/finance/APS100_Approver.ts) | `APS100` | Auto-fills the Approver Code (WEAPCD) on APS100/E by reading CSYPAR00 parameter via MDBREADMI.GetCSYPAR00. | MIService (M3 API) |
| [`APS100_exrate.ts`](h5/scripts/finance/APS100_exrate.ts) | `APS100` | Automatically retrieves and updates the exchange rate (WWARAT) on APS100/F (APA100F0) from MDBREADMI.GetMPHEAD00 (AGRA, CUCD), converting decimal separators according to user MNS150 DCFM. | MIService (M3 API) |
| [`APS100_R_D.ts`](h5/scripts/finance/APS100_R_D.ts) | `APS100` | Auto-fills the Approver Code (WEAPCD) on APS100/E (APA100EC) by reading CSYPAR00 parameter (STCO=APS905) via MDBREADMI.GetCSYPAR00 with delayed panel field population. | MIService (M3 API) |
| [`APS100_RD.ts`](h5/scripts/finance/APS100_RD.ts) | `APS100` | Formats S1CUAM currency amounts across IDS `ids-data-grid` Shadow DOM cells in APS100 according to user MNS150 decimal separator (DCFM), using MutationObserver to persist formatting across virtual scrolling and panel loads. | Grid / List Control, MutationObserver (IDS / Soho DOM) |
| [`APS100F_HSBC_Pre_Validation_CN.ts`](h5/scripts/finance/APS100F_HSBC_Pre_Validation_CN.ts) | `APS100` | Initiates pre-validation on APA100F0 panel when user clicks "ENTER". Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses v... | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted |
| [`APS100F_HSBC_Pre_Validation_VN.ts`](h5/scripts/finance/APS100F_HSBC_Pre_Validation_VN.ts) | `APS100` | Initiates pre-validation on APA100F0 panel when user clicks "ENTER". Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses v... | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted |
| [`APS100F_HSBC_Pre_Validation.ts`](h5/scripts/finance/APS100F_HSBC_Pre_Validation.ts) | `APS100` | Initiates pre-validation on APA100F0 panel when user clicks "ENTER". Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses v... | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted |
| [`APS120_ReconciliationValidation.ts`](h5/scripts/finance/APS120_ReconciliationValidation.ts) | `APS120` | H5 script for APS120/F1 to validate invoice approval during advance payment reconciliation. Calls APS200MI.GetInvTotInfo to check APRV for each invoice in the grid. Displays err... | MIService (M3 API), Hook: Requesting, Grid / List Control |
| [`APS131_Set_Report_Text_200.ts`](h5/scripts/finance/APS131_Set_Report_Text_200.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for several divisions. | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_CN.ts`](h5/scripts/finance/APS131_Set_Report_Text_CN.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for CN. | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_ID.ts`](h5/scripts/finance/APS131_Set_Report_Text_ID.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for ID. | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_MY.ts`](h5/scripts/finance/APS131_Set_Report_Text_MY.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for MY. | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_VN.ts`](h5/scripts/finance/APS131_Set_Report_Text_VN.ts) | `APS131` | This script adds custom dropdowns on APS131 to help users correctly fill in the Report Text (WRLITX) field. It ensures that: // * The payment method is selected based on the div... | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text.ts`](h5/scripts/finance/APS131_Set_Report_Text.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices. | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`APS160_China_Special_Remark_Tag.ts`](h5/scripts/finance/APS160_China_Special_Remark_Tag.ts) | `APS160` | H5 Script to add a "Special Remark" field to APA160E0 and persist it via CUSEXTMI AddFieldValue. Captures additional remarks for Chinese purchase-related transactions. | MIService (M3 API), Hook: Requesting, Dynamic UI Elements |
| [`ARS110_PaymentTerm.ts`](h5/scripts/finance/ARS110_PaymentTerm.ts) | `ARS110` | H5 script for ARS110 panel to display the Payment Term (TEPY) for a customer (CUNO) using CMS100MI.LstPaymentTerm API. Displays a label with "Payment Term: [TEPY]" (multilingual... | MIService (M3 API), Hook: Requesting, Dynamic UI Elements |
| [`ars110_vouchertxt.ts`](h5/scripts/finance/ars110_vouchertxt.ts) | `ARS110` | Adds custom text fields to ARS112/F for combining temporary receipt number and voucher text, and sets the result in the voucher field. | Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`CheckInvoice_ARS120.ts`](h5/scripts/finance/CheckInvoice_ARS120.ts) | `ARS120` | Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in ARS120\E. | Hook: Requesting |
| [`CheckInvoice_FAS130.ts`](h5/scripts/finance/CheckInvoice_FAS130.ts) | `FAS130` | Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in FAS130\E. | Hook: Requesting |
| [`CheckInvoice_MFS100.ts`](h5/scripts/finance/CheckInvoice_MFS100.ts) | `MFS100` | Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in FAS130\E. | Hook: Requesting |
| [`CheckInvoice.ts`](h5/scripts/finance/CheckInvoice.ts) | `OIS180` | The purpose of this script is to enforce validation on Invoice Date (WDIDAT) and Accounting Date (WDACDT) in panel OIS180/E, based on specific order types (WFORTP, WTORTP). It e... | Hook: Requesting |
| [`FAS130_RestrictFields.ts`](h5/scripts/finance/FAS130_RestrictFields.ts) | `FAS130` | Validates the input format of field WWYREF on the FAS130/F panel. Ported from on-prem JScript (Andrea Devica, 20250801). - Trigger : Runs on Enter key press on FAS130/F panel. -... | Hook: Requesting |
| [`GLS015_field_hide.ts`](h5/scripts/finance/GLS015_field_hide.ts) | `GLS015` | This script automatically sets the field WWVDSC (Voucher Description) to the value "转账凭证" (translated: Transfer Voucher) on panel GLS015. It is triggered during Enter key action... | Hook: Requesting |

## Sales & Distribution (CRS, MMS, MWS, OIS) (21 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`CRS610_CustomerControl.ts`](h5/scripts/sales-and-distribution/CRS610_CustomerControl.ts) | `CRS610` | Restricts function keys by user role and mode in CRS610 and disables status/finance dropdowns and fields on CRA610E0 and CRA610J0 via [componentname] scoped CSS, ARIA state, and MutationObserver. | Hook: Requesting, Hook: RequestCompleted, MutationObserver (IDS / Soho DOM) |
| [`CustomerOrderChargesOIS103.ts`](h5/scripts/sales-and-distribution/CustomerOrderChargesOIS103.ts) | `OIS103` | Calculates and displays total accrued customer discount (SUMACAM) on OIS103/E and validates negative charge entries (WRCRAM) on ENTER/ROLLUP/ROLLDOWN. | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted, Dynamic UI Elements |
| [`GC_MMS121B1_AddProdDtCol.ts`](h5/scripts/sales-and-distribution/GC_MMS121B1_AddProdDtCol.ts) | `MMS121` | H5 Script for MMS121/B1 panel to add a Production Date column for sorting order 1. Fetches production date (IDDT) from MMS060MI API and formats it based on user date format (DMY... | MIService (M3 API), Hook: RequestCompleted, Grid / List Control |
| [`MMS100B_MWS300B_AutomationOfPositiveRO.ts`](h5/scripts/sales-and-distribution/MMS100B_MWS300B_AutomationOfPositiveRO.ts) | `MMS100` | Script checks if a single selected row in M3’s MWA300BC or MMA100BC panels is a positive Return Order (RO) by validating its order type (TRTP) using the CRS200MI API. If the RO ... | MIService (M3 API), Hook: Requesting, Grid / List Control |
| [`MMS100E_Apply_UserRole_Validation.ts`](h5/scripts/sales-and-distribution/MMS100E_Apply_UserRole_Validation.ts) | `MMS100` | Keep Authorize enabled for valid user roles only - Place this H5script in MMS100/E panel | MIService (M3 API), ConfirmDialog |
| [`MMS101B1_PreventLineDeletion.ts`](h5/scripts/sales-and-distribution/MMS101B1_PreventLineDeletion.ts) | `MMS101` | Disables Delete Button for orders with status ‘29’, ‘39’, ‘49’, ‘69’, ‘99’ on MMS101B panel. | Hook: Requesting, Hook: RequestCompleted, Grid / List Control |
| [`MMS121_DisplayShelfLife.ts`](h5/scripts/sales-and-distribution/MMS121_DisplayShelfLife.ts) | `MMS121` | Functional Specification FTD_M3_FS 2072 (SAFCO ELEV8 Implementation). MMS121/B (MMA121BC) - Calculates and displays remaining Shelf Life Percentage in a custom grid column ('Shl... | MIService (M3 API), Hook: RequestCompleted, Grid / List Control |
| [`MWS068_DisplayNumberOfPacks.ts`](h5/scripts/sales-and-distribution/MWS068_DisplayNumberOfPacks.ts) | `MWS068` | H5 Script for MWS068/B panel to display number of packs (raw materials) in Lot Ref 2 (MLBRE2) and KG value for livestock FG in Indonesia WHs in Main Attribute 3 (MLATV3). Calcul... | MIService (M3 API), Hook: RequestCompleted, Grid / List Control |
| [`MWS301B1_PreventLineDeletion.ts`](h5/scripts/sales-and-distribution/MWS301B1_PreventLineDeletion.ts) | `MWS301` | Disables Delete Button for orders with status ‘29’, ‘39’, ‘49’, ‘69’, ‘99’ on MWS301B panel. | Hook: Requesting, Hook: RequestCompleted, Grid / List Control |
| [`MWS410_RestrictDOPrint.ts`](h5/scripts/sales-and-distribution/MWS410_RestrictDOPrint.ts) | `MWS410` | This Script prevents actions 15, 21, 27, 28 when PGRS is below 90. | Hook: Requesting, Hook: RequestCompleted, Grid / List Control |
| [`MWS410B_MOsCostingStatus.ts`](h5/scripts/sales-and-distribution/MWS410B_MOsCostingStatus.ts) | `MWS410` | Validates Costing status for bulk MOs in MWS410/B before allowing option 32. Calls MWS150MI.SelSupplyChain and MDBREADMI.GetMWOHED55 to validate. | MIService (M3 API), Hook: Requesting |
| [`OIS101CreditBalance.ts`](h5/scripts/sales-and-distribution/OIS101CreditBalance.ts) | `OIS101` | Displays Customer Credit Limit, Outstanding Balance, Remaining Credit Balance, and Outstanding Days on OIS101 during order entry using CMS100MI APIs. | MIService (M3 API), Dynamic UI Elements |
| [`OIS105_date.ts`](h5/scripts/sales-and-distribution/OIS105_date.ts) | `OIS105` | Auto-fills W2OBKV (IPDT) and displays today's date on OIS105/B (OIA105BC) formatted according to user MNS150 date format (DTFM). | DOM / Standard API |
| [`OIS180_RestrictFields.ts`](h5/scripts/sales-and-distribution/OIS180_RestrictFields.ts) | `OIS180` | Disables Invoice Date and Accounting Date fields on OIS180/E | DOM / Standard API |
| [`OIS300_InvoiceReportLink.ts`](h5/scripts/sales-and-distribution/OIS300_InvoiceReportLink.ts) | `OIS300` | H5 script for OIS300/B panel to open the Abaqa Invoice Report Link for the selected customer order (ORNO). Checks for single selection, handles no/multiple selections with messa... | Grid / List Control |
| [`OIS300_OAOBLC_VALIDATION.ts`](h5/scripts/sales-and-distribution/OIS300_OAOBLC_VALIDATION.ts) | `OIS300` | Blocks list options (2, 4, 15, 31, 35, 36) on OIS300/B (OIA300BC) when selected order lines have blocking codes (OBLC) other than 0, 9, or empty, keeping Requesting active after cancellation. | Hook: Requesting, Grid / List Control |
| [`OIS300_OrderConfirmationReportLink.ts`](h5/scripts/sales-and-distribution/OIS300_OrderConfirmationReportLink.ts) | `OIS300` | H5 script for OIS300/B panel to open the Abaqa Order Confirmation Report for the selected customer order (ORNO). Checks for single selection, handles no/multiple selections with... | Grid / List Control |
| [`OIS300_SalesReportLink.ts`](h5/scripts/sales-and-distribution/OIS300_SalesReportLink.ts) | `OIS300` | H5 script for OIS300/B panel to open the Abaqa Sales Contract report for the selected customer order (ORNO). Checks for single selection, handles no/multiple selections with mes... | Grid / List Control |
| [`OIS300_WEARLO_VALIDATION.ts`](h5/scripts/sales-and-distribution/OIS300_WEARLO_VALIDATION.ts) | `OIS300` | This script validates the 'BLRO' (Backlog Amount) field on the OIS300/B panel. If any selected row contains a negative BLRO value, the script cancels the execution of list optio... | Hook: Requesting, Grid / List Control |
| [`OIS300JS.ts`](h5/scripts/sales-and-distribution/OIS300JS.ts) | `OIS300` | Adds a Vietnamese Calculate ("MÁY TÍNH") button and Total Net Weight, Total Value, and Total Amount displays on OIA300BC for 2+ selected rows in VN-VIEW1, normalizing numbers per user DCFM. | Grid / List Control, Dynamic UI Elements |
| [`OIS300JSCN.ts`](h5/scripts/sales-and-distribution/OIS300JSCN.ts) | `OIS300` | Adds a "Calculate" button and displays total net weight and total net value for selected Customer Orders on the OIA300BC panel. Button is enabled only for China views (CN-VIEW1,... | Grid / List Control, Dynamic UI Elements |

## Manufacturing & Purchasing (PMS, PPS) (23 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`GC_PMS050E_FlagBulkMOs.ts`](h5/scripts/manufacturing-and-purchasing/GC_PMS050E_FlagBulkMOs.ts) | `PMS050` | This script automates the selection of the "Flag Complete" checkbox on panel PMS050/E for bulk manufacturing orders based on the item type. It ensures that MOs of type G02 are a... | DOM / Standard API |
| [`GC_PMS060_DisplayTotal.ts`](h5/scripts/manufacturing-and-purchasing/GC_PMS060_DisplayTotal.ts) | `PMS060` | Adds a button and textbox on PMS060 (including sorting order 1) to calculate and display total reported quantity (RQTA) from the grid view. | Grid / List Control, Dynamic UI Elements |
| [`GC_PMS086_ValidateChgDelOptions.ts`](h5/scripts/manufacturing-and-purchasing/GC_PMS086_ValidateChgDelOptions.ts) | `PMS086` | This script enforces order integrity in the PMS086 program by restricting Change (option 2) and Delete (option 4) list options when the order status is "90". It is designed to p... | Hook: Requesting, Hook: RequestCompleted |
| [`GC_PMS100E_UpdStructureComplexity.ts`](h5/scripts/manufacturing-and-purchasing/GC_PMS100E_UpdStructureComplexity.ts) | `PMS100` | This script is designed to automatically calculate and populate the Structure Complexity field (WHSCOM) on panel PMS100/E based on order quantity and yield quantity. It improves... | DOM / Standard API |
| [`GC_PMS101F_MediPack_ResF12.ts`](h5/scripts/manufacturing-and-purchasing/GC_PMS101F_MediPack_ResF12.ts) | `PMS101` | This script enforces business logic for Medipack items (Item Type = G06) in the PMS101 program by restricting the use of the F12 (Previous) key. The rule ensures that users do n... | Hook: Requesting, Hook: RequestCompleted |
| [`GC_PMS250E_UpdStrCom_Auto.ts`](h5/scripts/manufacturing-and-purchasing/GC_PMS250E_UpdStrCom_Auto.ts) | `PMS250` | Clears specific fields on PMS250/E panel to ensure only the 'shop traveler' document is printed. | DOM / Standard API |
| [`pms100Js.ts`](h5/scripts/manufacturing-and-purchasing/pms100Js.ts) | `PMS100` | Automatically launches PMS100 with pre-filled manufacturing order data for each selected line on PMS100/B and refreshes the list view after execution. | MIService (M3 API), Grid / List Control |
| [`PMS101E_MediPackV7.ts`](h5/scripts/manufacturing-and-purchasing/PMS101E_MediPackV7.ts) | `PMS101` | Calculates bags for Medi Pack item based on yield and item type | Hook: Requesting, Hook: RequestCompleted |
| [`pms170Js.ts`](h5/scripts/manufacturing-and-purchasing/pms170Js.ts) | `PMS170` | Retrieves the selected Planned MO from PMS170/B - and creates an automation that opens PMS170/E and fills in relevant fields. Place this H5script in PMS170/B panel | MIService (M3 API), Grid / List Control |
| [`PPS171E_NonTradedItemsDisable_PPQT_PUNN.ts`](h5/scripts/manufacturing-and-purchasing/PPS171E_NonTradedItemsDisable_PPQT_PUNN.ts) | `PPS171` | This Script disables PPQT and PUNN fields when POGETY is 28 or 29. | Hook: RequestCompleted |
| [`PPS180B1_TotalOrderValue.ts`](h5/scripts/manufacturing-and-purchasing/PPS180B1_TotalOrderValue.ts) | `PPS180` | H5 script for PPA180BC to display Purchase Price, Total Line Amount, Total Order Value and Approval Status for purchase requisition sublines. Uses PPS170MI and CMS100MI APIs. | MIService (M3 API), Grid / List Control, Dynamic UI Elements |
| [`PPS180E_M3PRApproval.ts`](h5/scripts/manufacturing-and-purchasing/PPS180E_M3PRApproval.ts) | `PPS180` | Adds Submit and Unapprove buttons on PPS180/E panel to manage purchase requisition approval status. Calls CUSEXTMI API to check and update approval status, disables specific fie... | MIService (M3 API), Dynamic UI Elements |
| [`PPS2001E_NonTradedItemsDisable.ts`](h5/scripts/manufacturing-and-purchasing/PPS2001E_NonTradedItemsDisable.ts) | `PPS200` | Disables fields if GETY from PPS200MI GetLine is '28' or '29'. | MIService (M3 API) |
| [`PPS200E_M3POApproval_V2.ts`](h5/scripts/manufacturing-and-purchasing/PPS200E_M3POApproval_V2.ts) | `PPS200` | Added a button in Change mode to submit POs with status 12 for approval by updating TEOR via PPS200MI. | MIService (M3 API), Dynamic UI Elements |
| [`PPS200E_M3POApproval.ts`](h5/scripts/manufacturing-and-purchasing/PPS200E_M3POApproval.ts) | `PPS200` | Added a button in Change mode to submit POs with status 12 for approval by updating TEOR via PPS200MI. | MIService (M3 API), Dynamic UI Elements |
| [`PPS201B_ValidatePOApproval.ts`](h5/scripts/manufacturing-and-purchasing/PPS201B_ValidatePOApproval.ts) | `PPS201` | Prevents unauthorized list options (2, 3, 4, 12) on PPS201/B1 (PPA201BC) if line-level approval (TEOR) is already set via PPS200MI. | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted |
| [`PPS215.ts`](h5/scripts/manufacturing-and-purchasing/PPS215.ts) | `PPS215` | Disables WWOVCD and WWCEVA fields on PPS215/E | DOM / Standard API |
| [`PPS220B_ValidatePOApproval.ts`](h5/scripts/manufacturing-and-purchasing/PPS220B_ValidatePOApproval.ts) | `PPS220` | Prevents list option 2 or 35 execution in PPS220/B if line-level approval (TEOR) is already set. | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted, Grid / List Control |
| [`PPS220I1_PPS270E_DisableQtyAndValidation.ts`](h5/scripts/manufacturing-and-purchasing/PPS220I1_PPS270E_DisableQtyAndValidation.ts) | `PPS220` | Validate the qty entered in PPA270/E and disable Qty to Notify column in PPS220/L1. | Hook: Requesting, Hook: RequestCompleted, Grid / List Control, MutationObserver (IDS / Soho DOM) |
| [`PPS300_VehicleNo_V1.ts`](h5/scripts/manufacturing-and-purchasing/PPS300_VehicleNo_V1.ts) | `PPS300` | Adds a custom grid column on PPS300 to display Vehicle Number fetched via MI API. | MIService (M3 API), Hook: Requesting, Grid / List Control |
| [`PPS300_VehicleNo_V2.ts`](h5/scripts/manufacturing-and-purchasing/PPS300_VehicleNo_V2.ts) | `PPS300` | Adds a custom Vehicle Number column on PPS300 with IFS role verification via IonApiService and MI API lookups. | MIService (M3 API), ConfirmDialog, IonApiService (ION API), Hook: Requesting, Grid / List Control |
| [`PPS300E_GRNWSP.ts`](h5/scripts/manufacturing-and-purchasing/PPS300E_GRNWSP.ts) | `PPS300` | Adds an Auto-GRN button on PPS300/E to receive selected PO lines via PPS001MI.Receipt with uppercase lot conversion, busy indicator handling, and multilingual messages. | MIService (M3 API), Grid / List Control, Dynamic UI Elements |
| [`PPS310_QualityInspectAPI.ts`](h5/scripts/manufacturing-and-purchasing/PPS310_QualityInspectAPI.ts) | `PPS310` | Adds a "Confirm All" button on PPS310/A to inspect received GRN lines using PPS310MI.QualityInspPO with the current date (YYYYMMDD). | MIService (M3 API), Dynamic UI Elements |

## Official Infor H5 SDK Samples (23 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`H5SampleAddElements.ts`](h5/scripts/infor-samples/H5SampleAddElements.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SampleCancelRequest.ts`](h5/scripts/infor-samples/H5SampleCancelRequest.ts) | `General / Framework` | H5 Script SDK sample. | Hook: Requesting |
| [`H5SampleCurrencyXML.ts`](h5/scripts/infor-samples/H5SampleCurrencyXML.ts) | `General / Framework` | H5 Script SDK sample. | Grid / List Control |
| [`H5SampleCustomColumns.ts`](h5/scripts/infor-samples/H5SampleCustomColumns.ts) | `General / Framework` | H5 Script SDK sample. | Hook: RequestCompleted, Grid / List Control |
| [`H5SampleCustomDialog.ts`](h5/scripts/infor-samples/H5SampleCustomDialog.ts) | `General / Framework` | Script initialization function. | Hook: Requesting |
| [`H5SampleDrillback.ts`](h5/scripts/infor-samples/H5SampleDrillback.ts) | `General / Framework` | H5 Script SDK sample. In development. | Dynamic UI Elements |
| [`H5SampleExportToExcel.ts`](h5/scripts/infor-samples/H5SampleExportToExcel.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SampleHelloWorld.ts`](h5/scripts/infor-samples/H5SampleHelloWorld.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog |
| [`H5SampleHideColumns.ts`](h5/scripts/infor-samples/H5SampleHideColumns.ts) | `General / Framework` | H5 Script SDK sample. | Grid / List Control |
| [`H5SampleImageFromList.ts`](h5/scripts/infor-samples/H5SampleImageFromList.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog, Grid / List Control |
| [`H5SampleIonApiService.ts`](h5/scripts/infor-samples/H5SampleIonApiService.ts) | `General / Framework` | H5 Script SDK sample. | MIService (M3 API), IonApiService (ION API), Dynamic UI Elements |
| [`H5SampleMFormsAutomation.ts`](h5/scripts/infor-samples/H5SampleMFormsAutomation.ts) | `General / Framework` | H5 Script SDK sample. | MFormsAutomation, Dynamic UI Elements |
| [`H5SampleMIService.ts`](h5/scripts/infor-samples/H5SampleMIService.ts) | `General / Framework` | MIService utility used here is still in development. H5 Script SDK sample. | MIService (M3 API), Dynamic UI Elements |
| [`H5SampleMIServiceV2.ts`](h5/scripts/infor-samples/H5SampleMIServiceV2.ts) | `General / Framework` | MIService utility used here is still in development. H5 Script SDK sample. | MIService (M3 API), Dynamic UI Elements |
| [`H5SampleOpenFieldHelp.ts`](h5/scripts/infor-samples/H5SampleOpenFieldHelp.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog |
| [`H5SampleOptionButton.ts`](h5/scripts/infor-samples/H5SampleOptionButton.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SamplePreviewListHeader.ts`](h5/scripts/infor-samples/H5SamplePreviewListHeader.ts) | `General / Framework` | H5 Script SDK sample. | Grid / List Control |
| [`H5SampleRegexValidator.ts`](h5/scripts/infor-samples/H5SampleRegexValidator.ts) | `General / Framework` | H5 Script SDK sample. | Hook: Requesting |
| [`H5SampleRequestTracer.ts`](h5/scripts/infor-samples/H5SampleRequestTracer.ts) | `General / Framework` | H5 Script SDK sample. | Hook: Requesting, Hook: RequestCompleted |
| [`H5SampleSelectionChanged.ts`](h5/scripts/infor-samples/H5SampleSelectionChanged.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog, Grid / List Control |
| [`H5SampleShowOnMap.ts`](h5/scripts/infor-samples/H5SampleShowOnMap.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SampleShowXml.ts`](h5/scripts/infor-samples/H5SampleShowXml.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog |
| [`H5SampleUserDetails.ts`](h5/scripts/infor-samples/H5SampleUserDetails.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog, Dynamic UI Elements |

## Utilities & Shared Tools (2 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`EntryModeSetter.ts`](h5/scripts/utilities/EntryModeSetter.ts) | `General / Framework` | This script is standard one in ISO. There is no equivalent H5 scripts. Perhaps this is not required in MT. However, I uplifted it. | Hook: Requesting |
| [`TestIssue.ts`](h5/scripts/utilities/TestIssue.ts) | `General / Framework` | Script initialization function. | MIService (M3 API), Hook: Requesting, Hook: RequestCompleted |

## MEC Knowledge

MEC mappings, guides (including the [Cloud migration master reference](mec/guides/10-cloud-migration-master-reference.md), skill `.agents/skills/mec-cloud-migration`), MI references, and 80 sample `.zap` files are in [mec/](mec/README.md), organized by subject. Machine-readable index: [mec/MEC_INDEX.json](mec/MEC_INDEX.json).
