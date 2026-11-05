/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-04
 * Summary     : This script automates the selection of the "Flag Complete" checkbox on panel PMS050/E for bulk 
 * manufacturing orders based on the item type. It ensures that MOs of type G02 are always flagged as completed 
 * during the user session to streamline the process and enforce configuration policy.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-04 | Initial script creation
 */
class GC_PMS050E_FlagBulkMOs {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: IContentElement;
  private itemType: string = "";
  private flagField: any;

  public constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContentElement();
  }

  public run(): void {
    try {
      const panelName = this.controller.GetPanelName();
      if (panelName !== "PMA050E0") {
        console.log(`This script is only valid for PMA050E0 , current panel is ${panelName}`);
        return;
      }

      // Retrieve field values
      this.itemType = ScriptUtil.GetFieldValue("MMITTY");
      this.flagField = ScriptUtil.FindChild(this.controller.GetContent(), "WHREND");

      console.log(`ItemType=${this.itemType}`);

      if (this.itemType === "G02") {
      //if (this.itemType === "B01") {
        this.flagField?.prop("checked", true);
        ScriptUtil.SetFieldValue("WHREND", "1");
        console.log("Flag complete checkbox marked for bulk MO.");
      }

      console.log("GC_PMS050E_FlagBulkMOs script loaded successfully.");
    } catch (ex: any) {
      console.log(`Exception in GC_PMS050E_FlagBulkMOs: ${ex.message || ex}`);
    }
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new GC_PMS050E_FlagBulkMOs(scriptArgs).run();
  }
}

