/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-15
 * Summary     : H5 script for ARS110 panel to display the Payment Term (TEPY)
 *               for a customer (CUNO) using CMS100MI.LstPaymentTerm API.
 *               Displays a label with "Payment Term: [TEPY]" (multilingual: EN, CS, VI)
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-09-15 | Initial script creation
 */

class ARS110_PaymentTerm {
    private controller: IInstanceController;
    private log: IScriptLog;
    private content: IContentElement;
    private miService: any;
    private CUNO: string = "";
    private LANG: string = "EN";
    private isValidating: boolean = false;
    private isUnloaded: boolean = false;
    private pressedKey: string = "";
    private unsubscribeRequesting: Function;
    private unsubscribeRequested: Function;
    private lastValidationTime: number = 0;
    private labelAdded: boolean = false;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN";
        this.log.Info("Constructor initialized");
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new ARS110_PaymentTerm(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing");
        const panelName = this.controller.GetPanelName();
        console.log(`Panel: ${panelName}`);

        if (panelName === "ARA112FC") {
            try {
                this.CUNO = (ScriptUtil.GetFieldValue("WFPYNO") || "").trim();
                this.log.Info(`Customer Number (CUNO): ${this.CUNO}`);

                if (!this.CUNO) {
                    this.controller.ShowMessage(
                        this.LANG === "CS" ? "请输入客户编号!" :
                        this.LANG === "VI" ? "Vui lòng nhập mã khách hàng!" :
                        "Please enter a customer number!"
                    );
                    return;
                }

                this.attachEvents();
                this.startValidation();
            } catch (ex) {
                this.log.Error(`Error in run: ${ex}`);
                this.controller.ShowMessage(
                    this.LANG === "CS" ? `错误: ${ex}` :
                    this.LANG === "VI" ? `Lỗi: ${ex}` :
                    `Error: ${ex}`
                );
            }
        } else {
            this.log.Info(`Not on ARS110 panel, current: ${panelName}`);
        }
    }

    private attachEvents(): void {
        this.log.Info("Attaching event handlers");
        this.unsubscribeRequesting = this.controller.Requesting.On((e: any) => {
            this.onRequesting(e);
        });
        this.unsubscribeRequested = this.controller.Requested.On((e: any) => {
            this.onRequested(e);
        });
    }

    private onRequesting(e: any): void {
        this.log.Info(`Requesting event: CommandType=${e.commandType}, CommandValue=${e.commandValue}`);
        const currentTime = Date.now();
        // Debounce validation to prevent rapid touch event triggers (500ms threshold)
        if (!this.isValidating && currentTime - this.lastValidationTime > 500) {
            this.pressedKey = e.commandValue || "";
            this.lastValidationTime = currentTime;
            this.startValidation();
        } else {
            this.log.Info(`Skipping validation due to debounce: isValidating=${this.isValidating}, timeSinceLast=${currentTime - this.lastValidationTime}`);
        }
    }

    private onRequested(e: any): void {
        this.log.Info("Requested event: Script unloading");
        this.isUnloaded = true;
        if (this.unsubscribeRequesting) {
            this.unsubscribeRequesting();
            this.log.Info("Unsubscribed Requesting event");
        }
        if (this.unsubscribeRequested) {
            this.unsubscribeRequested();
            this.log.Info("Unsubscribed Requested event");
        }
    }

    private startValidation(): void {
        if (this.isValidating || this.isUnloaded) {
            this.log.Info(`Skipping validation: isValidating=${this.isValidating}, isUnloaded=${this.isUnloaded}`);
            return;
        }

        try {
            this.isValidating = true;
            let indicatorShown = false;
            try {
                indicatorShown = this.controller.ShowBusyIndicator();
                this.log.Info(`ShowBusyIndicator: ${indicatorShown}`);
            } catch (ex) {
                this.log.Error(`ShowBusyIndicator failed: ${ex}, falling back to ShowMessage`);
                this.controller.ShowMessage(
                    this.LANG === "CS" ? "正在处理，请稍候..." :
                    this.LANG === "VI" ? "Đang xử lý, vui lòng đợi..." :
                    "Processing, please wait..."
                );
            }

            const request = new MIRequest();
            request.program = "CMS100MI";
            request.transaction = "LstPaymentTerm";
            request.record = {
                F_CUNO: this.CUNO,
                T_CUNO: this.CUNO,
                OKCUNO: this.CUNO
            };

            this.miService.executeRequestV2(request).then((response: IMIResponse) => {
                this.onResponse(response, indicatorShown);
            }).catch((error: any) => {
                if (indicatorShown) this.controller.HideBusyIndicator();
                this.isValidating = false;
                const errorMsg = error.errorMessage || error.toString() || "Unknown error";
                this.log.Error(`CMS100MI Error: ${errorMsg}`);
                this.controller.ShowMessage(
                    this.LANG === "CS" ? `CMS100MI 错误: ${errorMsg}` :
                    this.LANG === "VI" ? `Lỗi CMS100MI: ${errorMsg}` :
                    `CMS100MI Error: ${errorMsg}`
                );
            });
        } catch (ex) {
            this.controller.HideBusyIndicator();
            this.isValidating = false;
            this.log.Error(`Error in startValidation: ${ex}`);
            this.controller.ShowMessage(
                this.LANG === "CS" ? `错误: ${ex}` :
                this.LANG === "VI" ? `Lỗi: ${ex}` :
                `Error: ${ex}`
            );
        }
    }

    private onResponse(response: IMIResponse, indicatorShown: boolean): void {
        if (indicatorShown) this.controller.HideBusyIndicator();
        this.isValidating = false;
        this.log.Info("API response received");

        if (response.hasError()) {
            const errorMsg = response.errorMessage || "Unknown error";
            this.log.Error(`MI Access error: ${errorMsg}`);
            this.controller.ShowMessage(
                this.LANG === "CS" ? `CMS100MI 错误: ${errorMsg}` :
                this.LANG === "VI" ? `Lỗi CMS100MI: ${errorMsg}` :
                `CMS100MI Error: ${errorMsg}`
            );
            return;
        }                                                                    

        if (this.isUnloaded) {
            this.log.Info("Script unloaded, skipping label update");
            return;
        }

        try {
            const TEPY = response.items && response.items.length > 0 ? response.items[0]["V_TEPY"] || "" : "";
            this.log.Info(`Payment Term (TEPY): ${TEPY}`);

            const lblText = this.LANG === "CS" ? `付款方式: ${TEPY}` :
                            this.LANG === "VI" ? `Payment Term: ${TEPY}` :
                            `Payment Term: ${TEPY}`;

            // Add label only once to avoid touch event conflicts
            if (!this.labelAdded) {
                const label = new LabelElement();
                label.Name = "PaymentTermLabel";
                label.Value = lblText;
                label.Position = new PositionElement();
                label.Position.Left = 35;
                label.Position.Top = 8;
                label.Position.Width = 20;

                this.content.AddElement(label);
                this.labelAdded = true;
                this.log.Info(`Label added: ${lblText}`);
            } else {
                this.log.Info(`Label already added, skipping: ${lblText}`);
            }
        } catch (ex) {
            this.log.Error(`Error adding label: ${ex}`);
            this.controller.ShowMessage(
                this.LANG === "CS" ? `添加标签错误: ${ex}` :
                this.LANG === "VI" ? `Lỗi thêm nhãn: ${ex}` :
                `Error adding label: ${ex}`
            );
        }
    }
}