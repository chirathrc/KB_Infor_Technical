// /**
//  * Author      : Nethum Ariyarathna (Fortude)
//  * Created on  : 21/07/2025
//  * Summary     : This script adds custom dropdowns on APS131 to help users correctly fill in the Report Text (WRLITX) field. It ensures that:
//                  * The payment method is selected based on the division (e.g., HVP/LVP/PP/FAST for Div 9 or FTR/LTR for Div 2).
//                  * If LVP is selected, an additional transaction type (Vendor/Claims/Misc) is also required.
//                  * The combined selection is written into the Report Text in the correct format.

//  *
//  * Version Log :
//  * Changed By             | Date       | Summary of the change
//  * -----------------------|------------|-----------------------------
//  * Nethum Ariyarathna     | 21/07/2025 | Initial script creation
//  */

class APS131_Set_Report_Text_VN {
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
    new APS131_Set_Report_Text_VN(scriptArgs).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("APS131_Set_Report_Text_VN script initialized...1");

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));

     //let currentDivi = "2"; // Hardcoded division because of the original script.
  
    //21/07/2025 -- NethumAriyarathna -- In the original Jscript, Division is hardcoded with value "2".
    //In uplifted H5 script, I have changed it to get the current user's division dynamically.
    const currentDivi = ScriptUtil.GetUserContext().CurrentDivision;
    const divPrefix = currentDivi.substring(0, 1);
    this.log.Info("Current Division Prefix: " + divPrefix);

    this.log.Info("CurrentDivi: " + currentDivi);

    if (divPrefix === "9") {
      this.setPaymentMethodFor900();
      this.setReportText("");
    }

    if (divPrefix === "2") {
      this.setPaymentMethodFor200();
      this.setReportText("");
    }
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    if (e.commandType === "KEY" && e.commandValue === "ENTER") {
      if (!this.isDataSelected) {
        this.controller.ShowMessage("Please select a payment typee!");
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
    const items = [
      { key: "--", value: "--Select Doc Type--", selected: true },
      { key: "HVP", value: "HVP" },
      { key: "LVP", value: "LVP" },
      { key: "PP", value: "PP" },
      { key: "FAST", value: "FAST" },
    ];

    this.createComboBox("cmbPaymentMethod", items, 50, 3, (selected) => {
      if (selected === "LVP") {
        this.setTransactionType();
        this.isDataSelected = false;
      } else {
        this.removeTransactionType(); // clear any existing
        this.isDataSelected = true;
        this.setReportText(selected);
      }
    });
  }

  private setPaymentMethodFor200(): void {
    const items = [
      { key: "--", value: "--Select Doc Type--", selected: true },
      { key: "FTR", value: "FTR" },
      { key: "LTR", value: "LTR" },
    ];

    this.createComboBox("cmbPaymentMethod", items, 50, 3, (selected) => {
      this.isDataSelected = true;
      this.setReportText(selected);
    });
  }

private setTransactionType(): void {
    const label = new LabelElement();
    label.Name = "labelTransType";
    label.Value = "Transaction Type:";
    label.Position = new PositionElement();
    label.Position.Top = 3;
    label.Position.Left = 75;
    label.Position.Width = 10;
    this.contentElement.AddElement(label);

  const items = [
    { key: "--", value: "--Select Transaction Type--", selected: true },
    { key: "VEND", value: "Vendor" },
    { key: "CLMS", value: "Claims" },
    { key: "MISC", value: "Miscellaneous" },
  ];

  this.createComboBox("cmdTransType", items, 85, 3, (selectedCode) => {
    const selectedMethod = $("#cmbPaymentMethod").val() as string;
    if (["VEND", "CLMS", "MISC"].indexOf(selectedCode) !== -1) { // Use indexOf here
      this.isDataSelected = true;
      this.setReportText(`${selectedMethod}_${selectedCode}`);
    }
  });
}


  private removeTransactionType(): void {
    $("#cmdTransType").remove();
    $("label:contains('Transaction Type:')").remove();
  }

  private createComboBox(
    id: string,
    items: { key: string; value: string; selected?: boolean }[],
    left: number,
    top: number,
    onChange: (value: string) => void
  ): void {
    const comboBox = new ComboBoxElement();
    comboBox.Name = id;
    comboBox.Position = new PositionElement();
    comboBox.Position.Left = left;
    comboBox.Position.Top = top;
    comboBox.Position.Width = 15;

    for (const item of items) {
      const cItem = new ComboBoxItemElement();
      cItem.Value = item.key;
      cItem.Text = item.value;
      if (item.selected) cItem.IsSelected = true;
      comboBox.Items.push(cItem);
    }

    const $combo = this.contentElement.AddElement(comboBox);
    $combo.attr("id", id);
    $combo.change(() => {
      const selected = $combo.find("option:selected").val() as string;
      onChange(selected);
    });
  }
}


