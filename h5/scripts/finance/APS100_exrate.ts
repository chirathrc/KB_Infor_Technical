/**
 * Author      : Fortude
 * Created on  : 2025-09-19
 * Summary     : H5 script for APS100/F panel to automatically retrieve and update the exchange rate (WWARAT) for a purchase order (WWPUNO).
 *               Calls MDBREADMI.GetMPHEAD00 to fetch CUTE, AGRA, and CUCD.
 *               Updates WWARAT if CUCD matches WWCUCD and AGRA ≠ 0.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * [Your Name] | 2025-09-19 | Converted from JScript to H5 script, added multilingual support, debouncing, and robust error handling
 */
class APS100_exrate {
    private controller: IInstanceController;
    private log: IScriptLog;
    private content: IContentElement;
    private miService: any;
    private LANG: string = "EN";
    private CONO1: string = "";
    private PONO1: string = "";
    private CUCD1: string = "";
    private PONO2: string = "";
    private scrrun: boolean = false;
    private lastExecutionTime: number = 0;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN";
        this.log.Info("Constructor initialized");
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new APS100_exrate(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing");
        const panelName = this.controller.GetPanelName();
        console.log(`Panel: ${panelName}`);

        try {
            if (panelName === "APA100F0" ) {
                this.CONO1 = ScriptUtil.GetUserContext().CurrentCompany || "";
                this.PONO1 = (ScriptUtil.GetFieldValue("WWPUNO") || "").trim();
                this.CUCD1 = (ScriptUtil.GetFieldValue("WWCUCD") || "").trim();
                this.log.Info(`CONO1: ${this.CONO1}, PONO1: ${this.PONO1}, CUCD1: ${this.CUCD1}`);

                if (!this.PONO1) {
                    this.PONO2 = "NO";
                    this.log.Info("PONO2 set to NO: WWPUNO is empty");
                    return;
                }
                this.PONO2 = "YES";
                this.log.Info("PONO2 set to YES");

                const currentTime = Date.now();
                if (currentTime - this.lastExecutionTime < 500) {
                      return;
                }
                this.lastExecutionTime = currentTime;

                this.loadAdditionalData();
            } else {
                this.log.Info(`Not on APS100/F panel, current: ${panelName}`);
            }
        } catch (ex) {
            this.log.Error(`Error in run: ${ex}`);
            this.controller.ShowMessage(
                `Error: ${ex}`
            );
        }
    }

    private async loadAdditionalData(): Promise<void> {
        let indicatorShown = false;
        try {
            try {
                indicatorShown = this.controller.ShowBusyIndicator();
                this.log.Info(`ShowBusyIndicator: ${indicatorShown}`);
            } catch (ex) {
                    this.controller.ShowMessage(
                    "Processing, please wait..."
                );
            }

            const request = new MIRequest();
            request.program = "MDBREADMI";
            request.transaction = "GetMPHEAD00";
            request.record = { PUNO: this.PONO1 };
            request.outputFields = ["CUTE", "AGRA", "CUCD"];
            this.log.Info(`Calling MDBREADMI for PUNO: ${this.PONO1}`);

            const response = await this.miService.executeRequestV2(request);
            if (indicatorShown) {
                try {
                    this.controller.HideBusyIndicator();
                    this.log.Info("HideBusyIndicator called");
                } catch (ex) {
                }
            }
            this.onRunWorkerCompleted(response);
        } catch (ex) {
            if (indicatorShown) {
                try {
                    this.controller.HideBusyIndicator();
                    this.log.Info("HideBusyIndicator called on error");
                } catch (exHide) {
                }
            }
            this.scrrun = true;
            this.log.Error(`Error in loadAdditionalData: ${ex}`);
            this.controller.ShowMessage(
                `MDBREADMI Error: ${ex}`
            );
        }
    }

    private onRunWorkerCompleted(response: IMIResponse): void {
        if (response.hasError() || !response.items || response.items.length === 0) {
            this.scrrun = true;
            const errorMsg = response.errorMessage || "No data returned";
            this.log.Error(`MDBREADMI Error: ${errorMsg}`);
            this.controller.ShowMessage(

                `MDBREADMI Error: ${errorMsg}`
            );
            return;
        }

        try {
            const record = response.items[0];
            const CUTE = record["CUTE"] || "";
            const AGRA = record["AGRA"] || "0";
            const CUCD = record["CUCD"] || "";
            this.log.Info(`API response: CUTE=${CUTE}, AGRA=${AGRA}, CUCD=${CUCD}, CUCD1=${this.CUCD1}`);

            if (CUCD === this.CUCD1 && AGRA !== "0") {
                ScriptUtil.SetFieldValue("WWARAT", AGRA);
                this.scrrun = true;
                this.log.Info(`Updated WWARAT with AGRA: ${AGRA}`);
            } else {
                this.scrrun = true;
                this.log.Info(`No update to WWARAT: CUCD=${CUCD} ≠ CUCD1=${this.CUCD1} or AGRA=${AGRA}`);
            }
        } catch (ex) {
            this.scrrun = true;
            this.log.Error(`Error in onRunWorkerCompleted: ${ex}`);
            this.controller.ShowMessage(
                `Error: ${ex}`
            );
        }
    }
}