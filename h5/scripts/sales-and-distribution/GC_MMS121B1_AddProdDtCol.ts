/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-23 
 * Summary     : 
 *   H5 Script for MMS121/B1 panel to add a Production Date column for sorting order 1.
 *   Fetches production date (IDDT) from MMS060MI API and formats it 
 *   based on user date format (DMY, MDY, YMD).
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-09-23 | Initial script creation
 */

class GC_MMS121B1_AddProdDtCol {
    private controller;
    private log;
    private list;
    private contentElement;
    private company;
    private dateFormat;
    private sortingOrder;
    private miService;
    private columnId = "C999";
    private gridRowIndex = 0;
    private itno = "";
    private whlo = "";
    private unsubscribeScroll;

    constructor(scriptArgs) {
        this.controller = scriptArgs.controller;
        this.contentElement = this.controller.GetContentElement();
        this.log = scriptArgs.log;
        this.miService = MIService.Current;
        this.company = ScriptUtil.GetUserContext("CONO") || "";
        this.dateFormat = ScriptUtil.GetUserContext("DTFM") || "YMD";

        this.sortingOrder = parseInt(this.controller.GetSortingOrder() || "0");
    }

    public static Init(scriptArgs) {
        new GC_MMS121B1_AddProdDtCol(scriptArgs).run();
    }

    public run() {
        console.clear();
        this.log.Info("Script Initializing for MMS121/B1 ");
        this.log.Info("Company: " + this.company, " Date Format: " + this.dateFormat + " Sorting Order: " + this.sortingOrder);
        this.list = this.controller.GetGrid();

        if (this.sortingOrder !== 1) {
            this.log.Info("Sorting order is not 1, unloading script");
           // this.unloadScript();
            return;
        }

        try {
            this.addColumn();
            this.itno = ScriptUtil.GetFieldValue("MMITNO", this.controller) || "";
            this.whlo = ScriptUtil.GetFieldValue("MWWHLO", this.controller) || "";
            console.log(`ITNO: ${this.itno}, WHLO: ${this.whlo}`);
   
            this.controller.ShowBusyIndicator();
            this.populateData(0, this.list.getData()?.length - 1 || 0);
            this.attachScrollEvent();
        } catch (ex) {
            this.log.Error("Error initializing script: " + ex);
            this.controller.HideBusyIndicator();
        }
    }

    private addColumn() {
        const columns = this.list.getColumns();
        const header = "生产日期"; //(Production date)

        if (!columns.some(col => col.id === this.columnId)) {
            columns.push({
                id: this.columnId,
                field: this.columnId,
                name: header,
                width: 100
            });
            this.list.setColumns(columns);
        }
    }

    private async populateData(fromRow, toRow) {
        if (fromRow > toRow || toRow < 0) {
            this.log.Info("Invalid row range, skipping population");
            this.controller.HideBusyIndicator();
            return;
        }

        const data = this.list.getData() || [];
        this.controller.ShowBusyIndicator();
        for (let i = fromRow; i <= toRow; i++) {
            const row = data[i];
            if (!row) {
                this.log.Info("Row " + i + " is null, skipping");
                continue;
            }

            const whslValue = this.getRowValue(row, "S1WHSL");
            const banoValue = this.getRowValue(row, "S1BANO");
            console.log(`Row ${i}: WHSL=${whslValue}, BANO=${banoValue}`);
            if (whslValue && banoValue) {
                this.log.Info("Processing row " + i + ": WHSL=" + whslValue + ", BANO=" + banoValue);
                const prodDate = await this.fetchMMS060MI(this.itno, this.whlo, whslValue, banoValue);
                row[this.columnId] = prodDate;
                this.gridRowIndex = i + 1;
            } else {
                this.log.Info("Missing WHSL or BANO for row " + i);
            }
        }
        this.list.setData(data);
        this.log.Info("Data population completed");
        this.controller.HideBusyIndicator();
    }

    /**
   * Gets a field value from a row, handling different H5 versions.
   * @param row The row object
   * @param fieldName The field name (e.g., "MLSTQT")
   */
    private getRowValue(row: any, fieldName: string): string {
        if (ScriptUtil.version >= 2.0) {
            const value = row[fieldName] || "";
            console.log(`Getting value for ${fieldName} (v2+): ${value}`);
            return value;
        } else {
            const value = row[fieldName] || row["id_" + fieldName] || "";
            console.log(`Getting value for ${fieldName} (legacy): ${value}`);
            return value;
        }
    }

    private async fetchMMS060MI(itno, whlo, whsl, bano) {
        const request = new MIRequest();
        request.program = "MMS060MI";
        request.transaction = "Get";
        request.record = { CONO: this.company, ITNO: itno, WHLO: whlo, WHSL: whsl, BANO: bano };
        request.outputFields = ["IDDT"];

        this.log.Info("Calling MMS060MI: ITNO=" + itno + ", WHLO=" + whlo + ", WHSL=" + whsl + ", BANO=" + bano);
        this.controller.ShowBusyIndicator();
        try {
            const response = await this.miService.executeRequestV2(request);
            if (!response.hasError() && response.items?.length > 0) {
                const item = response.items[0];
                this.log.Info("MMS060MI response: IDDT=" + item.IDDT);
                return this.formatDate(item.IDDT || "");
            }
            this.log.Info("No data from MMS060MI");
            return "";
        } catch (ex) {
            this.log.Error("MMS060MI error: " + ex);
            return "";
        } finally {
            this.controller.HideBusyIndicator();
        }
    }

    private formatDate(iddt) {
        if (!iddt || iddt.length !== 8) return "";
        const year = iddt.substr(0, 4);
        const month = iddt.substr(4, 2);
        const day = iddt.substr(6, 2);

        switch (this.dateFormat) {
            case "DMY": return day + "/" + month + "/" + year;
            case "MDY": return month + "/" + day + "/" + year;
            case "YMD": return year + "/" + month + "/" + day;
            default: return year + "/" + month + "/" + day;
        }
    }

    private attachScrollEvent() {
        this.unsubscribeScroll = this.controller.RequestCompleted.On((e) => {
            if (e.commandType === "PAGE" && e.commandValue === "DOWN") {
                const data = this.list.getData();
                const newRows = data.length - this.gridRowIndex;
                if (newRows > 0) {
                    this.log.Info("Scroll detected, populating rows " + this.gridRowIndex + " to " + (data.length - 1));
                    this.populateData(this.gridRowIndex, data.length - 1);
                }
            }
        });
    }

    private unloadScript() {
        if (this.unsubscribeScroll) {
            this.unsubscribeScroll();
        }
        this.log.Info("Script unloaded");
        this.controller.HideBusyIndicator();
        ScriptUtil.UnloadScript("GC_MMS121B1_AddProdDtCol.ts");
    }
}