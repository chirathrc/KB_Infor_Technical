/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-10-14
 * Summary     : H5 script for PPA180BC to display Purchase Price, Total Line Amount, Total Order Value and Approval Status
 *               for purchase requisition sublines. Uses PPS170MI and CMS100MI APIs.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna  | 2025-10-14 | Initial Script creation
 */

class PPS180B1_TotalOrderValue {
    private controller: IInstanceController;
    private log: IScriptLog;
    private grid: IActiveGrid;
    private miService: any;
    private content: IContentElement;
    private button: any;
    private totalLabel: any;
    private cono: string;
    private LANG: string;
    private columnsAdded: boolean = false;
    private isCalculating: boolean = false;
    private wasAway: boolean = false;
    private gridReady: boolean = false;
    private dataReady: boolean = false;
    private buttonState: boolean = false;
    private lastSelection: number = -1;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.grid = this.controller.GetGrid();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.content = this.controller.GetContentElement();
        this.cono = ScriptUtil.GetUserContext("CONO");
        this.LANG = ScriptUtil.GetUserContext().CurrentLanguage;
        this.wasAway = false;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new PPS180B1_TotalOrderValue(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("🚀 Total Order Value Script - .00 FLOAT DISPLAY!");

        const panelName = this.controller.GetPanelName();
        if (panelName !== "PPA180BC") {
            this.log.Info(`❌ Wrong panel: ${panelName}`);
            return;
        }
        console.log(`🌐 User Language: ${this.LANG}`);

        this.forceDisableButton();
        this.createUI();
        
        setTimeout(() => this.forceDisableButton(), 50);
        setTimeout(() => this.forceDisableButton(), 100);
        setTimeout(() => this.forceDisableButton(), 200);
        setTimeout(() => this.forceDisableButton(), 500);

        setInterval(() => {
            const currentPanel = this.controller.GetPanelName();
            if (currentPanel === "PPA180BC" && this.wasAway) {
                this.clearGridData();
                this.wasAway = false;
                this.forceDisableButton();
                this.buttonState = false;
                this.lastSelection = -1;
                this.log.Info("🔄 AUTO-CLEAR: BUTTON DISABLED");
            } else if (currentPanel !== "PPA180BC") {
                this.wasAway = true;
            }
        }, 500);

        setTimeout(() => {
            this.checkGridReady();
            setInterval(() => {
                this.updateButtonState();
            }, 300);
        }, 1000);
    }

    private forceDisableButton(): void {
        if (this.button) this.button.IsEnabled = false;
        $('#totalBtn').prop('disabled', true).css({ 
            'pointer-events': 'none', 
            'opacity': '0.5',
            'cursor': 'not-allowed'
        });
        this.buttonState = false;
    }

    private smoothEnableButton(): void {
        if (this.buttonState) return;
        
        if (this.button) this.button.IsEnabled = true;
        $('#totalBtn').prop('disabled', false).css({ 
            'pointer-events': '', 
            'opacity': '1',
            'cursor': 'pointer'
        });
        this.buttonState = true;
        this.log.Info("✅ BUTTON SMOOTH ENABLED");
    }

    private smoothDisableButton(): void {
        if (!this.buttonState) return;
        
        if (this.button) this.button.IsEnabled = false;
        $('#totalBtn').prop('disabled', true).css({ 
            'pointer-events': 'none', 
            'opacity': '0.5',
            'cursor': 'not-allowed'
        });
        this.buttonState = false;
        this.log.Info("🔒 BUTTON SMOOTH DISABLED");
    }

    private checkGridReady(): void {
        try {
            const columns = this.grid.getColumns();
            const data = this.grid.getData();
            
            this.gridReady = !!(columns && columns.length > 0);
            this.dataReady = !!(data && data.length > 0);
            
            this.log.Info(`📊 GRID READY: ${this.gridReady} | DATA: ${this.dataReady}`);
            this.forceDisableButton();
            
        } catch (ex) {
            this.log.Error(`❌ GRID CHECK ERROR: ${ex}`);
            this.forceDisableButton();
        }
    }

