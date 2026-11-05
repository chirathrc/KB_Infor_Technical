/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 01/07/2025
 * Summary     : Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for ID.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 01/07/2025 | Initial script creation
 */

class APS131_Set_Report_Text_ID {
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
    new APS131_Set_Report_Text_ID(scriptArgs).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("APS131F_SetReportText_ID script initialized");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));

    const currentDivi = "ID"; // Simulated division for ID
    this.log.Info("CurrentDivi: " + currentDivi);

    if (currentDivi === "ID") {
      this.setPaymentMethodForID();
      this.setReportText("");
    }
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    this.log.Info("onRequesting");
    if (e.commandType === "KEY" && e.commandValue === "ENTER") {
      if (!this.isDataSelected) {
        this.controller.ShowMessage("Please select a payment type!");
        e.cancel = true;
      }
    }
  }

  private onRequested(e: RequestEventArgs): void {
    this.log.Info("onRequested");
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

  private setPaymentMethodForID(): void {
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
      { key: "FAST", value: "FAST" }
    ];

    for (const item of items) {
      const cboxItem = new ComboBoxItemElement();
      cboxItem.Value = item.key;
      cboxItem.Text = item.value;
      if (item.selected) cboxItem.IsSelected = true;
      comboBox.Items.push(cboxItem);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    $combo.attr("id", "cmbPaymentMethod");

    $combo.change(() => {
      let selected = $("#cmbPaymentMethod option:selected").val() as string;

      if (selected === "FAST") {
        selected = "IDFAST";
      } else if (selected === "HVP") {
        selected = "IDHVP";
      } else if (selected === "LVP") {
        selected = "IDLVP";
      }

      this.isDataSelected = true;
      this.setReportText(selected);
    });
  }
}
