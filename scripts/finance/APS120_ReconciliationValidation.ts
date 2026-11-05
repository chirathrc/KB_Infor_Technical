/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-16
 * Summary     : H5 script for APS120/F1 to validate invoice approval during advance payment reconciliation.
 *               Calls APS200MI.GetInvTotInfo to check APRV for each invoice in the grid.
 *               Displays error message for unapproved invoices and prevents reconciliation.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-09-15 | Initial script creation
 */
class APS120_ReconciliationValidation {
    private controller: IInstanceController;
    private log: IScriptLog;
    private grid: IActiveGrid;
    private miService: any;
    private rows: any[] = [];
    private totalCount: number = 0;
    private currentRunningNumber: number = -1;
    private completedNumbers: number = 0;
    private pressedKey: string = "";
    private errOccurred: boolean = false;
    private unapprovedInvoice: string = "";
    private unsubscribeRequesting: Function;
    private unsubscribeRequested: Function;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.grid = this.controller.GetGrid();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.log.Info(`Constructor initialized: grid=${!!this.grid}`);
        if (this.grid) {
            this.rows = this.grid.getData() || [];
            this.totalCount = this.rows.length;
            const columns = this.grid.getColumns()?.map(col => col.name || col.id) || [];
            this.log.Info(`Grid columns: ${JSON.stringify(columns)}`);
            this.log.Info(`Sample row data structure: ${this.totalCount > 0 ? JSON.stringify(Object.keys(this.rows[0]) || []) : "No rows"}`);
        }
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new APS120_ReconciliationValidation(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing 1");
        const panelName = this.controller.GetPanelName();
        console.log(`Panel: ${panelName}`);

        if (panelName.indexOf("APS120") === 0 || panelName === "APA121FC") {
            if (!this.grid || this.totalCount === 0) {
                this.log.Error("Grid unavailable or empty");
                return;
            }
            this.attachEvents();
        } else {
            this.log.Info(`Not on APS120 or APA121FC panel, current: ${panelName}`);
        }
    }

    private attachEvents(): void {
        this.log.Info("Attaching event handlers");
        this.unsubscribeRequesting = this.controller.Requesting.On((e: any) => {
            this.log.Info(`Requesting event detected: CommandType=${e.commandType}, CommandValue=${e.commandValue}`);
            this.onRequesting(e);
        });
        this.unsubscribeRequested = this.controller.Requested.On((e: any) => {
            this.onRequested(e);
        });
    }

    private onRequesting(e: any): void {
        if (e.commandType === "LSTOPT" && e.commandValue === "16" || e.commandType === "KEY" && e.commandValue === "F16") {
            this.log.Info(`Reconcile all triggered: CommandType=${e.commandType}, CommandValue=${e.commandValue}`);
            this.pressedKey = e.commandValue || "";

            if (!this.errOccurred) {
                if (this.totalCount > 0 && this.totalCount > this.currentRunningNumber + 1) {
                    e.cancel = true;
                    this.currentRunningNumber++;
                    this.log.Info(`Processing invoice ${this.currentRunningNumber + 1}/${this.totalCount}`);
                    this.callAPI(this.currentRunningNumber);
                } else if (this.totalCount > 0 && this.totalCount === this.completedNumbers) {
                    if (this.unapprovedInvoice === "") {
                        this.log.Info("All invoices approved, proceeding");
                    } else {
                        this.controller.ShowMessage(`Invoice ${this.unapprovedInvoice} Not Yet Approved`);
                        e.cancel = true;
                        this.resetValidationState();
                    }
                } else {
                    this.log.Error("Validation incomplete");
                    e.cancel = true;
                    this.resetValidationState();
                }
            } else {
                this.log.Error("Error occurred previously, canceling");
                e.cancel = true;
                this.resetValidationState();
            }
        } else {
            this.log.Info(`Requesting event ignored: CommandType=${e.commandType}, CommandValue=${e.commandValue}`);
        }
    }