    private createUI(): void {
        const btn = new ButtonElement();
        btn.Name = "totalBtn";
        btn.Value = this.getLocalizedText("Display Total", {
            GB: "Display Total",
            CS: "显示总计",
            VI: "Tổng hiển thị"
        });
        btn.Position = new PositionElement();
        btn.Position.Top = 2;
        btn.Position.Left = 59;
        btn.Position.Width = 10;
        this.button = this.content.AddElement(btn);
        this.button.on("click", () => this.onButtonClick());

        const lbl = new LabelElement();
        lbl.Name = "totalLbl";
        lbl.Value = this.getLocalizedText("", {
            GB: "",
            CS: "",
            VI: ""
        });
        lbl.Position = new PositionElement();
        lbl.Position.Top = 1;
        lbl.Position.Left = 59;
        this.totalLabel = this.content.AddElement(lbl);

        this.log.Info(`✅ UI Created`);
    }

    private updateButtonState(): void {
        if (!this.gridReady || !this.dataReady) {
            this.smoothDisableButton();
            return;
        }

        try {
            const selectedRows = this.grid.getSelectedGridRows();
            const currentSelection = selectedRows ? selectedRows.length : 0;
            
            if (currentSelection === this.lastSelection) {
                return;
            }
            
            this.lastSelection = currentSelection;
            
            const shouldEnable = currentSelection > 0;
            
            if (shouldEnable && !this.buttonState) {
                this.smoothEnableButton();
            } else if (!shouldEnable && this.buttonState) {
                this.smoothDisableButton();
            }

        } catch (ex) {
            this.smoothDisableButton();
            this.log.Error(`❌ BUTTON ERROR: ${ex}`);
        }
    }

    private clearGridData(): void {
        const allRows = this.grid.getData() || [];
        for (let row of allRows) {
            row.PurchasePriceUM = "";
            row.TotalLineAmount = "";
            row.TotalOrderValue = "";
            row.ApprovalStatus = "";
        }
        this.grid.setData(allRows);
        this.totalLabel.Value = this.getLocalizedText("TotalLabelEmpty", {
            GB: "Total Order Value: 0.00",
            CS: "订单总额: 0.00",
            VI: "Tổng đơn hàng: 0.00"
        });
        this.smoothDisableButton();
        this.log.Info("🧹 GRID CLEARED - BUTTON DISABLED");
    }

    private getLocalizedText(key: string, translations: { [key: string]: string }): string {
        return translations[this.LANG] || translations["GB"] || key;
    }

    /*** FIXED: GET VALID V_TVAL (SKIP 0.000) ***/
    private async getAllV_TVAL(plpn: string): Promise<{ v_tvalList: number[], currency: string }> {
        var v_tvalList: number[] = [];
        var currency = "";
        
        try {
            const req = new MIRequest();
            req.program = "CMS100MI";
            req.transaction = "LstPRLINES";
            req.record = { POPLPN: plpn, F_GETY: "29", T_GETY: "29" };
            req.outputFields = ["V_TVAL", "POCUCD"];
            const resp = await this.miService.executeRequestV2(req);
            
            const records = resp.items || [];
            this.log.Info(`📋 FOUND ${records.length} RECORDS FOR PLPN: ${plpn}`);
            
            // *** COLLECT ONLY VALID V_TVAL (SKIP 0.000) ***
            for (let i = 0; i < records.length; i++) {
                const record = records[i];
                if (!record || Object.keys(record).length === 0) continue;
                
                const v_tval = parseFloat(record["V_TVAL"] || "0");
                if (v_tval > 0) {  // *** SKIP 0.000 ***
                    v_tvalList.push(v_tval);
                    currency = record["POCUCD"] || "";
                    this.log.Info(`📊 V_TVAL ${i+1}: ${v_tval.toFixed(2)} ${currency}`);
                }
            }
            
            this.log.Info(`💰 VALID V_TVAL LIST: [${v_tvalList.map(v => v.toFixed(2)).join(', ')}] | Count: ${v_tvalList.length}`);
            
        } catch (ex) {
            this.log.Error(`❌ CMS100MI ERROR: ${ex}`);
        }

        return { v_tvalList, currency };
    }

