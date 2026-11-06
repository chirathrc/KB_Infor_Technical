# Infor M3 H5 Scripting API Quick Reference (SDK 10.4.1 / v2.0+)

Concise, exact reference for the Infor M3 H5 Scripting Engine ambient TypeScript declarations ([`h5.script.d.ts`](h5.script.d.ts)).

> **Important**: `h5.script.d.ts` declares **ambient globals**. Never write `import { ... } from "./typings/h5.script"` or `export class ...` in an H5 script — doing so emits CommonJS `exports`/`require` calls that fail in the browser runtime.

---

## 1. Entry Point, Arguments & Logging

### Script Entry Point
Every H5 script defines a top-level class matching the filename (without `.ts`/`.js`) with a `public static Init(args: IScriptArgs): void` method:

```typescript
class OIS300_Sample {
    public static Init(args: IScriptArgs): void {
        new OIS300_Sample(args).run();
    }
    constructor(private scriptArgs: IScriptArgs) {}
    private run(): void {}
}
```

### `IScriptArgs`
| Property | Type | Description |
| :--- | :--- | :--- |
| `controller` | `IInstanceController` | Controller managing the active M3 program/panel instance. |
| `elem` | `any` | Target UI element if attached to a specific control, otherwise `null`. |
| `args` | `string` | Optional argument string configured in H5 Personalization / Shortcut. |
| `log` | `IScriptLog` | Browser console logger (`Error`, `Warning`, `Info`, `Debug`, `Trace`). |
| `debug` | `IScriptDebugConsole` | *Deprecated* — use `log` instead. |

### `IScriptLog`
- `log.Info(message: string, ex?: Error): void`
- `log.Debug(message: string, ex?: Error): void`
- `log.Warning(message: string, ex?: Error): void`
- `log.Error(message: string, ex?: Error): void`
- `log.Trace(message: string, ex?: Error): void`
- `log.SetDebug(): void` / `log.SetTrace(): void` / `log.SetDefault(): void`

---

## 2. `IInstanceController`

Central interface for panel state, field values, navigation commands, and lifecycle hooks.

### Panel & Field Inspection
| Method | Return Type | Description |
| :--- | :--- | :--- |
| `GetProgramName()` | `string` | Active M3 program code (e.g. `"APS100"`, `"OIS300"`). |
| `GetPanelName()` | `string` | Full internal panel name (e.g. `"APA100F0"`, `"OIA300BC"`). |
| `GetMode()` | `string` | Panel interaction mode (`"1"` Create, `"2"` Change, `"3"` Copy, `"4"` Delete, `"5"` Display). |
| `GetSortingOrder()` | `string` | Current list sorting order (e.g. `"1"`, `"2"`). |
| `GetView()` | `string` | Current M3 view code (e.g. `"STD01-01"`). |
| `GetInstanceId()` | `string` | Unique runtime ID for the program instance. |
| `GetValue(name)` | `any` | Gets value of a panel field (prefer `ScriptUtil.GetFieldValue(name, controller)` across versions). |
| `SetValue(name, val)` | `void` | Sets value of a panel field (prefer `ScriptUtil.SetFieldValue(name, val, controller)`). |
| `GetContentElement()` | `IContentElement` | Returns the panel's grid-positioned content container for adding custom UI elements. |
| `GetContent()` | `JQuery` | Returns jQuery wrapper of the panel content DOM. |
| `GetElement(name)` | `any` | Retrieves a panel element by field/control name. |
| `GetGrid()` | `IActiveGrid` | Returns the active list datagrid (`B` panels and sublists). |
| `Response` | `IResponseElement` | Access `Response.ControlData` (v2.0+) and `Response.RawContent` (raw M3 XML/JSON payload). |

