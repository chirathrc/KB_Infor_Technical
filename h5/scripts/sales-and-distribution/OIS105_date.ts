/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-07
 * Summary     : This script displays today's date (formatted per user settings) 
 *               in a message when panel OIS105/B is loaded. 
 *               Column header updates are not supported in H5.
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-07 | Initial script creation
 * Nethum Ariyarathna | 2025-11-24 | OIS105/B (OIA105BC) → Auto-fill W2OBKV (IPDT) with today's date (YYYYMMDD)
 */

class OIS105_date {
    private controller: IInstanceController;
    private log: IScriptLog;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new OIS105_date(scriptArgs).run();
    }

    public run(): void {
        try {
            console.clear();
            const panelName = this.controller.GetPanelName();
            this.log.Info("OIS105/B AutoFill → Panel: " + panelName);

            if (panelName !== "OIA105BC") {
                this.log.Info("Not OIS105/B → skipping");
                return;
            }

            setTimeout(() => this.fillUsingSetFieldValue(), 1000);

        } catch (ex) {
            this.log.Error("Script error: " + ex);
        }
    }

    private fillUsingSetFieldValue(): void {
        this.log.Info("Filling invoice date in YYMMDD format...");

        const todayYYMMDD = this.getTodayYYMMDD();

        let filled = false;

        // Set internal field (OHIPDT) – M3 core field
        try {
            ScriptUtil.SetFieldValue("OHIPDT", todayYYMMDD, this.controller);
            this.log.Info("OHIPDT set → " + todayYYMMDD);
            filled = true;
        } catch (e) {
            this.log.Warning("Failed to set OHIPDT: " + e);
        }

        // Set visible field (W2OBKV) – what user sees
        try {
            ScriptUtil.SetFieldValue("W2OBKV", todayYYMMDD, this.controller);
            this.log.Info("W2OBKV (visible) set → " + todayYYMMDD);
            filled = true;
        } catch (e) {
            this.log.Warning("Failed to set W2OBKV: " + e);
        }

        if (filled) {
            this.log.Info("SUCCESS → Req dt auto-filled with: " + todayYYMMDD);
            //this.controller.ShowMessage("Req dt auto-filled: " + todayYYMMDD);
        } else {
            this.log.Warning("Could not fill invoice date");
        }
    }

    // Returns date as YYMMDD → e.g., 251124
    private getTodayYYMMDD(): string {
        const d = new Date();
        const year = d.getFullYear() % 100;   // last 2 digits → 25
        const month = d.getMonth() + 1;       // 1-12
        const day = d.getDate();              // 1-31

        const yy = year < 10 ? "0" + year : year.toString();
        const mm = month < 10 ? "0" + month : month.toString();
        const dd = day < 10 ? "0" + day : day.toString();

        return yy + mm + dd; // → 251124
    }
}