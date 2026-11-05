# Design Specifications (DES-020) Summary

This document provides a technical and functional index of the DES-020 Design Specification documents included in this Knowledge Base. These specifications define client-side business logic, field validations, and user experience enhancements for Infor M3.

---

## Specification Catalog

| Specification File | M3 Program / Panel | Associated Script(s) | Functional Summary |
| :--- | :--- | :--- | :--- |
| **`DES-020_ APS120_ReconciliationValidation.docx`** | `APS120` (Supplier Invoice Entry) | `APS120_ReconciliationValidation.ts` | Validates invoice reconciliation lines, ensuring matching totals, tax compliance, and preventing premature confirmation when variance limits are exceeded. |
| **`DES-020_ APS131_Set_Report_Text.docx`** | `APS131` (Payment Proposal) | `APS131_Set_Report_Text.ts` | Automatically populates report text and payment transmission remarks based on vendor and bank requirements. |
| **`DES-020_ APS131_Set_Report_Text_CN.docx`** | `APS131` (China Tenant) | `APS131_Set_Report_Text_CN.ts` | China tenant localization for payment proposal text formatting and local bank communication standards. |
| **`DES-020_ APS131_Set_Report_Text_ID.docx`** | `APS131` (Indonesia Tenant) | `APS131_Set_Report_Text_ID.ts` | Indonesia tenant localization for payment report remarks and bank transfer details. |
| **`DES-020_ APS131_Set_Report_Text_MY.docx`** | `APS131` (Malaysia Tenant) | `APS131_Set_Report_Text_MY.ts` | Malaysia tenant localization for payment proposal report text. |
| **`DES-020_ APS131_Set_Report_Text_200.docx`** | `APS131` (Company 200) | `APS131_Set_Report_Text_200.ts` | Specific company 200 payment proposal rules and remark tagging. |
| **`DES-020_ pms100Js.docx`** | `PMS100` (Manufacturing Orders) | `pms100Js.ts`, `GC_PMS100E_UpdStructureComplexity.ts` | Calculates structure complexity, updates MO header attributes, and automates field defaults based on item and route attributes. |
| **`DES-020_GC_PMS060_DisplayTotal.docx`** | `PMS060` (Operation Schedule / Reporting) | `GC_PMS060_DisplayTotal.ts` | Computes and displays dynamic total operational hours and quantities directly on the grid footer or custom panel label. |
| **`DES-020_EntryModeSetter.docx`** | General Utility | `EntryModeSetter.ts` | Configures and standardizes entry modes, tab sequences, and field focus behavior across various M3 panels. |
| **`Template/DES-020_Design_Specification H5 Template.docx`** | Standard Template | N/A | Official enterprise design specification template for authoring new H5 script functional specifications. |

---

## AI Agent Retrieval Guidance
- When asked to create or modify scripts for **Accounts Payable (`APS120`, `APS131`)**, refer to the relevant `DES-020_APS*` document and matching script in `scripts/finance/`.
- When asked about **Production / Manufacturing Orders (`PMS100`, `PMS060`)**, refer to `DES-020_pms100Js.docx` and `DES-020_GC_PMS060_DisplayTotal.docx` and matching scripts in `scripts/manufacturing-and-purchasing/`.
- For standard documentation templates when documenting a new script, use `Template/DES-020_Design_Specification H5 Template.docx`.
