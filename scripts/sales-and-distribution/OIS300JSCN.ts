/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2015-08-11
 * Summary     : Adds a "Calculate" button and displays total net weight and total net value for selected Customer Orders
 *               on the OIA300BC panel. Button is enabled only for China views (CN-VIEW1, CN-VIEW2, CN-VIEW3) when 2+ rows selected.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-09-18 | Initial JScript creation
 * Nethum Ariyarathna| 2025-12-11 | Added button enable/disable logic based on selection; Made UI available for all views
 */

class OIS300JSCN {
    private controller: IInstanceController; 
    private log: IScriptLog; 
    private grid: IActiveGrid; 
    private calculateButton: ButtonElement; 
    private weightLabel: LabelElement; 
    private amountLabel: LabelElement; 
    private weightDisplay: TextBoxElement; 
    private amountDisplay: TextBoxElement;
    private isCalculating: boolean = false; 
    private WOPAVR: string;
    private isCNView: boolean = false;

    constructor(scriptArgs: IScriptArgs) {
        // Initialize controller, logger, and grid from script arguments
        console.log("Initializing constructor with script arguments");
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.grid = this.controller.GetGrid();
        console.log("Constructor initialized, grid retrieved");
    }

    public static Init(scriptArgs: IScriptArgs): void {
        // Entry point to start the script with provided arguments
        console.log("Script initialization triggered");
        new OIS300JSCN(scriptArgs).run();
    }

    public run(): void {
        // Clear console for fresh debug output
        console.clear();
        console.log("Console cleared, script starting initialization for OIA300BC panel");
        this.log.Info("Script Initializing for OIA300BC panel");

        // Retrieve and log the WOPAVR value
        this.WOPAVR = ScriptUtil.GetFieldValue("WOPAVR");
        console.log(`WOPAVR value: ${this.WOPAVR}`);

        // Check if current view is a CN view
        this.isCNView = ["CN-VIEW1", "CN-VIEW2", "CN-VIEW3"].indexOf(this.WOPAVR) !== -1;
        console.log(`Is CN View: ${this.isCNView}`);

        // Retrieve and log the current panel name for verification
        const panelName = this.controller.GetPanelName();
        console.log(`GetPanelName: ${panelName}`); 

        // Check if the script should run on the OIA300BC panel
        if (panelName === "OIA300BC") {
            console.log("Panel match confirmed, proceeding with UI setup");
            try {
                // Create and configure the Calculate button
                console.log("Creating Calculate button");
                this.calculateButton = new ButtonElement();
                this.calculateButton.Name = "CalculateBtn";
                this.calculateButton.Value = "计算"; // Chinese for "Calculate"
                this.calculateButton.Position = new PositionElement();
                this.calculateButton.Position.Top = 2; 
                this.calculateButton.Position.Left = 85; 
                this.calculateButton.Position.Width = 15; 
                this.calculateButton.IsEnabled = false; // Start disabled
                const buttonElement = this.controller.GetContentElement().AddElement(this.calculateButton);
                console.log("Button element added to content, checking event attachment");
                buttonElement.on("click", (e) => {
                    if (!this.isCalculating) {
                        console.log("Button clicked, triggering calculation");
                        this.onCalculateClick();
                    }
                });
                console.log("Click event attached to button");

                // Create and configure the Weight label and display
                console.log("Creating Weight label and display");
                this.weightLabel = new LabelElement();
                this.weightLabel.Name = "WeightLabel";
                this.weightLabel.Value = "订单净重总计 : "; // Chinese for "Total Net Weight of the Selected CO's"
                this.weightLabel.Position = new PositionElement();
                this.weightLabel.Position.Top = 3; 
                this.weightLabel.Position.Left = 75; 
                this.weightLabel.Position.Width = 10; 
                this.controller.GetContentElement().AddElement(this.weightLabel);

                this.weightDisplay = new TextBoxElement();
                this.weightDisplay.Name = "WeightDisplay";
                this.weightDisplay.Position = new PositionElement();
                this.weightDisplay.Position.Top = 3; 
                this.weightDisplay.Position.Left = 85; 
                this.weightDisplay.Position.Width = 15; 
                this.controller.GetContentElement().AddElement(this.weightDisplay);

                // Create and configure the Amount label and display
                console.log("Creating Amount label and display");
                this.amountLabel = new LabelElement();
                this.amountLabel.Name = "AmountLabel";
                this.amountLabel.Value = "订单净额总计 : "; // Chinese for "Total Net Value of the Selected CO's"
                this.amountLabel.Position = new PositionElement();
                this.amountLabel.Position.Top = 4; 
                this.amountLabel.Position.Left = 75; 
                this.amountLabel.Position.Width = 10; 
                this.controller.GetContentElement().AddElement(this.amountLabel);

                this.amountDisplay = new TextBoxElement();
                this.amountDisplay.Name = "AmountDisplay";
                this.amountDisplay.Position = new PositionElement();
                this.amountDisplay.Position.Top = 4; 
                this.amountDisplay.Position.Left = 85; 
                this.amountDisplay.Position.Width = 15; 
                this.controller.GetContentElement().AddElement(this.amountDisplay);

                // Attach grid selection change event to monitor row selection
                console.log("Attaching grid selection change event");
                this.grid.onSelectedRowsChanged.subscribe(() => {
                    this.updateButtonState();
                });

                // Initial button state update
                this.updateButtonState();

            } catch (ex) {
                // Handle any errors during UI initialization
                console.log(`Error caught during UI setup: ${ex}`);
                this.controller.ShowMessage(`Error initializing UI elements: ${ex}`);
            }
        } else {
            console.log(`Panel mismatch (Panel: ${panelName}), script not executed`);
        }
    }

