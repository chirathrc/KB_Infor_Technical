/**
 * Author      : Nethum Ariyarathna
 * Created on  : 26-02-2026
 * Summary     : Validates the input format of field WWYREF on the FAS130/F panel.
 *               Ported from on-prem JScript (Andrea Devica, 20250801).
 *
 * - Trigger           : Runs on Enter key press on FAS130/F panel.
 * - Expected Format   : xxxxxxxxx-YYYY → 9 alphanumeric characters, hyphen, 4-digit year.
 * - Bypass Option     : If the user enters "NA" (case-insensitive), validation is skipped.
 * - Year Validation   : Year must be a valid number and must not exceed the current year.
 * - Error Handling    : Shows a validation error and cancels the action if input is invalid.
 * - Localization      : Messages shown in Vietnamese for user clarity.
 *
 * Version Log :
 * Changed By         | Date       | Summary of the change
 * -------------------|------------|-----------------------------
 * Nethum Ariyarathna | 26-02-2026 | Initial H5 TypeScript conversion
 */

class FAS130_RestrictFields {
  private controller: IInstanceController;
  private log: IScriptLog;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log        = scriptArgs.log;
  }

  // ─── Entry Point ──────────────────────────────────────────────────────────────

  public static Init(args: IScriptArgs): void {
    new FAS130_RestrictFields(args).run();
  }

  private run(): void {
    this.log.Info("FAS130_RestrictFields initialized");

    // Only attach the event listener when we are on the FAS130/F panel
    const panelName = this.controller.GetPanelName();
    if (panelName.indexOf("FAA130F0") < 0) {
      this.log.Info("Not FAS130/F panel – skipping. Panel: " + panelName);
      return;
    }

    this.log.Info("FAS130/F panel detected – attaching Requesting handler");

    // Listen for every server request so we can intercept the Enter key
    this.controller.Requesting.On((args: CancelRequestEventArgs) =>
      this.onRequesting(args)
    );
  }

  // ─── Requesting Handler ───────────────────────────────────────────────────────

  /**
   * Fires before each server request on the panel.
   * Intercepts the Enter key and validates the WWYREF field value.
   */
  private onRequesting(args: CancelRequestEventArgs): void {
    // Only act on the Enter key
    if (args.commandType !== "KEY" || args.commandValue !== "ENTER") {
      return;
    }

    // Re-confirm we are still on FAS130/F (multi-panel scripts may drift)
    const panelName = this.controller.GetPanelName();
    if (panelName.indexOf("FAA130F0") < 0) {
      return;
    }

    const rawValue = this.controller.GetValue("WWYREF") as string;
    const trimmed  = (rawValue || "").replace(/^\s+|\s+$/g, "");

    this.log.Info("WWYREF value: " + trimmed);

    // ── Bypass: user entered "NA" ──────────────────────────────────────────────
    if (trimmed.toUpperCase() === "NA") {
      this.log.Info("Input is NA – skipping validation");
      return; // allow the request to proceed
    }

    // ── Format check: 9 alphanumeric chars + hyphen + 4-digit year ────────────
    // Pattern: ^[A-Za-z0-9]{9}-\d{4}$
    const formatRegex = /^[A-Za-z0-9]{9}-\d{4}$/;
    if (!formatRegex.test(trimmed)) {
      this.log.Info("Invalid format – cancelling request");
      this.controller.ShowMessage(
        "Định dạng không hợp lệ: Đối với hóa đơn điều chỉnh, hãy nhập 9 ký tự của số " +
        "hóa đơn, theo sau là -YYYY (năm), ví dụ: 200000001-2025. " +
        "Nếu không áp dụng, hãy nhập giá trị là 'NA'"
      );
      args.cancel = true;
      return;
    }

    // ── Year check: must be a valid number and not exceed the current year ─────
    const yearPart    = trimmed.substring(trimmed.length - 4);
    const year        = parseInt(yearPart, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(year) || year > currentYear) {
      this.log.Info("Invalid year (" + year + ") – cancelling request");
      this.controller.ShowMessage(
        "Năm trong tham chiếu không hợp lệ. Năm không được lớn hơn năm hiện tại."
      );
      args.cancel = true;
      return;
    }

    this.log.Info("WWYREF validation passed – allowing request");
  }
}