    /*** UNCHANGED: GET GRAND ORDER TOTAL ***/
    private async getOrderTotals(plpn: string): Promise<{ totalOrderValue: number, currency: string }> {
        var totalOrderValue = 0;
        var currency = "";
        
        try {
            const req = new MIRequest();
            req.program = "CMS100MI";
            req.transaction = "LstPRLINES";
            req.record = { POPLPN: plpn, F_GETY: "29", T_GETY: "29" };
            req.outputFields = ["V_TVAL", "POCUCD"];
            const resp = await this.miService.executeRequestV2(req);
            
            const records = resp.items || [];
            
            for (let i = 0; i < records.length; i++) {
                const record = records[i];
                if (!record || Object.keys(record).length === 0) continue;
                
                totalOrderValue += parseFloat(record["V_TVAL"] || "0");
                currency = record["POCUCD"] || "";
            }
            
        } catch (ex) {
            this.log.Error(`❌ CMS100MI ERROR: ${ex}`);
        }

        return { totalOrderValue, currency };
    }

    /*** UNCHANGED: GET PRICE/STATUS PER SUBLINES ***/
    private async getSublinesData(plpn: string, plps: string): Promise<{ priceUM: string, status: string }> {
        var pupr = "0.00", puun = "", ircv = "";
        
        try {
            const req = new MIRequest();
            req.program = "PPS170MI";
            req.transaction = "GetPOProp";
            req.record = { CONO: this.cono, PLPN: plpn, PLPS: plps };
            req.outputFields = ["PUPR", "PUUN", "IRCV"];
            const resp = await this.miService.executeRequestV2(req);
            const rec = resp.items[0] || {};
            pupr = parseFloat(rec["PUPR"] || "0").toFixed(2);
            puun = rec["PUUN"] || "";
            ircv = rec["IRCV"] || "";
        } catch (ex) {
            this.log.Error(`❌ PPS170MI ERROR for PLPS ${plps}: ${ex}`);
        }

        return {
            priceUM: pupr + " / " + puun,
            status: ircv
        };
    }

