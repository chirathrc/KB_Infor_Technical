/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2015-08-20
 * Summary     : Script checks if a single selected row in M3’s MWA300BC or MMA100BC panels is a positive Return Order (RO) by 
 *               validating its order type (TRTP) using the CRS200MI API. If the RO is positive, it verifies authorization (AURE) via the MDBREADMI API, 
 *               allowing only authorized ROs or Delivery Orders (DOs) to access the RO/DO Toolbox. It prevents unauthorized actions, multiple selections, 
 *               or missing data with localized error messages in GB, CS, and VI.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-08-20 | Initial script creation
 */

class MMS100B_MWS300B_AutomationOfPositiveRO {
    private controller: IInstanceController;
    private log: IScriptLog;
    private content: JQuery;
    private grid: IActiveGrid;
    private lang: string;
    private errMessage: string = "";
    private pressedKey: string = "";
    private selectedTRTP: string = "";
    private selectedTRNR: string = "";
    private miService: any;
    private isUnloaded: boolean = false;
    private detachRequesting: Function;
    private detachRequested: Function;
    private isProcessingListOption: boolean = false; // Prevent recursive ListOption calls
    private processingRowId: string | null = null; // Track the row being processed to prevent re-processing

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.content = this.controller.GetContent();
        this.lang = ScriptUtil.GetUserContext()?.CurrentLanguage || "EN";
        this.grid = this.controller.GetGrid();
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.detachRequesting = null;
        this.detachRequested = null;
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new MMS100B_MWS300B_AutomationOfPositiveRO(scriptArgs).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("MMS100B_MWS300B_AutomationOfPositiveRO script initializing...");
        const panelName = this.controller.GetPanelName();
        this.log.Info(`Current panel: ${panelName}`);
        if (panelName !== "MMA100BC" && panelName !== "MWA300BC") {
            this.log.Info(`Script only applies to MMA100BC or MWA300BC. Current panel: ${panelName}`);
            return;
        }

