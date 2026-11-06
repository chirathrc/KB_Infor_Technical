/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-29
 * Summary     : H5 script for OIS101 panel to display customer credit information during order entry.
 *               Retrieves Credit Limit, Outstanding Balance (SUM_BSOUAC + SUM_OBLNAM), 
 *               Remaining Credit Balance (CRL3 - Outstandng), and Outstanding Days
 *               when navigated from OIS300. Uses CMS100MI APIs instead of SQL.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-09-29 | Initial script creation
 * Chirath Rothila   | 2026-08-18  | Spec Update - Did a calculation change on the script as script update.  
 */
class OIS101CreditBalance {
    private controller: IInstanceController;
    private log: IScriptLog;
    private content: IContentElement;
    private miService: any;
    private CUNO: string = "";
    private DIVI: string = "";
    private label1Name: ILabelElement;
    private label1Value: ILabelElement;
    private label2Name: ILabelElement;
    private label2Value: ILabelElement;
    private label3Name: ILabelElement;
    private label3Value: ILabelElement;
    private labelOutDaysName: ILabelElement;
    private labelOutDaysValue: ILabelElement;
    private apiCallsCompleted: number = 0;
    private totalApiCalls: number = 4;
    private indicatorShown: boolean = false;
    private creditLimitLabelsAdded: boolean = false;
    private outstandingLabelsAdded: boolean = false;
    private remainingLabelsAdded: boolean = false;
    private outDaysLabelsAdded: boolean = false;
    private outstandingInvoiceAmount: number = 0;
    private openOrderAmount: number = 0;
    private outstandingInvoiceProcessed: boolean = false;
    private openOrderProcessed: boolean = false;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.DIVI = ScriptUtil.GetUserContext().CurrentDivision || "";
        this.log.Info(`Constructor initialized: DIVI=${this.DIVI}`);
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new OIS101CreditBalance(scriptArgs).run();
    }

    public run(): void {
        this.log.Info("Script Initializing for OIS101 panel");
        this.CUNO = (ScriptUtil.GetFieldValue("OACUNO") || "").trim();
        this.log.Info("Customer Code (OACUNO): " + this.CUNO);
        const panelName = this.controller.GetPanelName();
        this.log.Info("Panel name: " + panelName);
        if (panelName === "OIS101" || panelName === "OIA101BC") {
            if (!this.CUNO) {
                this.log.Error("Customer code (OACUNO) not found");
                return;
            }
            if (this.checkPanelReady()) {
                this.loadCreditData();
            } else {
                this.log.Error("Panel not ready for label addition");
            }
        } else {
            this.log.Info("Not on OIS101 or OIA101BC panel, skipping initialization");
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

    private loadCreditData(): void {
        this.log.Info(`Loading credit data for customer: ${this.CUNO}`);
        try {
            try {
                this.indicatorShown = this.controller.ShowBusyIndicator();
                this.log.Info(`ShowBusyIndicator: ${this.indicatorShown}`);
            } catch (ex) {
                this.log.Info(`ShowBusyIndicator failed: ${ex}`);
            }
            this.getCreditLimit(this.CUNO);
            this.getOutstandingInvoiceAmount(this.CUNO);
            this.getOpenOrderAmount(this.CUNO);
            this.getOutstandingDays(this.CUNO);
        } catch (ex) {
            this.hideBusyIndicator();
        }
    }

    private hideBusyIndicator(): void {
        if (this.indicatorShown) {
            try {
                this.controller.HideBusyIndicator();
                this.log.Info("HideBusyIndicator called");
                this.indicatorShown = false;
            } catch (ex) {
                this.log.Info(`HideBusyIndicator failed: ${ex}`);
            }
        }
    }

    private addCreditLimitLabels(value: string): boolean {
        if (this.creditLimitLabelsAdded) {
            this.label1Value.Value = value;
            this.log.Info(`Credit Limit updated to: ${value}`);
            return true;
        }
        try {
            this.label1Name = new LabelElement();
            this.label1Name.Name = "CreditLimitLabel";
            this.label1Name.Value = "贷款额度 : "; //Credit Limit
            this.label1Name.Position = new PositionElement();
            this.label1Name.Position.Top = 4;
            this.label1Name.Position.Left = 80;
            this.label1Name.Position.Width = 15;
            this.content.AddElement(this.label1Name);

            this.label1Value = new LabelElement();
            this.label1Value.Name = "CreditLimitValue";
            this.label1Value.Value = value;
            this.label1Value.Position = new PositionElement();
            this.label1Value.Position.Top = 4;
            this.label1Value.Position.Left = 95;
            this.label1Value.Position.Width = 15;
            this.content.AddElement(this.label1Value);
            this.log.Info(`Added Credit Limit labels with value: ${value}`);
            this.creditLimitLabelsAdded = true;
            return true;
        } catch (ex) {
            this.log.Error(`Error adding Credit Limit labels: ${ex}`);
            return false;
        }
    }

    private addOutstandingLabels(value: string): boolean {
        if (this.outstandingLabelsAdded) {
            this.label2Value.Value = value;
            this.log.Info(`Outstanding Balance updated to: ${value}`);
            return true;
        }
        try {
            this.label2Name = new LabelElement();
            this.label2Name.Name = "OutstandingBalanceLabel";
            this.label2Name.Value = "已使用的贷款额度 : "; //Outstanding Balance
            this.label2Name.Position = new PositionElement();
            this.label2Name.Position.Top = 5;
            this.label2Name.Position.Left = 80;
            this.label2Name.Position.Width = 15;
            this.content.AddElement(this.label2Name);

            this.label2Value = new LabelElement();
            this.label2Value.Name = "OutstandingBalanceValue";
            this.label2Value.Value = value;
            this.label2Value.Position = new PositionElement();
            this.label2Value.Position.Top = 5;
            this.label2Value.Position.Left = 95;
            this.label2Value.Position.Width = 15;
            this.content.AddElement(this.label2Value);
            this.log.Info(`Added Outstanding Balance labels with value: ${value}`);
            this.outstandingLabelsAdded = true;
            return true;
        } catch (ex) {
            this.log.Error(`Error adding Outstanding Balance labels: ${ex}`);
            return false;
        }
    }

    private addRemainingLabels(value: string): boolean {
        if (this.remainingLabelsAdded) {
            this.label3Value.Value = value;
            this.log.Info(`Remaining Credit Balance updated to: ${value}`);
            return true;
        }
        try {
            this.label3Name = new LabelElement();
            this.label3Name.Name = "RemainingCreditLabel";
            this.label3Name.Value = "剩余贷款额度 : "; //Remaining Credit Balance
            this.label3Name.Position = new PositionElement();
            this.label3Name.Position.Top = 6;
            this.label3Name.Position.Left = 80;
            this.label3Name.Position.Width = 15;
            this.content.AddElement(this.label3Name);

            this.label3Value = new LabelElement();
            this.label3Value.Name = "RemainingCreditValue";
            this.label3Value.Value = value;
            this.label3Value.Position = new PositionElement();
            this.label3Value.Position.Top = 6;
            this.label3Value.Position.Left = 95;
            this.label3Value.Position.Width = 15;
            this.content.AddElement(this.label3Value);
            this.log.Info(`Added Remaining Credit labels with value: ${value}`);
            this.remainingLabelsAdded = true;
            return true;
        } catch (ex) {
            this.log.Error(`Error adding Remaining Credit labels: ${ex}`);
            return false;
        }
    }

    private addOutstandingDaysLabels(value: string): boolean {
        if (this.outDaysLabelsAdded) {
            this.labelOutDaysValue.Value = value;
            this.log.Info(`Outstanding Days updated to: ${value}`);
            return true;
        }
        try {
            this.labelOutDaysName = new LabelElement();
            this.labelOutDaysName.Name = "OutstandingDaysLabel";
            this.labelOutDaysName.Value = "总天数 :"; //Outstanding Days
            this.labelOutDaysName.Position = new PositionElement();
            this.labelOutDaysName.Position.Top = 7;
            this.labelOutDaysName.Position.Left = 80;
            this.labelOutDaysName.Position.Width = 15;
            this.content.AddElement(this.labelOutDaysName);

            this.labelOutDaysValue = new LabelElement();
            this.labelOutDaysValue.Name = "OutstandingDaysValue";
            this.labelOutDaysValue.Value = value;
            this.labelOutDaysValue.Position = new PositionElement();
            this.labelOutDaysValue.Position.Top = 7;
            this.labelOutDaysValue.Position.Left = 95;
            this.labelOutDaysValue.Position.Width = 15;
            this.content.AddElement(this.labelOutDaysValue);
            this.log.Info(`Added Outstanding Days labels with value: ${value}`);
            this.outDaysLabelsAdded = true;
            return true;
        } catch (ex) {
            this.log.Error(`Error adding Outstanding Days labels: ${ex}`);
            return false;
        }
    }

    private getCreditLimit(cuno: string): void {
        const request = new MIRequest();
        request.program = "CRS610MI";
        request.transaction = "GetFinancial";
        request.record = { CUNO: cuno, DIVI: this.DIVI };
        request.outputFields = ["CRL3"];
        this.log.Info(`Calling CRS610MI.GetFinancial for ${cuno}, DIVI: ${this.DIVI}`);
        this.miService.executeRequestV2(request).then(response => this.onCreditLimitResponse(response, cuno)).catch(error => {
            this.onApiError(error, "CRS610MI.GetFinancial", cuno);
        });
    }

    private onCreditLimitResponse(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CRS610MI.GetFinancial response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CRS610MI.GetFinancial error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.addCreditLimitLabels("N/A");
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            const record = response.items && response.items.length > 0 ? response.items[0] : {};
            this.log.Info(`Credit Limit raw data: ${JSON.stringify(record)}`);
            const creditLimit = parseFloat(record["CRL3"] || "0").toFixed(2);
            if (isNaN(parseFloat(creditLimit))) {
                this.log.Error(`Invalid Credit Limit data: ${creditLimit}`);
                this.addCreditLimitLabels("N/A");
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            const lblText1 = `${creditLimit}`;
            this.addCreditLimitLabels(lblText1);
            this.log.Info(`Credit Limit set to: ${lblText1}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onCreditLimitResponse: ${ex}`);
            this.addCreditLimitLabels("N/A");
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        }
    }

    private getOutstandingInvoiceAmount(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstOutsInvoices";
        request.record = { BSPYNO: cuno, BSCUNO: cuno, BSDIVI: this.DIVI };
        request.maxReturnedRecords = 0;
        request.outputFields = ["BSOUAC", "BSACYP"];
        this.log.Info(`Calling CMS100MI.LstOutsInvoices for ${cuno}, DIVI: ${this.DIVI}`);
        this.miService.executeRequestV2(request).then(response => this.onOutstandingInvoiceResponse(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstOutsInvoices", cuno);
        });
    }

    private onOutstandingInvoiceResponse(response: IMIResponse, cuno: string): void {
        console.log("Data - " + response.items);
        try {
            this.log.Info(`Processing CMS100MI.LstOutsInvoices response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstOutsInvoices error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.outstandingInvoiceAmount = 0;
                this.outstandingInvoiceProcessed = true;
                this.apiCallsCompleted++;
                this.updateOutstandingBalance();
                this.checkAllApisCompleted();
                return;
            }
            this.outstandingInvoiceAmount = 0;
            if (response.items && response.items.length > 0) {
                this.log.Info(`Outstanding Invoices raw data: ${JSON.stringify(response.items)}`);
                // this.outstandingInvoiceAmount = response.items.reduce((sum, item) => sum + parseFloat(item["BSOUAC"] || "0"), 0);
                //NEw Update - Sachinthi
                // this.outstandingInvoiceAmount = response.items
                //     .filter(item => !item["BSACYP"].endsWith("00"))
                //     .reduce(
                //         (sum, item) => sum + parseFloat(item["BSOUAC"] || "0"),
                //         0
                //     );
                const validItems = response.items.filter(item => {
                    const bsacyp = item["BSACYP"] || "";
                    return !bsacyp.endsWith("00");
                });

                const totalCents = validItems.reduce((sum, item) => {
                    const amount = parseFloat(item["BSOUAC"] || "0");
                    return sum + Math.round(amount * 100);
                }, 0);

                this.outstandingInvoiceAmount = totalCents / 100;
            } else {
                this.log.Info("No outstanding invoices found");
            }
            this.log.Info(`Outstanding Invoice Amount stored: ${this.outstandingInvoiceAmount.toFixed(2)}`);
            this.outstandingInvoiceProcessed = true;
            this.apiCallsCompleted++;
            this.updateOutstandingBalance();
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onOutstandingInvoiceResponse: ${ex}`);
            this.outstandingInvoiceAmount = 0;
            this.outstandingInvoiceProcessed = true;
            this.apiCallsCompleted++;
            this.updateOutstandingBalance();
            this.checkAllApisCompleted();
        }
    }

    private getOpenOrderAmount(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstOpenOrders";
        request.record = { OBCUNO: cuno, CONO: "100", DIVI: this.DIVI, T_ORST: "66" };
        request.outputFields = ["OBLNAM"];
        this.log.Info(`Calling CMS100MI.LstOpenOrders for ${cuno}, DIVI: ${this.DIVI}, T_ORST: 66`);
        this.miService.executeRequestV2(request).then(response => this.onOpenOrderResponse(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstOpenOrders", cuno);
        });
    }

    private onOpenOrderResponse(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CMS100MI.LstOpenOrders response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstOpenOrders error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.openOrderAmount = 0;
                this.openOrderProcessed = true;
                this.apiCallsCompleted++;
                this.updateOutstandingBalance();
                this.checkAllApisCompleted();
                return;
            }
            this.openOrderAmount = 0;
            if (response.items && response.items.length > 0) {
                this.log.Info(`Open Orders raw data: ${JSON.stringify(response.items)}`);
                this.openOrderAmount = response.items.reduce((sum, item) => sum + parseFloat(item["OBLNAM"] || "0"), 0);
            } else {
                this.log.Info("No open orders found");
            }
            this.log.Info(`Open Order Amount stored: ${this.openOrderAmount.toFixed(2)}`);
            this.openOrderProcessed = true;
            this.apiCallsCompleted++;
            this.updateOutstandingBalance();
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onOpenOrderResponse: ${ex}`);
            this.openOrderAmount = 0;
            this.openOrderProcessed = true;
            this.apiCallsCompleted++;
            this.updateOutstandingBalance();
            this.checkAllApisCompleted();
        }
    }

    private updateOutstandingBalance(): void {
        try {
            if (!this.outstandingInvoiceProcessed || !this.openOrderProcessed) {
                this.log.Info(`Skipping Outstanding Balance update: outstandingInvoiceProcessed=${this.outstandingInvoiceProcessed}, openOrderProcessed=${this.openOrderProcessed}`);
                return;
            }
            const totalOutstanding = (this.outstandingInvoiceAmount + this.openOrderAmount).toFixed(2);
            // const totalOutstanding = (this.outstandingInvoiceAmount).toFixed(2);
            const lblText2 = isNaN(parseFloat(totalOutstanding)) ? "N/A" : totalOutstanding;
            this.addOutstandingLabels(lblText2);
            this.log.Info(`Outstanding Balance set to: ${lblText2} (SUM_BSOUAC: ${this.outstandingInvoiceAmount.toFixed(2)}, SUM_OBLNAM: ${this.openOrderAmount.toFixed(2)})`);
            this.calculateRemainingBalance();
        } catch (ex) {
            this.log.Error(`Error in updateOutstandingBalance: ${ex}`);
            this.addOutstandingLabels("N/A");
        }
    }

    private getOutstandingDays(cuno: string): void {
        const request = new MIRequest();
        request.program = "CMS100MI";
        request.transaction = "LstOutsDays";
        request.record = { CCPYNO: cuno, CONO: "100", DIVI: this.DIVI };
        request.outputFields = ["CCNOOD"];
        this.log.Info(`Calling CMS100MI.LstOutsDays for ${cuno}, DIVI: ${this.DIVI}`);
        this.miService.executeRequestV2(request).then(response => this.onOutstandingDaysResponse(response, cuno)).catch(error => {
            this.onApiError(error, "CMS100MI.LstOutsDays", cuno);
        });
    }

    private onOutstandingDaysResponse(response: IMIResponse, cuno: string): void {
        try {
            this.log.Info(`Processing CMS100MI.LstOutsDays response for ${cuno}`);
            if (response.hasError()) {
                this.log.Error(`CMS100MI.LstOutsDays error for ${cuno}: ${response.errorMessage} (Code: ${response.errorCode})`);
                this.addOutstandingDaysLabels("N/A");
                this.apiCallsCompleted++;
                this.checkAllApisCompleted();
                return;
            }
            const record = response.items && response.items.length > 0 ? response.items[0] : {};
            this.log.Info(`Outstanding Days raw data: ${JSON.stringify(record)}`);
            const days = record["CCNOOD"] || "0";
            const lblTextOutDays = `${days}`;
            this.addOutstandingDaysLabels(lblTextOutDays);
            this.log.Info(`Outstanding Days set to: ${lblTextOutDays}`);
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        } catch (ex) {
            this.log.Error(`Error in onOutstandingDaysResponse: ${ex}`);
            this.addOutstandingDaysLabels("N/A");
            this.apiCallsCompleted++;
            this.checkAllApisCompleted();
        }
    }

    private onApiError(error: any, apiName: string, cuno: string): void {
        const errorMsg = error.errorMessage || error.toString() || "Unknown error";
        this.log.Error(`${apiName} error for ${cuno}: ${errorMsg}`);
        if (apiName === "CRS610MI.GetFinancial") {
            this.addCreditLimitLabels("N/A");
        } else if (apiName === "CMS100MI.LstOutsInvoices") {
            this.outstandingInvoiceAmount = 0;
            this.outstandingInvoiceProcessed = true;
            this.updateOutstandingBalance();
        } else if (apiName === "CMS100MI.LstOpenOrders") {
            this.openOrderAmount = 0;
            this.openOrderProcessed = true;
            this.updateOutstandingBalance();
        } else if (apiName === "CMS100MI.LstOutsDays") {
            this.addOutstandingDaysLabels("N/A");
        }
        this.controller.ShowMessage(`${apiName} error: ${errorMsg}`);
        this.apiCallsCompleted++;
        this.checkAllApisCompleted();
    }

    private calculateRemainingBalance(): void {
        try {
            const creditLimit = parseFloat(this.label1Value?.Value || "0");
            const outstandingBalance = this.outstandingInvoiceAmount + this.openOrderAmount;
            if (isNaN(creditLimit) || isNaN(outstandingBalance)) {
                this.log.Info(`Skipping Remaining Balance calculation: creditLimit=${this.label1Value?.Value}, outstandingBalance=${outstandingBalance}`);
                this.addRemainingLabels("N/A");
                return;
            }
            const remaining = (creditLimit - outstandingBalance).toFixed(2);
            const lblText3 = `${remaining}`;
            this.addRemainingLabels(lblText3);
            this.log.Info(`Calculated Remaining Balance set to: ${lblText3} (Credit Limit: ${creditLimit}, Outstanding: ${outstandingBalance.toFixed(2)})`);
        } catch (ex) {
            this.log.Error(`Error in calculateRemainingBalance: ${ex}`);
            this.addRemainingLabels("N/A");
        }
    }

    private checkAllApisCompleted(): void {
        if (this.apiCallsCompleted >= this.totalApiCalls) {
            this.hideBusyIndicator();
            this.log.Info("All API calls completed"); 
        }
    }
}