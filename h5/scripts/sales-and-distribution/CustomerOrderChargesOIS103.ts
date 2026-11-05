/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2020-10-03
 * Summary     : H5 script for OIS103/E panel to calculate and display total accrued discount for a customer
 *               and restrict negative charge entries (WRCRAM) to be less than or equal to the accrued discount.
 *               Runs for Customer Orders with ORNO starting with 004, 0081, or 00649.
 *               Adds a non-editable field 'Chiết Khấu Còn Lại' (SUMACAM) to display the total accrued discount.
 *               Validates WRCRAM on ENTER, ROLLUP, ROLLDOWN to ensure it is negative and within accrued discount.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-10-03 | Initial script creation
 *                   | 2025-06-17 | Validation Update
 * 
 */
class CustomerOrderChargesOIS103 {
    private controller: IInstanceController;
    private log: IScriptLog;
    private content: IContentElement;
    private miService: any;
    private CONO: string = "";
    private DIVI: string = "";
    private CUNO: string = "";
    private ORNO: string = "";
    private totalAccruedDiscount: number = 0;
    private labelName: ILabelElement;
    private textBoxSUMACAM: ITextBoxElement;
    private labelsAdded: boolean = false;
    private apiCallsCompleted: number = 0;
    private totalApiCalls: number = 4;
    private detachRequesting: Function | null = null;
    private detachRequestCompleted: Function | null = null;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.CONO = ScriptUtil.GetUserContext().CurrentCompany;
        this.DIVI = ScriptUtil.GetUserContext().CurrentDivision;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new CustomerOrderChargesOIS103(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing for OIS103/E");
        const panelName = this.controller.GetPanelName();
        this.log.Info(`Panel name: ${panelName}`);
        this.log.Info(`CONO=${this.CONO}, DIVI=${this.DIVI}`);

        if (panelName !== "OIA103E0") {
            this.log.Info(`Panel ${panelName} not supported, skipping initialization`);
            return;
        }

        this.ORNO = (ScriptUtil.GetFieldValue("ZZORNO") || "").trim();
        this.CUNO = (ScriptUtil.GetFieldValue("OKCUNO") || "").trim();
        this.log.Info(`Order Number (ZZORNO): ${this.ORNO}, Customer (OKCUNO): ${this.CUNO}`);

        if (!this.ORNO || !this.CUNO) {
            this.log.Error("Missing required fields: ZZORNO or OKCUNO");
            return;
        }

        // if (!(this.ORNO.indexOf("004") === 0 || this.ORNO.indexOf("0081") === 0 || this.ORNO.indexOf("00649") === 0)) {
        //     this.log.Info(`Order ${this.ORNO} does not start with 004, 0081, or 00649, skipping`);
        //     return;
        // }

        if ((this.ORNO.startsWith("004") || this.ORNO.startsWith("0081") || this.ORNO.startsWith("00649"))) {
            this.log.Info(`Order ${this.ORNO} does start with 004, 0081, or 00649, skipping`);
            return;
        }

        if (this.checkPanelReady()) {
            this.addUIElements();
            this.loadAccruedDiscount();
            this.attachEvents();
        } else {
            this.log.Error("Panel not ready for element addition");
        }
    }

    private checkPanelReady(): boolean {
        try {
            const isReady = this.content && typeof this.content.AddElement === "function";
            this.log.Info(`Panel readiness check: ${isReady}`);
            return isReady;
        } catch (ex) {
            this.log.Error(`Error checking panel readiness: ${ex}`);
            return false;
        }
    }

