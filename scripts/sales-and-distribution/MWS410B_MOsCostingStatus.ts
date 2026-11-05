/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-08-20
 * Summary     : Validates Costing status for bulk MOs in MWS410/B before allowing option 32.
 *               Calls MWS150MI.SelSupplyChain and MDBREADMI.GetMWOHED55 to validate.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-08-20 | Initial TS conversion
 */
class MWS410B_MOsCostingStatus {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;

  private txtWWRIDN: string = "";
  private PCDO: string = "";
  private FACI: string = "";
  private arrIndex: number = 0;
  private popMessage: string = "";
  private valid: number = 0;
  private addressData: Array<{ FACI: string; MFNO: string; ITNO: string }> = [];

  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
  }

  public run(): void {
    try {
      const panel = this.controller.GetPanelName();
      if (panel !== "MWA410BC") {
        this.log.Info(`Not running on MWS410/B. Current panel: ${panel}`);
        return;
      }

      const field = ScriptUtil.GetFieldValue("WWRIDN");
      this.log.Info(`WWRIDN---------: ${field}`);
      this.txtWWRIDN = field as string;
      this.log.Info(`txtWWRIDN---------: ${this.txtWWRIDN}`);

      this.addressData = [];
      this.callMWS150MI();
    } catch (ex: any) {
      this.log.Error(`Error initializing MWS410B_MOsCostingStatus: ${ex.message || ex}`);
    }
  }

  private callMWS150MI(): void {
    try {
      const request = new MIRequest();
      request.program = "MWS150MI";
      request.transaction = "SelSupplyChain";
      //request.includeMetadata = true;
      request.record = {
        CONO: "100",
        ORCA: "311",
        RIDN: this.txtWWRIDN
      };

      MIService.Current.executeRequestV2(request).then((res: IMIResponse) => {
        this.log.Info(`Response---------: ${res.items?.length}`);
        if (res.items?.length) {
          for (const item of res.items) {
            this.FACI = item["FACI"]?.trim() || "";
            const MFNO = item["RIDN"]?.trim() || "";
            const ITNO = item["ITNO"]?.trim() || "";
            const ORCA = item["ORCA"]?.trim() || "";
            this.log.Info(`FACI/ORCA---------: ${this.FACI},${ORCA}`);
            //replaced includes with indexOf for backward compatibility
            if (ORCA === "101" && ["M01", "M05", "M10"].indexOf(this.FACI) !== -1) {
              this.addressData.push({ FACI: this.FACI, MFNO, ITNO });
            }
          }

          if (this.addressData.length > 0) {
            const first = this.addressData[this.arrIndex];
            this.callMDBREADMI(first.FACI, first.MFNO, first.ITNO);
          } else {
            this.log.Info("No valid supply chain records found.");
          }
        } else {
          this.log.Error("MWS150MI.SelSupplyChain returned no results or error.");
        }
      });
    } catch (ex: any) {
      this.log.Error(`Exception in callMWS150MI: ${ex.message || ex}`);
    }
  }

  private callMDBREADMI(FACI: string, MFNO: string, PRNO: string): void {
    try {
      const request = new MIRequest();
      request.program = "MDBREADMI";
      request.transaction = "GetMWOHED55";
      request.includeMetadata = true;
      request.record = { FACI, MFNO, PRNO };
      request.typedOutput = true;
      request.outputFields = ["PCDO"];

      MIService.Current.executeRequestV2(request).then((res: IMIResponse) => {
         this.log.Info(`Response2---------: ${res.items?.length}`);
        if (res.items?.length > 0) {
          this.PCDO = res.items[0]["PCDO"] || "";
          this.log.Info(`PCDO---------: ${this.PCDO}`);

          if (this.PCDO !== "1") {
            this.popMessage += this.addressData[this.arrIndex].MFNO + " ";
            this.valid = 1;
          }
        } else {
          this.log.Error("MDBREADMI.GetMWOHED55 failed or empty response.");
        }

        this.arrIndex++;
        if (this.arrIndex < this.addressData.length) {
          const next = this.addressData[this.arrIndex];
          this.callMDBREADMI(next.FACI, next.MFNO, next.ITNO);
        } else {
          if (this.addressData.length > 0 && this.popMessage.length > 0) {
            this.registerEvents();
          } else {
            this.log.Info("No MOs required validation, script ended.");
          }
        }
      });
    } catch (ex: any) {
      this.log.Error(`Exception in callMDBREADMI: ${ex.message || ex}`);
    }
  }

  private registerEvents(): void {
    this.controller.Requesting.On(this.onRequesting.bind(this));
    this.controller.Requested.On(this.onRequested.bind(this));
    this.log.Info("Event listeners registered.");
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    if (e.commandType === "LSTOPT" && e.commandValue === "32") {
      if (this.valid === 1) {
        this.controller.ShowMessage(`Costing should be completed for the bulk MO(s): ${this.popMessage}`);
        e.cancel = true;
        this.log.Info(`Blocked option 32 due to costing incomplete: ${this.popMessage}`);
      }
    }
  }

  private onRequested(e: RequestEventArgs): void {
    this.controller.Requesting.Off(this.onRequesting.bind(this));
    this.controller.Requested.Off(this.onRequested.bind(this));
    this.log.Info("Event listeners removed.");
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new MWS410B_MOsCostingStatus(scriptArgs).run();
  }
}

