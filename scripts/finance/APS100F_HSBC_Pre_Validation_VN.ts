/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-07-09
 * Summary     :  
 *   Initiates pre-validation on APA100F0 panel when user clicks "ENTER".
 *   Validates CRS692 (bank accounts), CRS623 (purpose code via CRS620MI.LstSupplierRef), and CRS622 (addresses via CRS620MI.LstAddresses).
 *   Displays a dialog with PASS/FAIL results for all cases.
 *   Blocks navigation to next panel if any validation fails; allows navigation after dialog closes if all pass.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * Nethum Ariyarathna    | 2025-07-31 | Initial script creation
 * Nethum Ariyarathna    | 2025-09-25 | Fixed dialog closure error and added busy indicator
 */

class APS100F_HSBC_Pre_Validation_VN {
    private controller: IInstanceController;
    private debug: any;
    private content: any;
    private WWPYME: string;
    private WWSUNO: string;
    private BaseCountry: string;
    private LANG: string = "";

    private CRS692APIMessage: string = "";
    private CRS620SupplierAPIMessage: string = "";
    private CRS622APIMessage: string = "";
    private CRS980APIMessage: string = "";

    private IsCRS692APIAPIFailed: boolean = false;
    private IsCRS620SupplierAPIAPIFailed: boolean = false;
    private IsCRS622APIAPIFailed: boolean = false;
    private IsCRS980APIAPIFailed: boolean = false;

    private IsReadyToProcess: boolean = false;
    private hasValidated: boolean = false;
    private attemptingNext: boolean = false;

    private miService;
    private version;
    private detachRequesting: Function;
    private detachRequestCompleted: Function;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.debug = scriptArgs.debug;
        this.content = this.controller.RenderEngine.Content;
        this.version = ScriptUtil.version;
        this.miService = this.version >= 2.0 ? MIService : MIService.Current;
        this.detachRequesting = null;
        this.detachRequestCompleted = null;

        this.WWSUNO = ScriptUtil.GetFieldValue("WWSUNO");
        this.BaseCountry = ScriptUtil.GetFieldValue("WWBSCD");
        this.WWPYME = ScriptUtil.GetFieldValue("WWPYME");
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN";
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new APS100F_HSBC_Pre_Validation_VN(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        console.log('Script Initializing');
        console.log("CONO: " + ScriptUtil.GetUserContext("CONO"));
        console.log("WWPYME: ", this.WWPYME);
        console.log("BaseCountry: ", this.BaseCountry);
        console.log("User Language: ", this.LANG);
        console.log("Panel: " + this.controller.GetPanelName());

        // Delay event attachment to ensure controller is ready
        setTimeout(() => this.attachEvents(this.controller), 100);
    }

    private attachEvents(controller: IInstanceController): void {
        try {
            // Attach event handlers for requesting and request completion
            this.detachRequesting = controller.Requesting.On((e) => this.onRequesting(e));
            this.detachRequestCompleted = controller.RequestCompleted.On((e) => this.onRequestCompleted(e));
            console.log("Events attached successfully");
        } catch (error) {
            console.error("Failed to attach events:", error);
        }
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        // Check if the current panel is the expected one
        if (this.controller.GetPanelName() !== "APA100F0") {
            console.log("Wrong panel, expected APA100F0, got:", this.controller.GetPanelName());
            return;
        }
        if (args.commandType === "KEY" && args.commandValue === "ENTER") {
            console.log("ENTER key detected");
            
            // Allow navigation if payment method is not TTF, TTL, or CH1
            if (this.WWPYME !== "TTF" && this.WWPYME !== "TTL") {
                console.log("Payment Method NOT TTF/TTL/CH1 - Allowing navigation");
                return;
            }

            // Prevent navigation if validation failed previously
            if (this.hasValidated && !this.IsReadyToProcess) {
                args.cancel = true;
                console.log("Validation failed previously - canceling navigation");
                return;
            }

            // Start validation if not already validated
            if (!this.hasValidated) {
                console.log("Starting validation process for payment method:", this.WWPYME);
                args.cancel = true;
                this.startValidation();
            } else if (this.IsReadyToProcess) {
                console.log("Validation passed - allowing navigation");
            }
        }
    }

    private startValidation(): void {
        // Mark as validated and set navigation attempt flag
        this.hasValidated = true;
        this.attemptingNext = true;
        this.resetValidationStates();
        console.log("Payment Method Found (TTF/TTL/CH1) - Starting validations");
        // Display busy indicator to show processing
        this.controller.ShowBusyIndicator();
        this.CRS692MILstByAccHolder(this.WWSUNO, "3");
    }

