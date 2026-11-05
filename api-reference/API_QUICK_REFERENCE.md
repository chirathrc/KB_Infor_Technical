# Infor M3 H5 Scripting API Reference

This document provides a concise, high-density reference for the Infor M3 H5 Scripting Engine API (`h5.script.d.ts`). AI agents and developers should consult this reference when implementing or reviewing H5 TypeScript scripts.

---

## 1. Core Interfaces & Script Entry Point

### `IScriptArgs`
Passed by the H5 runtime into the static `Init(args: IScriptArgs)` method of the script class.

| Property | Type | Description |
| :--- | :--- | :--- |
| `controller` | `IInstanceController` | The primary controller managing the active M3 interactive panel/program. |
| `elem` | `JQuery` | jQuery object referencing the UI element to which the script is attached (if applicable). |
| `log` | `IScriptLog` | Standard logging interface for debug and error reporting. |
| `command` | `string` | The command parameter passed from the script definition. |
| `commandValue` | `string` | Optional command value parameter. |

### `IScriptLog`
Provides logging methods visible in the H5 Developer Console:
- `log.Debug(message: string): void`
- `log.Info(message: string): void`
- `log.Warn(message: string): void`
- `log.Error(message: string): void`

---

## 2. `IInstanceController` Interface

The central gateway for interacting with M3 panels, controls, and lifecycle events.

### Field & Panel Access
- `GetValue(name: string): string`: Retrieves the value of a field on the current panel by field name (e.g. `OAORNO`, `IBCUNO`).
- `SetValue(name: string, value: string): void`: Sets the value of an existing panel field.
- `GetGrid(): IActiveGrid`: Retrieves the active data grid (for list/browse panels such as B panels).
- `GetContent(): IContentElement`: Returns the content body container used to add dynamic custom UI elements.
- `GetElement(name: string): JQuery`: Retrieves a jQuery reference to an element by name.
- `GetParent(): IInstanceController`: Accesses parent controller in multi-panel or composite flows.
- `GetSession(): any`: Accesses user session state and profile.

### Actions & Commands
- `PressKey(key: string): void`: Simulates a keyboard action (e.g. `"ENTER"`, `"F3"`, `"F12"`).
- `ShowMessage(message: string): void`: Displays an alert/info banner in the M3 H5 interface.
- `ShowFieldHelp(fieldName: string): void`: Triggers field-level F1 help display.

### Event Subscriptions
- `RequestExecuting`: `IInstanceEvent<CancelRequestEventArgs>`
  - Fired when a user initiates a panel transition or action (Enter, F-keys, Options, Related).
  - Set `e.Cancel = true` to stop the request from submitting to M3 BE.
- `RequestCompleted`: `IInstanceEvent<RequestEventArgs>`
  - Fired after M3 backend processes the request and the response is rendered.

---

## 3. M3 Backend Integration (`MIService` & `MIRequest`)

Used to invoke M3 MI transactions asynchronously from client-side scripts.

### Basic Pattern
```typescript
import { MIService, MIRequest, IMIResponse } from "./typings/h5.script";

const request = new MIRequest();
request.program = "MMS200MI";
request.transaction = "GetItmBasic";
request.record = {
    CONO: "100",
    ITNO: "ITEM001"
};
request.outputFields = ["ITNO", "ITDS", "FUDS", "STAT"];

MIService.Current.ExecuteRequest(request).then((response: IMIResponse) => {
    if (response.items && response.items.length > 0) {
        const item = response.items[0];
        console.log("Item Description:", item.ITDS);
    }
}).catch((error) => {
    controller.ShowMessage("Failed to retrieve item details: " + error);
});
```

---

## 4. Dialogs & UI Elements

### `ConfirmDialog`
Modal dialog for confirmation prompts:
```typescript
ConfirmDialog.Show({
    header: "Confirm Action",
    message: "Are you sure you want to proceed with this update?",
    dialogType: "YesNo",
    closed: (e: IConfirmDialogCloseArgs) => {
        if (e.button === "Yes") {
            // User confirmed
        }
    }
});
```

### Dynamic UI Elements (`IContentElement`)
Custom UI components can be placed directly on the M3 panel:
- `ButtonElement`: Adds a custom action button.
- `TextBoxElement`: Adds an interactive input box.
- `CheckBoxElement`: Adds a toggle checkbox.
- `ComboBoxElement`: Adds a dropdown selection.
- `LabelElement`: Adds text or status labels.

```typescript
const content = controller.GetContent();
const button = new ButtonElement();
button.Name = "customActionBtn";
button.Value = "Check Balance";
button.Position = new PositionElement();
button.Position.Top = 100;
button.Position.Left = 300;
button.Position.Width = 120;
button.Position.Height = 24;

content.Add(button);
```

---

## 5. MForms Automation (`MFormsAutomation`)

Executes automated MForms navigation bookmarks to launch secondary programs or drillbacks:
```typescript
const uri = "mforms://bookmark?program=OIS300&panel=B&tableName=OOHEAD&keys=ORNO,1234567";
MFormsAutomation.Current.ExecuteBookmark(uri);
```
