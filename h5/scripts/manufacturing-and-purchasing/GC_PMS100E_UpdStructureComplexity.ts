/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-07
 * Summary     : This script is designed to automatically calculate and populate the Structure Complexity field (WHSCOM) 
 * on panel PMS100/E based on order quantity and yield quantity. 
 * It improves consistency by enforcing business logic across valid order types and reduces the risk of manual data entry errors.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-07 | Initial script creation
 */
class GC_PMS100E_UpdStructureComplexity {
  private controller: IInstanceController;
  private log: IScriptLog;
 private content: JQuery;
  private warehouse: string = "";
  private orderQty: number = 0;
  private yieldQty: number = 0;
  private orderType: string = "";
  private structureComplexField: any;

  private readonly validOrderTypes = ["P03", "P04", "P06", "B03", "B04", "B06", "K03", "K04", "K06"];
  
  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
  }

  public run(): void {
    try {
      const panelName = this.controller.GetPanelName();
      if (panelName !== "PMA100E0") {
        console.log(`Not running on PMS100E. Current panel: ${panelName}`);
        return;
      }

      this.warehouse = ScriptUtil.GetFieldValue("VHWHLO");
      this.orderType = ScriptUtil.GetFieldValue("VHORTY");
      const orderQtyStr = ScriptUtil.GetFieldValue("WWORQA");
      const yieldQtyStr = ScriptUtil.GetFieldValue("WWBAQT");
      //const yieldQtyStr = '7';
      this.structureComplexField = ScriptUtil.FindChild(this.content, "WHSCOM");
      console.log(`content-----: ${this.content}`);
      console.log(`structureComplexField-----: ${this.structureComplexField}`);
      console.log(`Order Type: ${this.orderType}`);

      // Validate numeric inputs
      this.orderQty = parseFloat(orderQtyStr) || 0;
      this.yieldQty = parseFloat(yieldQtyStr) || 0;

      if (this.validOrderTypes.indexOf(this.orderType) !== -1) {
        if (!this.yieldQty) {
          this.structureComplexField?.val("");
        } else {
          const batches = Math.floor(this.orderQty / this.yieldQty);
          this.structureComplexField?.val(batches.toString());
          ScriptUtil.SetFieldValue("WHSCOM", batches.toString());
          console.log(`Batches calculated: ${batches}`);
        }
      }

    } catch (ex: any) {
      this.log.Error(`Error in script: ${ex.message || ex}`);
    }
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new GC_PMS100E_UpdStructureComplexity(scriptArgs).run();
  }
}

