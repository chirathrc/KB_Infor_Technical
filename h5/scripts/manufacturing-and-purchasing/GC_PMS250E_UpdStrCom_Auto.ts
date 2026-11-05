/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-08-13
 * Summary     : Clears specific fields on PMS250/E panel to ensure only the 'shop traveler' document is printed.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-08-13 | Initial script creation
 */

class GC_PMS250E_UpdStrCom_Auto {
    private controller: IInstanceController;
    private log: IScriptLog;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new GC_PMS250E_UpdStrCom_Auto(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing 1.");

        const header = this.controller.GetPanelName(); // <- call the method
    //console.log(`GetPanelName: ${header}`);

        const panelName = this.controller.GetPanelName();
        if (header === "PMA250E0") {
            try {
               // this.log.Info("Clearing fields on PMS250/E panel.");
                this.clearFields();
            } catch (ex) {
                //this.log.Error(`Error clearing fields: ${ex}`);
            }
        } else {
           // this.log.Info(`Not on PMS250/E panel,, current: ${panelName}`);
        }

        // Clean up event handler on panel unload
        this.controller.Requested.On((sender, e) => this.onRequested(sender, e));
    }

    private clearFields(): void {
        const fields = [
            "WANUC1", // Number of Put-away Cards
            "WANUC2", // Number of Material Requisitions
            "WANUC3", // Number of Labor Tickets
            "WANUC5", // Number of Routing Cards
            "WANUC7"  // Number of Design Documents
        ];

        for (const field of fields) {
            try {
                ScriptUtil.SetFieldValue(field, "");
               // this.log.Info(`Cleared field ${field}`);
            } catch (ex) {
              //  this.log.Error(`Failed to clear field ${field}: ${ex}`);
            }
        }
    }

    private onRequested(sender: any, e: RequestEventArgs): void {
        //this.log.Info("Script unloaded");
        this.controller.Requested.Off(this.onRequested);
    }
}