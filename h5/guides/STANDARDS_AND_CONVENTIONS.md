# Infor M3 H5 Scripting Standards, Conventions & Production Patterns

This guide defines the mandatory development standards, coding conventions, and battle-tested CloudSuite Multi-Tenant (H5 SDK 10.4.1 / v2.0+) engineering patterns used across the Knowledge Base.

---

## 1. File & Class Naming Conventions

- **Strict Class-to-Filename Equality**: The TypeScript `class` name **must** match the exact `.ts` / `.js` filename (without extension). H5 instantiates `<FileName>.Init(args)` by name at runtime.
- **No Module Keywords (`import` / `export`)**: H5 scripts run in the browser global scope alongside ambient declarations (`h5.script.d.ts`). Never write `export class ...` or `import ...`, which emit CommonJS `exports` references that crash in H5.
- **Preserve Deployed Script Names**: When maintaining or uplifting existing Smart Office / H5 scripts, keep exact filenames so existing M3 Personalization XML attachments remain intact.
- **Naming Pattern for New Scripts**:
  - Program/Panel Scripts: `<Program><Panel>_<Functionality>.ts` (e.g. `PPS201B_ValidatePOApproval.ts`, `OIS300_OAOBLC_VALIDATION.ts`)
  - Shared Utilities: `<DescriptivePascalCaseName>.ts` (e.g. `EntryModeSetter.ts`)
  - Official SDK Samples: `H5Sample<FeatureName>.ts`

---

## 2. Mandatory JSDoc Header Block

Every `.ts` script **must** begin with the standardized Fortude JSDoc header block for authorship, auditability, and automated `KB_INDEX.json` indexing:

```typescript
/**
 * Author      : [Full Name] (Fortude)
 * Created on  : YYYY-MM-DD
 * Summary     : [Program/Panel - Concise functional summary, triggers, and MI APIs used]
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * [Name]      | YYYY-MM-DD | Initial script creation
 */
```

---

## 3. Standard Script Architecture & Lifecycle

```typescript
class PPS201B_Example {
    private scriptName = "PPS201B_Example";
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
        new PPS201B_Example(args).run();
    }

    private run(): void {
        if (this.controller.GetPanelName() !== "PPA201BC") return;

        // Guard against duplicate attachment on the same controller instance
        if (InstanceCache.ContainsKey(this.controller, this.scriptName)) return;
        InstanceCache.Add(this.controller, this.scriptName, true);

        this.unsubscribeRequesting = this.controller.Requesting.On((e: CancelRequestEventArgs) => this.onRequesting(e));
        this.unsubscribeRequested = this.controller.Requested.On((e: RequestEventArgs) => this.onRequested(e));
    }

    private onRequesting(e: CancelRequestEventArgs): void {
        // 1. Always allow F12 / F3 Back/Exit passthrough unless business rules explicitly forbid it
        if (e.commandType === "KEY" && (e.commandValue === "F12" || e.commandValue === "F3")) return;

        // 2. Allow validated replay through once
        if (this.isReplaying) {
            this.isReplaying = false;
            return;
        }

        // 3. Intercept target command (e.g., ENTER or LSTOPT 2)
        if (e.commandType === "LSTOPT" && e.commandValue === "2") {
            e.cancel = true; // Must be synchronous!
            this.validateAsyncAndReplay(e.commandType, e.commandValue);
        }
    }

    private async validateAsyncAndReplay(cmdType: string, cmdVal: string): Promise<void> {
        // Perform async MIService.executeRequestV2 validation...
        const allowed = true;
        if (allowed) {
            this.isReplaying = true;
            if (cmdType === "LSTOPT") {
                this.controller.ListOption(cmdVal);
            } else if (cmdType === "KEY") {
                this.controller.PressKey(cmdVal);
            }
        }
    }

    private onRequested(e: RequestEventArgs): void {
        InstanceCache.Remove(this.controller, this.scriptName);
        if (this.unsubscribeRequesting) this.unsubscribeRequesting();
        if (this.unsubscribeRequested) this.unsubscribeRequested();
    }
}
```

### Critical Lifecycle Rules
1. **Synchronous `e.cancel = true` + Async Gate-and-Replay**: `Requesting` executes synchronously. Setting `e.cancel = true` inside `.then()` or after `await` does **nothing** because the request has already been sent to M3 BE. Always cancel synchronously, run the async MI check, and replay (`PressKey` / `ListOption`) with a `this.isReplaying` flag if valid.
2. **Never Detach `Requesting` Inside `onRequesting` When Cancelling**: When `e.cancel = true`, the user remains on the same panel. Unsubscribing `Requesting` during a cancelled request leaves the panel unprotected on the user's second attempt (see fix in [`OIS300_OAOBLC_VALIDATION.ts`](../scripts/sales-and-distribution/OIS300_OAOBLC_VALIDATION.ts)). Only detach inside `Requested` or `ContentElement.OnUnload()`.
3. **Inspect `executeRequestV2` Body on Resolve**: Both standard Infor MI calls and XtendM3 transactions can resolve HTTP 200 while carrying an application error. Always check:
   ```typescript
   if (res.hasError() || (res as any).errorType === "ServerReturnedNOK" || res.errorMessage) { ... }
   ```
4. **Busy Indicator Safety (`v2.0+`)**: Guard `this.controller.ShowBusyIndicator()` in `try/catch` and **always** call `this.controller.HideBusyIndicator()` in both success and error paths so an API failure never locks the panel.

