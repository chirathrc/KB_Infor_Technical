/*************************************
* Developed By  : Rahul Killedar
* Developed On  : 26/05/2025
* Description   : Adding extra column to display Vehicle Number
* Version       : 2.0 (aligned with ATL_PPS300B1 pattern)
*************************************/


class PPS300_VehicleNo_V2 {
    private detachRequesting: Function;
    private controller: IInstanceController;
    private version: any;
    private miService: any;

    private grid: any;
    private S1PITTGB = "PO item description";
    private S1PITTIT = "Descrizione dell'articolo";
    private S1CFMAIT = "Campione";
    private S1CFMAGB = "Sample";
    
    private S1CFMA: string;
    private S1PITT: string;
    private columnNumber: number = 0;
    private columnId: string;
    private columnIdITNO: string;
    private purchaseOrderNumber: string;
    private purchaseOrderLine: any;
    private itemNumber: string;
    private SCLE: string;
    private RIDN: string;
    private BANO: string;
    private orderType: string;
    private lockRcvgFlag: boolean;
    private ionApiService;

    private productNumber: any;
    private warehouse: any;
    private unsubscribeRequesting: any;
    responseMMS200MIGetItmWhsBasic: any;
    responseMMS200MIGetItmWhsBal: any;
    responseSelSupplyChain: any;
    responseLstTransByOrder: any
    sumofBAL: number = 0;
    itemDesc: any;
    private flag = false;
    manufacturedQty: string;
    receivedQty: any;
    data: Promise<void>;
    valueofMXST: number = 0;
    ERROR01GB: string;
    ERROR01IT: string;
    private headerInfoConfirmDialog: string;
    ERROR01: string;
    enteredQty: string[];
    quantity: number;

    private company: string;
    private language: string;

