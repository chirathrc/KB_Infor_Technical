/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2015-08-11
 * Summary     : Adds an Auto-GRN button on PPS300/E panel to process selected purchase order lines using PPS001MI.Receipt API.
 *               Supports multilingual (English/Chinese) messages and validates location, lot number, and selected lines.
 *               Uses ShowBusyIndicator for processing status and ShowMessage for final message.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-08-11 | Initial script creation
 * ChirathRO         | 2025-08-26 | Added uppercase conversion for Lot Number
 */

class PPS300E_GRNWSP {
    private controller: IInstanceController;
    private log: IScriptLog;
    private contentElement: IContentElement;
    private miService: any;
    private grid: IActiveGrid;
    private purOrderNo: string = "";
    private lot: string = "";
    private location: string = "";
    private LANG: string = "";
    private items: any[] = [];
    private initialCount: number = 0;
    private itemsCount: number = 0;
    private firstPOLine: string = "";
    private lastPOLine: string = "";
    private isBusyIndicatorSupported: boolean = true;
    private readonly selector: string = 'input#LottBox';

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.contentElement = this.controller.GetContentElement();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.grid = this.controller.GetGrid();
        this.log.Info(`Constructor: grid=${!!this.grid}`);
        if (this.grid) {
            this.log.Info(`Constructor: grid columns=${JSON.stringify(this.grid.getColumns()?.map(col => col.name || col.id))}`);
        }
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new PPS300E_GRNWSP(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("Script Initializing 5.");

        const panelName = this.controller.GetPanelName();
        console.log(`GetPanelName: ${panelName}`);
        if (panelName === "PPA300BC") {
            this.LANG = ScriptUtil.GetUserContext().CurrentLanguage || "EN";
            this.purOrderNo = ScriptUtil.GetFieldValue("WWPUNO") || "";

            try {
                this.addLocation();
                this.addLotNo();
                //Update by Chirath 
                document.body.addEventListener('input', (event: Event) => {
                    const target = event.target as HTMLInputElement;

                    if (target && target.matches(this.selector)) {
                        this.handleTransform(target);
                    }
                }, true);
                const autoGRNBtn = this.createButtonElement(
                    "GRNbutton",
                    this.LANG === "CS" ? "自动收货" : "Auto-GRN",
                    8,
                    59,
                    10,
                    this.LANG === "CS" ? "选择行自动入库" : "Auto GRN the selected lines"
                );
                this.contentElement.AddElement(autoGRNBtn).on("click", (e) => this.onClickSelLines(e));
                this.log.Info("Auto-GRN button added");
            } catch (ex) {
                this.log.Error(`Error adding UI elements: ${ex}`);
                this.controller.ShowMessage(
                    this.LANG === "CS" ? `UI元素添加失败: ${ex}` : `Failed to add UI elements: ${ex}`
                );
            }
        } else {
            this.log.Info(`Not on PPS300/E panel, current: ${panelName}`);
        }
    }

