# Infor M3 H5 Scripting Standards & Development Conventions

This document establishes the official development standards, naming conventions, metadata requirements, and coding guidelines for Infor M3 H5 TypeScript scripts.

---

## 1. File & Class Naming Conventions

- **Preserve Existing Script Names**: Script file names and class names must be maintained without unauthorized changes, as renaming breaks Infor M3 personalization and script attachment references.
- **File Extensions**: All source scripts must be written in TypeScript (`.ts`) and use the typing definitions (`.d.ts`).
- **Naming Pattern**:
  - Module/Program-Specific Scripts: `<Program><Panel>_<Functionality>.ts` (e.g. `MMS100E_Apply_UserRole_Validation.ts`, `OIS300_OAOBLC_VALIDATION.ts`)
  - Shared / Generic Utilities: `<DescriptivePascalCaseName>.ts` (e.g. `EntryModeSetter.ts`, `TestIssue.ts`)
  - Official Infor Samples: `H5Sample<FeatureName>.ts` (e.g. `H5SampleMIService.ts`, `H5SampleCustomDialog.ts`)

---

## 2. Standardized Developer Header Block

Every script file **must** begin with a standardized JSDoc comment header. This ensures traceability, version tracking, and enables automated knowledge base indexing.

### Header Template
```typescript
/**
 * Author      : [Full Name] ([Organization / Team])
 * Created on  : [YYYY-MM-DD]
 * Summary     : [Brief description of the script's functional purpose and behavior]
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * [Name]      | YYYY-MM-DD | [Description of change]
 * [Name]      | YYYY-MM-DD | [Another change if applicable]
 */
```

### Concrete Example
```typescript
/**
 * Author      : John Doe (Fortude)
 * Created on  : 2025-06-20
 * Summary     : Applies role validation logic on MMS100/E before allowing changes.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * John Doe    | 2025-06-20 | Initial script creation
 * Jane Smith  | 2025-06-25 | Added validation for new role types
 */
```

---

## 3. TypeScript Coding Standards

### Identifier Conventions
| Element | Convention | Example | Notes |
| :--- | :--- | :--- | :--- |
| **Variables** | `camelCase` | `customerCode`, `orderList` | Descriptive names; avoid single-letter variables except loop counters. |
| **Functions / Methods** | `camelCase` | `getItemDetails()`, `validateOrder()` | Verbs or verb phrases describing the action. |
| **Constants** | `UPPER_SNAKE_CASE` | `DEFAULT_LANGUAGE`, `MAX_RETRIES` | True immutable constants. |
| **Classes** | `PascalCase` | `OrderService`, `CustomerValidator` | Must match the class name expected by Infor H5 runtime. |
| **Interfaces** | Prefix with `I` | `ICustomer`, `IOrderLine`, `IScriptArgs` | Standard TypeScript practice. |
| **Enums** | `PascalCase` | `StatusType`, `OrderState` | Group related sets of constants. |
| **Type Files** | `.ts` or `.d.ts` | `h5.script.d.ts` | Global definitions and SDK contracts. |

### Comments & Documentation
- **JSDoc Blocks (`/** ... */`)**: Mandatory for all exported classes, methods, and interface contracts.
- **Inline Comments (`// ...`)**: Keep concise and focused on *why* a specific business rule or workaround is implemented, not *what* the syntax does.

### Modular Architecture & File Structure
- Keep scripts focused on a single responsibility.
- Place reusable domain services and data mapping logic in isolated helper methods or shared services.
- Never hardcode environment URLs or tenant identifiers; leverage `args.controller` or `ScriptUtil` context helpers.

---

## 4. Infor H5 Script Lifecycle & Best Practices

### The Script Entry Point
Every H5 script class implements a static `Init` method that receives `IScriptArgs`:
```typescript
export class MyCustomScript {
    public static Init(args: IScriptArgs): void {
        const controller = args.controller;
        const log = args.log;

        // Perform validation or attach event listeners
        controller.RequestExecuting.Register((s, e) => {
            MyCustomScript.OnRequestExecuting(controller, e);
        });
    }

    private static OnRequestExecuting(controller: IInstanceController, e: CancelRequestEventArgs): void {
        // Validation logic
        if (shouldCancel) {
            e.Cancel = true;
            controller.ShowMessage("Validation failed.");
        }
    }
}
```

### Event Handling & Resource Cleanup
- Use `RequestExecuting` to intercept user submits, validate inputs, or cancel actions with `e.Cancel = true`.
- Use `RequestCompleted` to execute logic after M3 server responses arrive (e.g. updating custom UI elements or checking returned values).
- Always clean up dynamically added DOM controls or event handlers when the panel unloads using `args.controller.GetContent().OnUnload(...)`.

### M3 API Invocations (`MIService`)
- Always execute M3 MI transactions asynchronously using `MIService.Current.Execute(...)` or `MIService.Current.ExecuteRequest(...)`.
- Always handle errors gracefully with rejection handlers and display user-friendly messages via `controller.ShowMessage(...)` or `ConfirmDialog`.
