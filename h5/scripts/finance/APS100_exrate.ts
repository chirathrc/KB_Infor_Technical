/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-19
 * Summary     : H5 script for APS100/F panel to automatically retrieve and update the exchange rate (WWARAT) for a purchase order (WWPUNO).
 *               Fires on panel load. Calls MDBREADMI.GetMPHEAD00 to fetch AGRA and CUCD.
 *               Sets WWARAT whenever CUCD matches WWCUCD AND AGRA > 0, regardless of the current
 *               WWARAT value — aligned back to original JScript behavior, so the field is
 *               overwritten on every panel load if the conditions are met.
 *
 * Version Log :
 * Changed By          | Date       | Summary of the change
 * --------------------|------------|-----------------------------
 * Nethum Ariyarathna  | 2025-09-19 | Converted from JScript to H5 script
 * Safwan A            | 2026-07-01 | Fixed AGRA zero-check; if AGRA=0 script exits silently leaving WWARAT unchanged
 * Safwan A            | 2026-07-01 | Switched to Requesting ENTER hook to coexist with APS100F_HSBC_Pre_Validation
 * Safwan A            | 2026-07-01 | Reverted to panel-load trigger; only sets WWARAT when it is currently 0,
 *                                     leaving it untouched if user has already set/changed it
 * ChirathRo           | 2026-07-30 | Replaced var with const/let, console.log with this.log, any-typed
 *                                     fields with proper IInstanceController/IScriptLog/IContentElement/
 *                                     IMIResponse types, and added public modifier to static Init
 * ChirathRo           | 2026-09-10 | Removed the "WWARAT !== 0" guard in run() — script now calls
 *                                     MDBREADMI.GetMPHEAD00 and updates WWARAT on every panel load
 *                                     (as long as CUCD matches and AGRA > 0), matching original
 *                                     JScript behavior. Reintroduces the overwrite-on-reload
 *                                     behavior that Safwan A's 2026-07-01 fix had removed.
 * ChirathRo           | 2026-09-11 | Fixed decimal separator handling for WWARAT updates. The API returns
 *                                     AGRA values using "." as the decimal separator (e.g., 165.00000),
 *                                     while some user contexts use "," as the decimal separator.
 *                                     Added conversion logic based on the user's decimal format before
 *                                     updating WWARAT, preventing parsing/formatting issues and ensuring
 *                                     the exchange rate is populated correctly across different user
 *                                     locale settings.
 */

class APS100_exrate {
    private controller: IInstanceController;
    private log: IScriptLog;
    private content: IContentElement;
    private miService: any;

