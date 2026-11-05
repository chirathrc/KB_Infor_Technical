---
name: h5script-master
description: >
  Master knowledge base for Infor M3 H5 scripting (TypeScript/JavaScript personalizations for MForms panels, H5 Script SDK 10.4.1) AND for converting legacy Smart Office (JScript.Net) personalizations to H5 TypeScript. Use for ALL H5 tasks: creating, editing, reviewing, debugging and deploying scripts; IInstanceController, Requesting/Requested/RequestCompleted, e.cancel, ListControl/IActiveGrid, ContentElement.AddElement, ConfirmDialog, SessionCache/InstanceCache, ScriptUtil, MIService (executeRequestV2, MIRequest), IonApiService, MForms Automation, drillback, localScript debugging, TypeScript compilation flags, IDS datagrid issues, panel names like OIA101BC, SO JScript to H5 mapping (MIWorker, controller.add_Requesting), Abhishek's coding rules, and Fortude/Safco scripts (UCA0 approval locks, qty-lock validators). Trigger on any OIS/APS/CRS/PMS/MWS/PDS/PPS program script, pasted .ts/.js, 'M3 script', 'H5 button', 'block ENTER', 'add a column to the list'. Refer to the GitHub Knowledge Base at https://github.com/chirathrc/KB_Infor_Technical.
---

# Infor M3 H5 Script — Master Knowledge Base
> Consolidated from live project scripts, H5 Script Developer's Guide (10.4.1), Fortude Training Guide,
> and the GitHub Knowledge Base at **https://github.com/chirathrc/KB_Infor_Technical**.

## 0. GitHub Knowledge Base Mapping
Always cite and reference resources using their GitHub repository URLs rather than local paths:
- **Repository**: `https://github.com/chirathrc/KB_Infor_Technical`
- **Master Script Catalog**: [`KB_INDEX.json`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/KB_INDEX.json)
- **Standard MI API Swagger Catalog**: [`mi-swagger/MI_CATALOG.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/mi-swagger/MI_CATALOG.md)
- **API Reference & Typings**: [`api-reference/h5.script.d.ts`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/api-reference/h5.script.d.ts) and [`api-reference/API_QUICK_REFERENCE.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/api-reference/API_QUICK_REFERENCE.md)
- **Development Standards**: [`docs/STANDARDS_AND_CONVENTIONS.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/docs/STANDARDS_AND_CONVENTIONS.md)
- **Functional Specs**: [`design-specifications/SPECS_SUMMARY.md`](https://github.com/chirathrc/KB_Infor_Technical/blob/main/design-specifications/SPECS_SUMMARY.md)

---

## 1. What H5 Scripts Are
H5 scripts are client-side TypeScript/JavaScript personalizations that extend Infor M3 H5 web client panels:
- Attached to M3 program panels via **Personalization > Scripts** or Shortcuts.
- Run inside the browser alongside the M3 H5 framework.
- Compiled via `tsc` to `.js` and imported into H5 Administration Tools.
- No direct file system or database access from the browser.
- Dialogs must use `ConfirmDialog.ShowMessageDialog()`, never native `alert()`.

---

## 2. Standard Script File Structure

### Required Structure
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
        if (InstanceCache.ContainsKey(this.controller, "[ScriptFileName]")) return;
        InstanceCache.Add(this.controller, "[ScriptFileName]", true);

        this.unsubscribeRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
        this.unsubscribeRequested  = this.controller.Requested.On((e) => this.onRequested(e));
    }

    private onRequesting(e: CancelRequestEventArgs): void {
        // Validation / cancellation logic
    }

    private onRequested(e: RequestEventArgs): void {
        if (this.unsubscribeRequesting) this.unsubscribeRequesting();
        if (this.unsubscribeRequested) this.unsubscribeRequested();
    }
}
```

---

## 3. Non-Negotiable Development Rules

1. **Class Name == File Name**: `class OIS300_ValidateCredit` must live in `OIS300_ValidateCredit.ts`.
2. **Standard Header Block**: Every script must have the Fortude JSDoc header with Author, Created on, Summary, and Version Log.
3. **Always Deliver Both `.ts` and `.js`**: Compile after every modification using `tsc [filename].ts --skipLibCheck --target ES2015 --noEmitOnError false`.
4. **F12 Passthrough**: Always allow F12 (Back/Cancel) through without validation:
   ```typescript
   if (e.commandType === "KEY" && e.commandValue === "F12") return;
   ```
5. **Async `e.cancel` Gate-and-Replay**:
   - `e.cancel = true` inside an async continuation (`await`/`.then`) has **no effect** because `Requesting` is synchronous.
   - Synchronously cancel: `e.cancel = true;`
   - Run async MI check.
   - If allowed, set `isReplaying = true` and call `controller.PressKey("ENTER")` or `controller.ListOption(val)`.
6. **Inspect `executeRequestV2` Body on Resolve**:
   - Both custom XtendM3 and standard Infor MI transactions (e.g. `MNS410MI/Get`) can **resolve** with `errorType === "ServerReturnedNOK"` or `errorMessage`.
   - Never assume `.then()` means business success. Always check:
     ```typescript
     if (res.hasError() || (res as any).errorType === "ServerReturnedNOK" || res.errorMessage) {
         // handle error
     }
     ```
7. **Grid & List Access**:
   - Use `ListControl.ListView.GetValueByColumnName("FIELD")` instead of positional indexing.
   - Re-populate custom grid columns on `RequestCompleted` for `PAGE/DOWN`.
8. **UI Elements**:
   - Use `ContentElement.AddElement()` (grid units), not `.Add()` (pixel layout).
   - On lookup-type fields that fail silently with `.readOnly()`, overlay a disabled `TextBoxElement`.
   - Use `ConfirmDialog.ShowMessageDialog()` or `controller.ShowMessage()`, never `alert()`.
9. **Smart Office Conversion**:
   - Direct SQL (`System.Data.SqlClient`) and file system access (`XmlWriter`, `FileSystemObject`) are impossible in the browser and must be re-architected via MI API calls.

---

## 4. Reference Scripts on GitHub
Refer to matching production implementations in:
- Finance: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/scripts/finance`
- Sales & Distribution: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/scripts/sales-and-distribution`
- Manufacturing & Purchasing: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/scripts/manufacturing-and-purchasing`
- Infor SDK Samples: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/scripts/infor-samples`
- Standard MI APIs: `https://github.com/chirathrc/KB_Infor_Technical/tree/main/mi-swagger`