    /*** PERFECT: V_TVAL BY SUBLINES INDEX WITH .00 ***/
    private async onButtonClick(): Promise<void> {
        const selectedRows = this.grid.getSelectedGridRows();
        if (!selectedRows || selectedRows.length === 0) {
            this.smoothDisableButton();
            return;
        }

        if (this.isCalculating) return;
        this.isCalculating = true;
        this.smoothDisableButton();

        const sortingOrder = this.detectSortingOrder();
        const { plpnField, plpsField } = this.getPlpnPlpsFields(sortingOrder);

        var validation = this.validateMultiSelect(selectedRows, plpnField);
        if (!validation.isValid) {
            this.controller.ShowMessage(validation.message);
            this.isCalculating = false;
            this.smoothDisableButton();
            return;
        }

        const selectedPlpn = validation.plpn!;
        this.log.Info(`🎯 PROCESSING PLPN: ${selectedPlpn} (${selectedRows.length} sublines)`);

        if (!this.columnsAdded) this.addGridColumns();

        // *** FIXED: ENHANCED SCROLL LOCKING ***
        const savedScroll = this.lockScroll();

        try {
            const allRows = this.grid.getData() || [];
            var sublines: any[] = [];
            
            // *** FIND ALL SUBLINES (SORT BY PLPS) ***
            for (let j = 0; j < allRows.length; j++) {
                if (allRows[j][plpnField] === selectedPlpn) {
                    sublines.push(allRows[j]);
                }
            }
            
            // *** SORT SUBLINES BY PLPS (003,004,006,007) ***
            sublines.sort((a, b) => {
                const plpsA = parseInt(a[plpsField] || "999");
                const plpsB = parseInt(b[plpsField] || "999");
                return plpsA - plpsB;
            });

            // *** STEP 1: GET VALID V_TVAL LIST + GRAND TOTAL ***
            const v_tvalData = await this.getAllV_TVAL(selectedPlpn);
            const totals = await this.getOrderTotals(selectedPlpn);
            
            // *** STEP 2: MAP V_TVAL TO SUBLINES ***
            var errors: string[] = [];
            for (let i = 0; i < sublines.length; i++) {
                const subline = sublines[i];
                const plps = subline[plpsField] || "";
                
                try {
                    // *** GET V_TVAL BY INDEX (SKIP 0.000) ***
                    let v_tval = 0;
                    if (i < v_tvalData.v_tvalList.length) {
                        v_tval = v_tvalData.v_tvalList[i];
                    }
                    
                    // *** GET PRICE/STATUS ***
                    const sublineData = await this.getSublinesData(selectedPlpn, plps);
                    
                    // *** UPDATE EACH SUBLINES WITH .00 ***
                    subline.PurchasePriceUM = sublineData.priceUM;
                    subline.TotalLineAmount = v_tval.toFixed(2) + " " + v_tvalData.currency;  // *** .00 FLOAT ***
                    subline.TotalOrderValue = totals.totalOrderValue.toFixed(2) + " " + totals.currency; // *** .00 FLOAT ***
                    subline.ApprovalStatus = sublineData.status;
                    
                    this.log.Info(`📊 SUBLINES ${plps} (#${i+1}): V_TVAL=${v_tval.toFixed(2)} | Price=${sublineData.priceUM}`);
                    
                } catch (ex) {
                    errors.push(`Sublines ${plps}: API failed`);
                }
            }

            this.grid.setData(allRows);
            this.grid.setColumns(this.grid.getColumns());

            // *** FIXED: ENHANCED SCROLL UNLOCKING (500ms) ***
            this.unlockScroll(savedScroll);

            // *** GRAND TOTAL LABEL WITH .00 ***
            this.totalLabel.Value = this.getLocalizedText("TotalLabel", {
                GB: `Total Order Value: ${totals.totalOrderValue.toFixed(2)} ${totals.currency}`,
                CS: `订单总额: ${totals.totalOrderValue.toFixed(2)} ${totals.currency}`,
                VI: `Tổng đơn hàng: ${totals.totalOrderValue.toFixed(2)} ${totals.currency}`
            });

            if (errors.length > 0) {
                this.controller.ShowMessage(errors.join("\n"));
            }

            this.log.Info(`🎉 SUCCESS: ${sublines.length} sublines | GRAND TOTAL: ${totals.totalOrderValue.toFixed(2)}`);

        } catch (ex) {
            // *** FIXED: UNLOCK ON ERROR ***
            this.unlockScroll(savedScroll);
            this.controller.ShowMessage("API failed");
            this.log.Error(`❌ BUTTON ERROR: ${ex}`);
        }

        this.isCalculating = false;
        
        setTimeout(() => {
            const stillSelected = this.grid.getSelectedGridRows();
            if (stillSelected && stillSelected.length > 0) {
                this.smoothEnableButton();
                this.log.Info("🔘 POST-CLICK: STAYS ENABLED");
            } else {
                this.smoothDisableButton();
                this.log.Info("🔘 POST-CLICK: DISABLED");
            }
        }, 100);
    }

    // *** FIXED: ENHANCED SCROLL LOCKING ***
    private lockScroll(): number {
        var content = this.controller.GetContent();
        var gridElement = content.find(".grid-container, .data-grid, .grid-body, table, .ag-body-viewport, .grid-viewport");
        if (gridElement && gridElement.length > 0) {
            var savedScroll = gridElement.scrollTop() || 0;
            gridElement.css({ 
                "overflow": "hidden", 
                "position": "relative",
                "scroll-behavior": "auto"
            });
            this.log.Info(`🔒 SCROLL LOCKED: ${savedScroll}px`);
            return savedScroll;
        }
        return 0;
    }

    // *** FIXED: ENHANCED SCROLL UNLOCKING (500ms) ***
    private unlockScroll(savedScroll: number): void {
        setTimeout(() => {
            var content = this.controller.GetContent();
            var gridElement = content.find(".grid-container, .data-grid, .grid-body, table, .ag-body-viewport, .grid-viewport");
            if (gridElement && gridElement.length > 0) {
                gridElement.scrollTop(savedScroll);
                gridElement.css({ 
                    "overflow": "", 
                    "position": "", 
                    "scroll-behavior": ""
                });
                this.log.Info(`🔓 SCROLL RESTORED: ${savedScroll}px`);
            }
        }, 500);  // *** INCREASED TO 500ms ***
    }

