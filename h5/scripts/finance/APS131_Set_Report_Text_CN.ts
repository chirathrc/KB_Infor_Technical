/**
 * Author      : NimeshaPa (Fortude)
 * Created on  : 30/06/2025
 * Summary     : Adds dynamic payment type selection with conditional transaction type input and updates a read-only report field based on user choices for CN.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * NimeshaPa    | 30/06/2025 | Initial script creation
 */

class APS131_Set_Report_Text_CN {
  private controller: IInstanceController;
  private log: IScriptLog;
  private contentElement: IContentElement;
  private isDataSelected: boolean = false;
  private selectedData: string = "";

  private detachRequesting: Function;
  private detachRequested: Function;

  constructor(private scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.contentElement = this.controller.GetContentElement();
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new APS131_Set_Report_Text_CN(scriptArgs).run();
  }

  private run(): void {
    console.clear();
    this.log.Info("APS131F_SetReportText_CN script initialized");

    // this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    // this.detachRequested = this.controller.RequestCompleted.On((e) => this.onRequested(e));

    this.detachRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
    this.detachRequested = this.controller.Requested.On((e) => this.onRequested(e));

    const currentDivi = "CN"; // Simulated division for CN
    this.log.Info("CurrentDivi: " + currentDivi);

    if (currentDivi === "CN") {
      this.setPaymentMethodForCN();
      this.setReportText("");
    }
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    this.log.Info("onRequesting");
    if (e.commandType === "KEY" && e.commandValue === "ENTER") {
      if (!this.isDataSelected || this.selectedData === "" || this.selectedData == "--") {
        console.log("Approval status for next panle  :" + this.isDataSelected);
        console.log("Approval status for next panle  :" + this.selectedData);

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
    console.log("Report Text :" + text);
    this.selectedData = text;
    const $field = $("#WRLITX");
    if ($field.length) {
      $field.val(text);
      $field.prop("readonly", true);
    }
  }

  private setPaymentMethodForCN(): void {
    const comboBox = new ComboBoxElement();
    comboBox.Name = "cmbPaymentMethod";
    comboBox.Position = new PositionElement();
    comboBox.Position.Top = 24;
    comboBox.Position.Left = 60;
    comboBox.Position.Width = 15;

    const items = [
      { key: "--", value: "--Select Doc Type--", selected: true },
      { key: "ACH", value: "ACH" },
      { key: "RTGS", value: "RTGS" },
      { key: "Book Transfer", value: "Book Transfer" },
      { key: "TT", value: "TT" },
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
      if (selected === "ACH") {
        selected = "CNACH";
      } else if (selected === "RTGS") {
        selected = "CNRTGS";
      } else if (selected === "Book Transfer") {
        this.controller.ShowMessage(
          "Book Transfer may only be used for transactions within the group and between Standard Chartered Banks."
        );
        selected = "CNBT";
      } else if (selected === "TT") {
        selected = "CNTT";
      }

      this.isDataSelected = true;
      this.setReportText(selected);
    });
  }
}
