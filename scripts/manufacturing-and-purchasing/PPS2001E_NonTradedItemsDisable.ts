/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 11/08/2025
 * Summary     : Disables fields if GETY from PPS200MI GetLine is '28' or '29'.
 */
//  *
//  * Version Log :
//  * Changed By  | Date       | Summary of the change
//  * ------------|------------|-----------------------------
//  * NimeshaPa    | 11/08/2025 | Initial script creation
//  */


class PPS2001E_NonTradedItemsDisable {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private miService;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();

    this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
  }

  public static Init(args: IScriptArgs): void {
    new PPS2001E_NonTradedItemsDisable(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("PPS2001E_NonTradedItemsDisable initialized");

    const mode = this.controller.GetMode();
    if (mode === "2") {  // Change/Edit mode
      const PUNO = this.controller.GetValue("IAPUNO") || "";
      const PNLI = this.controller.GetValue("WWPNLI") || "";
      const PNLS = this.controller.GetValue("WWPNLS") || "";

      this.callGetLine(PUNO, PNLI, PNLS);
    }
  }

  private callGetLine(PUNO: string, PNLI: string, PNLS: string): void {
    this.log.Info(`Calling PPS200MI GetLine with PUNO=${PUNO}, PNLI=${PNLI}, PNLS=${PNLS}`);

    const request = new MIRequest();
    request.program = "PPS200MI";
    request.transaction = "GetLine";
    request.record = {
      PUNO,
      PNLI,
      PNLS,
    };
    request.outputFields = ["GETY"];

    this.miService.executeRequestV2(request)
      .then((response: IMIResponse) => this.handleResponse(response))
      .catch((response: IMIResponse) => {
        this.log.Error("MI call failed: " + response.errorMessage);
        this.controller.ShowMessage("Error while requesting via PPS200MI.GetLine API");
      });
  }

  private handleResponse(response: IMIResponse): void {
    if (response.hasError()) {
      this.log.Error("MI error: " + response.errorMessage);
      this.controller.ShowMessage("Error while requesting via PPS200MI.GetLine API");
      return;
    }

    this.log.Info("PPS200MI.GetLine response received");

    if (!response.items || response.items.length === 0) {
      this.log.Info("No data returned from PPS200MI.GetLine");
      return;
    }

    for (const item of response.items) {
      const GETY = item.GETY;
      this.log.Info("GETY=" + GETY);

      if (GETY === "28" || GETY === "29") {
        this.log.Info(`Disabling fields for GETY=${GETY}`);

        // Disable these Purchase Order Line fields on E panel
        this.setFieldEnabled("ORQA", false);
        this.setFieldEnabled("PUUN", false);
        this.setFieldEnabled("PUPR", false);
        this.setFieldEnabled("PPUN", false);
      }
    }
  }

    private setFieldEnabled(fieldName: string, enabled: boolean): void {
    const $field = $(`#${fieldName}`);
    if ($field.length) {
        $field.prop("disabled", !enabled);
    } else {
        this.log.Info(`Field ${fieldName} not found`);
    }
    }
}
