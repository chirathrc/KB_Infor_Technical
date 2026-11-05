/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 03/07/2025
 * Summary     : This script adds a button and textbox to the PMS060 panel to calculate and display the total reported quantity (RQTA) from the list/grid view. 
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 30/06/2025 | Initial script creation
 */

class GC_PMS060_DisplayTotal {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private textBox: TextBoxElement;
  private button: ButtonElement;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();
  }

  public static Init(args: IScriptArgs): void {
    new GC_PMS060_DisplayTotal(args).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("GC_PMS060_DisplayTotal initialized");

    // Create TextBox to display total
    this.textBox = new TextBoxElement();
    this.textBox.Name = "txtTotalRepQty";
    this.textBox.Position = new PositionElement();
    this.textBox.Position.Top = 2;
    this.textBox.Position.Left = 46;
    this.textBox.Position.Width = 8;
    this.contentElement.AddElement(this.textBox);

    // Create Button
    this.button = new ButtonElement();
    this.button.Name = "btnTotalRepQty";
    this.button.Value = "Total Rep Qty";
    this.button.Position = new PositionElement();
    this.button.Position.Top = 2;
    this.button.Position.Left = 54;
    this.button.Position.Width = 10;
    const $btn = this.contentElement.AddElement(this.button);

    $btn.click(() => this.onClick());
  }

    private onClick(): void {
    const grid = this.controller.GetGrid();
    if (!grid) {
        this.log.Error("Datagrid not found.");
        return;
    }

    // Get the current sorting order field (WWQTTP)
    const sortingField = this.controller.GetValue("WWQTTP")?.toString().trim();
    console.log(sortingField);

    if (sortingField !== "7") {
        this.log.Info(`Calculation only available for sorting order '7-Qty by schd no./process code'. Current: ${sortingField}`);
        this.textBox.Value = "";  // prevent misleading zero
        return;
    }

    const rows = grid.getData();
    if (!rows || rows.length === 0) {
        this.log.Info("No rows found.");
        return;
    }

    // let total = 0;
    // for (const row of rows) {
    //     const value = row["S1RQTA"];
    //     if (value && !isNaN(Number(value))) {
    //     total += parseFloat(value);
    //     }
    // }

    let total = 0;
    for (const row of rows) {
        // 27/06/2025 -- NimeshaPa -- In the original Jscript, value "RQTA".Changed for testing purposes.
        const rawValue = row["S7RQTA"];
        let cleanedValue = rawValue?.toString();

        // Handle both scenarios: comma and dot decimal separators
        if (cleanedValue?.includes(",")) {
            cleanedValue = cleanedValue.replace(",", ".");
        }

        if (cleanedValue && !isNaN(Number(cleanedValue))) {
        total += parseFloat(cleanedValue);
        }
    }

    this.textBox.Value = total.toFixed(2);
    }
}
