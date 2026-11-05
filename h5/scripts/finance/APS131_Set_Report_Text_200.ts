/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 30/06/2025
 * Summary     : Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for several divisions.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 30/06/2025 | Initial script creation
 */


class APS131_Set_Report_Text_200 {
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
    new APS131_Set_Report_Text_200(scriptArgs).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("APS131F_SetReportText_200 script initialized");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));

    const currentDivi = ScriptUtil.GetUserContext().CurrentDivision;
    const divPrefix = currentDivi.substring(0, 1);
    this.log.Info("Current Division Prefix: " + divPrefix);

    //30/06/2025 -- NimeshaPa -- In the original Jscript, Division is hardcoded with value "9".
    if (divPrefix === "9") {
      this.setPaymentMethodFor900();
      this.setReportText("");
    } else if (divPrefix === "2") {
      this.setPaymentMethodFor200();
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

  private setPaymentMethodFor900(): void {
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
      { key: "PP", value: "PP" },
      { key: "FAST", value: "FAST" }
    ];

    for (const item of items) {
      const option = new ComboBoxItemElement();
      option.Text = item.value;
      option.Value = item.key;
      if (item.selected) option.IsSelected = true;
      comboBox.Items.push(option);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    $combo.attr("id", "cmbPaymentMethod");

    this.setReportText("HVP");

    $combo.change(() => this.onSelectionChanged900());
  }

  private onSelectionChanged900(): void {
    const selected = $("#cmbPaymentMethod option:selected").val() as string;

    if (selected === "LVP") {
      this.setTransactionType();
      this.isDataSelected = false;
    } else {
      this.isDataSelected = true;
      this.removeElement("cmdTransType");
      this.removeElement("labelTransType");
      this.setReportText(selected);
    }
  }

  private setTransactionType(): void {
    const label = new LabelElement();
    label.Name = "labelTransType";
    label.Value = "Transaction Type:";
    label.Position = new PositionElement();
    label.Position.Top = 3;
    label.Position.Left = 68;
    label.Position.Width = 10;
    this.contentElement.AddElement(label);

    const comboBox = new ComboBoxElement();
    comboBox.Name = "cmdTransType";
    comboBox.Position = new PositionElement();
    comboBox.Position.Top = 3;
    comboBox.Position.Left = 78;
    comboBox.Position.Width = 15;

    const items = [
      { key: "--", value: "--Select Transaction Type--", selected: true },
      { key: "Vendor", value: "Vendor" },
      { key: "Claims", value: "Claims" },
      { key: "Misc", value: "Miscellaneous" }
    ];

    for (const item of items) {
      const option = new ComboBoxItemElement();
      option.Text = item.value;
      option.Value = item.key;
      if (item.selected) option.IsSelected = true;
      comboBox.Items.push(option);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    $combo.attr("id", "cmdTransType");

    $combo.change(() => {
      const paymentType = $("#cmbPaymentMethod option:selected").val() as string;
      const transType = $("#cmdTransType option:selected").val() as string;

      let mapped = "";
      switch (transType) {
        case "Vendor": mapped = "VEND"; break;
        case "Claims": mapped = "CLMS"; break;
        case "Misc": mapped = "MISC"; break;
      }

      if (mapped) {
        this.setReportText(`${paymentType}_${mapped}`);
        this.isDataSelected = true;
        this.log.Info(`${paymentType}_${mapped}`);
      } else {
        this.isDataSelected = false;
      }
    });
  }

  private setPaymentMethodFor200(): void {
    const comboBox = new ComboBoxElement();
    comboBox.Name = "cmbPaymentMethod";
    comboBox.Position = new PositionElement();
    comboBox.Position.Top = 3;
    comboBox.Position.Left = 50;
    comboBox.Position.Width = 15;

    const items = [
      { key: "--", value: "--Select Doc Type--", selected: true },
      { key: "FTR", value: "FTR" },
      { key: "LTR", value: "LTR" }
    ];

    for (const item of items) {
      const option = new ComboBoxItemElement();
      option.Text = item.value;
      option.Value = item.key;
      if (item.selected) option.IsSelected = true;
      comboBox.Items.push(option);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    $combo.attr("id", "cmbPaymentMethod");

    this.setReportText("FTR");

    $combo.change(() => this.onSelectionChanged200());
  }

  private onSelectionChanged200(): void {
    const selected = $("#cmbPaymentMethod option:selected").val() as string;
    this.setReportText(selected);
    this.isDataSelected = true;
  }

  private removeElement(name: string): void {
    const $el = $(`#${name}`);
    if ($el.length) $el.remove();
  }
}