### Commands, Feedback & Busy Indicator
| Method | Version | Description |
| :--- | :--- | :--- |
| `PressKey(key)` | All | Sends function/action key (`"ENTER"`, `"F3"`, `"F5"`, `"F12"`, `"PAGEUP"`, `"PAGEDOWN"`). |
| `ListOption(option)` | All | Executes a list option on selected row(s) (`"2"` Change, `"4"` Delete, `"5"` Display, etc.). |
| `PageDown()` | All | Loads the next page of grid rows. |
| `ShowMessage(message)` | All | Displays a standard M3 dialog/banner message. |
| `ShowMessageInStatusBar(msg)` | All | Shows a non-blocking status bar message. |
| `OpenFieldHelp(id)` | v2.0+ | Opens F1/F4 field help for the given field ID. |
| `ShowBusyIndicator()` | v2.0+ | Displays the H5 loading spinner (`returns boolean`). Always pair with `HideBusyIndicator()`. |
| `HideBusyIndicator()` | v2.0+ | Hides the H5 loading spinner (`returns boolean`). |
| `ExportToExcel()` | v2.0+ | Triggers native grid export to Excel. |
| `ExportToGoogleSheets()` | v2.0+ | Triggers native grid export to Google Sheets. |

### Lifecycle Events (`IInstanceEvent`)
Subscribe via `.On(handler)` which returns an unsubscribe `Function`:

```typescript
const unsubscribeRequesting = controller.Requesting.On((e: CancelRequestEventArgs) => {
    // Synchronous pre-request hook!
    // e.commandType: "KEY" | "LSTOPT" | "PAGE" | ...
    // e.commandValue: "ENTER" | "F12" | "2" | "DOWN" | ...
    if (e.commandType === "KEY" && e.commandValue === "F12") return; // Always allow F12 Back
    if (shouldBlock) {
        e.cancel = true; // MUST be set synchronously inside Requesting!
    }
});

const unsubscribeRequested = controller.Requested.On((e: RequestEventArgs) => {
    // Fires when the request has been dispatched / panel is transitioning.
    // Safe place to clean up single-panel listeners:
    unsubscribeRequesting();
    unsubscribeRequested();
});

const unsubscribeCompleted = controller.RequestCompleted.On((e: RequestEventArgs) => {
    // Fires after M3 backend response finishes rendering (e.g. PAGE/DOWN scroll, F5 refresh, panel transition).
});
```

> **Critical Rule**: Do **not** unsubscribe `Requesting` inside `onRequesting` when setting `e.cancel = true` — if cancelled, the user stays on the current panel and subsequent clicks would bypass validation.

---

## 3. `ScriptUtil` & User Context

| Method / Property | Description |
| :--- | :--- |
| `ScriptUtil.version` | `number` — `>= 2.0` indicates Multi-Tenant / IDS Web Components runtime; `< 2.0` indicates legacy Soho runtime. |
| `ScriptUtil.GetUserContext()` | Returns full MNS150 user context object: `CurrentCompany` (`CONO`), `CurrentDivision` (`DIVI`), `CurrentLanguage` (`LANG`), `USID` / `User`, `DTFM` (`"DMY"`/`"MDY"`/`"YMD"`), `DCFM` (`"."` or `","` decimal separator), `DSEP` (date separator), `TX40` (full name), `Roles` (`string[]`), etc. |
| `ScriptUtil.GetUserContext(prop)` | Returns a single context property string (e.g. `ScriptUtil.GetUserContext("CONO")`, `"USID"`, `"DTFM"`, `"DCFM"`). |
| `ScriptUtil.GetFieldValue(name, controller?)` | Reads a panel field value reliably across H5 versions. |
| `ScriptUtil.SetFieldValue(name, value, controller?)` | Writes a value into an editable panel field. Convert decimal separators according to `DCFM` first! |
| `ScriptUtil.FindChild($parent, name)` | Finds a child jQuery element inside `controller.GetContent()`. |
| `ScriptUtil.Launch(encodedUri)` | Launches an `mforms://` bookmark, `MFormsAutomation` URI, or external URL. |
| `ScriptUtil.OpenMenu(name, controller?)` | Opens an H5 menu item. |
| `ScriptUtil.DoEnterpriseSearch(query, controller?)` | Executes an M3 Enterprise Search query. |
| `ScriptUtil.LoadScript(url, cb)` / `UnloadScript(url)` | Dynamically loads/unloads external JS assets. |

---

## 4. M3 MI API Calls (`MIService` & `MIRequest`)

