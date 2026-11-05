/**
 * Author      : Kelum Ganegoda (Fortude)
 * Created on  : 2025-06-20
 * Summary     : This script is standard one in ISO. There is no equivalent H5 scripts. Perhaps this is not required in MT.
 *              However, I uplifted it.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 *  
 */
class EntryModeSetter {
    private controller: IInstanceController;
    private args: string;
    private log: IScriptLog;

    private contentElement: any;

    private detachRequesting: Function;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;

        this.detachRequesting = null;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new EntryModeSetter(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing.");
        // Subscribe to Instance Controller events
        this.attachEvents(this.controller);
        ;
    }

    private attachEvents(controller: IInstanceController): void {
        this.detachRequesting = controller.Requesting.On((e) => {
            this.onRequesting(e);
        });
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        this.log.Info("args.commandType " + args.commandType + " args.commandValue " + args.commandValue);
        if (args.commandType == "LSTOPT") {
            InstanceCache.Add(this.controller, "LSTOPT", args.commandValue);
            this.log.Info("InstanceCache saved");

        }
    }
}