    private resetValidationStates(): void {
        // Reset all validation messages and states
        this.CRS692APIMessage = "";
        this.CRS620SupplierAPIMessage = "";
        this.CRS622APIMessage = "";
        this.CRS980APIMessage = "";
        this.IsCRS692APIAPIFailed = false;
        this.IsCRS620SupplierAPIAPIFailed = false;
        this.IsCRS622APIAPIFailed = false;
        this.IsCRS980APIAPIFailed = false;
        this.IsReadyToProcess = false;
    }

    private onRequestCompleted(args: CancelRequestEventArgs): void {
        // Clean up event handlers when request is complete
        this.detachEvents();
    }

    private detachEvents(): void {
        if (this.detachRequesting) this.detachRequesting();
        if (this.detachRequestCompleted) this.detachRequestCompleted();
    }

    private trim(stringToTrim: string): string {
        return stringToTrim ? stringToTrim.replace(/^\s+|\s+$/g, "") : "";
    }

    public CRS692MILstByAccHolder(SUNO: string, BKTP: string): void {
        console.log(`MI (CRS692MI LstByAccHolder) Called for SUNO: ${SUNO}, BKTP: ${BKTP}`);
        const request = new MIRequest();
        request.program = "CRS692MI";
        request.transaction = "LstByAccHolder";
        request.record = { ACHO: SUNO, BKTP: BKTP };
        request.outputFields = ["BKNO", "BAF1", "BAF2", "BAF3", "BAF4", "BAF5"];

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            console.log("CRS692MI API call succeeded");
            this.handleCRS692Response(response);
        }).catch((response: IMIResponse) => {
            console.log("Error in CRS692 API: ", response.errorMessage);
            this.IsCRS692APIAPIFailed = true;
            this.CRS692APIMessage = "FAIL - API Error: " + (response.errorMessage || "Unknown error");
            this.CRS620MILstSupplierRef(this.WWSUNO);
        });
    }

    private handleCRS692Response(response: IMIResponse): void {
        // Process the response from CRS692MI
        if (!response.items || response.items.length === 0) {
            console.log("No data returned for CRS692MI LstByAccHolder");
            this.IsCRS692APIAPIFailed = true;
            this.CRS692APIMessage = "FAIL - Data Missing";
        } else {
            let allValid = true;
            response.items.forEach((itm: any) => {
                const fields = ["BKNO", "BAF1", "BAF2", "BAF3", "BAF4", "BAF5"].map(f => this.trim(itm[f] || ""));
                console.log("Data: CRS692MI> " + fields.join(" <> "));
                if (fields.some(f => f.length === 0)) allValid = false;
            });
            if (!allValid) {
                this.IsCRS692APIAPIFailed = true;
                this.CRS692APIMessage = "FAIL - Data Missing";
            } else this.CRS692APIMessage = "PASS";
        }
        this.CRS620MILstSupplierRef(this.WWSUNO);
    }

    public CRS620MILstSupplierRef(SUNO: string): void {
        console.log(`MI (CRS620MI LstSupplierRef) Called for SUNO: ${SUNO}`);
        const request = new MIRequest();
        request.program = "CRS620MI";
        request.transaction = "LstSupplierRef";
        request.record = { SUNO: SUNO };
        request.outputFields = ["RFID", "YRE1", "EMAL", "RFTY"];

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            console.log("CRS620MI LstSupplierRef API call succeeded");
            this.handleCRS620Response(response);
        }).catch((response: IMIResponse) => {
            console.log("Error in CRS620 LstSupplierRef API: ", response.errorMessage);
            this.IsCRS620SupplierAPIAPIFailed = true;
            this.CRS620SupplierAPIMessage = "FAIL - API Error: " + (response.errorMessage || "Unknown error");
            this.CRS620MILstAddresses(this.WWSUNO, "3");
        });
    }

    public handleCRS620Response(response: IMIResponse): void {
        // Process the response from CRS620MI LstSupplierRef
        this.IsCRS620SupplierAPIAPIFailed = true;
        if (!response.items || response.items.length === 0) {
            console.log("No data returned for CRS620MI LstSupplierRef");
            this.CRS620SupplierAPIMessage = "FAIL - Data Missing";
        } else {
            let validFound = false;
            response.items.forEach((itm: any) => {
                const RFTY = this.trim(itm.RFTY || "");
                const YRE1 = this.trim(itm.YRE1 || "");
                const EMAL = this.trim(itm.EMAL || "");
                if (RFTY === "30" && YRE1.length > 0 && EMAL.length > 0) validFound = true;
            });
            if (validFound) {
                this.IsCRS620SupplierAPIAPIFailed = false;
                this.CRS620SupplierAPIMessage = "PASS";
            } else this.CRS620SupplierAPIMessage = "FAIL - Data Missing";
        }
        this.CRS620MILstAddresses(this.WWSUNO, "3");
    }

    public CRS620MILstAddresses(SUNO: string, RFTY: string): void {
        console.log(`MI (CRS620MI LstAddresses) Called for SUNO: ${SUNO}`);
        const request = new MIRequest();
        request.program = "CRS620MI";
        request.transaction = "LstAddresses";
        request.record = { SUNO: SUNO };
        request.outputFields = ["ADR1", "TOWN", "PONO", "CSCD", "ADTE"];

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            console.log("CRS620MI LstAddresses API call succeeded");
            this.handleCRS622Response(response);
        }).catch((response: IMIResponse) => {
            console.log("Error in CRS620 LstAddresses API: ", response.errorMessage);
            this.IsCRS622APIAPIFailed = true;
            this.CRS622APIMessage = "FAIL - API Error: " + (response.errorMessage || "Unknown error");
            this.CRS980MIGetTextID(this.WWSUNO, "100");
        });
    }

    public handleCRS622Response(response: IMIResponse): void {
        // Process the response from CRS620MI LstAddresses
        this.IsCRS622APIAPIFailed = true;
        if (!response.items || response.items.length === 0) {
            console.log("No data returned for CRS620MI LstAddresses");
            this.CRS622APIMessage = "FAIL - Data Missing";
        } else {
            let validAddressFound = false;
            response.items.forEach((itm: any) => {
                const ADR1 = this.trim(itm.ADR1 || "");
                const TOWN = this.trim(itm.TOWN || "");
                const PONO = this.trim(itm.PONO || "");
                const CSCD = this.trim(itm.CSCD || "");
                const ADTE = this.trim(itm.ADTE || "");
                const isValidADTE = this.BaseCountry === "VN" && ADTE === "10";
                const isValidAddress = ADR1.length > 0 && TOWN.length > 0 && PONO.length > 0 && CSCD.length > 0;
                if (isValidADTE && isValidAddress) validAddressFound = true;
            });
            if (validAddressFound) {
                this.IsCRS622APIAPIFailed = false;
                this.CRS622APIMessage = "PASS";
            } else this.CRS622APIMessage = "FAIL - Data Missing";
        }
        this.CRS980MIGetTextID(this.WWSUNO, "100");
    }

    public CRS980MIGetTextID(SUNO: string, CONO: string): void {
        console.log(`MI (CRS980MI GetTextID) Called for the SUNO ${SUNO} CONO: ${CONO}`);
        const request = new MIRequest();
        request.program = "CRS980MI";
        request.transaction = "GetTextID";
        request.record = { "FILE": "CIDMAS00", "KV01": CONO, "KV02": SUNO };
        request.outputFields = ["TXID"];

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            this.CRS980MIGetTextID_Response(response);
        }).catch((error: any) => {
            this.IsCRS980APIAPIFailed = true;
            this.CRS980APIMessage = "FAIL - Data Missing";
            this.showValidationDialog();
        });
    }

    private CRS980MIGetTextID_Response(response: IMIResponse): void {
        // Process the response from CRS980MI GetTextID
        if (!response.items || response.items.length === 0) {
            this.IsCRS980APIAPIFailed = true;
            this.CRS980APIMessage = "FAIL - Data Missing";
            this.showValidationDialog();
        } else {
            response.items.forEach((itm: any) => {
                let TXID = itm.TXID ? itm.TXID.trim() : ""; 
                if (this.trim(TXID).length === 0) {
                    this.IsCRS980APIAPIFailed = true;
                    this.CRS980APIMessage = "FAIL - Text ID Data Missing";
                    this.showValidationDialog();
                } else this.CRS980MISltTxtBlock(TXID, "100");
            });
        }
    }

    private CRS980MISltTxtBlock(TXID: string, CONO: string): void {
        console.log(`MI (CRS980MI SltTxtBlock) Called for the TXID ${TXID} CONO: ${CONO}`);
        const request = new MIRequest();
        request.program = "CRS980MI";
        request.transaction = "SltTxtBlock";
        request.record = { "CONO": CONO, "TXID": TXID, "LNCD": "GB", "TFIL": "MSYTXH" };
        request.outputFields = ["TX60"];

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            this.CRS980MISltTxtBlock_Response(response);
        }).catch((error: any) => {
            this.IsCRS980APIAPIFailed = true;
            this.CRS980APIMessage = "FAIL - Data Missing";
            this.showValidationDialog();
        });
    }

    private CRS980MISltTxtBlock_Response(response: IMIResponse): void {
        // Process the response from CRS980MI SltTxtBlock
        if (!response.items || response.items.length === 0) {
            this.IsCRS980APIAPIFailed = true;
            this.CRS980APIMessage = "FAIL - Data Missing";
        } else {
            response.items.forEach((itm: any) => {
                let TX60 = itm.TX60 ? itm.TX60.trim() : ""; 
                if (this.trim(TX60).length === 0) {
                    this.IsCRS980APIAPIFailed = true;
                    this.CRS980APIMessage = "FAIL - Data Missing";
                } else {
                    this.CRS980APIMessage = "PASS";
                }
            });
        }
        this.showValidationDialog();
    }

    private showValidationDialog(): void {
        // Determine if all validations passed
        this.IsReadyToProcess = !this.IsCRS692APIAPIFailed && !this.IsCRS620SupplierAPIAPIFailed && !this.IsCRS622APIAPIFailed && !this.IsCRS980APIAPIFailed;
        // Hide the busy indicator now that validation is complete
        this.controller.HideBusyIndicator();

        const dialogContent = $(`
            <div>
                <label class='inforLabel noColon' style='font-size: 18px;'>
                    Please pay attention to the following failed validations before proceeding to record invoice.
                </label><br>
                <pre>${this.generateDialogMessage()}</pre>
            </div>
        `);

        const dialogButtons = [{
            text: this.LANG === "CS" ? "关闭" : this.LANG === "VI" ? "Đóng" : "Close",
            isDefault: true,
            width: 80,
            click: function (event, model) {
                // Close the dialog based on H5 version
                if (ScriptUtil.version >= 2.0 && model && typeof model.close === 'function') {
                    model.close(true); // H5 2.0+ method
                } else {
                    $(this).closest('.ui-dialog-content').dialog('close'); // Fallback for jQuery UI dialog
                }
            }
        }];

        const dialogOptions = {
            title: "Payment Validations",
            dialogType: "General",
            modal: true,
            width: 600,
            minHeight: 480,
            icon: "info",
            closeOnEscape: true,
            close: () => {
                console.log("Dialog closing. IsReadyToProcess:", this.IsReadyToProcess, "attemptingNext:", this.attemptingNext);
                dialogContent.remove();
                // Ensure busy indicator is hidden when dialog closes
                this.controller.HideBusyIndicator();
                if (!this.IsReadyToProcess) {
                    this.hasValidated = false;
                    this.resetValidationStates();
                }
                if (this.IsReadyToProcess && this.attemptingNext) {
                    this.attemptingNext = false;
                    console.log("All validations passed - Proceeding to next panel");
                    setTimeout(() => this.controller.PressKey("ENTER"), 100);
                } else this.attemptingNext = false;
            },
            buttons: dialogButtons
        };

        if (ScriptUtil.version >= 2.0) {
            H5ControlUtil.H5Dialog.CreateDialogElement(dialogContent[0], dialogOptions);
        } else {
            dialogContent.inforMessageDialog(dialogOptions).catch((error) => {
                console.error("Dialog creation failed:", error);
                dialogContent.dialog(dialogOptions);
            });
        }
    }

    private generateDialogMessage(): string {
        const CRS692Color = this.IsCRS692APIAPIFailed ? "red" : "green";
        const CRS620SupplierColor = this.IsCRS620SupplierAPIAPIFailed ? "red" : "green";
        const CRS622Color = this.IsCRS622APIAPIFailed ? "red" : "green";
        const CRS980Color = this.IsCRS980APIAPIFailed ? "red" : "green";

        return `
            <table style="width: 50%; text-align: left; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px;">1. CRS692.Bank Accounts</td><td style="padding: 8px; color: ${CRS692Color};">${this.CRS692APIMessage}</td></tr>
                <tr><td style="padding: 8px;">2. CRS623.Reference</td><td style="padding: 8px; color: ${CRS620SupplierColor};">${this.CRS620SupplierAPIMessage}</td></tr>
                <tr><td style="padding: 8px;">3. CRS622.Addresses</td><td style="padding: 8px; color: ${CRS622Color};">${this.CRS622APIMessage}</td></tr>
                <tr><td style="padding: 8px;">4. CRS620.GBName</td><td style="padding: 8px; color: ${CRS980Color};">${this.CRS980APIMessage}</td></tr>
            </table>
            <div style="color: blue; font-size: 14px; margin-top: 10px;">**Please contact ERP Core team for assistance.</div>
        `;
    }
}