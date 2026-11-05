/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-09-22
 * Summary     :  H5 Script to add a "Special Remark" field to APA160E0 and persist it via CUSEXTMI AddFieldValue.
 *                Captures additional remarks for Chinese purchase-related transactions.
 *
 * Version Log :
 * Changed By        | Date       | Summary of the change
 * ------------------|------------|-----------------------------
 * Nethum Ariyarathna| 2025-09-22 | Initial script creation
 */

class APS160_China_Special_Remark_Tag {
    private controller: IInstanceController;
    private log: IScriptLog;
    private contentPanel: any;
    private CONO: string;
    private DIVI: string;
    private miService: MIService; // Added for MI calls
    private isRequestingHandled: boolean = false; // Flag to prevent spamming

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.contentPanel = this.controller.RenderEngine.Content;
        this.CONO = ScriptUtil.GetUserContext().CurrentCompany || "";
        this.DIVI = ScriptUtil.GetUserContext().CurrentDivision || "";
        this.miService = MIService.Current; // Initialize miService
        console.log("Constructor initialized with script arguments");
        console.log(`DIVI: ${this.DIVI}`);
    }

    public static Init(scriptArgs: IScriptArgs): void {
        console.log("Script initialization triggered");
        new APS160_China_Special_Remark_Tag(scriptArgs).run();
    }

    public run(): void {
        console.clear();
        console.log("Starting script execution for APA160E0 panel");
        this.log.Info("Script initializing for APA160E0 panel");

        const panelName = this.controller.GetPanelName();
        console.log(`Panel name: ${panelName}`);

        if (panelName === "APA160E0") {
            this.addLabel();
            this.addTextBox();
            this.controller.Requesting.On(this.OnRequesting.bind(this));
            this.controller.Requested.On(this.OnRequested.bind(this));
        }
    }

    private addLabel(): void {
        const labelElement = new LabelElement();
        labelElement.Name = "lblName";
        labelElement.Value = "Special Remark";
        labelElement.Position = new PositionElement();
        labelElement.Position.Top = 15; // Row 15
        labelElement.Position.Left = 8; // Column 7
        labelElement.Position.Width = 20; // Span 20

        try {
            const contentElement = this.controller.GetContentElement();
            contentElement.AddElement(labelElement);
            console.log("Label added successfully");
        } catch (ex) {
            console.log(`Error adding label: ${ex}`);
            this.log.Error(`Error adding label: ${ex}`);
        }
    }

    private addTextBox(): void {
        const textBoxElement = new TextBoxElement();
        textBoxElement.Name = "SPREMARK";
        textBoxElement.Value = ""; // No default text
        textBoxElement.Position = new PositionElement();
        textBoxElement.Position.Top = 15; // Row 15
        textBoxElement.Position.Left = 17; // Column 17
        textBoxElement.Position.Width = 40; // Span 40
        // Removed MaxLength since it's not supported

        try {
            const contentElement = this.controller.GetContentElement();
            contentElement.AddElement(textBoxElement);
            console.log("Textbox added successfully");
        } catch (ex) {
            console.log(`Error adding textbox: ${ex}`);
            this.log.Error(`Error adding textbox: ${ex}`);
        }
    }

    private OnRequesting(e: any): void {
        if (this.isRequestingHandled) return; // Prevent spamming
        this.isRequestingHandled = true;
        //console.log(`OnRequesting - Full event: ${JSON.stringify(e)}`);
        console.log(`OnRequesting - CommandValue: ${e.commandValue}, CommandType: ${e.commandType}`);
        console.log(`OnRequesting - UserContext.Division: ${this.DIVI}`);

        if (e.commandType === "KEY" && e.commandValue === "ENTER") {
            const PK02 = ScriptUtil.GetFieldValue("WEPRPN", this.controller) || "";
            const PK03 = ScriptUtil.GetFieldValue("WEPYON", this.controller) || "";
            const PK04 = ScriptUtil.GetFieldValue("WEPYME", this.controller) || "";
            const A030 = ScriptUtil.GetFieldValue("SPREMARK", this.controller) || "";
            console.log(`Calling CUSEXTMIAddFieldValue with A030: ${A030}`);
            this.CUSEXTMIAddFieldValue("DSPYME", this.DIVI, PK02, PK03, PK04, A030);
        }
    }

    private OnRequested(e: any): void {
        this.controller.Requesting.Off(this.OnRequesting);
        this.controller.Requested.Off(this.OnRequested);
        this.isRequestingHandled = false; // Reset flag for next session
        console.log("Event handlers unregistered");
    }

    private CUSEXTMIAddFieldValue(FILE: string, PK01: string, PK02: string, PK03: string, PK04: string, A030: string): void {
        console.log("MI (CUSEXTMI AddFieldValue)");
        try {
            const request = new MIRequest();
            request.program = "CUSEXTMI";
            request.transaction = "AddFieldValue";
            request.record = {
                FILE: FILE,
                PK01: PK01,
                PK02: PK02,
                PK03: PK03,
                PK04: PK04,
                A030: A030
            };

            console.log(`Calling MI with record: ${JSON.stringify(request.record)}`);
            this.miService.executeRequestV2(request).then((response: IMIResponse) => {
                this.CUSEXTMIAddFieldValue_Response(response);
            }).catch((error) => {
                console.log(`MI Call Error: ${error}`);
                this.log.Error(`MI Call Error: ${error}`);
            });
        } catch (ex) {
            console.log(`Error in CUSEXTMIAddFieldValue: ${ex}`);
            this.log.Error(`Error in CUSEXTMIAddFieldValue: ${ex}`);
        }
    }

    private CUSEXTMIAddFieldValue_Response(response: IMIResponse): void {
        if (response != null && !response.hasError) {
            console.log("CUSEXTMIAddFieldValue_Response OK");
        } else {
            console.log(`CUSEXTMIAddFieldValue_Response HasError: ${response ? response.errorMessage : "No response"}`);
            this.log.Error(`CUSEXTMIAddFieldValue Error: ${response ? response.errorMessage : "No response"}`);
        }
    }
}