    // *** ALL OTHER METHODS UNCHANGED ***
    private detectSortingOrder(): string {
        const columns = this.grid.getColumns() || [];
        const allRows = this.grid.getData() || [];
        
        if (!columns || columns.length === 0) return "S1";

        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            if (col && col.name) {
                var colName = col.name.toUpperCase();
                if (colName.indexOf("S1PLPN") !== -1) return "S1";
                if (colName.indexOf("S2PLPN") !== -1) return "S2";
                if (colName.indexOf("S3PLPN") !== -1) return "S3";
            }
        }

        if (allRows.length > 0) {
            var firstRow = allRows[0];
            if (firstRow["S3PLPN"] && firstRow["S3PLPN"] !== "") return "S3";
            if (firstRow["S2PLPN"] && firstRow["S2PLPN"] !== "") return "S2";
            if (firstRow["S1PLPN"] && firstRow["S1PLPN"] !== "") return "S1";
        }

        return "S1";
    }

    private getPlpnPlpsFields(sortingOrder: string): { plpnField: string, plpsField: string } {
        switch (sortingOrder) {
            case "S1": return { plpnField: "S1PLPN", plpsField: "S1PLPS" };
            case "S2": return { plpnField: "S2PLPN", plpsField: "S2PLPS" };
            case "S3": return { plpnField: "S3PLPN", plpsField: "S3PLPS" };
            default: return { plpnField: "S1PLPN", plpsField: "S1PLPS" };
        }
    }

    private validateMultiSelect(selectedRows: any[], plpnField: string): { isValid: boolean, message: string, plpn?: string } {
        if (!selectedRows || selectedRows.length === 0) {
            return { isValid: false, message: "" };
        }

        var plpnValues: string[] = [];
        for (var i = 0; i < selectedRows.length; i++) {
            var plpn = selectedRows[i].data[plpnField] || "";
            if (plpn) plpnValues.push(plpn);
        }

        if (plpnValues.length === 0) return { isValid: false, message: "" };

        var firstPlpn = plpnValues[0];
        for (var i = 1; i < plpnValues.length; i++) {
            if (plpnValues[i] !== firstPlpn) {
                return { isValid: false, message: this.getLocalizedText("DifferentPLPN", {
                    GB: "Cannot select multiple planned orders",
                    CS: "无法选择多个计划订单",
                    VI: "Không thể chọn nhiều đơn hàng đã lên kế hoạch"
                }) };
            }
        }

        return { isValid: true, message: "", plpn: firstPlpn };
    }

    private addGridColumns(): void {
        const columns = this.grid.getColumns() || [];
        
        var hasPurchaseColumn = false;
        for (var k = 0; k < columns.length; k++) {
            if (columns[k] && columns[k].name === "PurchasePriceUM") {
                hasPurchaseColumn = true;
                break;
            }
        }
        
        if (hasPurchaseColumn) {
            this.columnsAdded = true;
            return;
        }
        
        const columnDefs = [
            { name: "PurchasePriceUM", label: this.getLocalizedText("PurchasePriceUM", { GB: "Purchase Price/UM", CS: "单价/单位", VI: "Giá mua vào/Đơn vị tính" }), width: 150 },
            { name: "TotalLineAmount", label: this.getLocalizedText("TotalLineAmount", { GB: "Total Line Amount", CS: "行总额", VI: "Tổng dòng đơn hàng" }), width: 150 },
            { name: "TotalOrderValue", label: this.getLocalizedText("TotalOrderValue", { GB: "Total Order Value", CS: "订单总额", VI: "Tổng đơn hàng" }), width: 150 },
            { name: "ApprovalStatus", label: this.getLocalizedText("ApprovalStatus", { GB: "Approval Status", CS: "审批状态", VI: "Trạng thái phê duyệt" }), width: 120 }
        ];

        var newColumns: any[] = [];
        for (var n = 0; n < columns.length; n++) {
            newColumns.push(columns[n]);
        }
        
        for (var m = 0; m < columnDefs.length; m++) {
            var def = columnDefs[m];
            newColumns.push({
                id: def.name,
                field: def.name,
                name: def.label,
                width: def.width
            });
        }

        this.grid.setColumns(newColumns);
        this.columnsAdded = true;
        this.log.Info(`✅ Columns added (${this.LANG})`);
    }
}


