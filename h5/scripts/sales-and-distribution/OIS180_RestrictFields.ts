/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-08
 * Summary     : Disables Invoice Date and Accounting Date fields on OIS180/E
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-08 | Initial script creation
 */

class OIS180_RestrictFields {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;

  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
  }

  public run(): void {
    this.log.Info("OIS180_RestrictFields script initializing...");

    const panel = this.controller.GetPanelName();
    if (panel === "OIA180E0") {
      //const invoiceDateField = ScriptUtil.GetFieldValue("WDIDAT");
      //const accDateField = ScriptUtil.GetFieldValue("WDACDT");

      var invoiceDateField = this.controller.GetContentElement().GetElement("WDIDAT");
      var accDateField = this.controller.GetContentElement().GetElement("WDACDT");

      
     console.log(`Dates++-------: ${invoiceDateField}/${accDateField}`);
      if (invoiceDateField) {
        //invoiceDateField.prop('disabled', 'disabled');
        $('#WDIDAT').prop('disabled', true);
        $('#WDIDAT').addClass('disabled').prop('disabled', true);
        this.log.Debug("WDIDAT (Invoice Date) field disabled.");
      }

      if (accDateField) {
        //accDateField.prop('disabled', 'disabled');
        $('#WDACDT').prop('disabled', true);
        $('#WDACDT').addClass('disabled').prop('disabled', true);
        this.log.Debug("WDACDT (Accounting Date) field disabled.");
      }
    } else {
      this.log.Info(`Not on OIS180E panel, current: ${panel}`);
    }

    this.log.Info("OIS180_RestrictFields script initialized.");
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new OIS180_RestrictFields(scriptArgs).run();
  }
}

