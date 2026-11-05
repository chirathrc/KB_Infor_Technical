/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 27/06/2025
 * Summary     : Added a button in Change mode to submit POs with status 12 for approval by updating TEOR via PPS200MI.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 27/07/2025 | Initial script creation
 */

class PPS200E_M3POApproval {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private button: ButtonElement;
  private isIPAAllowed = false;
  private miService;
  private $btn: any;

  private CONO = "";
  private PUNO = "";
  private DIVI = ScriptUtil.GetUserContext().CurrentDivision;
  private LANG = ScriptUtil.GetUserContext().CurrentLanguage;
  

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();

    this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
  }

  public static Init(args: IScriptArgs): void {
    new PPS200E_M3POApproval(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("PPS200E_M3POApproval initialized");

    $("#WATEOR").css("pointer-events", "none");
    $("#WATEOR-label").css("pointer-events", "none");

    const statusField = this.controller.GetValue("WAPUSL");
    const TEORValue = this.controller.GetValue("WATEOR");
    const LANG = ScriptUtil.GetUserContext().CurrentLanguage;
    // console.log(LANG);
    // console.log(statusField);
    console.log("TEOR raw value:", TEORValue, typeof TEORValue);


    const mode = this.controller.GetMode(); // "2" means Change/Update
    // console.log(mode);

    if (mode === "5" && statusField === "12" && TEORValue === false) {
      const label = this.LANG === "CS" ? "提交审批" : "Submit for Approval";

      this.button = new ButtonElement();
      this.button.Name = "btnSubmitApproval";
      this.button.Value = label;
      this.button.Position = new PositionElement();
      this.button.Position.Top = 3;
      this.button.Position.Left = 55;
      this.button.Position.Width = 8;

      const $btn = this.contentElement.AddElement(this.button);
      this.$btn = $btn;
      $btn.click(() => this.onClick());
    }
  }

  private onClick(): void {
    // this.controller.SetValue("btnSubmitApproval", ""); // Simulates disabling

    this.CONO = ScriptUtil.GetUserContext().CurrentCompany;
    this.PUNO = this.controller.GetValue("WWPUNO");
    console.log(this.PUNO);
    console.log(this.CONO);

    this.updateTEOR();

    // const message =
    //   this.LANG === "CS"
    //     ? "提交工作流程"
    //     : "Submitted for Approval Workflow";

    // this.controller.ShowMessage(message);
    if (this.$btn) {
      this.$btn.prop("disabled", true);
    }

  }

  private updateTEOR(): void {
    const request = new MIRequest();
    request.program = "PPS200MI";
    request.transaction = "UpdHead";
    request.record = {
      CONO: this.CONO,
      PUNO: this.PUNO,
      TEOR: "1",
    };
    request.outputFields = ["TEOR", "PUNO"];

    // Send the request and handle the response
    this.miService.executeRequestV2(request).then((response: IMIResponse) => {
        this.handleResponse(response);  // Process response if successful
        console.log("MI Response: ", response);
    }).catch((response: IMIResponse) => {
        console.log("MI call failed: " + response.errorMessage);  // Handle errors
        this.showFailureMessage();
    });  
  }

  private handleResponse(response: IMIResponse): void {
    if (response.hasError()) {
      this.log.Error("MI error: " + response.errorMessage);
      this.showFailureMessage();
    } else {
      this.controller.PressKey("F5");
      
      if (this.LANG === "CS") {
        this.controller.ShowMessage("工序流程状态: 工序流程启动");
        } else {
        this.controller.ShowMessage("ProcessFlow Status: ProcessFlow Started Successfully");
        }
    }
  }

  private showFailureMessage(): void {
    if (this.LANG === "CS") {
      this.controller.ShowMessage("工序流程状态: 未成功");
    } else {
      this.controller.ShowMessage("ProcessFlow Status: Not Successful");
    }
  }
}

