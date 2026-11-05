/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-07
 * Summary     : This script enforces business logic for Medipack items (Item Type = G06) 
 * in the PMS101 program by restricting the use of the F12 (Previous) key. The rule ensures 
 * that users do not accidentally navigate away from the form when Medipack quantity 
 * calculations are performed, which may lead to data inconsistencies.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-07 | Initial script creation
 */
class GC_PMS101F_MediPack_ResF12 {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;
  private itemType: string = "";
  private detachRequesting: Function;
  private detachRequestCompleted: Function;

  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent(); // returns JQuery
    this.detachRequesting = null;
    this.detachRequestCompleted = null;
  }

  public run(): void {
    try {
      const panel = this.controller.GetPanelName();
      if (panel !== "PMA101F0") {
        console.log(`This script runs only on PMS101F, current panel is: ${panel}`);
        return;
      }

      const itemTypeField = ScriptUtil.GetFieldValue( "MMITTY");
      this.itemType = itemTypeField;

      //this.controller.Requesting.On(this.onRequesting.bind(this));
      //this.controller.Requested.On(this.onRequested.bind(this));
      this.attachEvents(this.controller);

      console.log(`Script initialized. ItemType: ${this.itemType}`);
    } catch (ex: any) {
      this.log.Error(`Initialization error: ${ex.message || ex}`);
    }
  }

  private attachEvents(controller: IInstanceController): void {
        this.detachRequesting = controller.Requesting.On((e) => {
            this.onRequesting(e);
        });
        this.detachRequestCompleted = controller.RequestCompleted.On((e) => {
            this.onRequestCompleted(e);
        });
    }

  private onRequesting(e: CancelRequestEventArgs): void {
    try {
      if (this.itemType === "G06" && e.commandType === "KEY" && e.commandValue === "F12") {
        e.cancel = true;
        this.controller.RenderEngine.ShowMessage(
          "Quantity calculation performed. Unable to perform F12 (previous) option."
        );
        console.log("F12 blocked for Medipack item (G06)");
      } else {
        console.log("F12 allowed or not applicable");
      }
    } catch (ex: any) {
      this.log.Error(`onRequesting error: ${ex.message || ex}`);
    }
  }

  private onRequested(e: RequestEventArgs): void {
    try {
      this.controller.Requesting.Off(this.onRequesting.bind(this));
      this.controller.Requested.Off(this.onRequested.bind(this));
      console.log("Script GC_PMS101F_MediPack_ResF12 unloaded.");
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
    new GC_PMS101F_MediPack_ResF12(scriptArgs).run();
  }
}


