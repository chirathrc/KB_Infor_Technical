/**
 * Author      : ShaleenW (Fortude)
 * Created on  : 25/06/2025
 * Summary     : Retrieves the selected Planned MO from PMS170/B | and creates an automation that opens PMS170/E and fills in relevant fields.
 *               Place this H5script in PMS170/B panel
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * ShaleenW    | 25/06/2025 | Initial script creation
 * NimeshaPa   | 25/09/2025 | Updates RORN field for selected Planned MOs in PMS170/B using PMS170MI API call. 
 */

class pms170Js {
    private controller: IInstanceController;
    private log: IScriptLog;
    private args: string; // Shortcut argument → will go into RORN
    private list: IActiveGrid;
    private miService;
    private CONO = "";
    private FACI = "";

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;

        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new pms170Js(scriptArgs).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("pms170Js - API version initialized 1.0");

        const panelName = this.controller.GetPanelName();
        if (panelName !== "PMA170BC") {
            this.log.Info("Not the correct panel. Exiting.");
            return;
        }

        this.list = this.controller.GetGrid();
        const selectedRows = this.list.getSelectedGridRows();

        if (!selectedRows || selectedRows.length === 0) {
            this.controller.ShowMessage("Please select at least one Planned MO.");
            return;
        }

        this.CONO = ScriptUtil.GetUserContext().CurrentCompany;

        for (const selected of selectedRows) {
            const data = selected.data;
            const PLPN = data["ROPLPN"]; // Planned order no
            const RORN = this.args;

            if (!PLPN) {
                this.log.Error("PLPN missing, skipping row");
                continue;
            }

            this.log.Info(`Calling PMS170MI.UpdPlannedMO for PLPN: ${PLPN}, FACI: ${this.FACI}, RORN: ${RORN}`);
            this.updatePlannedMO(PLPN, RORN);
        }
    }

    private updatePlannedMO(PLPN: string, RORN: string): void {
        const request = new MIRequest();
        request.program = "PMS170MI";
        request.transaction = "Updat"; 
        request.record = {
            CONO: this.CONO,
            PLPN: PLPN,
            RORN: RORN
        };

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            this.handleResponse(response);
            console.log("MI Response: ", response);
        }).catch((response: IMIResponse) => {
            console.log("MI call failed: " + response.errorMessage);
            this.showFailureMessage(response);
        });
    }

    private handleResponse(response: IMIResponse): void {
        if (response.hasError()) {
            this.log.Error("MI error: " + response.errorMessage);
            this.showFailureMessage(response);
        } else {
            this.log.Info(`Successfully updated Planned MO`);
            this.controller.PressKey("F5");
            this.showSuccessMessage();
        }
    }

    private showSuccessMessage(): void {
        this.controller.ShowMessage(`Planned MO updated successfully`);
    }

    private showFailureMessage(response: IMIResponse): void {
        this.controller.ShowMessage(`Planned MO update failed`+ "-"+""+ response.errorMessage);
    }
}