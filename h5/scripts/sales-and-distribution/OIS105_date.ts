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
 * Chirath Rothila | 2025-06-19 | OIS105/B → Fix date format according to user pref. in MNS150.
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

        const todayYYMMDD = this.getTodayDate();

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

    private getTodayDate(): string {
        const d = new Date();

        let dd = d.getDate().toString();
        let mm = (d.getMonth() + 1).toString();

        let yy = (d.getFullYear() % 100).toString();
        if (yy.length < 2) yy = "0" + yy;

        if (dd.length < 2) dd = "0" + dd;
        if (mm.length < 2) mm = "0" + mm;

        const dtfm = ScriptUtil.GetUserContext("DTFM");
        console.log(dtfm);

        switch (dtfm) {
            case "DMY":
                return `${dd}${mm}${yy}`;

            case "MDY":
                return `${mm}${dd}${yy}`;

            case "YMD":
                return `${yy}${mm}${dd}`;

            default:
                return `${dd}${mm}${yy}`;
        }
    }
}