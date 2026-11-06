/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-07-09
 * Summary     : This script prevents users from executing specific list options (such as Change, Delete, or Line Entry)
 *               in the OIS300/B panel (OIA300BC) when the selected order lines have blocking codes (OBLC) 
 *               that do not include 0 or 9.
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * Nethum Ariyarathna    | 2025-09-30 | Initial script creation
 * Nethum Ariyarathna    | 2025-11-24 | FIXED: Now allows OAOBLC = 9
 */

class OIS300_OAOBLC_VALIDATION {
    private controller: IInstanceController;
    private log: IScriptLog;
    private LANG: string = "EN";
    private invalidStatus: boolean = false;
    private handlerAttached: boolean = false;
    private onRequestingHandler: (e: CancelRequestEventArgs) => void;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN";
        this.onRequestingHandler = (e: CancelRequestEventArgs) => this.onRequesting(e);
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new OIS300_OAOBLC_VALIDATION(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing");
        const header = this.controller.GetPanelName();
        this.log.Info(`Panel Name: ${header}`);
        if (header === "OIA300BC" && !this.handlerAttached) {
            this.attachEvents();
            this.handlerAttached = true;
            this.log.Info("Event handler attached");
        } else {
            this.log.Info(`Not on OIA300BC or handler already attached, current panel: ${header}`);
        }
    }

    private attachEvents(): void {
        this.log.Info("Attaching event handler");
        this.controller.Requesting.On(this.onRequestingHandler);
    }

    private onRequesting(e: CancelRequestEventArgs): void {
        this.log.Info("Event triggered, checking command");
        this.log.Info(`Command: type=${e.commandType}, value=${e.commandValue}, cancel status before check: ${e.cancel}`);
        if (e.commandType === "LSTOPT") {
            const restrictedActions = ["2", "4", "15", "31", "35", "36"];
            if (restrictedActions.indexOf(e.commandValue) !== -1) {
                this.log.Info("Found restricted action, evaluating OAOBLC");
                if (this.getValue()) {
                    this.log.Info("OAOBLC invalid, setting cancel to true");
                    e.cancel = true;
                    this.log.Info(`Cancel status set to: ${e.cancel}`);
                    const message = e.commandValue === "2" ? this.generateErrorMessage1() :
                                   e.commandValue === "4" ? this.generateErrorMessage2() :
                                   this.generateErrorMessage();
                    this.controller.ShowMessage(message);
                } else {
                    this.log.Info("OAOBLC valid or unavailable, allowing action");
                }
            }
        }
    }

    // ONLY THIS METHOD HAS 1 CHANGE BELOW
    private getValue(): boolean {
        let oaoblcValue: string[] | null = null;
        try {
            oaoblcValue = ListControl.ListView.GetValueByColumnName("OBLC", this.controller);
            this.log.Info(`Retrieved OAOBLC value: ${oaoblcValue !== null ? JSON.stringify(oaoblcValue) : "null"}`);
        } catch (error) {
            this.log.Error("Error retrieving OAOBLC value: " + error);
            return false;
        }

        const txtOAOBLC = Array.isArray(oaoblcValue) && oaoblcValue.length > 0 ? oaoblcValue[0] || "" : "";
        this.log.Info(`Processed OAOBLC: |${txtOAOBLC}|`);

        // ORIGINAL LINE (BLOCKED 9):
        // if (txtOAOBLC.indexOf("9") !== -1) { return true; }

        // FIXED LINE — NOW ALLOWS 0 AND 9
        if (txtOAOBLC.indexOf("0") !== -1 || txtOAOBLC.indexOf("9") !== -1 || txtOAOBLC === "") {
            this.log.Info("OAOBLC contains 0 or 9 or empty → ALLOWED");
            return false; // DO NOT BLOCK
        }

        this.log.Info("OAOBLC does NOT contain 0 or 9 → BLOCKED");
        return true; // BLOCK
    }

    private generateErrorMessage(): string {
        return this.LANG === "CS" ? "信贷额度审批进行中，请稍后录入订单行信息。" :
               this.LANG === "VI" ? "Trong quá trình duyệt hạn mức tín dung, sẽ không cho phép vào dòng đơn hang" :
               "Credit Limit approval in progress, order line entry not permitted";
    }

    private generateErrorMessage1(): string {
        return this.LANG === "CS" ? "订单信用审批正在进行中，无法修改客户订单金额。" :
               this.LANG === "VI" ? "Hạn mức tín dụng đang chờ duyệt, bạn không thể thay đổi đơn hàng" :
               "Credit Limit approval in progress, customer order header values cannot be changed";
    }

    private generateErrorMessage2(): string {
        return this.LANG === "CS" ? "订单信用审批正在进行中，无法删除客户订单。" :
               this.LANG === "VI" ? "Hạn mức tín dụng đang chờ duyệt, bạn không thể xoá đơn hàng" :
               "Credit Limit approval in progress, customer order cannot be deleted";
    }

    private trim(stringToTrim: string): string {
        return stringToTrim.replace(/^\s+|\s+$/g, "");
    }
}