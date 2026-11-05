/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 25/06/2025
 * Summary     : Automatically launches PMS100 with pre-filled manufacturing order data for each selected line on PMS100/B and refreshes the list view after execution.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 25/06/2025 | Initial script creation
 * NimeshaPa    | 24/09/2025 | Calls PMS100MI.UpdMO for each selected line on PMS100/B
 */

class pms100Js {
    private controller: IInstanceController;
    private elem: any;
    private args: string;
    private log: IScriptLog;
    private list: IActiveGrid;
    private miService;
    private CONO = "";
    private FACI = "";

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args; // Shortcut argument → will go into RORN
        this.log = scriptArgs.log;

        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new pms100Js(scriptArgs).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("PMS100B_AutoLaunchTask script initialized version 2.1");

        const panelHeader = this.controller.GetPanelName();
        if (panelHeader === "PMA100BC") {
            this.list = this.controller.GetGrid();
            const selectedRows = this.list.getSelectedGridRows();

            if (!selectedRows || selectedRows.length === 0) {
                this.controller.ShowMessage("Please select an order.");
                return;
            }

            this.CONO = ScriptUtil.GetUserContext().CurrentCompany;
            this.FACI = ScriptUtil.GetFieldValue("W1OBKV");

            for (const selected of selectedRows) {
            const data = selected.data;
            const MFNO = data["VHMFNO"];
            const PRNO = data["VHPRNO"];
            const RORN = this.args;

            this.log.Info(`Calling PMS100MI.UpdMO for PRNO: ${PRNO}, MFNO: ${MFNO}, FACI: ${this.FACI}, RORN: ${RORN}`);

            this.updateMO(PRNO, MFNO, RORN);
            }
        }
    }

    private updateMO(PRNO: string, MFNO: string, RORN: string): void {
            const request = new MIRequest();
            request.program = "PMS100MI";
            request.transaction = "UpdMO";
            request.record = {
            FACI: this.FACI,
            PRNO: PRNO,
            MFNO: MFNO,
            RORN: RORN
            };
            // request.outputFields = ["PRNO", "MFNO"];

             // Send the request and handle the response
            this.miService.executeRequestV2(request).then((response: IMIResponse) => {
                this.handleResponse(response);  // Process response if successful
                console.log("MI Response: ", response);
            }).catch((response: IMIResponse) => {
                console.log("MI call failed: " + response.errorMessage);  // Handle errors
                this.showFailureMessage(response);
            });  
        }

        private handleResponse(response: IMIResponse): void {
            if (response.hasError()) {
            this.log.Error("MI error: " + response.errorMessage);
            this.showFailureMessage(response);
            } else {
            this.log.Info(`Successfully updated MO`);
            this.controller.PressKey("F5");
            this.showSuccessMessage();
            }
        }

        private showSuccessMessage(): void {
            this.controller.ShowMessage(`Manufacturing Order updated successfully`);
        }

        private showFailureMessage(response: IMIResponse): void {
            this.controller.ShowMessage(`Manufacturing Order update failed`+ "-"+""+response.errorMessage);
        }
}


 