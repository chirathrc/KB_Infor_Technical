/**
 * Author      : Fortude
 * Created on  : 2026-11-05
 * Summary     : Functional Specification FTD_M3_FS 2072 (SAFCO ELEV8 Implementation).
 *               MMS121/B (MMA121BC) - Calculates and displays remaining Shelf Life Percentage
 *               in a custom grid column ('ShlLf%') on the Material Allocation screen.
 *               Retrieves Manufacturing Date (MFDT) and Expiration Date (EXPI) via
 *               MMS235MI.GetItmLot for each Item/Lot combination and calculates:
 *                 Shelf Life % = ((Expiration Date - Current Date) / (Expiration Date - Manufacturing Date)) * 100
 *               Features in-memory lot caching, batch pagination processing (PAGE DOWN),
 *               H5 SDK v2.0+ compatibility, and strict M3 ServerReturnedNOK error validation.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Fortude Consultant| 2026-11-05 | Initial creation for SAFCO ELEV8 (FTD_M3_FS 2072)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MMS121_DisplayShelfLife {
    constructor(scriptArgs) {
        this.itno = "";
        this.dateFormat = "YMD";
        this.columnId = "ShlLf%";
        this.unsubscribeScroll = null;
        this.processedRowCount = 0;
        this.lotCache = {};
        this.isCalculating = false;
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
        this.dateFormat = ScriptUtil.GetUserContext("DTFM") || "YMD";
    }
    /**
     * Standard H5 Script Entry Point
     */
    static Init(scriptArgs) {
        new MMS121_DisplayShelfLife(scriptArgs).run();
    }
    /**
     * Main execution lifecycle
     */
    run() {
        const panelName = this.controller.GetPanelName();
        this.log.Info(`MMS121_DisplayShelfLife initializing on panel: ${panelName}`);
        // Verify that the script executes only on MMS121/B (MMA121BC)
        if (!panelName || (panelName !== "MMA121BC" && panelName !== "MMA121B" && panelName !== "MMA121B1" && !panelName.startsWith("MMA121"))) {
            this.log.Info(`MMS121_DisplayShelfLife: Current panel is ${panelName}. Script only applies to MMS121/B.`);
            return;
        }
        // Prevent duplicate attachment
        if (InstanceCache.ContainsKey(this.controller, "MMS121_DisplayShelfLife")) {
            this.log.Info("MMS121_DisplayShelfLife instance already attached to controller.");
            return;
        }
        InstanceCache.Add(this.controller, "MMS121_DisplayShelfLife", this);
        this.list = this.controller.GetGrid();
        if (!this.list) {
            this.log.Error("MMS121_DisplayShelfLife: Grid control could not be retrieved.");
            return;
        }
        // Retrieve Item Number (ITNO) from panel header
        this.itno = this.resolveHeaderItemNumber();
        this.log.Info(`Resolved Header Item Number: ${this.itno}`);
        // Append custom 'ShlLf%' column
        this.addColumn();
        // Process visible rows (initial batch up to 30 lines)
        const initialData = this.getGridData();
        const initialBatchEnd = Math.min(initialData.length - 1, 29);
        this.populateData(0, initialBatchEnd);
        // Attach pagination handler and lifecycle cleanup
        this.attachScrollEvent();
        this.attachCleanupEvent();
    }
    /**
     * Resolves the Item Number (ITNO) from MMS121/B header fields
     */
    resolveHeaderItemNumber() {
        const itnoVal = ScriptUtil.GetFieldValue("MMITNO", this.controller) ||
            this.controller.GetValue("MMITNO") ||
            this.controller.GetValue("W1ITNO") ||
            this.controller.GetValue("ITNO") ||
            "";
        return itnoVal.trim();
    }
    /**
     * Appends the 'ShlLf%' column to the active grid
     */
    addColumn() {
        const columns = this.list.getColumns() || [];
        const columnExists = columns.some((col) => col.id === this.columnId || col.field === this.columnId);
        if (!columnExists) {
            columns.push({
                id: this.columnId,
                field: this.columnId,
                name: "ShlLf%",
                width: 90,
                align: "right"
            });
            this.list.setColumns(columns);
            this.log.Info("Column 'ShlLf%' successfully appended to grid.");
        }
    }
    /**
     * Iterates and calculates shelf life % for the specified row range
     */
    populateData(fromRow, toRow) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fromRow > toRow || toRow < 0) {
                return;
            }
            if (this.isCalculating) {
                return;
            }
            this.isCalculating = true;
            this.controller.ShowBusyIndicator();
            try {
                const data = this.getGridData();
                let dataUpdated = false;
                for (let i = fromRow; i <= toRow; i++) {
                    const row = data[i];
                    if (!row)
                        continue;
                    // Extract Lot Number (BANO)
                    const bano = (this.getRowValue(row, "S1BANO") || this.getRowValue(row, "BANO") || "").trim();
                    if (!bano) {
                        this.setRowValue(row, this.columnId, "");
                        continue;
                    }
                    // Extract fallback Priority Date (PRDT) from row if available
                    const prdt = (this.getRowValue(row, "S1PRDT") || this.getRowValue(row, "PRDT") || "").trim();
                    // Check cache first
                    const cacheKey = `${this.itno}_${bano}`;
                    let shelfLifeVal = "";
                    if (this.lotCache[cacheKey] !== undefined) {
                        shelfLifeVal = this.lotCache[cacheKey];
                    }
                    else {
                        shelfLifeVal = yield this.fetchAndCalculateShelfLife(this.itno, bano, prdt);
                        this.lotCache[cacheKey] = shelfLifeVal;
                    }
                    this.setRowValue(row, this.columnId, shelfLifeVal);
                    dataUpdated = true;
                    this.processedRowCount = Math.max(this.processedRowCount, i + 1);
                }
                if (dataUpdated) {
                    if (ScriptUtil.version >= 2.0) {
                        this.list.setData(data);
                    }
                    else {
                        this.list.setColumns(this.list.getColumns());
                    }
                }
            }
            catch (ex) {
                this.log.Error(`Error during Shelf Life population: ${ex}`);
            }
            finally {
                this.controller.HideBusyIndicator();
                this.isCalculating = false;
            }
        });
    }
    /**
     * Invokes MMS235MI.GetItmLot and calculates remaining Shelf Life Percentage
     */
    fetchAndCalculateShelfLife(itno, bano, fallbackPrdt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!itno || !bano) {
                return "";
            }
            const request = new MIRequest();
            request.program = "MMS235MI";
            request.transaction = "GetItmLot";
            request.record = {
                ITNO: itno,
                BANO: bano
            };
            request.outputFields = ["EXPI", "MFDT"];
            request.maxReturnedRecords = 1;
            try {
                const response = yield this.miService.executeRequestV2(request);
                // Check for business error even if HTTP promise resolved
                if (response.hasError() || response.errorType === "ServerReturnedNOK" || response.errorMessage) {
                    this.log.Warn(`MMS235MI.GetItmLot NOK for Item=${itno}, Lot=${bano}: ${response.errorMessage || response.errorType}`);
                    return "";
                }
                let expiStr = "";
                let mfdtStr = "";
                if (response.items && response.items.length > 0) {
                    const rec = response.items[0];
                    expiStr = (rec.EXPI || "").trim();
                    mfdtStr = (rec.MFDT || "").trim();
                }
                // Fallback to row Priority Date if EXPI is blank from Lot Master
                if (!expiStr || expiStr === "0" || expiStr === "00000000") {
                    expiStr = fallbackPrdt;
                }
                // Exclusions: If either Expiration or Manufacturing Date is missing/invalid, return blank
                const expDate = this.parseM3Date(expiStr);
                const mfgDate = this.parseM3Date(mfdtStr);
                if (!expDate || !mfgDate) {
                    return "";
                }
                return this.calculateShelfLifePercentage(expDate, mfgDate);
            }
            catch (err) {
                this.log.Error(`MMS235MI invocation error for Item=${itno}, Lot=${bano}: ${err}`);
                return "";
            }
        });
    }
    /**
     * Mathematical Formula (FS FTD_M3_FS 2072 Section 3.1.4.2):
     * Shelf Life % = ((Expiration Date - Current Date) / (Expiration Date - Manufacturing Date)) * 100
     */
    calculateShelfLifePercentage(expDate, mfgDate) {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Truncate time components to compare calendar days
        const expTime = new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate()).getTime();
        const mfgTime = new Date(mfgDate.getFullYear(), mfgDate.getMonth(), mfgDate.getDate()).getTime();
        const now = new Date();
        const currentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const totalLifespanDays = Math.round((expTime - mfgTime) / MS_PER_DAY);
        const remainingDays = Math.round((expTime - currentTime) / MS_PER_DAY);
        // Scope Exclusion: Total lifespan invalid (Expiry date <= Manufacturing date)
        if (totalLifespanDays <= 0) {
            return "0.00";
        }
        const percentage = (remainingDays / totalLifespanDays) * 100;
        // If lot is expired, clamp to 0.00%
        if (percentage <= 0) {
            return "0.00";
        }
        // If current date is prior to manufacturing date, clamp to 100.00%
        if (percentage > 100) {
            return "100.00";
        }
        // Return formatted with 2 decimal places per requirement
        return percentage.toFixed(2);
    }
    /**
     * Parses YYYYMMDD (API) or 6-digit formatted date (UI Priority Date) into a valid Date object
     */
    parseM3Date(dateVal) {
        if (!dateVal)
            return null;
        const str = dateVal.trim();
        if (str === "" || str === "0" || str === "00000000" || str === "000000")
            return null;
        // Standard 8-digit M3 API date: YYYYMMDD
        if (str.length === 8 && /^\d{8}$/.test(str)) {
            const year = parseInt(str.substring(0, 4), 10);
            const month = parseInt(str.substring(4, 6), 10) - 1;
            const day = parseInt(str.substring(6, 8), 10);
            const dt = new Date(year, month, day);
            return isNaN(dt.getTime()) ? null : dt;
        }
        // 6-digit M3 UI formatted date from PRDT: parse based on user DTFM context
        if (str.length === 6 && /^\d{6}$/.test(str)) {
            let year = 0;
            let month = 0;
            let day = 0;
            const dtfm = (this.dateFormat || "YMD").toUpperCase();
            if (dtfm === "DMY") {
                day = parseInt(str.substring(0, 2), 10);
                month = parseInt(str.substring(2, 4), 10) - 1;
                year = parseInt(str.substring(4, 6), 10);
            }
            else if (dtfm === "MDY") {
                month = parseInt(str.substring(0, 2), 10) - 1;
                day = parseInt(str.substring(2, 4), 10);
                year = parseInt(str.substring(4, 6), 10);
            }
            else {
                // YMD
                year = parseInt(str.substring(0, 2), 10);
                month = parseInt(str.substring(2, 4), 10) - 1;
                day = parseInt(str.substring(4, 6), 10);
            }
            const fullYear = year < 50 ? 2000 + year : 1900 + year;
            const dt = new Date(fullYear, month, day);
            return isNaN(dt.getTime()) ? null : dt;
        }
        return null;
    }
    /**
     * Attaches listener for pagination (PAGE DOWN) to calculate new rows as user scrolls
     */
    attachScrollEvent() {
        this.unsubscribeScroll = this.controller.RequestCompleted.On((e) => {
            if (e.commandType === "PAGE" && e.commandValue === "DOWN") {
                const data = this.getGridData();
                const totalRows = data.length;
                if (totalRows > this.processedRowCount) {
                    this.log.Info(`Scroll down detected: populating rows ${this.processedRowCount} to ${totalRows - 1}`);
                    this.populateData(this.processedRowCount, totalRows - 1);
                }
            }
        });
    }
    /**
     * Attaches lifecycle cleanup on panel unload
     */
    attachCleanupEvent() {
        const contentElem = this.controller.GetContentElement();
        if (contentElem && typeof contentElem.OnUnload === "function") {
            contentElem.OnUnload(() => {
                this.detachEvents();
            });
        }
    }
    /**
     * Detaches event subscriptions and cleans cache references
     */
    detachEvents() {
        if (this.unsubscribeScroll) {
            this.unsubscribeScroll();
            this.unsubscribeScroll = null;
        }
        InstanceCache.Remove(this.controller, "MMS121_DisplayShelfLife");
        this.log.Info("MMS121_DisplayShelfLife: Events detached and InstanceCache cleaned.");
    }
    /**
     * Utility: Safely retrieves row dataset supporting SDK v2.0+ and legacy models
     */
    getGridData() {
        const gridData = this.list.getData();
        if (ScriptUtil.version >= 2.0) {
            return gridData || [];
        }
        else {
            const data = [];
            if (gridData && gridData.getLength) {
                for (let i = 0; i < gridData.getLength(); i++) {
                    data.push(gridData.getItem(i));
                }
            }
            return data;
        }
    }
    /**
     * Utility: Retrieves field value from a grid row
     */
    getRowValue(row, fieldName) {
        if (ScriptUtil.version >= 2.0) {
            return row[fieldName] || "";
        }
        else {
            return row[fieldName] || row["id_" + fieldName] || "";
        }
    }
    /**
     * Utility: Sets field value on a grid row
     */
    setRowValue(row, fieldName, value) {
        if (ScriptUtil.version >= 2.0) {
            row[fieldName] = value;
        }
        else {
            const newData = {};
            newData[fieldName] = value;
            newData["id_" + fieldName] = value;
            $.extend(row, newData);
        }
    }
}
