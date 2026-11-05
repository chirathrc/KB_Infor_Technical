/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 01/07/2025
 * Summary     : Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for MY.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 01/07/2025 | Initial script creation
 */

class APS131_Set_Report_Text_MY {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private isDataSelected: boolean = false;

  private detachRequesting: Function;
  private detachRequested: Function;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new APS131_Set_Report_Text_MY(scriptArgs).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("APS131F_SetReportText_MY script initialized");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));

    const currentDivi = "MY"; // Simulated division for MY
    if (currentDivi === "MY") {
      this.addPaymentMethodComboBox();
      this.setReportText("");
    }
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    if (e.commandType === "KEY" && e.commandValue === "ENTER") {
      if (!this.isDataSelected) {
        this.controller.ShowMessage("Please select a payment type!");
        e.cancel = true;
      }
    }
  }

  private onRequested(e: RequestEventArgs): void {
    if (this.detachRequesting) this.detachRequesting();
    if (this.detachRequested) this.detachRequested();
  }

  private setReportText(text: string): void {
    const $field = $("#WRLITX");
    if ($field.length) {
      $field.val(text);
      $field.prop("readonly", true);
    }
  }

  private addPaymentMethodComboBox(): void {
    const comboBox = new ComboBoxElement();
    comboBox.Name = "cmbPaymentMethod";
    comboBox.Position = new PositionElement();
    comboBox.Position.Top = 3;
    comboBox.Position.Left = 50;
    comboBox.Position.Width = 15;

    const items = [
      { key: "--", value: "--Select Doc Type--", selected: true },
      { key: "HVP", value: "HVP" },
      { key: "LVP", value: "LVP" },
      { key: "DuitNow", value: "DuitNow" }
    ];

    for (const item of items) {
      const cboxItem = new ComboBoxItemElement();
      cboxItem.Value = item.key;
      cboxItem.Text = item.value;
      if (item.selected) cboxItem.IsSelected = true;
      comboBox.Items.push(cboxItem);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    this.setReportText("--Select Doc Type--");

    $combo.change(() => {
      let selected = $("#cmbPaymentMethod option:selected").val() as string;

      switch (selected) {
        case "DuitNow":
          selected = "MYDTN";
          break;
        case "HVP":
          selected = "MYHVP";
          break;
        case "LVP":
          selected = "MYLVP";
          break;
      }

      this.isDataSelected = true;
      this.setReportText(selected);
    });
  }
}

