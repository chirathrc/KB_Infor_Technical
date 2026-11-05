/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-10-09
 * Summary     : H5 script for OIS300/B panel to open the Abaqa Order Confirmation Report for the selected customer order (ORNO).
 *               Checks for single selection, handles no/multiple selections with messages, and opens the report in a new tab.
 *               The base report link can be provided as a script argument.
 *               Deployed as a shortcut on OIS300/B for users dealing with Abaqa (previously Comfez).

 * Version Log :
 * Changed By          | Date       | Summary of the change
 * --------------------|------------|-----------------------------
 * Nethum Ariyarathna  | 2025-10-08 | Initial Script creation
 */
class OIS300_OrderConfirmationReportLink {
    private controller: IInstanceController;
    private log: IScriptLog;
    private baseLink: string; 
    private ENV: string; 

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        
        // Split the argument string by comma and trim whitespace
        const argsArray = (scriptArgs.args && scriptArgs.args.toString().split(',')) || [];
        this.baseLink = argsArray[0]?.trim() || this.baseLink; // First part as baseLink
        this.ENV = argsArray[1]?.trim() || this.ENV; // Second part as ENV
        this.log.Info(`Constructor initialized, base link: ${this.baseLink}, environment: ${this.ENV}`);
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new OIS300_OrderConfirmationReportLink(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        this.log.Info("OIS300_OrderConfirmationReportLink script initializing");
        const panelName = this.controller.GetPanelName();
        this.log.Info(`Panel name: ${panelName}`);

        if (panelName !== "OIA300BC") {
            this.log.Info(`Panel ${panelName} not supported, skipping initialization`);
            return;
        }

        this.onClickSales();
    }

    private onClickSales(): void {
        try {
            this.log.Info("Processing OrderConfirmationReportLink request");
            const listControl = ListControl.ListView;
            const selectedRows = listControl.GetValueByColumnName("ORNO");

            if (!selectedRows || selectedRows.length === 0) {
                this.log.Info("No customer order selected");
                this.controller.ShowMessage("Select a Row to Print the Sales");
                return;
            }

            if (selectedRows.length > 1) {
                this.log.Info("Multiple customer orders selected");
                this.controller.ShowMessage("Select only one Customer Order No at a time to print the Sales");
                return;
            }

            const selectedCO = selectedRows[0];
            this.log.Info(`Selected customer order: ${selectedCO}`);
            this.printSales(selectedCO);
        } catch (ex) {
            this.log.Error(`Error in onClickSales: ${ex}`);
            this.controller.ShowMessage("Error generating sales report");
        }
    }

    private printSales(conumber: string): void {
        try {
            if (!conumber) {
                this.log.Error("Customer Order number is empty");
                this.controller.ShowMessage("Customer Order number is empty");
                return;
            }

                    // Validate baseLink to ensure it's not empty or invalid

            if (!this.baseLink || this.baseLink.trim() === "") {

                this.log.Error("Base link is invalid");

                this.controller.ShowMessage("Invalid base link configuration");

                return;

            }

            const reportLink = "http://" + this.baseLink + "/ReportServer/?%2f" + this.ENV + "%2fMalaysia%2fAbaqa%2fAbaqa+Order+Confirmation&rs:Command=Render&CUSORDER=" + conumber;
                  this.log.Info(`Opening report link: ${reportLink}`);
            window.open(reportLink, '_blank');
        } catch (ex) {
            this.log.Error(`Error in printSales: ${ex}`);
            this.controller.ShowMessage("Error opening sales report");
        }
    }
}