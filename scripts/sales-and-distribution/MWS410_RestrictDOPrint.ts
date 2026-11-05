/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-07-11
 * Summary     : This Script prevents actions 15, 21, 27, 28 when PGRS is below 90.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * Nethum Ariyarathna    | 2025-07-11 | Initial script creation
 */


class MWS410_RestrictDOPrint {
    private controller: IInstanceController;
    private log: IScriptLog;
    private LANG: string = "";

    private detachRequesting: Function;
    private detachRequestCompleted: Function;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;

        this.detachRequesting = null;
        this.detachRequestCompleted = null;
    }

    public static Init(args: IScriptArgs): void {
        new MWS410_RestrictDOPrint(args).run();        
    }

    private run(): void {
        console.clear();
        this.log.Info("Script Initializing");

        // Subscribe to Instance Controller events
        this.attachEvents(this.controller);
    }

    private attachEvents(controller: IInstanceController): void {
        this.detachRequesting = controller.Requesting.On((e) => {
            this.onRequesting(e);
        });
        this.detachRequestCompleted = controller.RequestCompleted.On((e) => {
            this.onRequestCompleted(e);
        });
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        console.log("Command Type: " + args.commandType + " | Command Value: " + args.commandValue);
        console.log("Panel Name: " + this.controller.GetPanelName());

        // Check if the operation is one of the restricted actions (15, 21, 27, 28)
        if (args.commandType === "LSTOPT" && ["15", "21", "27", "28"].indexOf(args.commandValue) !== -1) {
            let pgrsValues = ListControl.ListView.GetValueByColumnName("PGRS");
            console.log(pgrsValues);

            let selectedPGRS = pgrsValues[0];
            console.log("Selected PGRS: " + selectedPGRS);

            // If the PGRS value is less than 90, cancel the action
            if (parseInt(selectedPGRS) < 90) {
                args.cancel = true;
            this.controller.ShowMessage(this.generateErrorMessage());
            }
        }
    }

        // Get localized error message based on the language
    private generateErrorMessage(): string {
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN"; // Default to EN if no language found
        console.log("User Language: " + this.LANG);

        if (this.LANG === "CS") {
            return "交货尚未完成";  // CS (Chinese) message
        } else if (this.LANG === "VI") {
            return "Giao hàng vẫn chưa hoàn thành";  // VI (Vietnamese) message
        } else {
            return "Delivery is not yet completed";  // Default message in English
        }
    }

    private onRequestCompleted(args: CancelRequestEventArgs): void {
        //this.detachEvents(); // Unsubscribe from events after request completion
        this.log.Info("Request Completed Event Triggered");
    }

    private detachEvents(): void {
        this.detachRequesting();
        this.detachRequestCompleted();
    }
}