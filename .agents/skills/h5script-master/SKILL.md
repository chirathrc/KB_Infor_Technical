---
name: h5script-master
description: >
  Master knowledge base for Infor M3 H5 scripting (TypeScript/JavaScript personalizations for MForms panels, H5 Script SDK 10.4.1 / v2.0+) AND for converting legacy Smart Office (JScript.Net) personalizations to H5 TypeScript. Use for ALL H5 tasks: creating, editing, reviewing, debugging and deploying scripts; IInstanceController, Requesting/Requested/RequestCompleted, e.cancel, ListControl/ListView/IActiveGrid, ContentElement.AddElement, DatePickerElement, RadioGroupElement, ConfirmDialog, ShowBusyIndicator/HideBusyIndicator, SessionCache/InstanceCache, ScriptUtil (version, GetUserContext, DCFM/DTFM locale formatting), MIService (executeRequestV2, MIRequest), IonApiService, MFormsAutomation, drillback, localScript debugging, scantool jQuery checks, TypeScript compilation flags, IDS <ids-data-grid> Shadow DOM MutationObserver, disabling Soho/IDS [componentname] dropdowns, panel names like OIA300BC/APA100F0, SO JScript to H5 mapping, and Fortude/Gold Coin/Safco scripts. Trigger on any OIS/APS/ARS/FAS/GLS/CRS/MMS/MWS/PMS/PDS/PPS program script, pasted .ts/.js, 'M3 script', 'H5 button', 'block ENTER', 'add a column to the list'. Refer to the GitHub Knowledge Base at https://github.com/chirathrc/KB_Infor_Technical.
---

# Infor M3 H5 Script — Master Knowledge Base
> Consolidated from 92 production & SDK sample scripts, H5 Script Developer's Guide (10.4.1 / v2.0+), Fortude Engineering Standards,
> and the GitHub Knowledge Base at **https://github.com/chirathrc/KB_Infor_Technical**.

## 0. GitHub Knowledge Base Mapping
Always cite and reference resources using their GitHub repository URLs rather than local paths:
- **Repository**: `https://github.com/chirathrc/KB_Infor_Technical`
- **Master Script Catalog (92 Scripts)**: [`KB_INDEX.json`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/KB_INDEX.json)
- **Standard MI API Swagger Catalog (1,311 Programs)**: [`m3-api/mi-swagger/MI_CATALOG.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/m3-api/mi-swagger/MI_CATALOG.md)
- **API Reference & SDK 10.4.1 Typings**: [`h5/sdk-reference/h5.script.d.ts`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/h5/sdk-reference/h5.script.d.ts), [`h5/sdk-reference/tsconfig.json`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/h5/sdk-reference/tsconfig.json), and [`h5/sdk-reference/API_QUICK_REFERENCE.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/h5/sdk-reference/API_QUICK_REFERENCE.md)
- **Development Standards & Patterns**: [`h5/guides/STANDARDS_AND_CONVENTIONS.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/h5/guides/STANDARDS_AND_CONVENTIONS.md)
- **Functional Specs (DES-020)**: [`h5/design-specs/SPECS_SUMMARY.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/h5/design-specs/SPECS_SUMMARY.md)

---

## 1. What H5 Scripts Are
H5 scripts are client-side TypeScript/JavaScript personalizations that extend Infor M3 H5 web client panels:
- Attached to M3 program panels via **Personalization > Scripts** or Shortcuts.
- Run inside the browser global scope alongside the M3 H5 framework (`ScriptUtil.version >= 2.0` uses IDS Web Components; `< 2.0` uses Soho controls).
- Never use `import` or `export` module keywords (`h5.script.d.ts` provides ambient globals).
- Compiled via `tsc` to `.js` and imported into H5 Administration Tools (`MNS095` / H5 Admin) or tested live via `?localScript=`.
- No direct file system or SQL database access from the browser — use `MIService` or `IonApiService`.
- Dialogs must use `ConfirmDialog.ShowMessageDialog()` or `ConfirmDialog.Show()`, never native `alert()`.

---

