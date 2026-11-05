# GitHub Copilot & AI Agent Instructions: Infor M3 H5 Technical Knowledge Base

This repository serves as a centralized technical knowledge base for **Infor M3 H5 Client-Side Scripting** and **M3 Machine Interface (MI) APIs**.

When acting as an AI pair programmer, agent, or retrieval assistant on this repository, strictly adhere to the following workflow:

---

## 1. Navigating the Knowledge Base

1. **API Lookups**:
   - To find an M3 backend MI API transaction, consult `m3-api/mi-swagger/MI_CATALOG.md` or `m3-api/mi-swagger/MI_CATALOG.json`.
   - Inspect the specific Swagger JSON file `m3-api/mi-swagger/<PROGRAM>MI.json` for exact transaction names, inputs, and output fields.
   - For client-side H5 controller methods, check `h5/sdk-reference/API_QUICK_REFERENCE.md` and `h5/sdk-reference/h5.script.d.ts`.

2. **Existing Script Patterns**:
   - Check `KB_INDEX.json` or `README.md` to locate existing scripts by M3 program (e.g. `MMS100`, `OIS300`, `APS120`, `PMS100`).
   - Reference implementations are divided into:
     - `h5/scripts/finance/` (APS, ARS, FAS, GLS)
     - `h5/scripts/sales-and-distribution/` (CRS, MMS, MWS, OIS)
     - `h5/scripts/manufacturing-and-purchasing/` (PMS, PPS)
     - `h5/scripts/infor-samples/` (Official Infor SDK samples)
     - `h5/scripts/utilities/` (Cross-cutting tools)

3. **Design Specifications**:
   - Check `h5/design-specs/SPECS_SUMMARY.md` when functional context or business rules are needed.

---

## 2. H5 Scripting Rules & Standards

Always follow the official standards defined in `h5/guides/STANDARDS_AND_CONVENTIONS.md`:

1. **JSDoc Header**: Every `.ts` script must begin with the standardized header block:
   ```typescript
   /**
    * Author      : [Full Name] ([Organization])
    * Created on  : [YYYY-MM-DD]
    * Summary     : [Detailed explanation of functionality and panel triggers]
    *
    * Version Log :
    * Changed By  | Date       | Summary of the change
    * ------------|------------|-----------------------------
    * [Name]      | YYYY-MM-DD | Initial script creation
    */
   ```

2. **Entry Point Pattern**:
   ```typescript
   export class <ProgramPanel_DescriptiveName> {
       public static Init(args: IScriptArgs): void {
           const controller = args.controller;
           const log = args.log;

           // Event subscription (RequestExecuting for validation, RequestCompleted for post-render)
           controller.RequestExecuting.Register((s, e) => {
               // Intercept and validate
           });
       }
   }
   ```

3. **Backend MI Calls**:
   - Always invoke backend transactions asynchronously using `MIService.Current.ExecuteRequest(request)` with `MIRequest`.
   - Never block synchronous UI execution with heavy synchronous loops.
   - Handle errors gracefully and display feedback via `controller.ShowMessage(...)` or `ConfirmDialog.Show(...)`.

4. **DOM & Grid Best Practices**:
   - Use `args.controller.GetGrid()` for `IActiveGrid` list operations.
   - Use `args.controller.GetContent().OnUnload(...)` to clean up dynamically created DOM elements or timers.

