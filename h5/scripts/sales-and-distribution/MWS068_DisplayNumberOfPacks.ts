/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-10 (H5 Script)
 * Summary     :  
 *   H5 Script for MWS068/B panel to display number of packs (raw materials) in Lot Ref 2 (MLBRE2) and KG value for livestock FG in Indonesia WHs in Main Attribute 3 (MLATV3).
 *   Calculations are display-only; no updates to M3 data.
 *   Handles initial load and pagination (PAGE DOWN).
 *
 * Version Log :
 * Changed By            | Date       | Summary of the change
 * ----------------------|------------|---------------------------------------------
 * Nethum Ariyarathna    | 2025-09-10 | Initial script creation
 */

class MWS068_DisplayNumberOfPacks {
    private controller: IInstanceController;
    private log: IScriptLog;
    private list: IActiveGrid;
    private unsubscribeReqCompleted: Function;
    private company: string;
    private oldCount: number = 0;
    private miService; // Not used in this script, but kept for potential future MI calls

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        if (ScriptUtil.version >= 2.0) {
            this.miService = MIService;
        } else {
            this.miService = MIService.Current;
        }
    }

    /**
     * Script initialization static function; Entry point for M3 Panel personalized script
     */
    public static Init(scriptArgs: IScriptArgs): void {
        new MWS068_DisplayNumberOfPacks(scriptArgs).run();
    }

    /**
     * Starting point of every H5 script. Initializes the grid, performs initial calculations, and attaches events.
     */
    public run(): void {
        console.clear();
        this.log.Info("Script Initializing");
        this.company = ScriptUtil.GetUserContext("CurrentCompany");
        console.log("Company Context:", this.company);

        // Get the grid control
        this.list = this.controller.GetGrid();
        console.log("Grid control retrieved, initial row count:", this.getGridData().length);
        this.oldCount = this.getGridData().length; // Initialize with current row count

        // Perform initial calculation on load
        console.log("Starting initial calculation for all rows...");
        this.calculateAndUpdateGrid();

        // Attach events for pagination (PAGE DOWN)
        console.log("Attaching pagination event listener...");
        this.attachEvents(this.controller, this.list);
    }

    /**
     * Calculates and updates the grid rows with number of units (Section 1) and KG values (Section 2).
     * - Section 1: For raw materials, MLBRE2 = MLSTQT / MLATV3 (if MLATV3 not null and not 0), rounded.
     * - Section 2: For livestock FG in Indonesia WHs (WHLO starts with "N", ITNO starts with "F", UNMS = "BAG"), MLATV3 = MLSTQT * 50, rounded with commas.
     * @param fromRow Starting row index (default 0)
     * @param toRow Ending row index (default last row)
     */
    private calculateAndUpdateGrid(fromRow: number = 0, toRow?: number): void {
        const data = this.getGridData();
        const totalRows = data.length;
        toRow = toRow !== undefined ? toRow : totalRows - 1;
        console.log(`Calculating for rows ${fromRow} to ${toRow}, total rows: ${totalRows}`);

        if (fromRow > toRow || toRow < 0) {
            console.log("Invalid row range, skipping calculation.");
            return;
        }

        for (let i = fromRow; i <= toRow; i++) {
            const row = data[i];
            if (!row) {
                console.log(`Row ${i} is null or undefined, skipping.`);
                continue;
            }

            const mlstqt = this.getRowValue(row, "MLSTQT"); // On-hand balance
            const mlatv3 = this.getRowValue(row, "MAAT3"); // Main Attribute 3
            const mmunms = this.getRowValue(row, "MMUNMS"); // Unit of Measure
            const mlwhlo = this.getRowValue(row, "MLWHLO"); // Warehouse
            const mlitno = this.getRowValue(row, "MLITNO"); // Item Number
            console.log(`Processing row ${i}: MLSTQT=${mlstqt}, MAAT3=${mlatv3}, MMUNMS=${mmunms}, MLWHLO=${mlwhlo}, MLITNO=${mlitno}`);

            // Section 1: Raw materials - Calculate number of units for MLBRE2
            if (this.isValidValue(mlstqt) && this.isValidValue(mlatv3)) {
                const onHandBalance = parseFloat(mlstqt.replace(/,/g, ""));
                const mainAttr3 = parseFloat(mlatv3.replace(/,/g, ""));
                console.log(`Section 1 - OnHandBalance: ${onHandBalance}, MainAttr3: ${mainAttr3}`);
                if (mainAttr3 !== 0) {
                    const lotRef2 = Math.round(onHandBalance / mainAttr3).toString();
                    console.log(`Calculated LotRef2: ${lotRef2}`);
                    this.setRowValue(row, "MLBRE2", lotRef2);
                } else {
                    console.log("MainAttr3 is 0, skipping LotRef2 calculation.");
                }
            }

            // Section 2: FG in Indonesia - Calculate KG for MLATV3
            if (this.isValidValue(mmunms) && mmunms === "BAG" &&
                this.isValidValue(mlwhlo) && mlwhlo.indexOf("N") === 0 && // Replaced startsWith with indexOf
                this.isValidValue(mlitno) && mlitno.indexOf("F") === 0 && // Replaced startsWith with indexOf
                this.isValidValue(mlstqt)) {
                const onHandBalance = parseFloat(mlstqt.replace(/,/g, ""));
                console.log(`Section 2 - OnHandBalance: ${onHandBalance}`);
                const kgValue = Math.round(onHandBalance * 50);
                console.log(`Calculated KG Value: ${kgValue}`);
                this.setRowValue(row, "MAAT3", this.numberWithCommas(kgValue.toString()));
            }
        }

        // Update grid with modified data
        console.log("Updating grid with calculated values...");
        this.list.setData(data);
    }

    /**
     * Retrieves the grid data, handling different H5 versions.
     */
    private getGridData(): any[] {
        if (ScriptUtil.version >= 2.0) {
            const data = this.list.getData() || [];
            console.log(`Retrieved grid data (v2+), row count: ${data.length}`);
            return data;
        } else {
            const data = [];
            const gridData = this.list.getData();
            for (let i = 0; i < gridData.getLength(); i++) {
                data.push(gridData.getItem(i));
            }
            console.log(`Retrieved grid data (legacy), row count: ${data.length}`);
            return data;
        }
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

    /**
     * Sets a field value in a row, handling different H5 versions.
     * @param row The row object
     * @param fieldName The field name (e.g., "MLBRE2")
     * @param value The value to set
     */
    private setRowValue(row: any, fieldName: string, value: string): void {
        if (ScriptUtil.version >= 2.0) {
            row[fieldName] = value;
            console.log(`Setting ${fieldName} (v2+) to: ${value}`);
        } else {
            const newData = {};
            newData[fieldName] = value;
            $.extend(row, newData);
            console.log(`Setting ${fieldName} (legacy) to: ${value}`);
        }
    }

    /**
     * Checks if a value is valid (not undefined, null, or empty).
     * @param value The value to check
     */
    private isValidValue(value: string): boolean {
        const isValid = value && value !== "undefined" && value.trim() !== "";
        console.log(`Checking validity of value '${value}': ${isValid}`);
        return isValid;
    }

    /**
     * Formats a number with commas as thousand separators.
     * @param x The number string to format
     */
    private numberWithCommas(x: string): string {
        const parts = x.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const result = parts.join(".");
        console.log(`Formatted number with commas: ${x} -> ${result}`);
        return result;
    }

    /**
     * Attaches event for pagination (PAGE DOWN) to calculate new rows.
     * @param controller The panel controller
     * @param list The grid
     */
    private attachEvents(controller: IInstanceController, list: IActiveGrid): void {
        this.unsubscribeReqCompleted = controller.RequestCompleted.On((e) => {
            console.log(`Event triggered: CommandType=${e.commandType}, CommandValue=${e.commandValue}`);
            if (e.commandType === "PAGE" && e.commandValue === "DOWN") {
                console.log("Pagination detected - Updating new rows");
                const newCount = this.getGridData().length;
                console.log(`Old count: ${this.oldCount}, New count: ${newCount}`);
                this.calculateAndUpdateGrid(this.oldCount, newCount - 1);
                this.oldCount = newCount;
            } else {
                this.detachEvents();
            }
        });
    }

    /**
     * Detaches events to prevent memory leaks.
     */
    private detachEvents(): void {
        if (this.unsubscribeReqCompleted) {
            console.log("Detaching events...");
            this.unsubscribeReqCompleted();
        }
    }
}