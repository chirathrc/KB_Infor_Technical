/**
 * Author      : ShaleenW (Fortude)
 * Created on  : 2025-06-26
 * Summary     : Adds custom text fields to ARS112/F for combining temporary receipt number and voucher text, 
 *               and sets the result in the voucher field.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * ShaleenW    | 2025-06-26 | Initial script creation
 */

class ars110_vouchertxt {
    private controller: IInstanceController;
    private log: IScriptLog;
    private contentElement: IContentElement;

    private tempReceiptTextBox: TextBoxElement;
    private voucherTextBox: TextBoxElement;

    private detachRequesting: Function;
    private detachRequestCompleted: Function;

    constructor(args: IScriptArgs) {
        this.controller = args.controller;
        this.log = args.log;
    }

    public static Init(args: IScriptArgs): void {
        new ars110_vouchertxt(args).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("ars110_vouchertxt - Script Initializing");

        const panelName = this.controller.GetPanelName();
        this.contentElement = this.controller.GetContentElement();

        if (panelName === "ARA112EC") {
            //Labels and Fields positions should be checked in the customer environment and should be adjusted accordingly
            this.addLabel("Temporary receipt no:", 6, 45);
            this.addLabel("Voucher text:", 7, 45);

            this.tempReceiptTextBox = this.addTextBox("txtTempReceipt", "", 6, 58, 6, true);
            this.voucherTextBox = this.addTextBox("txtVoucherText", "", 7, 58, 34, true);

            this.attachEvents();
        } else {
            this.log.Info("Not ARS112E panel. Script not applied.");
        }
    }

    private attachEvents(): void {
        this.detachRequesting = this.controller.Requesting.On((e) => {
            this.onRequesting(e);
        });

        this.detachRequestCompleted = this.controller.RequestCompleted.On((e) => {
            this.onRequestCompleted(e);
        });
    }

    private detachEvents(): void {
        if (this.detachRequesting) this.detachRequesting();
        if (this.detachRequestCompleted) this.detachRequestCompleted();
    }

    private onRequesting(e: CancelRequestEventArgs): void {
        if (e.commandType === "KEY" && e.commandValue === "ENTER") {
            let receipt = this.tempReceiptTextBox.Value || "";
if (receipt !== "") {
    receipt = ("000000" + receipt).slice(-6);
}
            const voucher = this.voucherTextBox.Value || "";
            const combined = receipt + voucher;

            ScriptUtil.SetFieldValue("WEVTXT", combined);

            // Optional: comment to prevent navigation during testing
            //e.cancel = true;
        }
    }

    private onRequestCompleted(e: CancelRequestEventArgs): void {
        this.detachEvents(); // Clean up event listeners once request completes
    }

    private addTextBox(name: string, value: string, top: number, left: number, width: number, isEnabled: boolean): TextBoxElement {
        const txt = new TextBoxElement();
        txt.Name = name;
        txt.Value = value;
        txt.Position = new PositionElement();
        txt.Position.Top = top;
        txt.Position.Left = left;
        txt.Position.Width = width;
        txt.IsEnabled = isEnabled;
        this.contentElement.AddElement(txt);
        return txt;
    }

    private addLabel(value: string, top: number, left: number): void {
        const lbl = new LabelElement();
        lbl.Name = "lbl_" + value.replace(/\s+/g, "");
        lbl.Value = value;
        lbl.Position = new PositionElement();
        lbl.Position.Top = top;
        lbl.Position.Left = left;
        this.contentElement.AddElement(lbl);
    }
}
