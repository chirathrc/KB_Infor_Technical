# Infor M3 Technical & H5 Scripting Knowledge Base

Welcome to the **Infor M3 Technical Knowledge Base**. This repository is specifically curated and structured for AI agents, developers, and technical architects to perform semantic search, retrieval-augmented generation (RAG), and rapid reference lookup for Infor CloudSuite M3 client-side scripting and standard M3 MI APIs.

## Knowledge Base Architecture

```text
KB_Infor_Technical/
|-- README.md                      # Primary knowledge base catalog & AI retrieval guide
|-- KB_INDEX.json                  # Machine-readable metadata index for AI search & RAG embeddings
|-- api-reference/                 # Infor H5 Script API definitions & typings
|   |-- h5.script.d.ts             # Complete TypeScript interface for infor.company.h5.script
|   |-- infor.controls.d.ts        # Infor SoHo / controls type definitions
|   |-- jquery.d.ts                # jQuery type definitions
|   `-- API_QUICK_REFERENCE.md     # High-density markdown API cheat sheet for LLMs
|-- mi-swagger/                    # Standard Infor M3 MI (Machine Interface) API Catalog
|   |-- MI_CATALOG.md              # Markdown quick-search index of 1,311 standard MI APIs
|   |-- MI_CATALOG.json            # Machine-readable catalog with transactions and descriptions
|   `-- <PROGRAM>MI.json           # 1,311 Swagger JSON schemas (MMS200MI, OIS100MI, etc.)
|-- docs/                          # Guides, standards, and change logs
|   |-- H5ScriptDevelopersGuide.pdf# Official Infor H5 Script Developers Guide
|   |-- STANDARDS_AND_CONVENTIONS.md # Naming, formatting, JSDoc, coding rules
|   `-- CHANGELOG.txt              # SDK release notes and changelog
|-- design-specifications/         # Functional & technical specifications (DES-020)
|   |-- SPECS_SUMMARY.md           # Markdown cross-reference of all functional specs
|   `-- DES-020_*.docx             # Original Word specification documents
`-- scripts/                       # 89 Curated TypeScript scripts categorized by domain
    |-- finance/                   # Accounts Payable (APS), Accounts Receivable (ARS), Fixed Assets (FAS), General Ledger (GLS)
    |-- sales-and-distribution/    # Customer (CRS), Orders (OIS), Materials (MMS), Warehouse (MWS)
    |-- manufacturing-and-purchasing/ # Production Orders (PMS), Purchase Orders (PPS)
    |-- infor-samples/             # Official Infor SDK feature samples (API, UI, Events, Bookmarks)
    `-- utilities/                 # Cross-cutting utilities & entry mode setters
```

## AI Agent Retrieval & Usage Guide

When answering user queries or generating code for Infor M3, follow this systematic lookup pattern:
1. **Look Up Standard M3 MI APIs**: Check `mi-swagger/MI_CATALOG.md` to identify the correct MI program (e.g. `MMS200MI` for Items, `OIS100MI` for Orders, `CRS610MI` for Customers) and inspect `mi-swagger/<PROGRAM>MI.json` for transaction input/output field definitions.
2. **Locate Real-World Reference Implementations**: Find matching programs in `scripts/<category>/` or `KB_INDEX.json` to understand existing business logic, validation patterns, and event bindings.
3. **Verify API Signatures**: Consult `api-reference/API_QUICK_REFERENCE.md` or `api-reference/h5.script.d.ts` for client-side H5 controller methods, events, and UI element models.
4. **Check Coding Standards**: Always adhere to `docs/STANDARDS_AND_CONVENTIONS.md` for header formats, class naming, and TypeScript typing conventions.
5. **Review Design Specifications**: Check `design-specifications/SPECS_SUMMARY.md` when functional context or business rules are requested.

## Standard Infor M3 MI Swagger Library (1,311 Programs)

The `mi-swagger/` directory contains complete OpenAPI/Swagger JSON specifications for all 1,311 Infor M3 MI programs.
- **[MI_CATALOG.md](mi-swagger/MI_CATALOG.md)**: Searchable index with descriptions and sample transactions.
- **[MI_CATALOG.json](mi-swagger/MI_CATALOG.json)**: Machine-readable index for automated lookup.

