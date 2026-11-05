/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-04
 * Summary     : The purpose of this script is to enforce validation on Invoice Date (WDIDAT) and
 *               Accounting Date (WDACDT) in panel OIS180/E, based on specific order types (WFORTP, WTORTP). 
 *               It ensures that these dates are equal to the current system date unless the order type 
 *               combination is allowed to bypass this rule.The script runs when the user presses Enter (KEY:ENTER)
 *               on the panel.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-04 | Initial script creation
 */
class CheckInvoice {
    private controller: IInstanceController;
    private elem: any;
    private args: string;
    private log: IScriptLog;

    private content: any;
    private CoTypeTo: string;
    private CoTypeFrom: string;
    private InvDate: string;
    private AccDate: string;
    private currDate: string;
    private detachRequesting: Function;

    public constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContentElement();
    }

    public run(): void {
        console.log("Script Initializing.");

        const header = this.controller.GetPanelName(); 
        if (header === "OIA180E0") {
            this.InvDate = ScriptUtil.GetFieldValue("WDIDAT");
            this.AccDate = ScriptUtil.GetFieldValue("WDACDT");
            this.CoTypeTo = ScriptUtil.GetFieldValue("WTORTP");
            this.CoTypeFrom = ScriptUtil.GetFieldValue("WFORTP");

            console.log(`CoTypeFrom=${this.CoTypeFrom} CoTypeTo=${this.CoTypeTo}`);

            const today = new Date();
            const dd = ('0' + today.getDate()).slice(-2);
            const mm = ('0' + (today.getMonth() + 1)).slice(-2);
            const yyyy = today.getFullYear().toString().slice(-2);

            this.currDate = `${dd}/${mm}/${yyyy}`;
            console.log(`Current=${this.currDate}`);
            console.log(`Invoice Date=${this.InvDate}`);

            //this.controller.Requesting.On(this.onRequesting.bind(this));
            this.attachEvents(this.controller);
        }
    }

    private attachEvents(controller: IInstanceController) {
    // event on requesting - used for adding code when something should be processed
    this.detachRequesting = controller.Requesting.On((e) => {
      this.onRequesting(e);
    });
  }

   private onRequesting(e: CancelRequestEventArgs): void {
    let detachEventflags = true;
    const header = this.controller.GetPanelName(); // <- call the method
    console.log(`GetPanelName=${header}`);
    this.InvDate = ScriptUtil.GetFieldValue("WDIDAT");
    this.AccDate = ScriptUtil.GetFieldValue("WDACDT");
    this.CoTypeTo = ScriptUtil.GetFieldValue("WTORTP");
    this.CoTypeFrom = ScriptUtil.GetFieldValue("WFORTP");

    if (header === "OIA180E0") {
        if (e.commandType === "KEY" && e.commandValue === "ENTER") {
            const allowedTypes = ["C08", "C15", "C26", "C36", "C37", "C46", "C66", "C57"];

            const fromAllowed = allowedTypes.indexOf(this.CoTypeFrom) !== -1;
            const toAllowed = allowedTypes.indexOf(this.CoTypeTo) !== -1;

            if (fromAllowed && toAllowed) {
                console.log("Allow");
            } else {
                if (this.InvDate !== this.currDate || this.AccDate !== this.currDate) {
                    console.log("Deny");
                    this.controller.RenderEngine.ShowMessage("发票日期和会计日期应该等于现在的日期");
                    e.cancel = true;
                    detachEventflags = false;
                    return;
                } else {
                    console.log("Allow");
                }
            }
        }
    }
    if (detachEventflags) {
      this.detachEvents();
    }
}

private detachEvents(): void {
    this.detachRequesting();
  }
    public static Init(scriptArgs: IScriptArgs): void {
        new CheckInvoice(scriptArgs).run();
    }
}
