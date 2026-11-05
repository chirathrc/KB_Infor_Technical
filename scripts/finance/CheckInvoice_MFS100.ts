/**
 * Author      : Rahul Killedar 
 * Created on  : 2025-07-04
 * modified on : 2025-10-15
 * Summary     : Validates that invoice date (WWIVDT) and accounting date (WWACDT) match the current date in FAS130\E.
 *
 * Version Log :
 * Changed By          | Date       | Summary of the change
 * --------------------|------------|-----------------------------
 * Rahul Killedar      | 2025-07-04 | Initial script creation
 * Nethum Ariyarathna  | 2025-10-15 | improved date parsing for dd/MM/yy input, enhanced validation logging
 */
class CheckInvoice_MFS100 {
    private controller: IInstanceController;
    private log: IScriptLog;
    private elem: any;
    private args: string;
    private InvDate: string;
    private AccDate: string;
    private currDate: string;
    private detachRequesting: Function;
    private LANG: string;

    public constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new CheckInvoice_MFS100(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("CheckInvoice_MFS100 script initializing...123");
        console.log(`User Language: ${this.LANG}`);

        const panelName = this.controller.GetPanelName();
        console.log(`Panel Name: ${panelName}`);

        if (panelName === "MFA100F0") {
            this.InvDate = ScriptUtil.GetFieldValue("WWIVDT") || "";
            this.AccDate = ScriptUtil.GetFieldValue("WWACDT") || "";

            // Format current date as YYYYMMDD
            const today = new Date();
            const yyyy = today.getFullYear().toString();
            const mm = ('0' + (today.getMonth() + 1)).slice(-2);
            const dd = ('0' + today.getDate()).slice(-2);
            this.currDate = `${yyyy}${mm}${dd}`;
            console.log(`Current Date: ${this.currDate}`);
            console.log(`Initial Invoice Date: ${this.InvDate}`);
            console.log(`Initial Accounting Date: ${this.AccDate}`);

            this.attachEvents(this.controller);
        }
    }

    private attachEvents(controller: IInstanceController) {
        this.detachRequesting = controller.Requesting.On((e: CancelRequestEventArgs) => this.onRequesting(e));
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        const panelName = this.controller.GetPanelName();
        let detachEventFlags = true;

        console.log(`Event: commandType=${args.commandType}, commandValue=${args.commandValue}`);

        if (panelName === "MFA100F0") {
            this.InvDate = ScriptUtil.GetFieldValue("WWIVDT") || "";
           // this.AccDate = ScriptUtil.GetFieldValue("WWACDT") || "";

            console.log(`InvDate: ${this.InvDate}`);

            if (args.commandType === "KEY" && args.commandValue === "ENTER") {
                // Parse input dates from dd/MM/yy to YYYYMMDD
                const parsedInvDate = this.parseDate(this.InvDate);
                // const parsedAccDate = this.parseDate(this.AccDate);
                console.log(`Parsed InvDate: ${parsedInvDate}`);

                const isInvDateValid = parsedInvDate === this.currDate;
                //const isAccDateValid = parsedAccDate === this.currDate;

                if (!isInvDateValid) {
                    console.log("Validation failed: Invoice or accounting date does not match current date.");
       //this.controller.ShowMessage("Invoice date cannot be backed. (Ngày hóa đơn không thể được lùi lại.) ");
        this.controller.ShowMessage(
                     this.LANG === "VI" ? `Ngày hóa đơn không thể được lùi lại.` :
                   `Invoice date cannot be backed.`
                );
                    args.cancel = true;
                } else {
                    console.log("Validation passed: Both dates match current date.");
                }
            }
        }

    }


    private parseDate(dateStr: string): string {
        console.log(`Parsing date: ${dateStr}`);
        if (!dateStr || dateStr.length !== 8) {
            console.log("Invalid date format or length");
            return "";
        }
        try {
            const parts = dateStr.split('/');
            if (parts.length !== 3) {
                console.log("Date parts mismatch");
                return "";
            }
            const dd = parts[0];
            const mm = parts[1];
            const yy = parts[2];
            const yyyy = yy.length === 2 ? `20${yy}` : yy; // Assume 20xx for 2-digit years
            const parsedDate = `${yyyy}${mm}${dd}`;
            console.log(`Parsed to: ${parsedDate}`);
            return parsedDate;
        } catch (error) {
            console.log(`Date parsing error: ${error}`);
            return "";
        }
    }

    private detachEvents(): void {
        if (this.detachRequesting) {
            this.detachRequesting();
        }
    }
}