## 2. Standard Script File Structure

```typescript
/**
 * Author      : [Full Name] (Fortude)
 * Created on  : YYYY-MM-DD
 * Summary     : [ProgramCode/Panel - Brief Description]
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * [Name]      | YYYY-MM-DD | Initial script creation
 */

class [ScriptFileName] {
    private scriptName = "[ScriptFileName]";
    private controller: IInstanceController;
    private log: IScriptLog;
    private args: string;
    private miService: any;
    private isReplaying = false;
    private unsubscribeRequesting: Function;
    private unsubscribeRequested: Function;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.args = scriptArgs.args;
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    }

    public static Init(args: IScriptArgs): void {
        new [ScriptFileName](args).run();
    }

    private run(): void {
        if (this.controller.GetPanelName() !== "[ExpectedPanel]") return;
        if (InstanceCache.ContainsKey(this.controller, this.scriptName)) return;
        InstanceCache.Add(this.controller, this.scriptName, true);

        this.unsubscribeRequesting = this.controller.Requesting.On((e: CancelRequestEventArgs) => this.onRequesting(e));
        this.unsubscribeRequested  = this.controller.Requested.On((e: RequestEventArgs) => this.onRequested(e));
    }

    private onRequesting(e: CancelRequestEventArgs): void {
        if (e.commandType === "KEY" && (e.commandValue === "F12" || e.commandValue === "F3")) return;
        if (this.isReplaying) {
            this.isReplaying = false;
            return;
        }
        // Validation / synchronous e.cancel = true logic
    }

    private onRequested(e: RequestEventArgs): void {
        InstanceCache.Remove(this.controller, this.scriptName);
        if (this.unsubscribeRequesting) this.unsubscribeRequesting();
        if (this.unsubscribeRequested) this.unsubscribeRequested();
    }
}
```

---

## 3. Non-Negotiable Development Rules & Production Patterns

1. **Class Name == File Name (No `export`)**: `class OIS300_ValidateCredit` must live in `OIS300_ValidateCredit.ts` without `export` or `import` statements.
2. **Standard Header Block**: Every script must have the Fortude JSDoc header with Author, Created on, Summary, and Version Log.
3. **Always Deliver Both `.ts` and `.js`**: Compile after every modification using `tsc [filename].ts h5/sdk-reference/h5.script.d.ts h5/sdk-reference/jquery.d.ts h5/sdk-reference/es6-promise.d.ts --skipLibCheck --target ES2015 --noEmitOnError false` (or `tsc -p .` with `tsconfig.json`).
4. **F12 / F3 Passthrough**: Always allow `F12` / `F3` (Back/Exit) through without validation unless explicitly required:
   ```typescript
   if (e.commandType === "KEY" && (e.commandValue === "F12" || e.commandValue === "F3")) return;
   ```
5. **Async `e.cancel` Gate-and-Replay & Listener Retention**:
   - `e.cancel = true` inside an async continuation (`await`/`.then`) has **no effect** because `Requesting` is synchronous.
   - Synchronously set `e.cancel = true;`, run async MI check, and if allowed set `this.isReplaying = true` and call `controller.PressKey("ENTER")` or `controller.ListOption(val)`.
   - **Never detach `Requesting` inside `onRequesting` when `e.cancel = true`** — the user remains on the panel and a second click would bypass validation! Only detach inside `Requested` or `ContentElement.OnUnload()`.
6. **Inspect `executeRequestV2` Body on Resolve & Guard Busy Indicators**:
   - Both custom XtendM3 and standard Infor MI transactions can **resolve** with `errorType === "ServerReturnedNOK"` or `errorMessage`. Always check:
     ```typescript
     if (res.hasError() || (res as any).errorType === "ServerReturnedNOK" || res.errorMessage) {
         // handle error
     }
     ```
   - Wrap `this.controller.ShowBusyIndicator()` (v2.0+) in `try/catch` and **always** call `this.controller.HideBusyIndicator()` in both `.then()` and `.catch()`.
