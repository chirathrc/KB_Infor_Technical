/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 04/08/2025
 * Summary     : Prevents unauthorized execution in PPS201/B1 if TEOR (line-level approval) is already set.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa   | 04/08/2025 | Updated to use PPS200MI.GetPO for line-level approval check
 */

class PPS201B_ValidatePOApproval {
  private controller: IInstanceController;
  private log: IScriptLog;
  private LANG: string;
  private miService;
  private CONO: string = "";
  private TEORValidated: boolean = false;
  private TEOR: string | number = -1;
  private pressedKey: string = "";
  private commandType: string = "";
  private detachRequesting: Function;
  private detachRequested: Function;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.LANG = ScriptUtil.GetUserContext().CurrentLanguage;
    this.CONO = ScriptUtil.GetUserContext().CurrentCompany;
    this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
  }

  public static Init(args: IScriptArgs): void {
    new PPS201B_ValidatePOApproval(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("PPS201B_ValidatePOApproval initialized");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));
  }

  private onRequesting(args: CancelRequestEventArgs): void {
    const panelHeader = this.controller.GetPanelName();
    console.log(panelHeader);
    const commandType = args.commandType;
    const commandValue = args.commandValue;
    this.TEORValidated = false;

    const PUNO = this.controller.GetValue("IAPUNO")?.toString().trim();
    // console.log(PUNO);
    this.commandType = commandType;
    this.pressedKey = commandValue;

    if (
      panelHeader === "PPA201BC" &&
      ((commandType === "LSTOPT" && ["2", "3", "4", "12"].indexOf(commandValue) !== -1))) { //Remove command value 5
      if (!this.TEORValidated) {
        this.pressedKey = commandValue;
        args.cancel = true;
        // this.setWaitCursor(true);
        this.callMDBREADMI_GetMPHEAD0001(PUNO); // updated function
        console.log(PUNO); 
      }
    }
  }

  private callMDBREADMI_GetMPHEAD0001(PUNO: string): void {
    const request = new MIRequest();
    request.program = "MDBREADMI";
    request.transaction = "GetMPHEAD0001";
    request.record = {
      CONO: this.CONO,
      PUNO: PUNO,
    };
    request.outputFields = ["TEOR"];

    this.miService
      .executeRequestV2(request)
      .then((response: IMIResponse) => this.handleTEORResponse(response))
      .catch((error: IMIResponse) => {
        this.log.Error("MI call failed: " + error.errorMessage);
      });
  }

    private handleTEORResponse(response: IMIResponse): void {
    if (response.hasError()) {
      this.log.Error("MI Error: " + response.errorMessage);
      return;
    }

    const record = response.items?.[0] || response.item;
    if (!record) {
      this.log.Error("No MI record returned");
      return;
    }

    this.TEOR = record["TEOR"];
    this.TEORValidated = true;

    let errMsg = "";
    switch (this.LANG) {
      case "CS":
        errMsg = "采购订单批准 进度 - 不允许更改";
        break;
      case "VI":
        errMsg = "Phê duyệt PO trong Tiến độ - Thay đổi không được phép";
        break;
      default:
        errMsg = "PO Approval in Progress – Changes not allowed";
    }

    if (this.TEOR === "1") {
      // Show error message and stop
      this.controller.ShowMessage(errMsg);
      return;
    }

    // TEOR != 1 → safely replay original action
    if (this.commandType === "LSTOPT") {
      // Detach handlers to prevent recursion
      if (this.detachRequesting) this.detachRequesting();
      if (this.detachRequested) this.detachRequested();

      setTimeout(() => {
        this.controller.ListOption(this.pressedKey);
      }, 200);
    }
  }

  private onRequested(args: RequestEventArgs): void {
    this.log.Info("RequestCompleted event triggered");

    if (this.detachRequesting) this.detachRequesting();
    if (this.detachRequested) this.detachRequested();

    this.TEORValidated = false;
  }

  // Optional wait cursor
  // private setWaitCursor(wait: boolean): void {
  //   const host = this.controller.GetHost();
  //   const impl = host?.Implementation;
  //   if (impl) {
  //     impl.Cursor = wait ? "wait" : "default";
  //     impl.ForceCursor = wait;
  //   }
  // }
}