    //Update by Chirath 
    private handleTransform(input: HTMLInputElement): void {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const originalValue = input.value;
        const upperValue = originalValue.toUpperCase();

        // Only update if changes are necessary to prevent infinite loops or redundant renders
        if (originalValue !== upperValue) {
            input.value = upperValue;

            // Restore cursor position to prevent jumping to the end of the string
            if (start !== null && end !== null) {
                input.setSelectionRange(start, end);
            }

            // Trigger a new input event so Angular/React model bindings detect the change
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    private addLocation(): void {
        this.log.Info("Adding Location textbox");
        const labelLoc = new LabelElement();
        labelLoc.Name = "labelLoc";
        labelLoc.Value = this.LANG === "CS" ? "仓位:" : "Location:";
        labelLoc.Position = new PositionElement();
        labelLoc.Position.Top = 8;
        labelLoc.Position.Left = 16;
        labelLoc.Position.Width = 10;
        this.contentElement.AddElement(labelLoc);
        this.log.Info("Location label added");

        const locationBox = new TextBoxElement();
        locationBox.Name = "LocationtBox";
        locationBox.Value = "";
        locationBox.Position = new PositionElement();
        locationBox.Position.Top = 8;
        locationBox.Position.Left = 22;
        locationBox.Position.Width = 12;
        this.contentElement.AddElement(locationBox);
        this.log.Info("Location textbox added");
    }

    private addLotNo(): void {
        this.log.Info("Adding Lot Number textbox");
        const labelLotNo = new LabelElement();
        labelLotNo.Name = "labelLotNo";
        labelLotNo.Value = this.LANG === "CS" ? "批次号:" : "Lot Number:";
        labelLotNo.Position = new PositionElement();
        labelLotNo.Position.Top = 8;
        labelLotNo.Position.Left = 35;
        labelLotNo.Position.Width = 10;
        this.contentElement.AddElement(labelLotNo);
        this.log.Info("Lot Number label added");

        const lotBox = new TextBoxElement();
        lotBox.Name = "LottBox";
        lotBox.Value = "";
        lotBox.Position = new PositionElement();
        lotBox.Position.Top = 8;
        lotBox.Position.Left = 44;
        lotBox.Position.Width = 12;
        this.contentElement.AddElement(lotBox);
        this.log.Info("Lot Number textbox added");
    }

    private createButtonElement(
        btnName: string,
        btnValue: string,
        btnRow: number,
        btnCol: number,
        btnWidth: number,
        btnTooltip: string
    ): ButtonElement {
        const btnElem = new ButtonElement();
        btnElem.Name = btnName;
        btnElem.Value = btnValue;
        btnElem.Position = new PositionElement();
        btnElem.Position.Top = btnRow;
        btnElem.Position.Left = btnCol;
        btnElem.Position.Width = btnWidth;
        return btnElem;
    }

    private showProcessingIndicator(): void {
        try {
            if (this.isBusyIndicatorSupported) {
                const success = this.controller.ShowBusyIndicator();
                if (!success) {
                    //this.log.Warn("ShowBusyIndicator not supported, falling back to ShowMessage");
                    this.isBusyIndicatorSupported = false;
                    this.controller.ShowMessage(
                        this.LANG === "CS" ? "正在处理订单行，请稍候..." : "Processing PO lines, please wait..."
                    );
                } else {
                    this.log.Info("Busy indicator shown");
                }
            } else {
                this.controller.ShowMessage(
                    this.LANG === "CS" ? "正在处理订单行，请稍候..." : "Processing PO lines, please wait..."
                );
                this.log.Info("Processing message shown via ShowMessage");
            }
        } catch (ex) {
            this.log.Error(`Error showing processing indicator: ${ex}, falling back to ShowMessage`);
            this.isBusyIndicatorSupported = false;
            this.controller.ShowMessage(
                this.LANG === "CS" ? "正在处理订单行，请稍候..." : "Processing PO lines, please wait..."
            );
        }
    }

    private hideProcessingIndicator(): void {
        if (this.isBusyIndicatorSupported) {
            try {
                const success = this.controller.HideBusyIndicator();
                if (success) {
                    this.log.Info("Busy indicator hidden");
                } else {
                    //this.log.Warn("HideBusyIndicator failed");
                }
            } catch (ex) {
                this.log.Error(`Error hiding busy indicator: ${ex}`);
            }
        }
    }

    private onClickSelLines(e: JQueryEventObject): void {
        this.log.Info("Auto-GRN button clicked");
        this.lot = ScriptUtil.GetFieldValue("LottBox") || "";
        this.location = ScriptUtil.GetFieldValue("LocationtBox") || "";

        if (!this.lot || !this.location) {
            this.controller.ShowMessage(
                this.LANG === "CS" ? "请输入仓位和批次号!" : "Please Enter a Location and Lot Number!"
            );
            return;
        }

        this.autoGRNFunction();
    }

    private autoGRNFunction(): void {
        try {
            this.log.Info("Processing selected lines");
            this.grid = this.controller.GetGrid();
            if (!this.grid) {
                this.log.Error("Grid is unavailable.");
                this.controller.ShowMessage(
                    this.LANG === "CS" ? "无法访问网格。请联系支持团队。" : "Data is unavailable. Please contact support."
                );
                return;
            }

            // Check if grid has required columns
            const columns = this.grid.getColumns?.() || [];
            const hasPNLI = columns.some(col => col.name === "PNLI" || col.id === "PNLI" || col.name === "S1PNLI" || col.id === "S1PNLI");
            const hasPNLS = columns.some(col => col.name === "PNLS" || col.id === "PNLS" || col.name === "S1PNLS" || col.id === "S1PNLS");
            const hasRVQA = columns.some(col => col.name === "RVQA" || col.id === "RVQA" || col.name === "WSRVQA" || col.id === "WSRVQA");
            this.log.Info(`Has PNLI/S1PNLI: ${hasPNLI}, Has PNLS/S1PNLS: ${hasPNLS}, Has RVQA/WSRVQA: ${hasRVQA}`);

            if (!hasPNLI || !hasPNLS || !hasRVQA) {
                this.log.Error("Required columns (PNLI/S1PNLI, PNLS/S1PNLS, RVQA/WSRVQA) not found.");
                this.controller.ShowMessage(
                    this.LANG === "CS" ? "缺少必要字段（PNLI/S1PNLI, PNLS/S1PNLS, RVQA/WSRVQA）。请更改排序顺序。" :
                        "Required columns (PNLI/S1PNLI, PNLS/S1PNLS, RVQA/WSRVQA) not found. Please change sorting order."
                );
                return;
            }

            // Get selected rows
            const selectedRows = (this.grid as any).getSelectedGridRows?.() || [];
            this.log.Info(`Selected rows count: ${selectedRows.length}`);
            if (selectedRows.length === 0) {
                this.controller.ShowMessage(
                    this.LANG === "CS" ? "请选择订单行!" : "Please select a PO line"
                );
                return;
            }

            // Retrieve data for each selected row
            this.items = [];
            console.log("Selected Rows :" + JSON.stringify(selectedRows));
            for (const row of selectedRows) {
                if (!row.data || (!row.data.PNLI && !row.data.S1PNLI)) {
                    this.log.Info("Skipping invalid/sub row");
                    continue;
                }

                const pnli = row.data?.S1PNLI?.trim() || row.data?.PNLI?.trim() || "";
                const pnls = row.data?.S1PNLS?.trim() || row.data?.PNLS?.trim() || "";
                const rvqa = row.data?.WSRVQA?.trim()?.replace(",", ".") || row.data?.RVQA?.trim()?.replace(",", ".") || "0";

                this.log.Info(`Retrieved PNLI: ${pnli}, PNLS: ${pnls}, RVQA: ${rvqa}`);

                if (pnli && pnls && rvqa) {
                    this.items.push({ Item: { PNLI: pnli, PNLS: pnls, RVQA: rvqa } });
                } else {
                    this.log.Error(`Invalid or missing PNLI/PNLS/RVQA for row: ${JSON.stringify(row)}`);
                    this.controller.ShowMessage(
                        this.LANG === "CS" ? `无效的行数据（PNLI: ${pnli}, PNLS: ${pnls}, RVQA: ${rvqa}）。请检查数据或联系支持团队。` :
                            `Invalid row data (PNLI: ${pnli}, PNLS: ${pnls}, RVQA: ${rvqa}). Please check data or contact support.`
                    );
                }
            }

            this.itemsCount = this.items.length;
            this.initialCount = 0;

            if (this.itemsCount === 0) {
                this.controller.ShowMessage(
                    this.LANG === "CS" ? "未获取到有效订单行!" : "No valid PO lines retrieved!"
                );
                return;
            }

            this.firstPOLine = this.items[0].Item.PNLS || "";
            this.lastPOLine = this.items[this.itemsCount - 1].Item.PNLS || "";
            this.log.Info(`Processing PO Sub Lines from ${this.firstPOLine} to ${this.lastPOLine}`);

            // Show processing indicator
            this.showProcessingIndicator();
            this.processPPS001MI();
        } catch (ex) {
            this.log.Error(`Error in autoGRNFunction: ${ex}`);
            this.hideProcessingIndicator();
            this.controller.ShowMessage(
                this.LANG === "CS" ? `处理失败: ${ex}` : `Processing failed: ${ex}`
            );
        }
    }

    private processPPS001MI(): void {
        if (this.initialCount >= this.itemsCount) {
            this.log.Info("All PO lines processed, hiding indicator and showing final message");
            this.hideProcessingIndicator();
            this.controller.ShowMessage(
                this.LANG === "CS" ? `已更新订单行 - ${this.firstPOLine} 给 ${this.lastPOLine}` :
                    `Updated PO Sub Lines - ${this.firstPOLine} to ${this.lastPOLine}`
            );
            this.log.Info("Final message displayed");
            // Delay F5 to ensure final message is visible
            setTimeout(() => {
                this.controller.PressKey("F5");
                this.log.Info("Panel refreshed with F5");
            }, 2000); // 2-second delay for message visibility
            return;
        }

        const item = this.items[this.initialCount];
        const purchaseOrderLine = item.Item.PNLI || "";
        const purchaseOrderNoSubLine = item.Item.PNLS || "";
        const receivedQuantity = item.Item.RVQA || "0";
        this.lot = this.lot.toUpperCase();
        console.log("Lot Number after uppercased : " + this.lot);


        const request = new MIRequest();
        request.program = "PPS001MI";
        request.transaction = "Receipt";
        request.record = {
            CONO: ScriptUtil.GetUserContext("CONO"),
            PUNO: this.purOrderNo,
            PNLI: purchaseOrderLine,
            PNLS: purchaseOrderNoSubLine,
            TRDT: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
            RESP: ScriptUtil.GetUserContext("USID"),
            RVQA: receivedQuantity,
            WHSL: this.location.toUpperCase(),
            BANO: this.lot,
        };

        this.miService.executeRequestV2(request).then((response: IMIResponse) => {
            this.initialCount++;

            if (!response.items || response.items.length === 0) {
                const errorMsg = response.errorMessage || "Unknown error";
                this.log.Error(`PPS001MI Error for PNLI ${purchaseOrderLine}, PNLS ${purchaseOrderNoSubLine}: ${errorMsg}`);
                this.hideProcessingIndicator();
                this.controller.ShowMessage(
                    this.LANG === "CS" ? `无效！错误（PNLI: ${purchaseOrderLine}, PNLS: ${purchaseOrderNoSubLine}）: ${errorMsg}` :
                        `Invalid! Error (PNLI: ${purchaseOrderLine}, PNLS: ${purchaseOrderNoSubLine}): ${errorMsg}`
                );
            } else {
                this.log.Info(`Processed line PNLI: ${purchaseOrderLine}, PNLS: ${purchaseOrderNoSubLine}`);
            }

            this.processPPS001MI();
        }).catch((error: any) => {
            this.initialCount++;
            const errorMsg = error.errorMessage || error.toString() || "Unknown error";
            this.log.Error(`PPS001MI Error for PNLI ${purchaseOrderLine}, PNLS ${purchaseOrderNoSubLine}: ${errorMsg}`);
            this.hideProcessingIndicator();
            this.controller.ShowMessage(
                this.LANG === "CS" ? `无效！错误（PNLI: ${purchaseOrderLine}, PNLS: ${purchaseOrderNoSubLine}）: ${errorMsg}` :
                    `Invalid! Error (PNLI: ${purchaseOrderLine}, PNLS: ${purchaseOrderNoSubLine}): ${errorMsg}`
            );
            this.processPPS001MI();
        });
    }
}