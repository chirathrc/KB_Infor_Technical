/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-04
 * Summary     : This script enforces order integrity in the PMS086 program by restricting Change 
 * (option 2) and Delete (option 4) list options when the order status is "90". 
 * It is designed to prevent modification or deletion of completed or closed orders that are no longer 
 * editable according to business rules.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-04 | Initial script creation
 */
class GC_PMS086_ValidateChgDelOptions {
  private controller: IInstanceController;
  private log: IScriptLog;
  private status: string = "";
  private isUnloaded: boolean = false;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
  }

  public run(): void {
    this.log.Info("Script Initializing.");

    const content = this.controller.GetContent();

    // Safely get status field value
    const statusValue = ScriptUtil.GetFieldValue("VOWOST") as string | undefined;
        this.log.Info("Status Value: " + statusValue);

        if (statusValue) {
          this.status = statusValue.substring(0, 2);
          this.log.Info("Status set: " + this.status);
        } else {
          this.log.Info("VOWOST field is empty or not found");
        }


    // Attach listeners
    this.controller.Requesting.On(this.onRequesting.bind(this));
    this.controller.RequestCompleted.On(this.onRequested.bind(this));

    this.log.Info("Script initialized");
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    this.log.Info("OnRequesting");

    if (
      this.status === "90" &&
      e.commandType === "LSTOPT" &&
      (e.commandValue === "2" || e.commandValue === "4")
    ) {
      e.cancel = true;
      this.log.Info("Cannot proceed");
      this.log.Info("Order Status is 90. Change or Delete is not Permitted");
      this.controller.ShowMessage(
        "Order Status is 90. Change or Delete is not Permitted"
      );
    } else {
      this.log.Info("Proceed");
    }
  }

  private onRequested(e: RequestEventArgs): void {
    this.isUnloaded = true;
    this.controller.Requesting.Off(this.onRequesting.bind(this));
    this.controller.RequestCompleted.Off(this.onRequested.bind(this));
    this.log.Info("Script unloaded");
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new GC_PMS086_ValidateChgDelOptions(scriptArgs).run();
  }
}