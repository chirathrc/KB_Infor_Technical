/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-10
 * Summary     : Disables WWOVCD and WWCEVA fields on PPS215/E
 * 
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-10 | Initial script creation
 */
 

class PPS215 {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;

  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
  }

  public run(): void {
    const panelName = this.controller.GetPanelName();
    console.log(`Initializing PPS215_DisableFields on panel ${panelName}`);

    if (panelName !== "PPA215E0") {
      console.log("Not PPS215/E panel. Exiting.");
      return;
    }

    // Find and disable fields
    const bpQtyField = ScriptUtil.FindChild(this.content, "WWOVCD");
    const ceAmountField = ScriptUtil.FindChild(this.content, "WWCEVA");

    if (bpQtyField) {
      bpQtyField.prop("disabled", true);
      $('#WWOVCD').prop('disabled', true);
      $('#WWOVCD').addClass('disabled').prop('disabled', true);
      console.log("Field WWOVCD disabled.");
    }

    if (ceAmountField) {
      ceAmountField.prop("disabled", true);
      $('#WWCEVA').prop('disabled', true);
      $('#WWCEVA').addClass('disabled').prop('disabled', true);
      console.log("Field WWCEVA disabled.");
    } 

    console.log("PPS215_DisableFields script completed.");
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new PPS215(scriptArgs).run();
  }
}

