
/**
 * Author      : Nethum Ariyarathna
 * Created on  : 2025-07-11
 * Summary     : This Script disables PPQT and PUNN fields when POGETY is 28 or 29.
 *
 * Version Log :
 * Changed By  | Date       | Summary of the change
 * ------------|------------|-----------------------------
 * Nethum Ariyarathna    | 2025-07-11 | Initial script creation
 */


class PPS171E_NonTradedItemsDisable_PPQT_PUNN {
    private controller: IInstanceController;
    private elem: any;
    private args: string;
    private log: IScriptLog;

    private detachRequesting: Function;
    private detachRequestCompleted: Function;

  constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.elem = scriptArgs.elem;
        this.args = scriptArgs.args;

        this.detachRequesting = null;
        this.detachRequestCompleted = null;
    }
    /**
     * Script initialization static function; Entry point for M3 Panel personalized script
     */
    public static Init(scriptArgs: IScriptArgs): void {
        new PPS171E_NonTradedItemsDisable_PPQT_PUNN(scriptArgs).run();
    }

    /**
     * Starting point of every H5 script
     */
   public  run() {
        console.clear();
        this.log.Info("Script Initializing...");
        var contentElement = this.controller.GetContentElement();

        // Check if the current mode is Change mode (mode "2")
        if (this.controller.GetMode() == "2") {
            
            //let origin = this.trim(contentElement.GetElement('WEGETY').val());
            var WEGETY = ScriptUtil.GetFieldValue('WEGETY');
            this.log.Info(WEGETY);

            // Disable fields if POGETY is 28 or 29
           if (WEGETY == "28"|| WEGETY == "29") {
                

                // Disable the PPQT and PUNN fields
                var WEPPQT = contentElement.GetElement('WEPPQT');
                var WEPUUN = contentElement.GetElement('WEPUUN');

                // Disabling the fields
                $('#WEPPQT').prop('readonly', true); // Disable PPQT field


                WEPUUN.prop('disabled', 'disabled');
                $('#WEPUUN').prop('readonly', true);
                 //Disable browsing
                $('#btnLookup_WEPUUN').css({ 'pointer-events': 'none', 'opacity': '0.5' });
            }
        }
    }
}