    private LANG: string = "EN";
    private CONO1: string = "";
    private PONO1: string = "";
    private CUCD1: string = "";
    private PONO2: string = "";
    private scrrun: boolean = false;
    private lastExecutionTime: number = 0;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN";
        this.log.Info("Constructor initialized");
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new APS100_exrate(scriptArgs).run();
    }

    // private run(): void {
    //     this.log.Info("Script Initializing");
    //     const panelName = this.controller.GetPanelName();
    //     this.log.Info("Panel: ".concat(panelName));
    //     try {
    //         if (panelName === "APA100F0") {
    //             this.CONO1 = ScriptUtil.GetUserContext().CurrentCompany || "";
    //             this.PONO1 = (ScriptUtil.GetFieldValue("WWPUNO") || "").trim();
    //             this.CUCD1 = (ScriptUtil.GetFieldValue("WWCUCD") || "").trim();
    //             this.log.Info("CONO1: ".concat(this.CONO1, ", PONO1: ").concat(this.PONO1, ", CUCD1: ").concat(this.CUCD1));
    //             if (!this.PONO1) {
    //                 this.PONO2 = "NO";
    //                 this.log.Info("PONO2 set to NO: WWPUNO is empty");
    //                 return;
    //             }
    //             // If WWARAT is already non-zero the user has set or changed it — leave it alone.
    //             const currentWWARAT = parseFloat(ScriptUtil.GetFieldValue("WWARAT") || "0");
    //             if (currentWWARAT !== 0) {
    //                 this.log.Info("WWARAT already set to ".concat(String(currentWWARAT), " - leaving untouched"));
    //                 return;
    //             }
    //             this.PONO2 = "YES";
    //             this.log.Info("PONO2 set to YES - WWARAT is 0, will attempt to set from AGRA");
    //             const currentTime = Date.now();
    //             if (currentTime - this.lastExecutionTime < 500) {
    //                 return;
    //             }
    //             this.lastExecutionTime = currentTime;
    //             this.loadAdditionalData();
    //         }
    //         else {
    //             this.log.Info("Not on APS100/F panel, current: ".concat(panelName));
    //         }
    //     }
    //     catch (ex) {
    //         this.log.Error("Error in run: ".concat(ex));
    //         this.controller.ShowMessage("Error: ".concat(ex));
    //     }
    // }

    private run(): void {
        this.log.Info("Script Initializing");
        const panelName = this.controller.GetPanelName();
        this.log.Info("Panel: ".concat(panelName));
        try {
            if (panelName === "APA100F0") {
                this.CONO1 = ScriptUtil.GetUserContext().CurrentCompany || "";
                this.PONO1 = (ScriptUtil.GetFieldValue("WWPUNO") || "").trim();
                this.CUCD1 = (ScriptUtil.GetFieldValue("WWCUCD") || "").trim();
                this.log.Info("CONO1: ".concat(this.CONO1, ", PONO1: ").concat(this.PONO1, ", CUCD1: ").concat(this.CUCD1));

                if (!this.PONO1) {
                    this.PONO2 = "NO";
                    this.log.Info("PONO2 set to NO: WWPUNO is empty");
                    return;
                }

                // Aligned to old JScript: no WWARAT check here — always proceed if PO number exists.
                this.PONO2 = "YES";
                this.log.Info("PONO2 set to YES - PO number present, calling MDBREADMI");

                const currentTime = Date.now();
                if (currentTime - this.lastExecutionTime < 500) {
                    return;
                }
                this.lastExecutionTime = currentTime;
                this.loadAdditionalData();
            }
            else {
                this.log.Info("Not on APS100/F panel, current: ".concat(panelName));
            }
        }
        catch (ex) {
            this.log.Error("Error in run: ".concat(ex));
            this.controller.ShowMessage("Error: ".concat(ex));
        }
    }

    private async loadAdditionalData(): Promise<void> {
        let indicatorShown = false;
        try {
            try {
                indicatorShown = this.controller.ShowBusyIndicator();
                this.log.Info("ShowBusyIndicator: ".concat(String(indicatorShown)));
            }
            catch (ex) {
                this.controller.ShowMessage("Processing, please wait...");
            }
            const request = new MIRequest();
            request.program = "MDBREADMI";
            request.transaction = "GetMPHEAD00";
            request.record = { PUNO: this.PONO1 };
            request.outputFields = ["CUTE", "AGRA", "CUCD"];
            this.log.Info("Calling MDBREADMI for PUNO: ".concat(this.PONO1));
            const response = await this.miService.executeRequestV2(request);
            if (indicatorShown) {
                try {
                    this.controller.HideBusyIndicator();
                    this.log.Info("HideBusyIndicator called");
                }
                catch (ex) {
                }
            }
            this.onRunWorkerCompleted(response);
        }
        catch (ex_1) {
            if (indicatorShown) {
                try {
                    this.controller.HideBusyIndicator();
                    this.log.Info("HideBusyIndicator called on error");
                }
                catch (exHide) {
                }
            }
            this.scrrun = true;
            this.log.Error("Error in loadAdditionalData: ".concat(ex_1));
            this.controller.ShowMessage("MDBREADMI Error: ".concat(ex_1));
        }
    }

    private onRunWorkerCompleted(response: IMIResponse): void {
        if (response.hasError() || !response.items || response.items.length === 0) {
            this.scrrun = true;
            const errorMsg = response.errorMessage || "No data returned";
            this.log.Error("MDBREADMI Error: ".concat(errorMsg));
            this.controller.ShowMessage("MDBREADMI Error: ".concat(errorMsg));
            return;
        }
        try {
            const record = response.items[0];
            const AGRA = record["AGRA"];
            const CUCD = record["CUCD"] || "";
            this.log.Info("API response: AGRA=".concat(AGRA, ", CUCD=").concat(CUCD, ", CUCD1=").concat(this.CUCD1));

            // Parse AGRA as a number regardless of whether the API returns a string or numeric type
            const agraValue = parseFloat(AGRA);

            if (CUCD === this.CUCD1 && !isNaN(agraValue) && agraValue > 0) {
                // WWARAT is 0 (checked earlier in run()) and AGRA is valid — set it and inform the user.
                // The field remains editable; the user can change it freely after this point.

                const devider = ScriptUtil.GetUserContext().DCFM;
                let updatedAGRA = "";

                if (devider === (".")) {
                    updatedAGRA = AGRA.replace(",", ".");
                } else if (devider === (",")) {
                    updatedAGRA = AGRA.replace(".", ",");
                }

                ScriptUtil.SetFieldValue("WWARAT", updatedAGRA);
                this.scrrun = true;
                this.log.Info("Updated WWARAT with AGRA: ".concat(AGRA));
                this.controller.ShowMessage("Exchange rate set based on PO Agreed Rate (AGRA): ".concat(AGRA));
            } else {
                // AGRA is zero, blank, NaN, or currency mismatch — do nothing, leave WWARAT as-is
                this.scrrun = true;
                this.log.Info("No update to WWARAT: AGRA=".concat(AGRA, ", CUCD=").concat(CUCD, ", CUCD1=").concat(this.CUCD1));
            }
        }
        catch (ex) {
            this.scrrun = true;
            this.log.Error("Error in onRunWorkerCompleted: ".concat(ex));
            this.controller.ShowMessage("Error: ".concat(ex));
        }
    }
}