    private addUIElements(): void {
        if (this.labelsAdded) {
            this.log.Info("UI elements already added, updating SUMACAM");
            this.updateSUMACAM();
            return;
        }
        try {
            this.labelName = new LabelElement();
            this.labelName.Name = "lblName";
            this.labelName.Value = "Chiết Khấu Còn Lại: ";
            this.labelName.Position = new PositionElement();
            this.labelName.Position.Top = 3;
            this.labelName.Position.Left = 47;
            this.labelName.Position.Width = 20;
            this.content.AddElement(this.labelName);

            this.textBoxSUMACAM = new TextBoxElement();
            this.textBoxSUMACAM.Name = "SUMACAM";
            this.textBoxSUMACAM.Value = "0.00";
            this.textBoxSUMACAM.Position = new PositionElement();
            this.textBoxSUMACAM.Position.Top = 3;
            this.textBoxSUMACAM.Position.Left = 59;
            this.textBoxSUMACAM.Position.Width = 30;
            this.textBoxSUMACAM.IsEnabled = false;
            this.content.AddElement(this.textBoxSUMACAM);

            this.labelsAdded = true;
            this.log.Info("Added UI elements: lblName and SUMACAM");
        } catch (ex) {
            this.log.Error(`Error adding UI elements: ${ex}`);
        }
    }

    private updateSUMACAM(): void {
        try {
            const value = isNaN(this.totalAccruedDiscount) ? "N/A" : this.totalAccruedDiscount.toFixed(2);
            if (this.textBoxSUMACAM) {
                this.textBoxSUMACAM.Value = value;
                this.log.Info(`SUMACAM updated to: ${value}`);
            } else {
                this.log.Error("SUMACAM textbox not found for update");
            }
        } catch (ex) {
            this.log.Error(`Error updating SUMACAM: ${ex}`);
        }
    }

    private loadAccruedDiscount(): void {
        this.log.Info(`Loading accrued discount for customer: ${this.CUNO}`);
        try {
            this.controller.ShowBusyIndicator();
            this.log.Info("ShowBusyIndicator called");
            this.getAccruedDiscountGLS210(this.CUNO);
            this.getDiscountInvoicesOIS350(this.CUNO);
            this.getStuckVouchersGLS037(this.CUNO);
            this.getOpenOrderDiscountsOIS300(this.CUNO);
        } catch (ex) {
            this.controller.HideBusyIndicator();
            this.log.Error(`Error in loadAccruedDiscount: ${ex}`);
        }
    }

    private getAccruedDiscountGLS210(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstDiscountLedg";
        // request.record = { EGAIT6: cuno, CONO: this.CONO, EGDIVI: this.DIVI, EGAIT1: "33531011" };
        request.record = { EGAIT6: cuno, EGDIVI: this.DIVI, EGAIT1: "33531011" };
        request.outputFields = ["EGACAM"];
        request.maxReturnedRecords = 10000;
        this.log.Info(`Calling CMS100MI.LstDiscountLedg for ${cuno}, CONO: ${this.CONO}, DIVI: ${this.DIVI}`);
        this.miService.executeRequestV2(request).then(response => this.onGLS210Response(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstDiscountLedg", cuno);
        });
    }

