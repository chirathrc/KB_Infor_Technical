/** 
 * Author      : Nimesha Pawani 
 * Created on  : 12/08/2025 
 * Summary     : Added "Confirm All" button to PPS310/A to inspect all GRN lines via PPS001MI.Inspect. 
 * 
 * Version Log : 
 * Changed By  | Date       | Summary of the change 
 * ------------|------------|----------------------------------------------------- 
 * NimeshaP | 12/08/2025    | Initial TypeScript conversion & updated to spec:  
 *                           LstReceivedPO + PPS001MI.Inspect 
 * ChirathR | 20/08/2026    | Updated to pass the current date (YYYYMMDD) with 
 *                           PPS310MI.QualityInspPO as per new requirement.
 */

class PPS310_QualityInspectAPI {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private button: ButtonElement;
  private miService;

  private CONO = ScriptUtil.GetUserContext().CurrentCompany;
  private LANG = ScriptUtil.GetUserContext().CurrentLanguage;
  private WHLO = "";
  private USER = ScriptUtil.GetUserContext("USID");

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();
    this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
  }

  public static Init(args: IScriptArgs): void {
    new PPS310_QualityInspectAPI(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("PPS310A_QualityInspectAPI initialized");
    console.log(this.USER);


    const panelHeader = this.controller.GetPanelName();
    console.log(panelHeader);
    const poNumber = this.controller.GetValue("WWPUNO");
    console.log(poNumber);

    if ((panelHeader === "PPA310A0")) {
      const label = this.LANG === "CS" ? "质检" : "Confirm All";

      this.button = new ButtonElement();
      this.button.Name = "btnConfirmAll";
      this.button.Value = label;
      this.button.Position = new PositionElement();
      this.button.Position.Top = 12;
      this.button.Position.Left = 40;
      this.button.Position.Width = 7;

      const $btn = this.contentElement.AddElement(this.button);
      $btn.click(() => this.onClick());

      // Set tooltip via the HTML title attribute
      $btn.attr(
        "title",
        this.LANG === "CS" ? "已经检测试所有收货单行" : "Inspect all GRN Lines"
      );
    }
  }

  private async onClick(): Promise<void> {
    try {
      this.disableButton(true);

      const poNumber = this.controller.GetValue("WWPUNO");
      const whlo = this.controller.GetValue("WWWHLO");
      this.WHLO = whlo;

      if (!poNumber) {
        this.showMessage(
          this.LANG === "CS" ? "请输入订单号码!" : "Please Enter a PO number!"
        );
        return;
      }

      this.log.Info(`Confirming all GRN lines for PO=${poNumber}`);

      // Step 1: Get GRN lines from PPS310MI.LstReceivedPO
      const grnLines = await this.getGRNLines(poNumber);

      if (!grnLines.length) {
        this.showMessage(
          this.LANG === "CS"
            ? "没有行需要检测!"
            : "There are no Lines to Inspect!"
        );
        return;
      }

      // Step 2: Call PPS001MI.Inspect for each line
      for (const line of grnLines) {
        await this.inspectGRNLine(line);
        if (this.WHLO === "N20") {
          await this.sleep(250); // Delay for WH=N20
        }
      }

      this.showMessage(
        this.LANG === "CS"
          ? "已经检测所有收货单行"
          : "Inspected all GRN Lines!"
      );

      // Refresh
      this.controller.PressKey("F5");
      this.controller.PressKey("F5");
    } catch (err) {
      this.log.Error("Error in Confirm All process: " + err);
      this.showMessage(
        this.LANG === "CS"
          ? "无效数据 - 请联系M3获取支持!"
          : "Invalid Data - M3!"
      );
    } finally {
      this.disableButton(false);
    }
  }

  private async getGRNLines(poNumber: string): Promise<any[]> {
    const request = new MIRequest();
    request.program = "PPS310MI";
    request.transaction = "LstReceivedPO";
    request.record = {
      CONO: this.CONO,
      PUNO: poNumber,
    };
    request.outputFields = ["REPN", "RVQA"];

    // const response = await this.miService.executeRequestV2(request);
    // if (response.hasError()) {
    //   throw new Error(
    //     this.LANG === "CS"
    //       ? "API数据读取错误!"
    //       : "Error Reading Information in API Data!"
    //   );
    // }

    // return response.items || [];
    try {
      const response = await this.miService.executeRequestV2(request);
      console.log("MI Response (LstReceivedPO):", response);

      if (response.hasError()) {
        const errMsg = response.errorMessage || "Unknown MI error in LstReceivedPO";
        this.log.Error(`MI error in LstReceivedPO for PUNO=${poNumber}: ${errMsg}`);
        throw new Error(errMsg);
      }

      if (!response.items || response.items.length === 0) {
        this.log.Info(`No GRN lines returned for PUNO=${poNumber}`);
        return [];
      }

      return response.items;
    } catch (err) {
      this.log.Error(`Exception in getGRNLines for PUNO=${poNumber}: ${err}`);
      throw err;
    }
  }

  private async inspectGRNLine(line: any): Promise<void> {

    var d = new Date();
    var currentDate =
      d.getFullYear() +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      ("0" + d.getDate()).slice(-2);

    this.log.Info("CurrentDate - " + currentDate); //YYYYMMDD

    const request = new MIRequest();
    request.program = "PPS310MI";
    request.transaction = "QualityInspPO";
    request.record = {
      REPN: line.REPN,       // Receiving Number
      RESP: this.USER,       // Logged-in User
      QCRA: "1",             // QIResult
      AQTY: line.RVQA,         // Receiving Qty
      TRDT: currentDate      //Current Date - new update 26/08/20
    };

    try {
      const response = await this.miService.executeRequestV2(request);
      console.log("MI Response (Inspect):", response);

      if (response.hasError()) {
        const errMsg = response.errorMessage || "Unknown MI error in Inspect";
        this.log.Error(`MI error inspecting REPN=${line.REPN}: ${errMsg}`);
        throw new Error(errMsg);
      }

      this.log.Info(`REPN=${line.REPN} inspected successfully`);
    } catch (err) {
      this.log.Error(`Exception in inspectGRNLine for REPN=${line.REPN}: ${err}`);
      throw err;
    }
  }

  private disableButton(disable: boolean): void {
    const $btn = $("#btnConfirmAll");
    $btn.prop("disabled", disable);
  }

  private showMessage(message: string): void {
    this.controller.ShowMessage(message);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