Always resolve `MIService` cleanly across H5 v1.x and v2.0+:

```typescript
const miService: any = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;

const request = new MIRequest();
request.program = "MMS200MI";
request.transaction = "GetItmBasic";
request.record = { CONO: ScriptUtil.GetUserContext("CONO"), ITNO: "ITEM001" };
request.outputFields = ["ITNO", "ITDS", "ITTY", "STAT"];
request.maxReturnedRecords = 100; // Optional (default may cap at 100; increase up to 0/10000 for Lst* calls)

miService.executeRequestV2(request).then((response: IMIResponse) => {
    if (response.hasError() || (response as any).errorType === "ServerReturnedNOK" || response.errorMessage) {
        controller.ShowMessage(response.errorMessage || "MI call failed.");
        return;
    }
    const firstRecord = response.item || (response.items && response.items[0]);
    if (firstRecord) {
        log.Info("Item Description: " + firstRecord.ITDS);
    }
}).catch((err: any) => {
    log.Error("MI execution error: " + (err?.errorMessage || err));
});
```

### `IMIResponse` Properties
- `item?: any` — Single record object (convenience alias for first record).
- `items?: any[]` — Array of returned MI records.
- `hasError(): boolean` — True when M3 returned an error; **always** also check `errorMessage` and `(res as any).errorType === "ServerReturnedNOK"`.
- `errorMessage?: string`, `errorCode?: string`, `errorField?: string`, `errorType?: MIErrorType`.

---

## 5. ION API Calls (`IonApiService`)

Used in Multi-Tenant CloudSuite to call Infor OS / ION APIs, Compass Data Fabric, IDM, or IFS v2 user/role endpoints (e.g. checking IFS security roles as in `PPS300_VehicleNo_V2.ts` and `H5SampleIonApiService.ts`):

```typescript
const ionService = IonApiService.Current;
const req: IonApiRequest = {
    url: `${ionService.getBaseUrl()}/ifsservice/usermgt/v2/users/me`,
    method: "GET",
    cache: false,
    headers: { Accept: "application/json" }
};

ionService.execute(req).then((res: IonApiResponse) => {
    // res.status (200), res.data, res.statusText
    log.Info("ION response status: " + res.status);
}).catch((err: IonApiResponse) => {
    log.Error("ION API failed: " + err.message);
});
```

> **Note**: Legacy Mingle v1 endpoints were deprecated on October 30, 2024; always use `/ifsservice/.../v2/...` or current Infor OS ION API routes.

---

## 6. Grids & Lists (`IActiveGrid`, `ListControl`, `ListView`)

### Reading Selected Rows & Column Values
```typescript
// Recommended cross-version column value lookup for selected row(s):
const oblcValues: string[] = ListControl.ListView.GetValueByColumnName("OBLC", controller);

// Active grid instance:
const grid: IActiveGrid = controller.GetGrid();
const selectedRows: any[] = grid.getSelectedGridRows(); // In v2.0+, each item often wraps row fields in row.data
const allData: any[] = grid.getData();

// Subscribe to row selection changes:
grid.onSelectedRowsChanged.subscribe(() => {
    const count = grid.getSelectedGridRows().length;
});
```

### Adding or Hiding Grid Columns (`IActiveGrid`)
- `grid.hideColumns(["C1", "OBLC"])` (v2.0+): Hides columns by column ID/name.
- `grid.getColumns()` / `grid.setColumns(cols)`: Appends custom virtual columns (e.g. `id: "C999"`, `field: "C999"`, `name: "Prod Date"`). Re-populate cell values on initial load **and** inside `RequestCompleted` when `e.commandType === "PAGE" && e.commandValue === "DOWN"`.
- **IDS Web Component Helpers (v2.0+)**:
  - `grid.getPosFieldElement(posFieldId: string): HTMLElement`
  - `grid.getCellElement(row: number, columnId: string): HTMLElement`
  - `grid.getRowElement(row: number): HTMLElement`
