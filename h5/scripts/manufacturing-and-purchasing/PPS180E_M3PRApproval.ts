/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-08-07
 * Summary     : Adds Submit and Unapprove buttons on PPS180/E panel to manage purchase requisition approval status.
 *               Calls CUSEXTMI API to check and update approval status, disables specific fields based on conditions,
 *               and displays language-specific messages.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-08-07 | Initial script creation
 */

class PPS180E_M3PRApproval {
    private controller: IInstanceController;
    private log: IScriptLog;
    private contentElement: IContentElement;
    private miService: any;
    private submitButton: JQuery | null = null;
    private unapprButton: JQuery | null = null;
    private LANG: string = "";
    private AL30: string = "";
    private CUSEXTMI_result: boolean = false;
    private Status: string = "";

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.contentElement = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new PPS180E_M3PRApproval(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing.");
        this.log.Info(`Current Division: ${ScriptUtil.GetUserContext().CurrentDivision}`);
const header = this.controller.GetPanelName(); // <- call the method
    console.log(`GetPanelName: ${header}`);

        const panelName = this.controller.GetPanelName();
        if (header === "PPA180E0") {
            this.LANG = ScriptUtil.GetUserContext().CurrentLanguage;
            this.Status = ScriptUtil.GetFieldValue("WEIRCV") || "";

            console.log("a");
            // Disable WEIRCV and WEPTXT fields
            $("#WEIRCV").prop("readonly", true).prop("disabled", true);
            $("#WEPTXT").prop("readonly", true).prop("disabled", true);
            $("#btnLookup_WEIRCV").css({ "pointer-events": "none", "opacity": "0.5" });
            $("#btnLookup_WEPTXT").css({ "pointer-events": "none", "opacity": "0.5" });

            this.CUSEXTMI_result = false;
            if (this.controller.GetMode() === "2") {

                if (!this.AL30 && (this.Status === "APPROVED" || this.Status === "PROCESSING")) {
                    this.enableFields(false);
                } else if (this.AL30) {
                    this.enableFields(false);
                }
            }

            this.callAPI_CUSEXTMI();
        } else {
            this.log.Info(`Not on PPS180/E panel, current: ${panelName}`);
        }
    }

    private callAPI_CUSEXTMI(): void {
        try {
            this.AL30 = "";
            const request = new MIRequest();
            request.program = "CUSEXTMI";
            request.transaction = "GetAlphaKPI";
            request.record = {
                KPID: "MPOPLP",
                PK01: ScriptUtil.GetFieldValue("POWHLO") || "",
                PK02: ScriptUtil.GetFieldValue("WWPLPN") || ""
            };
            request.outputFields = ["AL30"];

            this.miService.executeRequestV2(request).then((response: IMIResponse) => {
                this.onResponseCallAPI_CUSEXTMI(response);
            }).catch((err: IMIResponse) => {
                this.log.Error(`MI Error: ${err.errorMessage}`);
                this.CUSEXTMI_result = false;
                this.addButtons();
            });
        } catch (ex) {
            this.log.Error(`Exception in callAPI_CUSEXTMI: ${ex}`);
        }
    }

    private onResponseCallAPI_CUSEXTMI(response: IMIResponse): void {
        if (response.hasError()) {
            this.log.Error(`MIAccess error43: ${response.errorMessage}`);
            this.CUSEXTMI_result = false;
        } else {
            this.CUSEXTMI_result = true;
            this.AL30 = response.item?.AL30 || "";
            this.log.Info(`AL30 is ${this.AL30}`);
        }

        if (this.controller.GetMode() === "5") {
            this.addButtons();
        }
    }