    private onGLS210Response(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CMS100MI.LstDiscountLedg response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstDiscountLedg error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            let amount = 0;
            if (response.items && response.items.length > 0) {
                this.log.Info(`CMS100MI.LstDiscountLedg raw data: ${JSON.stringify(response.items)}`);
                amount = response.items.reduce((sum, item) => {
                    const value = parseFloat(item["EGACAM"] || "0");
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            }
            this.totalAccruedDiscount += amount;
            this.log.Info(`CMS100MI.LstDiscountLedg accrued discount: ${amount.toFixed(2)}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onGLS210Response: ${ex}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        }
    }

    private getDiscountInvoicesOIS350(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstDiscountInv";
        //request.record = { UTCONO: this.CONO, UTDIVI: this.DIVI, UTCUNO: cuno, UTIVTP: "60", UTIVRF: "DIS_AC", UHVONO: "0" };
        request.record = { cono: this.CONO, UTDIVI: this.DIVI, UTCUNO: cuno, UTIVTP: "60", UTIVRF: "DIS_AC" };
        request.outputFields = ["UTACAM"];
        request.maxReturnedRecords = 10000;

        this.log.Info(`Calling CMS100MI.LstDiscountInv for ${cuno}, CONO: ${this.CONO}, DIVI: ${this.DIVI}`);
        this.miService.executeRequestV2(request).then(response => this.onOIS350Response(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstDiscountInv", cuno);
        });
    }

    private onOIS350Response(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CMS100MI.LstDiscountInv response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstDiscountInv error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            let amount = 0;
            if (response.items && response.items.length > 0) {
                this.log.Info(`CMS100MI.LstDiscountInv raw data: ${JSON.stringify(response.items)}`);
                amount = response.items.reduce((sum, item) => {
                    const value = parseFloat(item["UTACAM"] || "0");
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            }
            this.totalAccruedDiscount += amount;
            this.log.Info(`CMS100MI.LstDiscountInv discount invoices: ${amount.toFixed(2)}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onOIS350Response: ${ex}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        }
    }

    private getStuckVouchersGLS037(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstDiscountStVo";
        // request.record = { ACCUNO: cuno, ACCONO: this.CONO, ACDIVI: this.DIVI, ACAIT1: "33531011" };
        request.record = { ACCUNO: cuno, ACDIVI: this.DIVI, ACAIT1: "33531011" };
        request.outputFields = ["ACACAM"];
        request.maxReturnedRecords = 10000;
        this.log.Info(`Calling CMS100MI.LstDiscountStVo for ${cuno}, CONO: ${this.CONO}, DIVI: ${this.DIVI}`);
        this.miService.executeRequestV2(request).then(response => this.onGLS037Response(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstDiscountStVo", cuno);
        });
    }

    private onGLS037Response(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CMS100MI.LstDiscountStVo response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstDiscountStVo error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            let amount = 0;
            if (response.items && response.items.length > 0) {
                this.log.Info(`CMS100MI.LstDiscountStVo raw data: ${JSON.stringify(response.items)}`);
                amount = response.items.reduce((sum, item) => {
                    const value = parseFloat(item["ACACAM"] || "0");
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            }
            this.totalAccruedDiscount += amount;
            this.log.Info(`CMS100MI.LstDiscountStVo stuck vouchers: ${amount.toFixed(2)}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onGLS037Response: ${ex}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        }
    }

    private getOpenOrderDiscountsOIS300(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstDiscountChrg";
        // request.record = { OACONO: this.CONO, OACUNO: cuno, OECHST: "20", OECRID: "DIS_AC" };
        request.record = { OACUNO: cuno, T_ORST: "60" };
        request.outputFields = ["OECRAM"];
        request.maxReturnedRecords = 10000;
        this.log.Info(`Calling CMS100MI.LstDiscountChrg for ${cuno}, CONO: ${this.CONO}`);
        this.miService.executeRequestV2(request).then(response => this.onOIS300Response(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstDiscountChrg", cuno);
        });
    }

    private onOIS300Response(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CMS100MI.LstDiscountChrg response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstDiscountChrg error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            let amount = 0;
            if (response.items && response.items.length > 0) {
                this.log.Info(`CMS100MI.LstDiscountChrg raw data: ${JSON.stringify(response.items)}`);
                amount = response.items.reduce((sum, item) => {
                    const value = parseFloat(item["OECRAM"] || "0");
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);
            }
            this.totalAccruedDiscount -= amount;
            this.log.Info(`CMS100MI.LstDiscountChrg open order discounts: ${amount.toFixed(2)}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onOIS300Response: ${ex}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        }
    }

    private onApiError(error: any, apiName: string, cuno: string): void {
        const errorMsg = error.errorMessage || error.toString() || "Unknown error";
        this.log.Error(`${apiName} error for ${cuno}: ${errorMsg}`);
        this.apiCallsCompleted++;
        this.checkAllApisCompleted();
    }

    private checkAllApisCompleted(): void {
        if (this.apiCallsCompleted >= this.totalApiCalls) {
            this.controller.HideBusyIndicator();
            this.log.Info(`All API calls completed, Total Accrued Discount: ${this.totalAccruedDiscount.toFixed(2)}`);
            this.updateSUMACAM();
        }
    }

    private attachEvents(): void {
        try {
            this.detachRequesting = this.controller.Requesting.On((e) => {
                this.onRequesting(e);
            });
            this.detachRequestCompleted = this.controller.RequestCompleted.On((e) => {
                this.onRequestCompleted(e);
            });
            this.log.Info("Attached Requesting and RequestCompleted events");
        } catch (ex) {
            this.log.Error(`Error attaching events: ${ex}`);
        }
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        try {
            this.log.Info("onRequesting triggered");

            const panelName = this.controller.GetPanelName();
            if (panelName !== "OIA103E0") {
                this.log.Info("Not on OIA103E0 → skipping validation");
                return;
            }

            // Validate only on ENTER, ROLLUP, ROLLDOWN, F5 (Next), or Option 5
            const validKeys = ["ENTER", "ROLLUP", "ROLLDOWN", "F5"];
            const isValidKey = args.commandType === "KEY" && validKeys.indexOf(args.commandValue) !== -1;
            const isOption5 = args.commandType === "LSTOPT" && args.commandValue === "5";

            if (!isValidKey && !isOption5) {
                return;
            }

            this.log.Info("Validation triggered by: " + args.commandValue);

            // Get value from the visible "Charge" field
            const rawValue = ScriptUtil.GetFieldValue("WRCRAM", this.controller);
            if (rawValue === null || rawValue === undefined || rawValue.toString().trim() === "") {
                this.log.Info("WRCRAM is empty → allowed");
                return;
            }

            let chargeValueStr = rawValue.toString().trim();

            // Handle trailing minus sign (user types "123-")
            if (chargeValueStr.length > 0 && chargeValueStr.charAt(chargeValueStr.length - 1) === "-") {
                chargeValueStr = "-" + chargeValueStr.substring(0, chargeValueStr.length - 1);
                this.log.Info("Converted trailing minus: " + rawValue + " → " + chargeValueStr);
            }

            const chargeValue = parseFloat(chargeValueStr);

            if (isNaN(chargeValue)) {
                this.controller.ShowMessage("Giá trị không chính xác");
                args.cancel = true;
                this.log.Warning("Invalid number in WRCRAM: " + rawValue);
                return;
            }

            // Must be negative
            if (chargeValue >= 0) {
                this.controller.ShowMessage("Giá trị không chính xác");
                args.cancel = true;
                this.log.Info("WRCRAM is not negative: " + chargeValue);
                return;
            }

            // Cannot exceed total accrued discount
            const maxAllowed = Math.abs(this.totalAccruedDiscount);
            if (Math.abs(chargeValue) > maxAllowed) {
                this.controller.ShowMessage(
                    "Giá trị không chính xác"
                );
                args.cancel = true;
                this.log.Info("WRCRAM (" + Math.abs(chargeValue) + ") exceeds SUMACAM (" + maxAllowed + ")");
                return;
            }

            this.log.Info("WRCRAM validation PASSED: " + chargeValue);
            args.cancel = false;

        } catch (ex) {
            this.log.Error("Error in onRequesting: " + ex);
            args.cancel = true;
            this.controller.ShowMessage("Lỗi kiểm tra chiết khấu");
        }
    }
    private onRequestCompleted(args: CancelRequestEventArgs): void {
        try {
            this.log.Info("Request completed, detaching events");
            this.detachEvents();
        } catch (ex) {
            this.log.Error(`Error in onRequestCompleted: ${ex}`);
        }
    }

    private detachEvents(): void {
        try {
            if (this.detachRequesting) {
                this.detachRequesting();
                this.detachRequesting = null;
            }
            if (this.detachRequestCompleted) {
                this.detachRequestCompleted();
                this.detachRequestCompleted = null;
            }
            this.log.Info("Detached Requesting and RequestCompleted events");
        } catch (ex) {
            this.log.Error(`Error detaching events: ${ex}`);
        }
    }
}