---

## 4. Production Multi-Tenant Patterns (H5 v2.0+ / IDS)

### 4.1 User Locale Decimal (`DCFM`) & Date (`DTFM`) Handling
M3 MI APIs return numeric decimals with `.` (e.g. `"165.00000"`) and dates as `"YYYYMMDD"`, whereas H5 panels validate and display values using the user's MNS150 settings (`ScriptUtil.GetUserContext()`):

- **Writing MI Numbers to Panel Fields** (see [`APS100_exrate.ts`](../scripts/finance/APS100_exrate.ts)):
  ```typescript
  const dcfm = ScriptUtil.GetUserContext().DCFM; // "." or ","
  const formattedRate = dcfm === "," ? rawApiValue.replace(".", ",") : rawApiValue.replace(",", ".");
  ScriptUtil.SetFieldValue("WWARAT", formattedRate, this.controller);
  ```
- **Parsing Formatted Panel / Grid Numbers & Trailing Minus** (see [`OIS300JS.ts`](../scripts/sales-and-distribution/OIS300JS.ts) & [`APS100_RD.ts`](../scripts/finance/APS100_RD.ts)):
  M3 displays negative numbers with a trailing minus (`"1.250,50-"` or `"1,250.50-"`):
  ```typescript
  function parseM3Number(raw: string, dcfm: string): number {
      if (!raw) return 0;
      let clean = raw.trim();
      if (clean.endsWith("-")) clean = "-" + clean.slice(0, -1);
      clean = dcfm === ","
          ? clean.replace(/\./g, "").replace(",", ".")
          : clean.replace(/,/g, "");
      const n = parseFloat(clean);
      return isNaN(n) ? 0 : n;
  }
  ```
- **Formatting Dates by `DTFM`** (`"DMY"`, `"MDY"`, `"YMD"` — see [`OIS105_date.ts`](../scripts/sales-and-distribution/OIS105_date.ts) and [`GC_MMS121B1_AddProdDtCol.ts`](../scripts/sales-and-distribution/GC_MMS121B1_AddProdDtCol.ts)).

### 4.2 IDS Web Components (`<ids-data-grid>`) Shadow DOM & Virtual Scroll
In H5 v2.0+, browse lists render inside `<ids-data-grid>` Web Components using Shadow DOM (`grid.shadowRoot`), and virtual scrolling recycles cell nodes dynamically.
- Prefer SDK APIs (`IActiveGrid.setColumns`, `setData`, `hideColumns`, `ListControl.ListView.GetValueByColumnName`) whenever possible.
- When custom display formatting of rendered grid cells is required (see [`APS100_RD.ts`](../scripts/finance/APS100_RD.ts)), attach a `MutationObserver` on `grid.shadowRoot` targeting `div[data-testid*="datagrid-cell"] span`, guarded by an expando flag (e.g. `(grid as any)._h5FormatterActive = true`) so observers are never duplicated.

### 4.3 Disabling Custom Dropdowns & Lookup Fields
Simple jQuery `$('#FIELD').prop('disabled', true)` often fails on H5 v2.0+ custom Soho/IDS dropdowns and browse/lookup inputs:
- **Dropdowns / Finance Controls** (see [`CRS610_CustomerControl.ts`](../scripts/sales-and-distribution/CRS610_CustomerControl.ts)): Target `[componentname="FIELD_NAME"]` with scoped `<style>` rules (`pointer-events: none !important; opacity: 0.6 !important;`), set `disabled = true`, `tabindex = "-1"`, and `aria-disabled = "true"` on inner `input`/`select`/`.dropdown`, and re-apply via `MutationObserver` if H5 re-renders the panel.
- **Lookup Inputs in Grids/Panels** (see [`PPS220I1_PPS270E_DisableQtyAndValidation.ts`](../scripts/manufacturing-and-purchasing/PPS220I1_PPS270E_DisableQtyAndValidation.ts)): Alternatively, overlay a disabled `TextBoxElement` at the same grid coordinates when `.readOnly()` silently fails.

---

## 5. TypeScript Compilation, Local Debugging & Scan Tool

### 5.1 Compilation (`tsc`)
Always compile `.ts` scripts to `.js` before deployment (see [`h5/sdk-reference/tsconfig.json`](../sdk-reference/tsconfig.json)):
```bash
tsc MyScript.ts h5/sdk-reference/h5.script.d.ts h5/sdk-reference/jquery.d.ts h5/sdk-reference/es6-promise.d.ts --skipLibCheck --target ES2015 --noEmitOnError false
```
Or build an entire project folder containing `typings/*.d.ts` and `tsconfig.json` (`"target": "es5"`, `"sourceMap": true`) via `tsc -p .`.

### 5.2 Live Browser Testing (`?localScript=`)
During development, host compiled `.js` files on a local static web server (e.g. Node `connect` + `serve-static` on port `8080`) and append `?localScript=https://localhost:8080/MyScript.js` to the M3 H5 URL so changes can be tested immediately without re-importing into `MNS095` / H5 Administration Tool on every edit.

### 5.3 Multi-Tenant jQuery Scan Tool (`scantool`)
Before deploying legacy H5 v1.x scripts to Multi-Tenant CloudSuite (H5 v2.0+ IDS Web Components), run the Infor H5 Script Scan Tool (`scantool` web app, port `8008`) against your `.ts`/`.js` files to detect brittle jQuery selectors or deprecated Soho DOM assumptions.
