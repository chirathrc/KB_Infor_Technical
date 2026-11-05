/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-09
 * Summary     : Calculates bags for Medi Pack item based on yield and item type
 * 
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-09 | Initial script creation
 */

class PMS101E_MediPackV7 {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;
  private listOption: string | undefined;
  private isUnloaded = false;
  private detachRequesting: Function;
  private detachRequestCompleted: Function;
  
  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
  }

  public run(): void {
    const panel = this.controller.GetPanelName();
    if (panel !== "PMA101E0") {
      console.log(`Script only runs on PMS101E0. Current panel: ${panel}`);
      return;
    }

    this.attachEvents(this.controller);
    console.log("PMS101E_MediPackV7 script initialized.");
  }

  private attachEvents(controller: IInstanceController) {
    this.detachRequesting = controller.Requesting.On((e) => {
      this.onRequesting(e);
    });
    this.detachRequestCompleted = controller.RequestCompleted.On((e) => {
            this.onRequestCompleted(e);
        });
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    console.log("onRequesting called.");
    let detachEventflags = true;
    this.listOption = e.commandValue;
    const panelHeader = this.controller.GetPanelName();
    console.log(`commandType: ${e.commandType}, commandValue: ${e.commandValue}, this.listOption: ${this.listOption}, panelHeader: ${panelHeader}`);
    if (panelHeader !== "PMA101E0") return;
    if (e.commandType === "KEY" && e.commandValue === "ENTER" ) {
      const qtyField = ScriptUtil.GetFieldValue("WWCNQT");
      const yieldField = ScriptUtil.GetFieldValue("WWBAQT");
      const itemTypeField = ScriptUtil.GetFieldValue("MMITTY");
      const uomField = ScriptUtil.GetFieldValue("WMPEUN");

      const itemType = itemTypeField || "";
      const uom = uomField || "";

      const quantityStr = qtyField || "0";
      const yieldStr = yieldField || "0";

      const quantity = parseFloat(quantityStr);
      const yieldQty = parseFloat(yieldStr);

      console.log(`Quantity: ${quantity}, Yield: ${yieldQty}, Type: ${itemType}, UOM: ${uom}`);

      if (itemType === "G06" && uom === "PCK") {
        const bags = (yieldQty / 1000) * quantity;
        const bagsStr = bags.toFixed(2);

        // Set the field value
        ScriptUtil.SetFieldValue("WWCNQT", bagsStr);
        $("#WWCNQT").val(bagsStr);
        $("#WWCNQT").text(bagsStr);
  
        console.log(`Calculated bags set to WWCNQT: ${bagsStr}`);
      }
    }
    if (detachEventflags) {
      this.detachEvents();
    }
  }

  private onRequested(e: RequestEventArgs): void {
    try {
      this.controller.Requesting.Off(this.onRequesting.bind(this));
      this.controller.Requested.Off(this.onRequested.bind(this));
      } catch (ex: any) {
      this.log.Error(`onRequested error: ${ex.message || ex}`);
    }
  }

  private onRequestCompleted(args: CancelRequestEventArgs): void {
        this.detachEvents(); 
    }

    private detachEvents(): void {
        this.detachRequesting();
        this.detachRequestCompleted();
    }

  

  public static Init(scriptArgs: IScriptArgs): void {
    new PMS101E_MediPackV7(scriptArgs).run();
  }
}