- **`ListControl` Helpers**:
  - `ListControl.GetPositionFieldValue(colName, controller?)`: Reads filter/position header input above a grid (e.g. `W1ORNO`).
  - `ListControl.GetColumnIndexByName(colName, controller?)`: Resolves 0-based column index.
  - `ListControl.Headers(controller?)` / `ListControl.Columns(controller?)`

---

## 7. Dynamic UI Elements (`IContentElement`)

Always position controls in **M3 grid coordinates** (Row `Top` ~ 1–26, Column `Left` ~ 1–95) and attach via `controller.GetContentElement().AddElement(elem)` (not `.Add()`):

| Element Class | Key Properties | Notes |
| :--- | :--- | :--- |
| `ButtonElement` | `Name`, `Value`, `Position`, `IsEnabled` | Returns jQuery wrapper from `AddElement()`; bind clicks via `.click(() => ...)` or `.on("click", ...)`. |
| `LabelElement` | `Name`, `Value`, `Position`, `IsEmphasized`, `CssClass` | Static or dynamic text display. |
| `TextBoxElement` | `Name`, `Value`, `Position`, `IsEnabled`, `IsRightJustified`, `Constraint` | Single-line input or read-only calculated total display. |
| `TextAreaElement` | `Name`, `Value`, `Position`, `IsEnabled` | Multi-line text input (v2.0+). |
| `CheckBoxElement` | `Name`, `Value`, `Position`, `IsChecked` | Boolean toggle control. |
| `ComboBoxElement` | `Name`, `Items` (`ComboBoxItemElement[]`), `Position`, `IsEditable` | Dropdown selector. |
| `DatePickerElement` | `Name`, `Value`, `Position`, `DateFormat` | Native H5 date picker (v2.0+). |
| `RadioGroupElement` | `Name`, `Items` (`RadioButtonElement[]`), `Selected`, `Position` | Radio button group (v2.0+). |
| `ListElement` | `Name`, `Columns`, `Rows`, `SelectedRows`, `Position` | Custom embedded datagrid (`ListControl.RenderDataGrid`). |

```typescript
const content = controller.GetContentElement();
const btn = new ButtonElement();
btn.Name = "btnConfirmAll";
btn.Value = "Confirm All";
btn.Position = new PositionElement();
btn.Position.Top = 3;
btn.Position.Left = 65;
btn.Position.Width = 12;

const $btn = content.AddElement(btn);
$btn.click(() => { /* handle click */ });
```

---

## 8. Dialogs, Caching, Automation & Drillbacks

### `ConfirmDialog`
Never use browser `alert()` or `confirm()`. Use `ConfirmDialog`:

```typescript
// Informational / Warning / Error dialog:
ConfirmDialog.ShowMessageDialog({
    dialogType: "Error", // "Information" | "Warning" | "Error"
    header: "Validation Failed",
    message: "Order line cannot be modified while credit approval is pending."
});

// Yes / No confirmation dialog:
ConfirmDialog.Show({
    header: "Confirm Submission",
    message: "Submit Purchase Order for approval?",
    dialogType: "Question",
    closed: (res: IConfirmDialogCloseArgs) => {
        if (res.ok) {
            // User clicked OK / Yes
        }
    }
});
```

### `InstanceCache` & `SessionCache`
- **`InstanceCache`** (scoped to one `IInstanceController` program tab):
  `InstanceCache.Add(controller, key, val)`, `Get<T>(controller, key)`, `ContainsKey(controller, key)`, `Remove(controller, key)`.
- **`SessionCache`** (persists across programs for the browser session):
  `SessionCache.Add(key, val)`, `Get<T>(key)`, `ContainsKey(key)`, `Remove(key)`.

### `MFormsAutomation` & Bookmarks
```typescript
const auto = new MFormsAutomation();
auto.addStep(ActionType.Run, "PMS100");
auto.addStep(ActionType.Key, "ENTER");
auto.addField("W1FACI", "A01");
auto.addField("W1MFNO", "0001234567");
auto.addStep(ActionType.ListOption, "2");
ScriptUtil.Launch(auto.toEncodedUri());
```

### Infor Ming.le / OS Drillback
```typescript
infor.companyon.client.sendPrepareDrillbackMessage(drillbackLogicalIdAndParams);
```
