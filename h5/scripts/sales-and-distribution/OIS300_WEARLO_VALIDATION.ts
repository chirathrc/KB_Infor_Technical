/**
 * Author      : Rahul Killedar
 * Created on  : 2025-07-09
 * Modified on : 2025-10-15
 * Summary     : This script validates the 'BLRO' (Backlog Amount) field on the OIS300/B panel.
 *               If any selected row contains a negative BLRO value, the script cancels the execution 
 *               of list option 43 and displays a localized warning message to the user in Vietnamese.
 * 
 * Version Log :
 * Changed By           | Date       | Summary of the change
 * ---------------------|------------|-----------------------------
 * Rahul Killedar       | 2025-07-09 | Initial script creation
 * Nethum Ariyarathna   | 2025-10-15 | Fixed panel check, adjusted column search to "BLRO", corrected BLRO access to OABLRO
 */
class OIS300_WEARLO_VALIDATION {
    private controller: IInstanceController;
    private log: IScriptLog;
    private grid: IActiveGrid;
    private readonly errorMessage: string = "Giá trị của đơn hàng đã bị âm, hãy kiểm tra đơn hàng để in hóa đơn.";
    private detachRequesting: Function;
    private flag = false;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new OIS300_WEARLO_VALIDATION(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("OIS300_WEARLO_VALIDATION script initializing...4");

        const panelName = this.controller.GetPanelName();
        const viewName = this.controller.GetView();
        console.log("Panel Name: " + panelName + ", View: " + viewName);

        // Check for OIA300BC with VN-VIEW1
        if (panelName !== "OIA300BC" || viewName !== "VN-VIEW1") {
            this.log.Info(`Script applies only to OIA300BC with VN-VIEW1. Current: ${panelName}, ${viewName}`);
            return;
        }

        this.grid = this.controller.GetGrid();
        this.log.Info("Event handler registered.");
        this.attachEvents();
    }

    private attachEvents(): void {
        this.detachRequesting = this.controller.Requesting.On((e: CancelRequestEventArgs) => this.onRequesting(e));
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        if (args.commandType === "LSTOPT" && args.commandValue === "43") {
            const selectedRows = this.grid.getSelectedGridRows() || [];

            if (selectedRows.length === 0) {
                this.log.Info("No rows selected.");
                return;
            }

            let blroColumnIndex = -1;
            const columns = this.grid.getColumns();
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].name === "BLRO") { // Match column name "BLRO"
                    blroColumnIndex = i;
                    break;
                }
            }
            if (blroColumnIndex < 0) {
                this.log.Info("BLRO column not found in column definitions.");
                return;
            }

            for (const row of selectedRows) {
                const blroValue = this.getRowValue(row.data, "OABLRO"); // Use OABLRO from data
                console.log(`Row BLRO: ${blroValue}`);

                if (blroValue) {
                    const numericValue = parseFloat(blroValue.replace(",", "").replace("-", "")); // Remove commas and minus sign
                    if (blroValue.indexOf("-") !== -1 && numericValue > 0) { // Check for negative
                        args.cancel = true;
                        this.controller.ShowMessage(this.errorMessage);
                        this.log.Info("List option 43 cancelled due to negative BLRO value.");
                        return;
                    }
                }
            }

            this.log.Info("All selected BLRO values passed validation.");
        }
    }

    private getRowValue(row: any, fieldName: string): string {
        return row[fieldName] || "";
    }

    private detachEvents(): void {
        if (this.detachRequesting) {
            this.detachRequesting();
        }
    }
}