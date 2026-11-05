/**
 * Author      : ShaleenW (Fortude)
 * Created on  : 20/06/2025
 * Summary     : Keep Authorize enabled for valid user roles only | Place this H5script in MMS100/E panel
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * ShaleenW    | 20/06/2025 | Initial script creation
 */

class MMS100E_Apply_UserRole_Validation {
    private controller: IInstanceController;
    private elem: any;
    private args: string;
    private log: IScriptLog;

    private validRoles: string[] = ["GC-PM-001", "GC-COREGRP", "I3-COREGRP", "GC-MC-001"];
    //private validRoles: string[] = ["GC-PM-001", "GC-MC-001"];

    private miService;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args;
        this.log = scriptArgs.log;

        this.miService = ScriptUtil.version >= 2.0 ? MIService : MIService.Current;
    }

    public static Init(args: IScriptArgs): void {
        new MMS100E_Apply_UserRole_Validation(args).run();
    }

    private run(): void {
        console.clear();
        this.log.Info("MMS100E-Script Initializing");

        const user = ScriptUtil.GetUserContext().USID;
        this.log.Info(`Current User: ${user}`);
        const request = new MIRequest();

        request.program = "MNS410MI";
        request.transaction = "LstRolesByUser";
        request.record = { USID: user };
        request.outputFields = ["ROLL"];

        this.miService.executeRequestV2(request)
            .then((response: IMIResponse) => {
                if (response.hasError()) {
                    this.log.Error("Error fetching roles: " + response.errorMessage);
                    ConfirmDialog.ShowMessageDialog({
                        dialogType: "Error",
                        header: "Error",
                        message: "An error occurred in fetching roles"
                    });
                    return;
                }

                console.log("Roles fetched: ", response.items);

                const hasValidRole = response.items.some(item => {
                    const isValid = this.validRoles.indexOf(item.ROLL) !== -1;
                    return isValid;
                });

                if (!hasValidRole) {

                    //Diasble the field using jQuery as the WGAURE is a browser field
                    $('#WGRESP').focus();
                    $('#WGAURE').prop('readonly', true);
                    $('#btnLookup_WGAURE').css({ 'pointer-events': 'none', 'opacity': '0.5' });
                } else {
                    //return
                }
            })
            .catch((error) => {
                this.log.Error("MI call failed: " + error);
                ConfirmDialog.ShowMessageDialog({
                        dialogType: "Error",
                        header: "Error",
                        message: "An error occurred in fetching roles"
                    });
            });
    }

}