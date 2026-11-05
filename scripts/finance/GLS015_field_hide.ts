/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-07
 * Summary     : This script automatically sets the field WWVDSC (Voucher Description) to 
 * the value "转账凭证" (translated: Transfer Voucher) on panel GLS015. 
 * It is triggered during Enter key action and once more on panel load, 
 * ensuring consistency in voucher text for specific financial transactions.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-07 | Initial script creation
 */
class GLS015_field_hide {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;
  private fieldApp: JQuery | undefined;

  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new GLS015_field_hide(scriptArgs).run();
  }

  public run(): void {
    console.log("script initializing...");

    // Find the field
    console.log("fieldApp------->", this.fieldApp);
    if (!this.fieldApp) {
      this.log.Error("Field 'WWVDSC' not found.");
      return;
    }
    ScriptUtil.SetFieldValue("WWVDSC", "转账凭证");
    // Register events
    this.controller.Requesting.On(this.onRequesting.bind(this));
    this.controller.Requested.On(this.onRequested.bind(this));

    console.log("GLS015_field_hide script initialized.");
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    if (e.commandType === "KEY" && e.commandValue === "ENTER") {
      this.fieldApp?.val("转账凭证");
      ScriptUtil.SetFieldValue("WWVDSC", "转账凭证");
      console.log("onRequesting");
    }
  }

  private onRequested(e: RequestEventArgs): void {
    this.controller.Requesting.Off(this.onRequesting.bind(this));
    this.controller.Requested.Off(this.onRequested.bind(this));
    this.fieldApp?.val("转账凭证");
    ScriptUtil.SetFieldValue("WWVDSC", "转账凭证");
    console.log("onRequested");
  }

  
}

