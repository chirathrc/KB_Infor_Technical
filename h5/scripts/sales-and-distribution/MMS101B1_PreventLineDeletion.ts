/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-07-07
 * Summary     : Disables Delete Button for orders with status ‘29’, ‘39’, ‘49’, ‘69’, ‘99’ on MMS101B panel.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * Nethum Ariyarthna    | 2025-07-07 | Initial script creation
 */



class MMS101B1_PreventLineDeletion {
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
        new MMS101B1_PreventLineDeletion(args).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("Script Initializing 1");

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
          const header = this.controller.GetPanelName(); // <- call the method
        console.log(`GetPanelName=${header}`);

         if (header === "MMA101BC") { 
        console.log("Command Type: " + args.commandType + " | Command Value: " + args.commandValue);
        console.log("Panel Name: " + this.controller.GetPanelName());

        // Check if the operation is a delete (LSTOPT, command value 4)
        if (args.commandType === "LSTOPT" && args.commandValue === "4") {
            let orderStatuses = ListControl.ListView.GetValueByColumnName("TRSH");
            console.log(orderStatuses);

            let selectedStatus = orderStatuses[0];
            console.log("Selected Status: " + selectedStatus);

            // If the selected status is 29, 39, 49, 69, or 99, cancel the delete action
            if (["29", "39", "49", "69", "99"].indexOf(selectedStatus) !== -1) {
                args.cancel = true;
                this.controller.ShowMessage(this.generateErrorMessage());
            }
        }
    }
    }

    private onRequestCompleted(args: CancelRequestEventArgs): void {
       // this.detachEvents(); // Unsubscribe from events after request completion
    }

    private detachEvents(): void {
        this.detachRequesting();
        this.detachRequestCompleted();
    }

    // Generate the localized error message
    private generateErrorMessage(): string {
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN"; // Default to EN if no language found
        console.log("User Language: " + this.LANG);

        if (this.LANG  === "CS") {
            return "不允许删除销售线状态99";  // CS (Chinese) message
        } else if (this.LANG  === "VI") {
            return "dòng trạng thái 99 không được cho phép";  // VI (Vietnamese) message
        } else {
            return "Line status 99 deletion not allowed";  // Default message in English
        }
    }
}


