/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 04/08/2025
 * Summary     : Prevents list option 2 or 35 execution in PPS220/B if line-level approval (TEOR) is already set.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa   | 04/08/2025 | Updated to use PPS200MI.GetPO for line-level approval check
 */

class PPS220B_ValidatePOApproval {
  private controller: IInstanceController;
  private log: IScriptLog;
  private list: IActiveGrid;
  private selectedPUNO: string = "";
  private CONO = "";
  private TEORValidated: boolean = false;
  private TEOR: string | number = -1;
  private pressedKey: string = "";
  private LANG: string;
  private miService;
  private detachRequesting: Function;
  private detachRequested: Function;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.list = this.controller.GetGrid();
    this.LANG = ScriptUtil.GetUserContext().CurrentLanguage;
    this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    this.CONO = ScriptUtil.GetUserContext().CurrentCompany;
  }

  public static Init(args: IScriptArgs): void {
    new PPS220B_ValidatePOApproval(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("PPS220B_ValidatePOApproval initialized");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));
  }

//   private onRowSelected(): void {
//     this.TEORValidated = false;

//     // const selectedRows = this.list.getSelectedGridRows();
//     // if (selectedRows) {
//     //   this.selectedPUNO = selectedRows["PUNO"]?.trim() || "";
//     //   this.selectedPNLI = selectedRows["PNLI"]?.trim() || "";
//     // }

//     const selectedRows = this.list.getSelectedGridRows();
//     if (selectedRows && selectedRows.length > 0) {
//     const row = selectedRows[0];
//     this.selectedPUNO = row["PUNO"]?.trim() || "";
//     this.selectedPNLI = row["PNLI"]?.trim() || "";
//     }
//   }

  private onRequesting(args: CancelRequestEventArgs): void {
    const panelHeader = this.controller.GetPanelName();
    console.log(panelHeader);
    const commandType = args.commandType;
    const commandValue = args.commandValue;
    this.TEORValidated = false;

    // const selectedRows = this.list.getSelectedGridRows();
    // if (selectedRows) {
    //   this.selectedPUNO = selectedRows["PUNO"]?.trim() || "";
    //   this.selectedPNLI = selectedRows["PNLI"]?.trim() || "";
    // }

    const selectedRows = this.list.getSelectedGridRows();
    if (selectedRows && selectedRows.length > 0) {
      for (const selected of selectedRows) {
        const data = selected.data;  
        this.selectedPUNO = data["IBPUNO"]?.trim() || "";
      }
    }
    if (
      (panelHeader =="PPA220BC") &&
      commandType === "LSTOPT" &&
      (commandValue === "2" || commandValue === "35")
    ) {
      if (!this.TEORValidated) {
        this.pressedKey = commandValue;
        args.cancel = true;
        // this.setWaitCursor(true);
        this.callMDBREADMI_GetMPHEAD0001(); // updated function
        console.log(this.selectedPUNO);
      } 
    }
  }

  private callMDBREADMI_GetMPHEAD0001(): void {
    const request = new MIRequest();
    request.program = "MDBREADMI";
    request.transaction = "GetMPHEAD0001";
    request.record = {
      CONO: this.CONO,
      PUNO: this.selectedPUNO,
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

  if (this.TEOR === "1") {
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
    this.controller.ShowMessage(errMsg);
  } else {
    // Prevent recursive crash
    if (this.detachRequesting) this.detachRequesting();
    if (this.detachRequested) this.detachRequested();

    // Trigger original list option safely
    setTimeout(() => {
      this.controller.ListOption(this.pressedKey);
    }, 200);
  }
}


  private onRequested(args: RequestEventArgs): void {
        this.log.Info("RequestCompleted event triggered");

        if (this.detachRequesting) this.detachRequesting();
        if (this.detachRequested) this.detachRequested();
    }

//   private setWaitCursor(wait: boolean): void {
//     const host = this.controller.GetHost();
//     const impl = host?.Implementation;
//     if (impl) {
//       impl.Cursor = wait ? "wait" : "default";
//       impl.ForceCursor = wait;
//     }
//   }
}