        // Attach event listeners
        this.attachEvents();
        this.log.Info("Script initialized successfully.");
    }

    private attachEvents(): void {
        this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
        this.detachRequested = this.controller.Requested.On((e) => this.onRequested(e));
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        if (args.commandType === "LSTOPT" && args.commandValue === "42" && !this.isProcessingListOption) {
            this.log.Info(`Command Type: ${args.commandType} | Command Value: ${args.commandValue}`);
            this.pressedKey = args.commandValue;

            // Check if grid has TRTP and TRNR columns
            const columns = this.grid.getColumns?.() || [];
            const hasTRTP = columns.some(col => col.name === "TRTP" || col.id === "TRTP");
            const hasTRNR = columns.some(col => col.name === "TRNR" || col.id === "TRNR");
            this.log.Info(`Has TRTP column: ${hasTRTP}, Has TRNR column: ${hasTRNR}`);

            if (!hasTRTP || !hasTRNR) {
                args.cancel = true;
                this.errMessage = this.getLocalizedMessage("MISSING_COLUMNS");
                this.controller.ShowMessage(this.errMessage);
                this.errMessage = "";
                return;
            }

            // Check if only one row is selected
            const selectedRows = (this.grid as any).getSelectedGridRows?.() || [];
            this.log.Info(`Selected rows count: ${selectedRows.length}`);
            if (selectedRows.length > 1) {
                args.cancel = true;
                this.errMessage = this.getLocalizedMessage("MULTIPLE_SELECTION");
                this.controller.ShowMessage(this.errMessage);
                this.errMessage = "";
                return;
            }

            if (selectedRows.length === 0) {
                args.cancel = true;
                this.errMessage = this.getLocalizedMessage("NO_SELECTION");
                this.controller.ShowMessage(this.errMessage);
                this.errMessage = "";
                return;
            }

            // Check if the same row is being re-processed
            const rowId = selectedRows[0].id || selectedRows[0].idx?.toString();
            if (this.processingRowId === rowId) {
                this.log.Info(`Skipping re-processing of row ID: ${rowId} to prevent recursion.`);
                args.cancel = true;
                return;
            }
            this.processingRowId = rowId;

            args.cancel = true;
            this.processSelectedRow(selectedRows[0]);
        }
    }

    private processSelectedRow(selectedRow: any): void {
        try {

            if (!this.selectedTRTP || !this.selectedTRNR) {
                //this.log.Info("Falling back to ScriptUtil.GetFieldValue for TRTP/TRNR.");
                this.selectedTRTP = ScriptUtil.GetFieldValue("TRTP")?.trim() || "";
                this.selectedTRNR = ScriptUtil.GetFieldValue("TRNR")?.trim() || "";
                this.log.Info(`selected TRTP: ${this.selectedTRTP}, TRNR: ${this.selectedTRNR}`);
            }

            if (!this.selectedTRTP || !this.selectedTRNR) {
                this.log.Error("Failed to retrieve TRTP/TRNR from all methods.");
                this.errMessage = this.getLocalizedMessage("NO_SELECTION");
                this.controller.ShowMessage(this.errMessage);
                this.errMessage = "";
                this.processingRowId = null; // Reset row ID
                return;
            }

            // Proceed with API call
            this.callFirstAPI();
        } catch (ex) {
            this.log.Error(`Error processing selected row: ${ex}`);
            this.errMessage = this.getLocalizedMessage("GRID_ERROR");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
            this.processingRowId = null; // Reset row ID
            return;
        }
    }

    private callFirstAPI(): void {
        const request = new MIRequest();
        request.program = "CRS200MI";
        request.transaction = "LstOrderType";
        request.record = {
            TRTP: this.selectedTRTP,
            TTYP: "40",
            FSQ3: "5"
        };
        request.outputFields = ["TRTP"];

        this.miService.executeRequestV2(request).then(
            (response: IMIResponse) => this.onResponseFirstAPICall(response)
        ).catch((response: IMIResponse) => {
            this.log.Error(`CRS200MI API error: ${response.errorMessage || "Unknown error"}`);
            this.errMessage = this.getLocalizedMessage("API_ERROR");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
            this.processingRowId = null;
            return;
        });
    }

    private onResponseFirstAPICall(response: IMIResponse): void {
        if (!response.items || !response.items[0]) {
            this.log.Error("No items returned from CRS200MI.");
            this.errMessage = this.getLocalizedMessage("API_ERROR");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
            this.processingRowId = null;
            return;
        }

        const responseTRTP = response.items[0].TRTP || "";
        this.log.Info(`Response TRTP: ${responseTRTP}`);
        if (responseTRTP === this.selectedTRTP) {
            this.log.Info("Positive RO detected. Calling second API for authorization check.");
            this.callSecondAPI();
        } else {
            this.log.Info("Negative RO or DO detected. Proceeding normally.");
            this.proceedWithListOption();
        }
    }

    private callSecondAPI(): void {
        const request = new MIRequest();
        request.program = "MDBREADMI";
        request.transaction = "GetMGHEAD00";
        request.record = { TRNR: this.selectedTRNR };
        request.outputFields = ["AURE"];

        this.miService.executeRequestV2(request).then(
            (response: IMIResponse) => this.onResponseSecondAPICall(response)
        ).catch((response: IMIResponse) => {
            this.log.Error(`MDBREADMI API error: ${response.errorMessage || "Unknown error"}`);
            this.errMessage = this.getLocalizedMessage("API_ERROR");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
            this.processingRowId = null;
            return;
        });
    }

    private onResponseSecondAPICall(response: IMIResponse): void {
        if (!response.items || !response.items[0]) {
            this.log.Error("No items returned from MDBREADMI.");
            this.errMessage = this.getLocalizedMessage("API_ERROR");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
            this.processingRowId = null;
            return;
        }

        const aure = response.items[0].AURE || "";
        if (aure === "") {
            this.log.Info("Positive RO not authorized.");
            this.errMessage = this.getLocalizedMessage("PENDING_APPROVAL");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
            this.processingRowId = null;
            return; // Prevent toolbox access for unapproved ROs
        } else {
            this.log.Info("Positive RO authorized. Proceeding.");
            this.proceedWithListOption();
        }
    }

    private getLocalizedMessage(messageKey: string): string {
        const messages = {
            MISSING_COLUMNS: {
                VI: "Thay đổi sang thứ tự sắp xếp với trường loại đơn hàng và trường số đơn hàng có sẵn",
                CS: "由订单类型及订单号码来进行筛选",
                EN: "Change to a sorting order with the order type field and order number field available"
            },
            MULTIPLE_SELECTION: {
                VI: "Xử lý một đơn hàng một lần",
                CS: "一次处理一个订单",
                EN: "Please process only one order at a time"
            },
            NO_SELECTION: {
                VI: "Vui lòng chọn một đơn hàng",
                CS: "请选择一个订单",
                EN: "Please select an order"
            },
            PENDING_APPROVAL: {
                VI: "Đơn hàng đang chờ phê duyệt",
                CS: "订单等待审批中",
                EN: "Order is pending Approval"
            },
            API_ERROR: {
                VI: "Lỗi API. Vui lòng liên hệ với đội hỗ trợ GC-IT/M3",
                CS: "API错误，请联系GC-IT/M3技术支持团队。",
                EN: "API error occurred. Please reach out GC-IT/M3 Support"
            },
            GRID_ERROR: {
                VI: "Lưới không khả dụng hoặc không hỗ trợ các phương thức cần thiết. Vui lòng liên hệ với đội hỗ trợ GC-IT/M3",
                CS: "网格不可用或不支持所需方法。请联系GC-IT/M3技术支持团队。",
                EN: "Grid not available or required methods not supported. Please reach out GC-IT/M3 Support"
            }
        };

        return messages[messageKey][this.lang] || messages[messageKey]["EN"];
    }

    private proceedWithListOption(): void {
        this.isProcessingListOption = true;
        try {
            if (this.errMessage !== "") {
                this.controller.ShowMessage(this.errMessage);
                this.errMessage = "";
            }
            this.log.Info(`Executing ListOption with key: ${this.pressedKey}`);
            this.controller.ListOption(this.pressedKey);
        } catch (ex) {
            this.log.Error(`Error executing ListOption: ${ex}`);
            this.errMessage = this.getLocalizedMessage("GRID_ERROR");
            this.controller.ShowMessage(this.errMessage);
            this.errMessage = "";
        } finally {
            this.isProcessingListOption = false;
            this.processingRowId = null; // Reset row ID after ListOption
        }
    }

    private unloadScript(): void {
        if (this.isUnloaded) return;
        this.isUnloaded = true;
        if (this.detachRequesting) this.detachRequesting();
        if (this.detachRequested) this.detachRequested();
        this.log.Info("MMS100B_MWS300B_AutomationOfPositiveRO script unloaded");
    }

    private onRequested(e: RequestEventArgs): void {
        try {
            this.unloadScript();
        } catch (ex) {
            this.log.Error(`OnRequested Exception: ${ex}`);
        }
    }
}