    public constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.version = ScriptUtil.version;
        if (this.version >= 2.0) {
            this.ionApiService = IonApiService;
            this.miService = MIService;
        } else {
            this.ionApiService = IonApiService.Current;
            this.miService = MIService.Current;
        }
        
    }
    public static Init(scriptArgs: IScriptArgs): void {
        // initial method
        new PPS300_VehicleNo_V2(scriptArgs).run();
    }
    /**
     * run() method
     */
    public async run() {
        const controller = this.controller;
        var currentDivision = ScriptUtil.GetUserContext().CurrentDivision;
        console.log('currentDivision :', currentDivision);
        if (this.version >= 2.0) {
            this.grid = ListControl.ListView.GetDatagrid(this.controller);
        }
        else {
            this.grid = this.controller.GetGrid();
        }
        this.company = ScriptUtil.GetUserContext("CurrentCompany");
        this.purchaseOrderNumber = ScriptUtil.GetFieldValue("WWPUNO");
        this.language = ScriptUtil.GetUserContext("CurrentLanguage");
        console.log("Panel name :", controller.GetPanelName());
        var columns = this.grid.getColumns();
        console.log("columns :", columns);
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].colFld === "S1PNLI") {
                this.columnId = columns[i].field;
            }
            if (columns[i].colFld === "S1ITNO") {
                this.columnIdITNO = columns[i].field;
            }
        }

        this.lockRcvgFlag = false;
        //InstanceCache.Clear(this.controller);
        
        this.attachEvents(this.controller, this.grid);
        this.appendColumn(this.grid);
        this.populateData(this.grid);


    }// end run() method

    /**
     * Populate item description column when user scroll down grid data.
     * @param controller 
     * @param list 
     */
    private attachEvents(controller: IInstanceController, list: IActiveGrid) {
        // event on requesting - used for adding code when something should be processed
        this.detachRequesting = controller.Requesting.On((e) => {
            this.onRequesting(e, list);
        });
    } //end attachedEvents() method

    /**
     * onRequesting() event method.
     * @param args 
     * @param list 
     */
    private async onRequesting(args: CancelRequestEventArgs, list: IActiveGrid): Promise<void> {
        if (args.commandType === "PAGE" && args.commandValue === "DOWN") {
            this.populateData(list);
            this.detachRequesting();
        }
        //  else {
        //     this.detachEvents();
        // }
        let detachEventflags = true;

        if (args.commandType === "KEY" && args.commandValue === "F14" && !this.flag) {
            this.getData();
            args.cancel = true;
            detachEventflags = false;
        }
        if (args.commandType === 'KEY' && args.commandValue === 'F14' && this.flag) {
            console.log("script 2 running");
            if (this.sumofBAL > this.valueofMXST && this.valueofMXST !== 0) {
                this.ERROR01GB = "The maximum quantity in stock is " + this.valueofMXST + ". Upon receipt, the permitted stock level is exceeded";
                this.ERROR01IT = "A magazzino la qtà max è" + this.valueofMXST + ". Con il ricevimento si supera la giacenza consentita";
                this.callEmailIONApi();
                switch (ScriptUtil.GetUserContext().CurrentLanguage) {
                    case "GB":
                        ConfirmDialog.ShowMessageDialog({
                            dialogType: "Warning",
                            header: this.headerInfoConfirmDialog,
                            message: this.ERROR01GB
                        });
                        break;
                    case "IT":
                        ConfirmDialog.ShowMessageDialog({
                            dialogType: "Warning",
                            header: this.headerInfoConfirmDialog,
                            message: this.ERROR01IT
                        });
                        break;
                    default:
                        ConfirmDialog.ShowMessageDialog({
                            dialogType: "Warning",
                            header: this.headerInfoConfirmDialog,
                            message: this.ERROR01GB
                        });
                }

                //this.callEmailIONApi()
                args.cancel = true;
                detachEventflags = false;
            }
            else if (this.lockRcvgFlag && this.orderType === "P70") {
                console.log("InLockRcvgFlag If")
                ConfirmDialog.ShowMessageDialog({
                    dialogType: "Warning",
                    header: "Alert",
                    message: "Record for Supply Chain not found in MITTRA"
                });

                args.cancel = true;
                detachEventflags = false;
                this.lockRcvgFlag = false;
            }
            this.flag = false;
        }
        // else {
        //     this.flag = false;
        //     args.cancel = false;
        //     detachEventflags = true;
        // }
        if (detachEventflags) {
            this.detachEvents();
        }
    } // end onRequesting() method


    // private detachEventsRequesting() {
    //     this.unsubscribeRequesting();
    // }

    private detachEvents(): void {
        this.detachRequesting();
    }

    /**
     * @param list 
     */
    private appendColumn(list: IActiveGrid) {
        this.columnNumber = list.getColumns().length + 1;
        let columns = list.getColumns();
        const columnNum = list.getColumns().length + 1;
        const columnIdSUNM = "C" + columnNum;
        let itemDescriptionColumn = {
            id: columnIdSUNM,
            field: columnIdSUNM,
            name: this.S1PITT,
            colFld: "S1PITT",
            width: 130,
        }

        const columnIDCFMA = "C" + (columnNum + 1);
        let cfmaColumn = {
            id: columnIDCFMA,
            field: columnIDCFMA,
            name: this.S1CFMA,
            colFld: "S1CFMA",
            width: 130,
        }

        if (columns.length < columnNum) {
            columns.push(itemDescriptionColumn);
            columns.push(cfmaColumn);
        }
        let newColumnseq = [];
        for (let k = 0; k < (this.columnNumber - 1); k++) {
            newColumnseq.push(columns[k]);
            if (this.version >= 2.0) {
                if (columns[k].fullName === "S1SITX") {
                    newColumnseq.push(itemDescriptionColumn);
                    newColumnseq.push(cfmaColumn);
                }
            } else {
                if (columns[k].colFld === "S1SITX") {
                    newColumnseq.push(itemDescriptionColumn);
                    newColumnseq.push(cfmaColumn);
                }
            }
        }
        list.setColumns(newColumnseq)
    } //end appendColumn() method

    /**
     * fill data in the grid column
     * @param list 
     */
    private async populateData(list: IActiveGrid) {
        if (this.version >= 2.0) {
            for (let i = ((list.getData().length - 33) > 0 ? (list.getData().length - 33) : 0); i < list.getData().length; i++) {
                let poLineNumber = list.getData()[i]["S1PNLI"];
                let response = await this.PPS200MI_GetLine(poLineNumber);
                let itemNumber = list.getData()[i]["S1ITNO"];
                let response_GetUdefContent = await this.CMS474MI_GetUdefContent(itemNumber);

                if (response != undefined && response != null && response.length != 0) {
                    let newData = {};
                    let colNum = this.columnNumber;
                    newData["C" + colNum] = response[0].PITT;
                    newData["id_C" + colNum] = "R" + (i + 1) + "C" + colNum;
                    $.extend(list.getData()[i], newData);
                }
                if (response_GetUdefContent != undefined && response_GetUdefContent != null && response_GetUdefContent.length != 0) {

                    console.log('response_GetUdefContent :', response_GetUdefContent[0].CFMA);
                    let newData = {};
                    let colNum = this.columnNumber + 1;
                    newData["C" + colNum] = response_GetUdefContent[0].CFMA;
                    newData["id_C" + colNum] = "R" + (i + 1) + "C" + colNum;
                    $.extend(list.getData()[i], newData);
                }
                let data = list.getData();
                list.setData(data);
            }
        } else {
            for (let i = ((list.getData().getLength() - 33) > 0 ? (list.getData().getLength() - 33) : 0); i < list.getData().getLength(); i++) {
                let poLineNumber = list.getData().getItem(i)[this.columnId];
                let response = await this.PPS200MI_GetLine(poLineNumber);
                let itemNumber = list.getData().getItem(i)[this.columnIdITNO];
                let response_GetUdefContent = await this.CMS474MI_GetUdefContent(itemNumber);

                if (response != undefined && response != null && response.length != 0) {
                    let newData = {};
                    let colNum = this.columnNumber;
                    newData["C" + colNum] = response[0].PITT;
                    newData["id_C" + colNum] = "R" + (i + 1) + "C" + colNum;
                    $.extend(list.getData().getItem(i), newData);
                    //list.getData().updateItem("R" + (i + 1), list.getData().getItem(i));
                }
                if (response_GetUdefContent != undefined && response_GetUdefContent != null && response_GetUdefContent.length != 0) {

                    let newData = {};
                    let colNum = this.columnNumber + 1;
                    newData["C" + colNum] = response_GetUdefContent[0].CMFA;
                    newData["id_C" + colNum] = "R" + (i + 1) + "C" + colNum;
                    $.extend(list.getData().getItem(i), newData);

                }
                list.getData().updateItem("R" + (i + 1), list.getData().getItem(i));
            }
        }
    } //end populateData() method

    /**
     * Get item description of PO.
     * @param poLineNumber 
     * @returns 
     */
    private PPS200MI_GetLine(poLineNumber) {
        return new Promise<any>((resolve) => {
            const myRequest = new MIRequest();
            myRequest.program = "PPS200MI";
            myRequest.transaction = "GetLine"
            //Fields that should be returned by the transaction
            myRequest.outputFields = ["PITT"];
            //Input to the transaction
            myRequest.record = {
                CONO: ScriptUtil.GetUserContext().CurrentCompany,
                PUNO: this.purchaseOrderNumber,
                PNLI: poLineNumber
            }
            myRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(myRequest).then(
                (response: IMIResponse) => {
                    //Read results here
                    console.log('response PPS200MI_GetLine :', response.items);
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    //Handle errors here
                    console.log('error :', response);
                    resolve(null);
                });
        });
    } // end PPS200MI_GetLine() method.

    private MWS150MI_SelSupplyChain(puno: string, ponr: string) {
        return new Promise<any>((resolve) => {
            const myRequest = new MIRequest();
            myRequest.program = "MWS150MI";
            myRequest.transaction = "SelSupplyChain"
            //Fields that should be returned by the transaction
            myRequest.outputFields = ['RIDN', 'SCLE'];
            //Input to the transaction
            myRequest.record = {
                RIDN: puno,
                PONR: ponr,
                ORCA: "251"
            }
            myRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(myRequest).then(
                (response: IMIResponse) => {
                    //Read results here
                    console.log("SelSupplyChainResp:", response.items)
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    console.log(response)
                    //Handle errors here
                    resolve(null);
                });
        });
    }

    private CMS474MI_GetUdefContent(itemNumber) {
        return new Promise<any>((resolve) => {
            const myRequest = new MIRequest();
            myRequest.program = "CMS474MI";
            myRequest.transaction = "GetUdefContent"
            //Fields that should be returned by the transaction
            myRequest.outputFields = ["CFMA"];
            //Input to the transaction
            myRequest.record = {
                UDFT: '1',
                ITNO: itemNumber,
                CFMG: 'CAMP',
                CFMF: 'CAMPIO'
            }
            myRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(myRequest).then(
                (response: IMIResponse) => {
                    //Read results here
                    console.log('response CMS474MI_GetLine :', response.items);
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    //Handle errors here
                    console.log('CMS474MI_GetLine error :', response);
                    resolve(null);
                });
        });
    }


    private async getData() {
        //var selectedRows = this.grid.getSelectedRows();
        this.warehouse = ScriptUtil.GetFieldValue("WWWHLO");
        this.productNumber = ListControl.ListView.GetValueByColumnName("S1ITNO");
        this.purchaseOrderLine = ListControl.ListView.GetValueByColumnName("PNLI");

        this.enteredQty = ListControl.ListView.GetValueByColumnName("WSRVQA");
        if (this.enteredQty.length == 2) {
            this.quantity = Number(this.enteredQty[1]);
            this.productNumber = this.productNumber[1];
            this.purchaseOrderLine = this.purchaseOrderLine[1];

        } else {
            this.quantity = Number(this.enteredQty[0]);
            this.productNumber = this.productNumber[0];
            this.purchaseOrderLine = this.purchaseOrderLine[0];

        }

        this.responseSelSupplyChain = await this.MWS150MI_SelSupplyChain(this.purchaseOrderNumber, this.purchaseOrderLine);
        if (this.responseSelSupplyChain && this.responseSelSupplyChain.length > 0) {
            for (let i = 0; i < this.responseSelSupplyChain.length; i++) {
                this.SCLE = this.responseSelSupplyChain[i]["SCLE"];
                console.log("SCLE:", this.SCLE)
                if (this.SCLE === "1") {
                    this.RIDN = this.responseSelSupplyChain[i]["RIDN"];
                    break;
                }
            }
            console.log("RIDN:", this.RIDN)

        }

        if (this.RIDN) {
            this.responseLstTransByOrder = await this.MWS070MI_LstTransByOrder(this.RIDN)
            if (this.responseLstTransByOrder && this.responseLstTransByOrder.length > 0)
                this.lockRcvgFlag = false;
            else
                this.lockRcvgFlag = true;
        }
        else
            this.lockRcvgFlag = true;

        console.log("LOCK", this.lockRcvgFlag);
        console.log("this.warehouse", this.warehouse);
        console.log("this.productNumber", this.productNumber);
        console.log("this.purchaseOrderLine", this.purchaseOrderLine);
        console.log("this.enteredqty", this.enteredQty);
        console.log("Quantity", this.quantity)

        this.responseMMS200MIGetItmWhsBasic = await this.MMS200MI_GetItmWhsBasic(this.warehouse, this.productNumber);
        if (this.responseMMS200MIGetItmWhsBasic?.length > 0) {
            this.valueofMXST = Number(this.responseMMS200MIGetItmWhsBasic[0]['MXST']);
        }

        console.log("this.valueofMXST", this.valueofMXST)
        if (this.valueofMXST !== 0) {
            this.responseMMS200MIGetItmWhsBal = await this.MMS200MIGetItmWhsBal(this.warehouse, this.productNumber);
            if (this.responseMMS200MIGetItmWhsBal?.length > 0) {
                const bal = this.responseMMS200MIGetItmWhsBal[0];
                const quqt = Number(bal?.QUQT ?? 0);
                const rjqt = Number(bal?.RJQT ?? 0);
                const stqt = Number(bal?.STQT ?? 0);
                //this.sumofBAL = Number(this.responseMMS200MIGetItmWhsBal[0]['QUQT']) + Number(this.responseMMS200MIGetItmWhsBal[0]['RJQT']) + Number(this.responseMMS200MIGetItmWhsBal[0]['STQT']) + this.quantity
                this.sumofBAL = quqt + rjqt + stqt + this.quantity;
            }
            console.log("Sum2", this.sumofBAL);
        }
        let responseMMS200MIGetItmBasic = await this.MMS200MIGetItmBasic();
        if (responseMMS200MIGetItmBasic?.length > 0) {
            this.itemDesc = responseMMS200MIGetItmBasic[0]['ITDS'];
        }
        console.log("itemDesc", this.itemDesc);

        this.flag = true;
        this.controller.PressKey("F14");
    }


    private async MMS200MI_GetItmWhsBasic(warehouse: string, item: any) {
        return new Promise<any>((resolve) => {
            const apiRequest = new MIRequest();
            apiRequest.program = "MMS200MI";
            apiRequest.transaction = "GetItmWhsBasic";
            apiRequest.record = {
                WHLO: warehouse,
                ITNO: this.productNumber
            };
            apiRequest.company = ScriptUtil.GetUserContext().CurrentCompany;
            apiRequest.outputFields = ['MXST'];
            apiRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(apiRequest).then(
                (response: IMIResponse) => {
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    //Handle errors here
                    console.log("CUSEXTMI Error: ", response);
                    resolve(null);
                });
        });
    }

    private MWS070MI_LstTransByOrder(ridn: string) {
        return new Promise<any>((resolve) => {
            const myRequest = new MIRequest();
            myRequest.program = "MWS070MI";
            myRequest.transaction = "LstTransByOrder"
            //Fields that should be returned by the transaction
            myRequest.outputFields = [];
            //Input to the transaction
            myRequest.record = {
                RIDN: ridn,
                TTYP: "11",
            }
            myRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(myRequest).then(
                (response: IMIResponse) => {
                    //Read results here
                    console.log(response.items)
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    console.log(response)
                    //Handle errors here
                    resolve(null);
                });
        });
    }
    private async MMS200MIGetItmWhsBal(warehouse: string, item: any) {
        return new Promise<any>((resolve) => {
            const apiRequest = new MIRequest();
            apiRequest.program = "MMS200MI";
            apiRequest.transaction = "GetItmWhsBal";
            apiRequest.record = {
                WHLO: warehouse,
                ITNO: item
            };
            apiRequest.company = ScriptUtil.GetUserContext().CurrentCompany;
            apiRequest.outputFields = ['STQT', 'QUQT', 'RJQT'];
            apiRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(apiRequest).then(
                (response: IMIResponse) => {
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    //Handle errors here
                    console.log("GetITMWhsBAL Error: ", response);
                    resolve(null);
                });
        });
    }

    private async MMS200MIGetItmBasic() {
        return new Promise<any>((resolve) => {
            const apiRequest = new MIRequest();
            apiRequest.program = "MMS200MI";
            apiRequest.transaction = "GetItmBasic";
            apiRequest.record = {
                CONO: ScriptUtil.GetUserContext().CurrentCompany,
                ITNO: this.productNumber
            };
            apiRequest.company = ScriptUtil.GetUserContext().CurrentCompany;
            apiRequest.outputFields = ['ITDS'];
            apiRequest.maxReturnedRecords = 0;
            this.miService.executeRequest(apiRequest).then(
                (response: IMIResponse) => {
                    resolve(response.items);
                }).catch((response: IMIResponse) => {
                    //Handle errors here
                    console.log("GetITMWhsBAL Error: ", response);
                    resolve(null);
                });
        });
    }

    private callEmailIONApi() {

        var request: IonApiRequest = {
            url: '/IDM/api/email',
            method: "POST",
            data: {
                emailMessage: {
                    to: "aburzio@silvateam.com,rbotto@silvateam.com,cbaudino@silvateam.com,lspedaliere@silvateam.com",//cbaudino@silvateam.com,aburzio@silvateam.com,rbotto@silvateam.com,lspedaliere@silvateam.com
                    subject: "Versamento di " + this.productNumber + " supera la quantità massima",
                    body: "L’ordine di produzione " + this.purchaseOrderNumber + " sta cercando di versare una quantità " + this.quantity + " di " + this.productNumber + " " + this.itemDesc + ". La nuova giacenza supera la quantità massima. Versamento NON eseguito."
                }
            },
            headers: { "accept": 'application/json', "content-type": "application/json" }
        };
        console.log(request);
        this.ionApiService.execute(request).then(
            (response: IMIResponse) => {
                //console.log("ION API IPS response --->", response);
            }).catch((response: IMIResponse) => {
                //Handle errors here
                console.log("Error: ", response);
            });
    }
}