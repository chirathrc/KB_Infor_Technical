# GitHub Copilot & AI Agent Instructions: Infor M3 Technical Knowledge Base

This repository serves as a centralized technical knowledge base for **Infor M3 H5 Client-Side Scripting (SDK 10.4.1 / v2.0+)**, **M3 Machine Interface (MI) APIs**, and **MEC Enterprise Connector Mappings**.

When acting as an AI pair programmer, agent, or retrieval assistant on this repository, strictly adhere to the following workflow:

---

## 1. Navigating the Knowledge Base

1. **API Lookups**:
   - To find an M3 backend MI API transaction, consult `m3-api/mi-swagger/MI_CATALOG.md` or `m3-api/mi-swagger/MI_CATALOG.json`.
   - Inspect the specific Swagger JSON file `m3-api/mi-swagger/<PROGRAM>MI.json` for exact transaction names, inputs, and output fields.
   - For client-side H5 controller methods, UI elements, and services, check `h5/sdk-reference/API_QUICK_REFERENCE.md` and `h5/sdk-reference/h5.script.d.ts`.

2. **Existing H5 Script Patterns (92 Scripts)**:
   - Check `KB_INDEX.json` or `README.md` to locate existing scripts by M3 program (e.g. `APS100`, `CRS610`, `MMS121`, `OIS300`, `PMS100`, `PPS300`).
   - Reference implementations are divided into:
     - `h5/scripts/finance/` (APS, ARS, FAS, GLS — 23 scripts)
     - `h5/scripts/sales-and-distribution/` (CRS, MMS, MWS, OIS — 21 scripts)
     - `h5/scripts/manufacturing-and-purchasing/` (PMS, PPS — 23 scripts)
     - `h5/scripts/infor-samples/` (Official Infor SDK samples — 23 scripts)
     - `h5/scripts/utilities/` (Cross-cutting tools — 2 scripts)

3. **Design Specifications & MEC**:
   - Check `h5/design-specs/SPECS_SUMMARY.md` when H5 functional context or DES-020 business rules are needed.
   - Check `mec/README.md` and `mec/MEC_INDEX.json` for MEC mappings and `.zap` archives.

---

## 2. H5 Scripting Rules & Standards

Always follow the standards defined in `h5/guides/STANDARDS_AND_CONVENTIONS.md` and `.agents/skills/h5script-master/SKILL.md`:

1. **JSDoc Header**: Every `.ts` script must begin with the standardized Fortude header block:
   ```typescript
   /**
    * Author      : [Full Name] (Fortude)
    * Created on  : YYYY-MM-DD
    * Summary     : [Detailed explanation of functionality and panel triggers]
    *
    * Version Log :
    * Changed By  | Date       | Summary of the change
    * ------------|------------|-----------------------------
    * [Name]      | YYYY-MM-DD | Initial script creation
    */
   ```

2. **Entry Point & Class Pattern (No `import` / `export`)**:
   - Class name must strictly equal the filename without extension. Never use `export class` or `import`.
   ```typescript
   class <ExactFileName> {
       private controller: IInstanceController;
       private log: IScriptLog;
       private miService: any;

       constructor(scriptArgs: IScriptArgs) {
           this.controller = scriptArgs.controller;
           this.log = scriptArgs.log;
           this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
       }

       public static Init(args: IScriptArgs): void {
           new <ExactFileName>(args).run();
       }

       private run(): void {
           if (this.controller.GetPanelName() !== "<ExpectedPanel>") return;
           const unsubReq = this.controller.Requesting.On((e: CancelRequestEventArgs) => {
               if (e.commandType === "KEY" && e.commandValue === "F12") return;
               // Synchronous e.cancel = true validation (use gate-and-replay for async MI checks)
           });
           const unsubDone = this.controller.Requested.On((e: RequestEventArgs) => {
               unsubReq();
               unsubDone();
           });
       }
   }
   ```

3. **Backend MI & ION Calls**:
   - Resolve `MIService` with `ScriptUtil.version >= 2.0 ? MIService : MIService.Current` and call `executeRequestV2(request)`.
   - Always check `res.hasError() || (res as any).errorType === "ServerReturnedNOK" || res.errorMessage`.
   - Format numeric outputs and inputs according to `ScriptUtil.GetUserContext().DCFM` (`"."` vs `","`) and dates according to `DTFM`.
   - Deliver both `.ts` and compiled `.js` (`tsc`) when generating or modifying scripts.

4. **UI, Dialogs & Grid Best Practices**:
   - Add custom controls via `controller.GetContentElement().AddElement(elem)` using grid coordinates.
   - Read grid columns via `ListControl.ListView.GetValueByColumnName("COL", controller)` or `controller.GetGrid()`.
   - Use `ConfirmDialog.ShowMessageDialog(...)` or `controller.ShowMessage(...)`, never `alert()`.
   - Never detach `Requesting` inside `onRequesting` when setting `e.cancel = true`.