## Financials (AP, AR, FAS, GLS) (21 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`APS100F_HSBC_Pre_Validation.ts`](scripts/finance/APS100F_HSBC_Pre_Validation.ts) | `APS100` | Initiates pre-validation on APA100F0 panel when user clicks "ENTER". Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses v... | MIService (M3 API), Hook: RequestCompleted |
| [`APS100F_HSBC_Pre_Validation_CN.ts`](scripts/finance/APS100F_HSBC_Pre_Validation_CN.ts) | `APS100` | Initiates pre-validation on APA100F0 panel when user clicks "ENTER". Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses v... | MIService (M3 API), Hook: RequestCompleted |
| [`APS100F_HSBC_Pre_Validation_VN.ts`](scripts/finance/APS100F_HSBC_Pre_Validation_VN.ts) | `APS100` | Initiates pre-validation on APA100F0 panel when user clicks "ENTER". Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses v... | MIService (M3 API), Hook: RequestCompleted |
| [`APS100_Approver.ts`](scripts/finance/APS100_Approver.ts) | `APS100` | Auto-fills the Approver Code (WEAPCD) on APS100/E by reading CSYPAR00 parameter via MDBREADMI.GetCSYPAR00. | MIService (M3 API) |
| [`APS100_exrate.ts`](scripts/finance/APS100_exrate.ts) | `APS100` | H5 script for APS100/F panel to automatically retrieve and update the exchange rate (WWARAT) for a purchase order (WWPUNO). Calls MDBREADMI.GetMPHEAD00 to fetch CUTE, AGRA, and ... | MIService (M3 API) |
| [`APS120_ReconciliationValidation.ts`](scripts/finance/APS120_ReconciliationValidation.ts) | `APS120` | H5 script for APS120/F1 to validate invoice approval during advance payment reconciliation. Calls APS200MI.GetInvTotInfo to check APRV for each invoice in the grid. Displays err... | MIService (M3 API), Grid / List Control |
| [`APS131_Set_Report_Text.ts`](scripts/finance/APS131_Set_Report_Text.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices. | Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_200.ts`](scripts/finance/APS131_Set_Report_Text_200.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for several divisions. | Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_CN.ts`](scripts/finance/APS131_Set_Report_Text_CN.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for CN. | Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_ID.ts`](scripts/finance/APS131_Set_Report_Text_ID.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for ID. | Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_MY.ts`](scripts/finance/APS131_Set_Report_Text_MY.ts) | `APS131` | Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for MY. | Hook: RequestCompleted, Dynamic UI Elements |
| [`APS131_Set_Report_Text_VN.ts`](scripts/finance/APS131_Set_Report_Text_VN.ts) | `APS131` | This script adds custom dropdowns on APS131 to help users correctly fill in the Report Text (WRLITX) field. It ensures that: // * The payment method is selected based on the div... | Hook: RequestCompleted, Dynamic UI Elements |
| [`APS160_China_Special_Remark_Tag.ts`](scripts/finance/APS160_China_Special_Remark_Tag.ts) | `APS160` | H5 Script to add a "Special Remark" field to APA160E0 and persist it via CUSEXTMI AddFieldValue. Captures additional remarks for Chinese purchase-related transactions. | MIService (M3 API), Dynamic UI Elements |
| [`ARS110_PaymentTerm.ts`](scripts/finance/ARS110_PaymentTerm.ts) | `ARS110` | H5 script for ARS110 panel to display the Payment Term (TEPY) for a customer (CUNO) using CMS100MI.LstPaymentTerm API. Displays a label with "Payment Term: [TEPY]" (multilingual... | MIService (M3 API), Dynamic UI Elements |
| [`ars110_vouchertxt.ts`](scripts/finance/ars110_vouchertxt.ts) | `ARS110` | Adds custom text fields to ARS112/F for combining temporary receipt number and voucher text, and sets the result in the voucher field. | Hook: RequestCompleted, Dynamic UI Elements |
| [`CheckInvoice.ts`](scripts/finance/CheckInvoice.ts) | `General / Framework` | The purpose of this script is to enforce validation on Invoice Date (WDIDAT) and Accounting Date (WDACDT) in panel OIS180/E, based on specific order types (WFORTP, WTORTP). It e... | DOM / Standard API |
| [`CheckInvoice_ARS120.ts`](scripts/finance/CheckInvoice_ARS120.ts) | `ARS120` | Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in ARS120\E. | DOM / Standard API |
| [`CheckInvoice_FAS130.ts`](scripts/finance/CheckInvoice_FAS130.ts) | `FAS130` | Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in FAS130\E. | DOM / Standard API |
| [`CheckInvoice_MFS100.ts`](scripts/finance/CheckInvoice_MFS100.ts) | `MFS100` | Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in FAS130\E. | DOM / Standard API |
| [`FAS130_RestrictFields.ts`](scripts/finance/FAS130_RestrictFields.ts) | `FAS130` | Validates the input format of field WWYREF on the FAS130/F panel. Ported from on-prem JScript (Andrea Devica, 20250801). - Trigger : Runs on Enter key press on FAS130/F panel. -... | DOM / Standard API |
| [`GLS015_field_hide.ts`](scripts/finance/GLS015_field_hide.ts) | `GLS015` | This script automatically sets the field WWVDSC (Voucher Description) to the value "转账凭证" (translated: Transfer Voucher) on panel GLS015. It is triggered during Enter key action... | DOM / Standard API |

## Sales & Distribution (CRS, MMS, MWS, OIS) (20 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`CRS610_CustomerControl.ts`](scripts/sales-and-distribution/CRS610_CustomerControl.ts) | `CRS610` | This script customizes behavior for users accessing the CRS610 program. It restricts specific function keys based on user role and interaction mode, and also disables or pre-set... | Hook: RequestCompleted |
| [`CustomerOrderChargesOIS103.ts`](scripts/sales-and-distribution/CustomerOrderChargesOIS103.ts) | `General / Framework` | H5 script for OIS103/E panel to calculate and display total accrued discount for a customer and restrict negative charge entries (WRCRAM) to be less than or equal to the accrued... | MIService (M3 API), Hook: RequestCompleted, Dynamic UI Elements |
| [`GC_MMS121B1_AddProdDtCol.ts`](scripts/sales-and-distribution/GC_MMS121B1_AddProdDtCol.ts) | `MMS121` | H5 Script for MMS121/B1 panel to add a Production Date column for sorting order 1. Fetches production date (IDDT) from MMS060MI API and formats it based on user date format (DMY... | MIService (M3 API), Hook: RequestCompleted, Grid / List Control |
| [`MMS100B_MWS300B_AutomationOfPositiveRO.ts`](scripts/sales-and-distribution/MMS100B_MWS300B_AutomationOfPositiveRO.ts) | `MMS100` | Script checks if a single selected row in M3’s MWA300BC or MMA100BC panels is a positive Return Order (RO) by validating its order type (TRTP) using the CRS200MI API. If the RO ... | MIService (M3 API), Grid / List Control |
| [`MMS100E_Apply_UserRole_Validation.ts`](scripts/sales-and-distribution/MMS100E_Apply_UserRole_Validation.ts) | `MMS100` | Keep Authorize enabled for valid user roles only - Place this H5script in MMS100/E panel | MIService (M3 API), ConfirmDialog |
| [`MMS101B1_PreventLineDeletion.ts`](scripts/sales-and-distribution/MMS101B1_PreventLineDeletion.ts) | `MMS101` | Disables Delete Button for orders with status ‘29’, ‘39’, ‘49’, ‘69’, ‘99’ on MMS101B panel. | Hook: RequestCompleted, Grid / List Control |
| [`MWS068_DisplayNumberOfPacks.ts`](scripts/sales-and-distribution/MWS068_DisplayNumberOfPacks.ts) | `MWS068` | H5 Script for MWS068/B panel to display number of packs (raw materials) in Lot Ref 2 (MLBRE2) and KG value for livestock FG in Indonesia WHs in Main Attribute 3 (MLATV3). Calcul... | MIService (M3 API), Hook: RequestCompleted, Grid / List Control |
| [`MWS301B1_PreventLineDeletion.ts`](scripts/sales-and-distribution/MWS301B1_PreventLineDeletion.ts) | `MWS301` | Disables Delete Button for orders with status ‘29’, ‘39’, ‘49’, ‘69’, ‘99’ on MWS301B panel. | Hook: RequestCompleted, Grid / List Control |
| [`MWS410B_MOsCostingStatus.ts`](scripts/sales-and-distribution/MWS410B_MOsCostingStatus.ts) | `MWS410` | Validates Costing status for bulk MOs in MWS410/B before allowing option 32. Calls MWS150MI.SelSupplyChain and MDBREADMI.GetMWOHED55 to validate. | MIService (M3 API) |
| [`MWS410_RestrictDOPrint.ts`](scripts/sales-and-distribution/MWS410_RestrictDOPrint.ts) | `MWS410` | This Script prevents actions 15, 21, 27, 28 when PGRS is below 90. | Hook: RequestCompleted, Grid / List Control |
| [`OIS101CreditBalance.ts`](scripts/sales-and-distribution/OIS101CreditBalance.ts) | `OIS101` | H5 script for OIS101 panel to display customer credit information during order entry. Retrieves Credit Limit, Outstanding Balance (SUM_BSOUAC + SUM_OBLNAM), Remaining Credit Bal... | MIService (M3 API), Dynamic UI Elements |
| [`OIS105_date.ts`](scripts/sales-and-distribution/OIS105_date.ts) | `OIS105` | This script displays today's date (formatted per user settings) in a message when panel OIS105/B is loaded. Column header updates are not supported in H5. | DOM / Standard API |
| [`OIS180_RestrictFields.ts`](scripts/sales-and-distribution/OIS180_RestrictFields.ts) | `OIS180` | Disables Invoice Date and Accounting Date fields on OIS180/E | DOM / Standard API |
| [`OIS300JS.ts`](scripts/sales-and-distribution/OIS300JS.ts) | `OIS300` | Adds a "MÁY TÍNH"( Vietnamese Calculate) button and Total Net Weight, Total Value, and Total Amount textboxes on the OIA300BC panel to compute totals for selected customer order... | Grid / List Control, Dynamic UI Elements |
| [`OIS300JSCN.ts`](scripts/sales-and-distribution/OIS300JSCN.ts) | `OIS300` | Adds a "Calculate" button and displays total net weight and total net value for selected Customer Orders on the OIA300BC panel. Button is enabled only for China views (CN-VIEW1,... | Grid / List Control, Dynamic UI Elements |
| [`OIS300_InvoiceReportLink.ts`](scripts/sales-and-distribution/OIS300_InvoiceReportLink.ts) | `OIS300` | H5 script for OIS300/B panel to open the Abaqa Invoice Report Link for the selected customer order (ORNO). Checks for single selection, handles no/multiple selections with messa... | Grid / List Control |
| [`OIS300_OAOBLC_VALIDATION.ts`](scripts/sales-and-distribution/OIS300_OAOBLC_VALIDATION.ts) | `OIS300` | This script prevents users from executing specific list options (such as Change, Delete, or Line Entry) in the OIS300/B panel (OIA300BC) when the selected order lines have block... | Grid / List Control |
| [`OIS300_OrderConfirmationReportLink.ts`](scripts/sales-and-distribution/OIS300_OrderConfirmationReportLink.ts) | `OIS300` | H5 script for OIS300/B panel to open the Abaqa Order Confirmation Report for the selected customer order (ORNO). Checks for single selection, handles no/multiple selections with... | Grid / List Control |
| [`OIS300_SalesReportLink.ts`](scripts/sales-and-distribution/OIS300_SalesReportLink.ts) | `OIS300` | H5 script for OIS300/B panel to open the Abaqa Sales Contract report for the selected customer order (ORNO). Checks for single selection, handles no/multiple selections with mes... | Grid / List Control |
| [`OIS300_WEARLO_VALIDATION.ts`](scripts/sales-and-distribution/OIS300_WEARLO_VALIDATION.ts) | `OIS300` | This script validates the 'BLRO' (Backlog Amount) field on the OIS300/B panel. If any selected row contains a negative BLRO value, the script cancels the execution of list optio... | Grid / List Control |

## Manufacturing & Purchasing (PMS, PPS) (23 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`GC_PMS050E_FlagBulkMOs.ts`](scripts/manufacturing-and-purchasing/GC_PMS050E_FlagBulkMOs.ts) | `PMS050` | This script automates the selection of the "Flag Complete" checkbox on panel PMS050/E for bulk manufacturing orders based on the item type. It ensures that MOs of type G02 are a... | DOM / Standard API |
| [`GC_PMS060_DisplayTotal.ts`](scripts/manufacturing-and-purchasing/GC_PMS060_DisplayTotal.ts) | `PMS060` | This script adds a button and textbox to the PMS060 panel to calculate and display the total reported quantity (RQTA) from the list/grid view. | Grid / List Control, Dynamic UI Elements |
| [`GC_PMS086_ValidateChgDelOptions.ts`](scripts/manufacturing-and-purchasing/GC_PMS086_ValidateChgDelOptions.ts) | `PMS086` | This script enforces order integrity in the PMS086 program by restricting Change (option 2) and Delete (option 4) list options when the order status is "90". It is designed to p... | Hook: RequestCompleted |
| [`GC_PMS100E_UpdStructureComplexity.ts`](scripts/manufacturing-and-purchasing/GC_PMS100E_UpdStructureComplexity.ts) | `PMS100` | This script is designed to automatically calculate and populate the Structure Complexity field (WHSCOM) on panel PMS100/E based on order quantity and yield quantity. It improves... | DOM / Standard API |
| [`GC_PMS101F_MediPack_ResF12.ts`](scripts/manufacturing-and-purchasing/GC_PMS101F_MediPack_ResF12.ts) | `PMS101` | This script enforces business logic for Medipack items (Item Type = G06) in the PMS101 program by restricting the use of the F12 (Previous) key. The rule ensures that users do n... | Hook: RequestCompleted |
| [`GC_PMS250E_UpdStrCom_Auto.ts`](scripts/manufacturing-and-purchasing/GC_PMS250E_UpdStrCom_Auto.ts) | `PMS250` | Clears specific fields on PMS250/E panel to ensure only the 'shop traveler' document is printed. | DOM / Standard API |
| [`pms100Js.ts`](scripts/manufacturing-and-purchasing/pms100Js.ts) | `PMS100` | Automatically launches PMS100 with pre-filled manufacturing order data for each selected line on PMS100/B and refreshes the list view after execution. | MIService (M3 API), Grid / List Control |
| [`PMS101E_MediPackV7.ts`](scripts/manufacturing-and-purchasing/PMS101E_MediPackV7.ts) | `PMS101` | Calculates bags for Medi Pack item based on yield and item type | Hook: RequestCompleted |
| [`pms170Js.ts`](scripts/manufacturing-and-purchasing/pms170Js.ts) | `PMS170` | Retrieves the selected Planned MO from PMS170/B - and creates an automation that opens PMS170/E and fills in relevant fields. Place this H5script in PMS170/B panel | MIService (M3 API), Grid / List Control |
| [`PPS171E_NonTradedItemsDisable_PPQT_PUNN.ts`](scripts/manufacturing-and-purchasing/PPS171E_NonTradedItemsDisable_PPQT_PUNN.ts) | `PPS171` | This Script disables PPQT and PUNN fields when POGETY is 28 or 29. | Hook: RequestCompleted |
| [`PPS180B1_TotalOrderValue.ts`](scripts/manufacturing-and-purchasing/PPS180B1_TotalOrderValue.ts) | `PPS180` | H5 script for PPA180BC to display Purchase Price, Total Line Amount, Total Order Value and Approval Status for purchase requisition sublines. Uses PPS170MI and CMS100MI APIs. | MIService (M3 API), Grid / List Control, Dynamic UI Elements |
| [`PPS180E_M3PRApproval.ts`](scripts/manufacturing-and-purchasing/PPS180E_M3PRApproval.ts) | `PPS180` | Adds Submit and Unapprove buttons on PPS180/E panel to manage purchase requisition approval status. Calls CUSEXTMI API to check and update approval status, disables specific fie... | MIService (M3 API), Dynamic UI Elements |
| [`PPS2001E_NonTradedItemsDisable.ts`](scripts/manufacturing-and-purchasing/PPS2001E_NonTradedItemsDisable.ts) | `PPS200` | Disables fields if GETY from PPS200MI GetLine is '28' or '29'. | MIService (M3 API) |
| [`PPS200E_M3POApproval.ts`](scripts/manufacturing-and-purchasing/PPS200E_M3POApproval.ts) | `PPS200` | Added a button in Change mode to submit POs with status 12 for approval by updating TEOR via PPS200MI. | MIService (M3 API), Dynamic UI Elements |
| [`PPS200E_M3POApproval_V2.ts`](scripts/manufacturing-and-purchasing/PPS200E_M3POApproval_V2.ts) | `PPS200` | Added a button in Change mode to submit POs with status 12 for approval by updating TEOR via PPS200MI. | MIService (M3 API), Dynamic UI Elements |
| [`PPS201B_ValidatePOApproval.ts`](scripts/manufacturing-and-purchasing/PPS201B_ValidatePOApproval.ts) | `PPS201` | Prevents unauthorized execution in PPS201/B1 if TEOR (line-level approval) is already set. | MIService (M3 API), Hook: RequestCompleted |
| [`PPS215.ts`](scripts/manufacturing-and-purchasing/PPS215.ts) | `PPS215` | Disables WWOVCD and WWCEVA fields on PPS215/E | DOM / Standard API |
| [`PPS220B_ValidatePOApproval.ts`](scripts/manufacturing-and-purchasing/PPS220B_ValidatePOApproval.ts) | `PPS220` | Prevents list option 2 or 35 execution in PPS220/B if line-level approval (TEOR) is already set. | MIService (M3 API), Hook: RequestCompleted, Grid / List Control |
| [`PPS220I1_PPS270E_DisableQtyAndValidation.ts`](scripts/manufacturing-and-purchasing/PPS220I1_PPS270E_DisableQtyAndValidation.ts) | `PPS220` | Validate the qty entered in PPA270/E and disable Qty to Notify column in PPS220/L1. | Hook: RequestCompleted, Grid / List Control |
| [`PPS300E_GRNWSP.ts`](scripts/manufacturing-and-purchasing/PPS300E_GRNWSP.ts) | `PPS300` | Adds an Auto-GRN button on PPS300/E panel to process selected purchase order lines using PPS001MI.Receipt API. Supports multilingual (English/Chinese) messages and validates loc... | MIService (M3 API), Grid / List Control, Dynamic UI Elements |
| [`PPS300_VehicleNo_V1.ts`](scripts/manufacturing-and-purchasing/PPS300_VehicleNo_V1.ts) | `PPS300` | Developed By : Rahul Killedar Developed On : 26/05/2025 Description : Adding extra column to display Vehicle Number ************************************/ | MIService (M3 API), Grid / List Control |
| [`PPS300_VehicleNo_V2.ts`](scripts/manufacturing-and-purchasing/PPS300_VehicleNo_V2.ts) | `PPS300` | Developed By : Rahul Killedar Developed On : 26/05/2025 Description : Adding extra column to display Vehicle Number ************************************/ | MIService (M3 API), ConfirmDialog, IonApiService (ION API), Grid / List Control |
| [`PPS310_QualityInspectAPI.ts`](scripts/manufacturing-and-purchasing/PPS310_QualityInspectAPI.ts) | `PPS310` | Added "Confirm All" button to PPS310/A to inspect all GRN lines via PPS001MI.Inspect. | MIService (M3 API), Dynamic UI Elements |

## Official Infor H5 SDK Samples (23 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`H5SampleAddElements.ts`](scripts/infor-samples/H5SampleAddElements.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SampleCancelRequest.ts`](scripts/infor-samples/H5SampleCancelRequest.ts) | `General / Framework` | H5 Script SDK sample. | DOM / Standard API |
| [`H5SampleCurrencyXML.ts`](scripts/infor-samples/H5SampleCurrencyXML.ts) | `General / Framework` | H5 Script SDK sample. | Grid / List Control, Dynamic UI Elements |
| [`H5SampleCustomColumns.ts`](scripts/infor-samples/H5SampleCustomColumns.ts) | `General / Framework` | H5 Script SDK sample. | Hook: RequestCompleted, Grid / List Control |
| [`H5SampleCustomDialog.ts`](scripts/infor-samples/H5SampleCustomDialog.ts) | `General / Framework` | Script initialization function. | DOM / Standard API |
| [`H5SampleDrillback.ts`](scripts/infor-samples/H5SampleDrillback.ts) | `General / Framework` | H5 Script SDK sample. In development. | Dynamic UI Elements |
| [`H5SampleExportToExcel.ts`](scripts/infor-samples/H5SampleExportToExcel.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SampleHelloWorld.ts`](scripts/infor-samples/H5SampleHelloWorld.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog |
| [`H5SampleHideColumns.ts`](scripts/infor-samples/H5SampleHideColumns.ts) | `General / Framework` | H5 Script SDK sample. | Grid / List Control |
| [`H5SampleImageFromList.ts`](scripts/infor-samples/H5SampleImageFromList.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog, Grid / List Control |
| [`H5SampleIonApiService.ts`](scripts/infor-samples/H5SampleIonApiService.ts) | `General / Framework` | H5 Script SDK sample. | MIService (M3 API), IonApiService (ION API), Dynamic UI Elements |
| [`H5SampleMFormsAutomation.ts`](scripts/infor-samples/H5SampleMFormsAutomation.ts) | `General / Framework` | H5 Script SDK sample. | MFormsAutomation, Dynamic UI Elements |
| [`H5SampleMIService.ts`](scripts/infor-samples/H5SampleMIService.ts) | `General / Framework` | MIService utility used here is still in development. H5 Script SDK sample. | MIService (M3 API), Dynamic UI Elements |
| [`H5SampleMIServiceV2.ts`](scripts/infor-samples/H5SampleMIServiceV2.ts) | `General / Framework` | MIService utility used here is still in development. H5 Script SDK sample. | MIService (M3 API), Dynamic UI Elements |
| [`H5SampleOpenFieldHelp.ts`](scripts/infor-samples/H5SampleOpenFieldHelp.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog |
| [`H5SampleOptionButton.ts`](scripts/infor-samples/H5SampleOptionButton.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SamplePreviewListHeader.ts`](scripts/infor-samples/H5SamplePreviewListHeader.ts) | `General / Framework` | H5 Script SDK sample. | Grid / List Control, Dynamic UI Elements |
| [`H5SampleRegexValidator.ts`](scripts/infor-samples/H5SampleRegexValidator.ts) | `General / Framework` | H5 Script SDK sample. | DOM / Standard API |
| [`H5SampleRequestTracer.ts`](scripts/infor-samples/H5SampleRequestTracer.ts) | `General / Framework` | H5 Script SDK sample. | Hook: RequestCompleted |
| [`H5SampleSelectionChanged.ts`](scripts/infor-samples/H5SampleSelectionChanged.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog, Grid / List Control |
| [`H5SampleShowOnMap.ts`](scripts/infor-samples/H5SampleShowOnMap.ts) | `General / Framework` | H5 Script SDK sample. | Dynamic UI Elements |
| [`H5SampleShowXml.ts`](scripts/infor-samples/H5SampleShowXml.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog |
| [`H5SampleUserDetails.ts`](scripts/infor-samples/H5SampleUserDetails.ts) | `General / Framework` | H5 Script SDK sample. | ConfirmDialog, Dynamic UI Elements |

## Utilities & Shared Tools (2 Scripts)

| Script Name | M3 Program | Summary / Purpose | Key APIs Used |
| :--- | :--- | :--- | :--- |
| [`EntryModeSetter.ts`](scripts/utilities/EntryModeSetter.ts) | `General / Framework` | This script is standard one in ISO. There is no equivalent H5 scripts. Perhaps this is not required in MT. However, I uplifted it. | DOM / Standard API |
| [`TestIssue.ts`](scripts/utilities/TestIssue.ts) | `General / Framework` | Script initialization function. | MIService (M3 API), Hook: RequestCompleted |

