/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 27/06/2025
 * Summary     : Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 27/06/2025 | Initial script creation
 */


class APS131_Set_Report_Text {
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
    new APS131_Set_Report_Text(scriptArgs).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("APS131F_SetReportText script initialized");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));

    const currentDivi = ScriptUtil.GetUserContext().CurrentDivision;
    //27/06/2025 -- NimeshaPa -- In the original Jscript, Division is hardcoded with value "9".
    if (currentDivi.startsWith("9")) {
      this.addPaymentMethodComboBox();
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

//   private setReportText(text: string): void {
//     const field = ScriptUtil.GetField("WRLITX", this.controller) as M3TextBox;
//     if (field) {
//       ScriptUtil.SetFieldValue("WRLITX", text, this.controller);
//       field.SetReadOnly(true);
//     }
//   }

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
      { key: "PP", value: "PP" },
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
    this.setReportText("HVP"); // Default

    $combo.change(() => {
      const selected = $("#cmbPaymentMethod option:selected").val() as string;
      this.removeElement("cmdTransType");
      this.removeElement("labelTransType");

      if (selected === "LVP") {
        this.addTransactionTypeComboBox();
        this.isDataSelected = false;
      } else {
        this.setReportText(selected);
        this.isDataSelected = true;
      }
    });
  }

  private addTransactionTypeComboBox(): void {
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
      const cboxItem = new ComboBoxItemElement();
      cboxItem.Value = item.key;
      cboxItem.Text = item.value;
      if (item.selected) cboxItem.IsSelected = true;
      comboBox.Items.push(cboxItem);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    $combo.attr("id", "cmdTransType");

    $combo.change(() => {
      let selected = $("#cmdTransType option:selected").val() as string;
      const paymentType = $("#cmbPaymentMethod option:selected").val() as string;

      let mapped = "";
      switch (selected) {
        case "Vendor": mapped = "VEND"; break;
        case "Claims": mapped = "CLMS"; break;
        case "Misc": mapped = "MISC"; break;
      }

      if (mapped !== "") {
        const text = `${paymentType}_${mapped}`;
        this.setReportText(text);
        this.isDataSelected = true;
        this.log.Info(text);
      } else {
        this.isDataSelected = false;
      }
    });
  }

  private removeElement(name: string): void {
    const $el = $(`#${name}`);
    if ($el.length) {
      $el.remove();
    }
  }
}