    private onRequested(e: any): void {
        this.log.Info("Requested event: Script unloading");
        if (this.unsubscribeRequesting) this.unsubscribeRequesting();
        if (this.unsubscribeRequested) this.unsubscribeRequested();
    }

    private async callAPI(index: number): Promise<void> {
        let indicatorShown = false;
        try {
            indicatorShown = this.controller.ShowBusyIndicator();
            this.log.Info(`ShowBusyIndicator: ${indicatorShown}`);
            const columns = this.grid.getColumns()?.map(col => col.name || col.id) || [];
            this.log.Info(`Grid columns: ${JSON.stringify(columns)}`);

            const request = new MIRequest();
            request.program = "APS200MI";
            request.transaction = "GetInvTotInfo";
            request.record = {
                // DIVI: this.rows[index]["DIVI"] || "",
                // SPYN: this.rows[index]["SUNO"] || "",
                // SINO: this.rows[index]["SINO"] || "",
                // INYR: this.rows[index]["YEA4"] || "",
                // SUNO: this.rows[index]["SUNO"] || ""
                     DIVI: this.rows[index]["X1DIVI"] || "", 
                SPYN: this.rows[index]["X1SUNO"] || "", 
                 SINO: this.rows[index]["X1SINO"] || "", 
                INYR: this.rows[index]["X1YEA4"] || "", 
                 SUNO: this.rows[index]["X1SUNO"] || ""  
            };
            console.log(`MI Request Record: ${JSON.stringify(request.record)}`);
            request.outputFields = ["APRV", "SINO"];
            this.log.Info(`Calling APS200MI for invoice: ${request.record.SINO}`);

            const response = await this.miService.executeRequestV2(request);
            if (indicatorShown) this.controller.HideBusyIndicator();
            this.onResponse(response);
        } catch (ex) {
            if (indicatorShown) this.controller.HideBusyIndicator();
            this.errOccurred = true;
            this.log.Error(`Error in callAPI: ${ex}`);
            this.controller.ShowMessage("Unknown error occurred!");
            this.controller.PressKey(this.pressedKey);
            this.resetValidationState();
        }
    }

    private onResponse(response: IMIResponse): void {
        this.log.Info(`API Response: ${JSON.stringify(response)}`);
        if (response.hasError()) {
            this.errOccurred = true;
            const errorMsg = response.errorMessage || "Unknown error";
            this.log.Error(`APS200MI Error: ${errorMsg}`);
            this.controller.ShowMessage("Unknown error occurred!");
            this.controller.PressKey(this.pressedKey);
            this.resetValidationState();
            return;
        }

        try {
            const record = response.items && response.items.length > 0 ? response.items[0] : {};
            const aprv = parseFloat(record["APRV"] || "0");
            const sino = record["SINO"] || "";

            if (aprv === 0 && this.unapprovedInvoice === "") {
                this.unapprovedInvoice = sino;
                this.log.Info(`Unapproved invoice found: ${sino}`);
                this.controller.ShowMessage(`Invoice ${sino} Not Yet Approved`);
                this.resetValidationState();
                return;
            }

            this.completedNumbers++;
            this.log.Info(`Processed invoice ${sino}, completed: ${this.completedNumbers}/${this.totalCount}`);
            if (this.completedNumbers < this.totalCount) {
                this.controller.PressKey(this.pressedKey);
            }
        } catch (ex) {
            this.errOccurred = true;
            this.log.Error(`Error in onResponse: ${ex}`);
            this.controller.ShowMessage("Unknown error occurred!");
            this.controller.PressKey(this.pressedKey);
            this.resetValidationState();
        }
    }

    private resetValidationState(): void {
        this.currentRunningNumber = -1;
        this.completedNumbers = 0;
        this.errOccurred = false;
        this.unapprovedInvoice = "";
    }
}