7. **Locale-Aware Decimal (`DCFM`) & Date (`DTFM`) Formatting**:
   - MI APIs return `.` decimal separators (`"165.00000"`) and `YYYYMMDD` dates, while panels use MNS150 `ScriptUtil.GetUserContext().DCFM` (`"."` or `","`) and `DTFM` (`"DMY"`, `"MDY"`, `"YMD"`).
   - Convert `.` to `,` when `DCFM === ","` before calling `ScriptUtil.SetFieldValue()`.
   - When parsing formatted grid/panel numbers, move M3 trailing minus signs (`"1.234,50-"` -> `"-1.234,50"`) and normalize thousands/decimal separators based on `DCFM` before `parseFloat()`.
8. **Grid, List & IDS Shadow DOM Access**:
   - Use `ListControl.ListView.GetValueByColumnName("FIELD", this.controller)` or `grid.getSelectedGridRows()` instead of brittle positional indexing.
   - Re-populate custom virtual grid columns on `RequestCompleted` for `PAGE/DOWN`.
   - In H5 v2.0+ (`<ids-data-grid>`), custom cell DOM formatting must observe `grid.shadowRoot` via `MutationObserver` (`div[data-testid*="datagrid-cell"] span`) with an expando guard (`_h5FormatterActive = true`) so formatting survives virtual scrolling (see `APS100_RD.ts`).
9. **UI Elements & Disabling Custom Controls**:
   - Use `controller.GetContentElement().AddElement(elem)` (grid coordinates), not `.Add()`. Supported v2.0+ elements include `ButtonElement`, `LabelElement`, `TextBoxElement`, `TextAreaElement`, `CheckBoxElement`, `ComboBoxElement` (`ComboBoxItemElement`), `DatePickerElement`, `RadioGroupElement` (`RadioButtonElement`), and `ListElement`.
   - To disable Soho/IDS custom dropdowns or lookup fields where `.prop("disabled", true)` fails, target `[componentname="FIELD"]` with scoped CSS (`pointer-events: none; opacity: 0.6`) + `disabled = true` / `aria-disabled = "true"` + `MutationObserver` (see `CRS610_CustomerControl.ts`), or overlay a disabled `TextBoxElement` (see `PPS220I1_PPS270E_DisableQtyAndValidation.ts`).
   - Use `ConfirmDialog.ShowMessageDialog()` or `controller.ShowMessage()`, never `alert()`.
10. **Smart Office Conversion & CloudSuite Multi-Tenant Uplift**:
    - Direct SQL (`System.Data.SqlClient`) and file system access (`XmlWriter`, `FileSystemObject`) are impossible in the browser and must be re-architected via `MIService` (`MDBREADMI`, `CMS100MI`, `CUSEXTMI`) or `IonApiService` (`/ifsservice/usermgt/v2/...` — note Mingle v1 APIs were deprecated Oct 2024).
    - Use `?localScript=https://localhost:8080/Script.js` for live testing and Infor `scantool` (port `8008`) to audit jQuery usage for H5 v2.0+ compatibility.

---

## 4. Reference Scripts on GitHub (92 Scripts)
Refer to matching production implementations in:
- Finance (23 scripts — APS, ARS, FAS, GLS): `https://github.com/chirathrc/KB_Infor_Technical/tree/main/h5/scripts/finance`
- Sales & Distribution (21 scripts — CRS, MMS, MWS, OIS): `https://github.com/chirathrc/KB_Infor_Technical/tree/main/h5/scripts/sales-and-distribution`
- Manufacturing & Purchasing (23 scripts — PMS, PPS): `https://github.com/chirathrc/KB_Infor_Technical/tree/main/h5/scripts/manufacturing-and-purchasing`
- Infor SDK Samples (23 scripts): `https://github.com/chirathrc/KB_Infor_Technical/tree/main/h5/scripts/infor-samples`
- Utilities (2 scripts): `https://github.com/chirathrc/KB_Infor_Technical/tree/main/h5/scripts/utilities`
- Standard MI APIs (1,311 Swagger specs): `https://github.com/chirathrc/KB_Infor_Technical/tree/main/m3-api/mi-swagger`