    private addButtons(): void {
        console.log("AL30: " + this.AL30);
        if (this.AL30 === "") {
            if (this.Status === "APPROVED") {
                const buttonText = this.LANG === "CS" ? "未经批准的采购申请" : "Unapprove PR";
                const btnElem = this.createButtonElement("btnUnapprovePR", buttonText, 3, 55, 15);
                this.unapprButton = this.contentElement.AddElement(btnElem);
                this.unapprButton.on("click", (e) => this.unapprButtonOnClick(e));
            } else {
                const buttonText = this.LANG === "CS" ? "提交审批" : "Submit for Approval";
                const btnElem = this.createButtonElement("btnSubmitPR", buttonText, 4, 55, 15);
                this.submitButton = this.contentElement.AddElement(btnElem);
                if (this.Status === "PROCESSING") {
                    this.submitButton.prop("disabled", true); // Disable button for PROCESSING status
                    this.submitButton.css({ "opacity": "0.5" }); // Visual indication of disabled state
                } else {
                    this.submitButton.on("click", (e) => this.submitButtonOnClick(e));
                }
            }
        }
    }

  private submitButtonOnClick(e: JQueryEventObject): void {
        this.callAPI(true);
        this.controller.PressKey("F5");
    }

    private unapprButtonOnClick(e: JQueryEventObject): void {
        this.callAPI(false);
        this.controller.PressKey("F5");
    }

    private callAPI(approveButton: boolean): void {
        try {
            const request = new MIRequest();
            request.program = "CUSEXTMI";
            request.transaction = "AddAlphaKPI";
            request.record = {
                KPID: "MPOPLP",
                PK01: ScriptUtil.GetFieldValue("POWHLO") || "",
                PK02: ScriptUtil.GetFieldValue("WWPLPN") || "",
                //AL30: Set to "APPROVAL" or "UNAPPROVE" based on the approveButton parameter.
                AL30: approveButton ? "APPROVAL" : "UNAPPROVE",
                AL31: ScriptUtil.GetUserContext("USID"),
            };

            this.miService.executeRequestV2(request).then((response: IMIResponse) => {
                this.onResponseCallAPI(response);
            }).catch((err: IMIResponse) => {
                this.log.Error(`MI Error: ${err.errorMessage}`);
                const message = this.LANG !== "CS" ?
                    `ProcessFlow Status: Not Successful. Please contact Admin. Error: ${err.errorMessage}` :
                    `工序流程状态: 不成功.请联系管理员.错误: ${err.errorMessage}`;
                this.controller.ShowMessage(message);
            });
        } catch (ex) {
            this.log.Error(`Exception in callAPI: ${ex}`);
        }
    }

    private onResponseCallAPI(response: IMIResponse): void {
        const message = this.LANG !== "CS" ?
            response.hasError() ?
                `ProcessFlow Status: Not Successful. Please contact Admin. Error: ${response.errorMessage}` :
                "ProcessFlow Status: ProcessFlow Started Successfully" :
            response.hasError() ?
                `工序流程状态: 不成功.请联系管理员.错误: ${response.errorMessage}` :
                "工序流程状态: 工序流程启动";
        this.controller.ShowMessage(message);
    }

    private createButtonElement(btnName: string, btnValue: string, btnRow: number, btnCol: number, btnWidth: number): ButtonElement {
        const btnElem = new ButtonElement();
        btnElem.Name = btnName;
        btnElem.Value = btnValue;
        btnElem.Position = new PositionElement();
        btnElem.Position.Top = btnRow;
        btnElem.Position.Left = btnCol;
        btnElem.Position.Width = btnWidth;

        return btnElem;
    }

    private enableFields(enable: boolean): void {
        const fields = [
            "WERORL", "WERORC", "WEPURC", "WESUNO", "WEBUYE", "WEACRF",
            "WEPPQT", "WEPUUN", "WEPUPR", "WEODI1", "WEODI2", "WEODI3",
            "WECOCE", "WEDLDT", "WETEOR", "WESITE", "WEPITD", "WEPITT"
        ];
        fields.forEach(field => {
            $(`#${field}`).prop("readonly", !enable).prop("disabled", !enable);
            $(`#btnLookup_${field}`).css({ "pointer-events": enable ? "auto" : "none", "opacity": enable ? "1" : "0.5" });
        });
    }
}