/*************************************
* Developed By  : Rahul Killedar
* Developed On  : 26/05/2025
* Description   : Adding extra column to display Vehicle Number
* Version       : 2.1 (cleaned & optimized)
*************************************/

class PPS300_VehicleNo_V1 {
    private controller: IInstanceController;
    private unsubscribeRequesting: Function;
    private list: IActiveGrid;
    private company: string;
    private purchaseOrderNumber: string;
    private vehicleNoColumnId: string;
    private language: string;
    private version: number;
    private miService: any;
    private FWRF: string;

    constructor(args: IScriptArgs) {
        this.controller = args.controller;
        this.version = ScriptUtil.version;
        console.log("version--->" + this.version);

        if (this.version >= 2.0) {
            this.miService = MIService;
        } else {
            this.miService = MIService.Current;
        }
    }

    public static Init(args: IScriptArgs): void {
        new PPS300_VehicleNo_V1(args).run();
    }

    private run(): void {
        // Get correct grid object depending on H5 script version
        if (this.version >= 2.0) {
            this.list = ListControl.ListView.GetDatagrid(this.controller);
        } else {
            this.list = this.controller.GetGrid();
        }

        this.company = ScriptUtil.GetUserContext("CurrentCompany");
        this.purchaseOrderNumber = ScriptUtil.GetFieldValue("WWPUNO");
        this.language = ScriptUtil.GetUserContext("CurrentLanguage");

        console.log(`[PPS300] Init: Company=${this.company}, PUNO=${this.purchaseOrderNumber}, Lang=${this.language}, ScriptVer=${this.version}`);

        // Add new column for Vehicle No
        const baseColumnNum = this.list.getColumns().length + 1;
        this.vehicleNoColumnId = "C" + baseColumnNum;
        this.appendColumn(this.list, this.vehicleNoColumnId, this.getVehicleNoHeader());

        // Populate already visible rows
        this.populateVisibleRows();

        // Attach event for page scrolls
        this.attachEvents(this.controller, this.list);
    }

    private getVehicleNoHeader(): string {
        switch (this.language) {
            case "VI": return "Biển số xe";   // Vietnamese
            case "CS": return "车辆编号";       // Chinese
            default: return "Vehicle No";     // English fallback
        }
    }

    private appendColumn(list: IActiveGrid, columnId: string, columnName: string) {
        const columns = list.getColumns();
        const newColumn = {
            id: columnId,
            field: columnId,
            name: columnName,
            width: 120
        };
        columns.push(newColumn);
        list.setColumns(columns);
        console.log(`[PPS300] Added column: ${columnName} (${columnId})`);
    }

    private attachEvents(controller: IInstanceController, list: IActiveGrid) {
        this.unsubscribeRequesting = controller.Requesting.On((e) => {
            if (e.commandType === "PAGE" && e.commandValue === "DOWN") {
                console.log(`[PPS300] PageDown detected - total rows now: ${list.getData().length}`);
                this.populateVisibleRows();
            }
        });
    }

    private detachEvents() {
        if (this.unsubscribeRequesting) {
            this.unsubscribeRequesting();
        }
    }

    /**
     * Always process last ~30 rows for performance.
     */
    private populateVisibleRows() {
        if (!this.list || !this.list.getData()) return;
        this.populateData(this.list);
    }

    /**
     * Fill vehicle number for last ~30 rows
     */
    private async populateData(list: IActiveGrid) {
        const totalRows = list.getData().length;
        console.log("[PPS300] First row dump (for debugging):", this.list.getData()[0]);
        console.log(`totalRows-------: ${totalRows}`);

        const start = (totalRows - 33) > 0 ? (totalRows - 33) : 0;

        for (let i = start; i < totalRows; i++) {
            const row = list.getData()[i];
            
            //const poLineNumber = row["S1PNLI"];  // check console log to confirm key
            //const subLineNumber = row["S1PNLS"]; // check console log to confirm key
            const sortingOrder = this.controller.GetSortingOrder();
            const prefix = `S${sortingOrder}`;

            const poLineKey = `${prefix}PNLI`;
            const subLineKey = `${prefix}PNLS`;

            const poLineNumber = row[poLineKey];
            const subLineNumber = row[subLineKey];

            console.log(`Roww ${i}: PNLI=${poLineNumber}, PNLS=${subLineNumber}`);
            
            if (!poLineNumber) {
                console.warn(`[PPS300] Missing PNLI/PNLS for row ${i}`, row);
                continue;
            }

            const response = await this.loadVehicleNumber01(poLineNumber, subLineNumber);
            if (response && response.length > 0) {
                const vehicleNo = response[0].FWRF ?? "";
                this.FWRF = response[0]["FWRF"];
                console.log("FWRF-------:", this.FWRF)
                const newData = {};
                newData[this.vehicleNoColumnId] = vehicleNo;
                newData["id_" + this.vehicleNoColumnId] = "R" + (i + 1) + this.vehicleNoColumnId;

                $.extend(row, newData);
            }
        }

        list.setData(list.getData());
    }

    

    /**
     * Call MI and return result items
     */
    private async loadVehicleNumber(lineNo: string, subLineNo: string): Promise<any[]> {
        const myRequest = new MIRequest();
        myRequest.program = "PPS330MI";
        myRequest.transaction = "ListPOTrans";
        myRequest.outputFields = ["FWRF"];  // confirm if FWRF = Vehicle No
        myRequest.record = {
            PUNO: this.purchaseOrderNumber,
            PNLI: lineNo,
            PNLS: subLineNo
            //PUOS: "45",
            //NFTR: "4"
        };

        

        console.log(`[PPS300] Calling MI: ${myRequest.program}.${myRequest.transaction} for PNLI=${lineNo}, PNLS=${subLineNo},PUNO=${this.purchaseOrderNumber}`);

        try {
            
            const response: IMIResponse = await this.miService.executeRequestV2(myRequest);
            console.log("MI Request record:", myRequest.record);
            console.log("Response items:", response.items);
            return response.items ?? [];
        } catch (error) {
            console.error(`[PPS300] MI Error: ${error}`);
            return [];
        }
    }

    private loadVehicleNumber01(lineNo: string, subLineNo: string) {
        return new Promise<any>((resolve) => {
            const myRequest = new MIRequest();
            myRequest.program = "PPS330MI";
            myRequest.transaction = "ListPOTrans"
            //Fields that should be returned by the transaction
            myRequest.outputFields = ["FWRF"];
            //Input to the transaction
            myRequest.record = {
                PUNO: this.purchaseOrderNumber,
                PNLI: lineNo,
                PNLS: subLineNo,
                PUOS: "45",
                NFTR: "4"
            }
            myRequest.maxReturnedRecords = 0;
            this.miService.executeRequestV2(myRequest).then(
                (response: IMIResponse) => {
                    //Read results here
                    console.log('response-----:', response.items);
                    console.log("MI Request record:", myRequest.record);
            
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    //Handle errors here
                    console.log('error-------:', response);
                    resolve(null);
                });
        });
    }
}
