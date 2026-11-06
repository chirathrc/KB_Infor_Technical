/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 03/10/2025
 * Summary     : Auto-fills the Approver Code (WEAPCD) on APS100/E by reading CSYPAR00 parameter via MDBREADMI.GetCSYPAR00.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------------
 * NimeshaPa    | 03/10/2025 | Initial script uplift to H5
 */

class APS100_R_D {
    private controller: IInstanceController;
    private elem: any;
    private args: string;
    private log: IScriptLog;
    private miService;
    private content: any;
    private CONO1: string;
    private DIVI1: string;
    private DIVI2: string;
    private DIVI3: string;
    private APP: any;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;

        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new APS100_R_D(scriptArgs).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("APS100_Approver script initialized");

        const panelHeader = this.controller.GetPanelName();
        console.log(panelHeader);
        if ((panelHeader === "APA100EC")) {
            this.content = this.controller.GetContentElement();

            this.CONO1 = ScriptUtil.GetUserContext().CurrentCompany;
            this.DIVI2 = ScriptUtil.GetUserContext().CurrentDivision;
            this.DIVI3 = ScriptUtil.GetFieldValue("WADIVI"); // From screen

            if (!this.DIVI2 || this.DIVI2 === "") {
                this.DIVI1 = this.DIVI3;
            } else {
                this.DIVI1 = this.DIVI2;
            }

            console.log(ScriptUtil.GetFieldValue("WEAPCD"));

            if (!ScriptUtil.GetFieldValue("WEAPCD")) {
                this.loadAdditionalData();
            }
        }
    }

    private loadAdditionalData(): void {
        try {
            const request = new MIRequest();
            request.program = "MDBREADMI";
            request.transaction = "GetCSYPAR00";
            request.record = {
                DIVI: this.DIVI1,
                STCO: "APS905"
            };
            request.outputFields = ["PARM"];

            this.log.Info(`Calling MDBREADMI.GetCSYPAR00 with DIVI=${this.DIVI1}, STCO=APS905`);

            this.miService.executeRequestV2(request).then((response: IMIResponse) => {
                // this.handleResponse(response);
                setTimeout(() => {
                    this.handleResponse(response);
                }, 500);
                console.log("MI Response: ", response);
            }).catch((response: IMIResponse) => {
                console.log("MI call failed: " + response.errorMessage);
                this.showFailureMessage(response);
            });
        } catch (ex) {
            this.log.Error("Error in loadAdditionalData: " + ex);
        }
    }

    private handleResponse(response: IMIResponse): void {
        if (response.hasError()) {
            this.log.Error("MI error: " + response.errorMessage);
            this.showFailureMessage(response);
        } else {
            const bkno: string = response.items[0]?.PARM;
            if (bkno) {
                this.log.Info("PARM value: " + bkno);
                const bkno1 = this.trim(bkno.substring(9, 19)); // extract 10 chars from position 9
                this.log.Info("Extracted Approver Code: " + bkno1);

                // this.APP = ScriptUtil.SetFieldValue("WEAPCD", bkno1, this.controller);
                // if (this.APP) {
                //     this.APP.value = bkno1;
                //     this.showSuccessMessage(bkno1);
                // } else {
                //     this.controller.ShowMessage("Approver Code field (WEAPCD) not found.");
                // }
                ScriptUtil.SetFieldValue("WEAPCD", bkno1, this.controller);
                this.showSuccessMessage(bkno1);

            } else {
                this.controller.ShowMessage("No PARM value returned from MI.");
            }
        }
    }

    private trim(stringToTrim: string): string {
        return stringToTrim.replace(/^\s+|\s+$/g, "");
    }

    private showSuccessMessage(value: string): void {
        this.controller.ShowMessage(`Approver Code set to ${value}`);
    }

    private showFailureMessage(response: IMIResponse): void {
        this.controller.ShowMessage(`Failed to fetch Approver Code - ${response.errorMessage}`);
    }
}

