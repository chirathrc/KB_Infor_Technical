class TestIssue {
    private controller: IInstanceController;
    private elem: any;
    private log: IScriptLog;
    private args: string;
    private uri: string;
    private miService;
    private scriptName: string;
    private detachRequesting: Function;
    private detachRequested: Function;
    private detachRequestCompleted: Function;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;
        this.scriptName = "TestIssue";
        this.miService = MIService;
        this.detachRequested = null;
    }

    /**
     * Script initialization function. 
     */
    public static Init(args: IScriptArgs): void {
        new TestIssue(args).run();
    }

    private run() {
        this.attachEvents(this.controller);
    }

    private onRequesting(e: RequestEventArgs) {
        if ((e.commandType === "KEY" && e.commandValue === "ENTER")) {
            debugger;
            console.log("Add - onRequesting");

            console.log("this.controller.GetValue(\"WBITNO\"): val=" +
                this.controller.GetValue("WBITNO"));

            console.log("ScriptUtil.GetFieldValue(\"WBITNO\", this.controller): val=" +
                ScriptUtil.GetFieldValue("WBITNO", this.controller));

            console.log("$('#' + this.controller.ParentWindow[0].id + ' #WBITNO').val(): val=" +
                $("#" + this.controller.ParentWindow[0].id + " #WBITNO").val());
        }

        if (e.commandType === "PAGE" && e.commandValue === "DOWN") {
            debugger;
            console.log("Scroll Down - onRequesting");
        }
    }

    private onRequested(args: RequestEventArgs): void {
        
    }

    private onRequestCompleted(e: RequestEventArgs): void {
        if (e.commandType == "PAGE" && e.commandValue != "DOWN") {
            debugger;
            this.detachEvents();
        }
    }

    private detachEvents(): void {
        this.detachRequesting();
        this.detachRequested();
        this.detachRequestCompleted();
    }

    private attachEvents(controller) {
        var _this = this;
        if (controller.Requesting.HasListeners()) {
            controller.Requesting.Clear();
        }
        this.detachRequesting = controller.Requesting.On(function (e) {
            _this.onRequesting(e);
        });
        this.detachRequested = controller.Requested.On(function (e) {
            _this.onRequested(e);
        });
        this.detachRequestCompleted = controller.RequestCompleted.On(function (e) {
            _this.onRequestCompleted(e);
        });

    };
}