    private updateButtonState(): void {
        // Get current selected rows
        const selectedRows = this.grid.getSelectedGridRows();
        const selectedCount = selectedRows.length;
        console.log(`Selection changed - Count: ${selectedCount}, Is CN View: ${this.isCNView}`);

        // Button should be enabled only if:
        // 1. Current view is a CN view
        // 2. 2 or more rows are selected
        const shouldEnable = this.isCNView && selectedCount >= 2;

        if (shouldEnable) {
            this.enableButton();
        } else {
            this.disableButton();
        }
    }

    private enableButton(): void {
        console.log("Enabling button");
        if (this.calculateButton) {
            this.calculateButton.IsEnabled = true;
        }
        $('#CalculateBtn').prop('disabled', false).css({ 
            'pointer-events': 'auto', 
            'opacity': '1',
            'cursor': 'pointer'
        });
    }

    private disableButton(): void {
        console.log("Disabling button");
        if (this.calculateButton) {
            this.calculateButton.IsEnabled = false;
        }
        $('#CalculateBtn').prop('disabled', true).css({ 
            'pointer-events': 'none', 
            'opacity': '0.5',
            'cursor': 'not-allowed'
        });
    }

    private onCalculateClick(): void {
        // Set flag to prevent multiple calculations
        if (this.isCalculating) return;

        // Check if button should be enabled before proceeding
        const selectedRows = this.grid.getSelectedGridRows();
        if (!this.isCNView || selectedRows.length < 2) {
            console.log("Button clicked but conditions not met - ignoring click");
            return;
        }

        this.isCalculating = true;

        // Retrieve the array of selected row indices
        console.log(`Selected rows retrieved: ${JSON.stringify(selectedRows)}`);
        console.log(`Number of selected rows: ${selectedRows.length}`);

        // Initialize variables to store running totals
        let totalWeight = 0;
        let totalAmount = 0;

        // Process each selected row to calculate totals
        for (let row of selectedRows) {
            console.log(`Processing row data: ${JSON.stringify(row)}`);
            const data = row.data; // Access data directly from the row object
            console.log(`Row data retrieved: ${JSON.stringify(data)}`);

            let weightStr = data.OANEWE || "0"; // Net Weight
            console.log(`Weight string for row: ${weightStr}`);
            if (weightStr && weightStr.indexOf("-") === weightStr.length - 1) {
                weightStr = "-" + weightStr.slice(0, -1); // Handle negative values
                console.log(`Adjusted weight for negative: ${weightStr}`);
            }
            let weight = parseFloat(weightStr) || 0;
            totalWeight += weight;
            console.log(`Current total weight: ${totalWeight}`);

            let amountStr = data.OANTLA || "0"; // Net Order Value
            console.log(`Amount string for row: ${amountStr}`);
            if (amountStr && amountStr.indexOf("-") === amountStr.length - 1) {
                amountStr = "-" + amountStr.slice(0, -1); // Handle negative values
                console.log(`Adjusted amount for negative: ${amountStr}`);
            }
            let amount = parseFloat(amountStr) || 0;
            totalAmount += amount;
            console.log(`Current total amount: ${totalAmount}`);
        }

        // Update display textboxes with calculated totals
        console.log(`Updating display textboxes with totals - Weight: ${totalWeight}, Amount: ${totalAmount}`);
        this.weightDisplay.Value = this.formatNumber(totalWeight); // Display total net weight
        this.amountDisplay.Value = this.formatNumber(totalAmount); // Display total net value
        console.log(`Calculated totals - Weight: ${totalWeight}, Amount: ${totalAmount}`);

        // Reset calculation flag
        this.isCalculating = false;
    }

    private formatNumber(value: number): string {
        // Format number with thousand separators (comma) and decimal separator (period)
        return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}