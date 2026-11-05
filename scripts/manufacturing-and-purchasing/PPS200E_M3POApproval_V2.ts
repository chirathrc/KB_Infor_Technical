/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 27/06/2025
 * Summary     : Added a button in Change mode to submit POs with status 12 for approval
 *               by updating TEOR via PPS200MI.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|--------------------------------------------------------------
 * NimeshaPa   | 27/07/2025 | Initial script creation
 * NethumA     | 14/03/2026 | V2 - For NON-TRADE order types (M04/M05), validate that Cost
 *             |            |      Center (COCE) and Profit Center (ACRF) are populated on
 *             |            |      all active PO lines before allowing submission.
 */

class PPS200E_M3POApproval_V2 {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private button: ButtonElement;
  private isIPAAllowed = false;
  private miService;
  private $btn: any;

  private CONO = "";
  private PUNO = "";
  private ORTY = "";
  private DIVI = ScriptUtil.GetUserContext().CurrentDivision;
  private LANG = ScriptUtil.GetUserContext().CurrentLanguage;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller     = scriptArgs.controller;
    this.log            = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();
    this.miService      = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
  }

  // ─── Entry Point ──────────────────────────────────────────────────────────────

  public static Init(args: IScriptArgs): void {
    new PPS200E_M3POApproval_V2(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("PPS200E_M3POApproval_V2 initialized...");

    // Prevent direct editing of TEOR field
    $("#WATEOR").css("pointer-events", "none");
    $("#WATEOR-label").css("pointer-events", "none");

    const statusField = this.controller.GetValue("WAPUSL");
    const TEORValue   = this.controller.GetValue("WATEOR");
    const mode        = this.controller.GetMode(); // "5" = Change mode

    console.log("Mode:", mode, "| Status:", statusField, "| TEOR:", TEORValue);

    // Render button only when: Change mode, PO status = 12, TEOR not yet flagged
    if (mode === "5" && statusField === "12" && TEORValue === false) {
      const label = this.LANG === "CS" ? "提交审批" : "Submit for Approval";

      this.button          = new ButtonElement();
      this.button.Name     = "btnSubmitApproval";
      this.button.Value    = label;
      this.button.Position = new PositionElement();
      this.button.Position.Top   = 3;
      this.button.Position.Left  = 55;
      this.button.Position.Width = 8;

      const $btn = this.contentElement.AddElement(this.button);
      this.$btn  = $btn;
      $btn.click(() => this.onClick());
    }
  }

  // ─── Button Click ─────────────────────────────────────────────────────────────

  private onClick(): void {
    this.CONO = ScriptUtil.GetUserContext().CurrentCompany;
    this.PUNO = this.controller.GetValue("WWPUNO");
    this.ORTY = this.controller.GetValue("IAORTY");

    console.log("PUNO:", this.PUNO, "| CONO:", this.CONO, "| ORTY:", this.ORTY);

    // Disable button immediately to prevent double-clicks during the async chain
    if (this.$btn) {
      this.$btn.prop("disabled", true);
    }

    // Step 1: Resolve the order-type description to detect NON-TRADE
    this.getOrderTypeDescription();
  }

  // ─── Step 1: Resolve order-type description ───────────────────────────────────

  /**
   * Calls MDBREADMI/GetMBMTRD00 to fetch MBMD (the coded value) for the PO order type.
   * NOTE: TX40 is NOT used here because in this M3 environment TX40 returns "TRADE"
   *       for all order types. TX15 correctly returns "NON-TRADE" for M04/M05.
   * If MBMD = "NON-TRADE", Cost Center & Profit Center validation is required (Step 2).
   * Any other value proceeds directly to the approval workflow (Step 3).
   */
  private getOrderTypeDescription(): void {
    this.log.Info("getOrderTypeDescription | ORTY: " + this.ORTY);

    const request       = new MIRequest();
    request.program     = "MDBREADMI";
    request.transaction = "GetMBMTRD00";
    request.record      = {
      DIVI: " ",
      IDTR: "104",
      MVXP: " ",
      EXTP: this.ORTY,
      MVXD: "POTYPE",
    };
    // Include MBMD in output fields - this is the correct field for NON-TRADE detection
    request.outputFields = ["MBMD", "TX15", "TX40"];

    this.miService.executeRequestV2(request)
      .then((response: IMIResponse) => {
        this.handleOrderTypeResponse(response);
      })
      .catch((response: IMIResponse) => {
        this.log.Error("getOrderTypeDescription failed: " + response.errorMessage);
        this.reEnableButton();
      });
  }

  private handleOrderTypeResponse(response: IMIResponse): void {
    if (response.hasError()) {
      this.log.Error("handleOrderTypeResponse error: " + response.errorMessage);
      this.reEnableButton();
      return;
    }

    const items = response.items;

    // No matching record found – treat as TRADE and proceed
    if (!items || items.length === 0) {
      this.log.Info("No record found – treating as TRADE");
      this.proceedWithApproval();
      return;
    }

    // Use MBMD for NON-TRADE detection (TX40 returns incorrect value in this environment)
    const MBMD: string = items[0]["MBMD"] || "";
    const TX15: string = items[0]["TX15"] || "";
    const TX40: string = items[0]["TX40"] || "";

    this.log.Info("ORTY: " + this.ORTY + " | MBMD: " + MBMD + " | TX15: " + TX15 + " | TX40: " + TX40);

    if (TX15 === "NON-TRADE") {
      // NON-TRADE (M04 / M05) – validate Cost Center & Profit Center on PO lines
      this.log.Info("NON-TRADE order type detected (TX15) – validating PO lines");
      this.validatePOLines();
    } else {
      // TRADE – no extra validation needed
      this.log.Info("TRADE order type – proceeding with approval");
      this.proceedWithApproval();
    }
  }

  // ─── Step 2: Validate PO lines (NON-TRADE only) ───────────────────────────────

  /**
   * Calls MDBREADMI/SelMPLINE15 to retrieve all lines for this PO.
   * For every active line (PUSL <= 20), both COCE (Cost Center) and ACRF (Profit Center)
   * must be populated. If any line fails, the submission is blocked and the user
   * is shown an error message with the button re-enabled to allow a retry.
   */
  private validatePOLines(): void {
    const WHLO = this.controller.GetValue("IAWHLO");
    this.log.Info("validatePOLines | WHLO: " + WHLO + " | PUNO: " + this.PUNO);

    const request       = new MIRequest();
    request.program     = "MDBREADMI";
    request.transaction = "SelMPLINE15";
    request.record      = {
      WHLO: WHLO,
      PUNO: this.PUNO,
    };
    request.outputFields = ["PNLI", "PUSL", "COCE", "ACRF"];

    this.miService.executeRequestV2(request)
      .then((response: IMIResponse) => {
        this.handlePOLinesResponse(response);
      })
      .catch((response: IMIResponse) => {
        this.log.Error("validatePOLines failed: " + response.errorMessage);
        this.reEnableButton();
      });
  }

  private handlePOLinesResponse(response: IMIResponse): void {
    if (response.hasError()) {
      this.log.Error("handlePOLinesResponse error: " + response.errorMessage);
      this.reEnableButton();
      return;
    }

    const items = response.items || [];
    let validationPassed = true;

    for (const item of items) {
      const PNLI = item["PNLI"] || "";
      const PUSL = parseInt(item["PUSL"] || "0", 10);
      const COCE = item["COCE"] || "";
      const ACRF = item["ACRF"] || "";

      this.log.Info(
        "PO Line | PNLI: " + PNLI + " | PUSL: " + PUSL +
        " | COCE: " + COCE + " | ACRF: " + ACRF
      );

      // Only active lines (PUSL <= 20) require Cost Center and Profit Center
      if (PUSL <= 20 && (COCE === "" || ACRF === "")) {
        validationPassed = false;
        this.showCostCenterError();
        break;
      }
    }

    if (validationPassed) {
      this.log.Info("PO line validation passed – proceeding with approval");
      this.proceedWithApproval();
    } else {
      // Re-enable so the user can fix the lines and retry
      this.reEnableButton();
    }
  }

  // ─── Step 3: Proceed with approval (update TEOR = 1) ─────────────────────────

  private proceedWithApproval(): void {
    this.isIPAAllowed = true;
    this.updateTEOR();
  }

  private updateTEOR(): void {
    const request       = new MIRequest();
    request.program     = "PPS200MI";
    request.transaction = "UpdHead";
    request.record      = {
      CONO: this.CONO,
      PUNO: this.PUNO,
      TEOR: "1",
    };
    request.outputFields = ["TEOR", "PUNO"];

    this.miService.executeRequestV2(request)
      .then((response: IMIResponse) => {
        this.handleUpdateTEORResponse(response);
        console.log("MI Response:", response);
      })
      .catch((response: IMIResponse) => {
        this.log.Error("updateTEOR failed: " + response.errorMessage);
        this.showFailureMessage();
        this.reEnableButton();
      });
  }

  private handleUpdateTEORResponse(response: IMIResponse): void {
    if (response.hasError()) {
      this.log.Error("updateTEOR MI error: " + response.errorMessage);
      this.showFailureMessage();
      this.reEnableButton();
    } else {
      // Refresh the panel to reflect the updated TEOR value
      this.controller.PressKey("F5");

      if (this.LANG === "CS") {
        this.controller.ShowMessage("工序流程状态: 工序流程启动");
      } else {
        this.controller.ShowMessage("ProcessFlow Status: ProcessFlow Started Successfully");
      }
    }
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────────

  /** Re-enable the Submit button so the user can retry after fixing an issue. */
  private reEnableButton(): void {
    if (this.$btn) {
      this.$btn.prop("disabled", false);
    }
  }

  /**
   * Shown when a NON-TRADE PO line is missing Cost Center (COCE)
   * or Profit Center (ACRF).
   */
  private showCostCenterError(): void {
    if (this.LANG === "CS") {
      this.controller.ShowMessage(
        "错误信息: 检查并更新订单行的成本中心和利润中心"
      );
    } else {
      this.controller.ShowMessage(
        "Error: Unable to Submit for Approval. " +
        "Check and Update Cost Center and Profit Center for all PO Lines."
      );
    }
  }

  /** Generic failure message for unexpected MI errors. */
  private showFailureMessage(): void {
    if (this.LANG === "CS") {
      this.controller.ShowMessage("工序流程状态: 未成功");
    } else {
      this.controller.ShowMessage("ProcessFlow Status: Not Successful");
    }
  }
}
