﻿/**
 * Author      : Rahul Killedar (Fortude)
 * Created on  : 2025-07-03
 * Summary     : This script customizes behavior for users accessing the CRS610 program. 
 * It restricts specific function keys based on user role and interaction mode, 
 * and also disables or pre-sets fields on designated panels to enforce business rules.
 *
 * Version Log :
 * Changed By     | Date       | Summary of the change
 * ---------------|------------|-----------------------------
 * Rahul Killedar | 2025-07-03 | Initial script creation
 */

class CRS610_CustomerControl {
  private controller: IInstanceController;
  private log: IScriptLog;
  private content: JQuery;
  private userId: string = "";
  private userInRole: boolean = false;
  private mode: string = "";
  private readonly roleIn: string[] = ["GC-SA-001", "GC-SA-002", "GC-SA-003"];

  constructor(scriptArgs: IScriptArgs) {
    this.controller = scriptArgs.controller;
    this.log = scriptArgs.log;
    this.content = this.controller.GetContent();
    this.userId = ScriptUtil.GetUserContext().User;

    console.log("CRS610_CustomerControl initializing...");
    this.userInRole = this.isInRole();

    this.controller.Requesting.On(this.onRequesting.bind(this));
    this.controller.RequestCompleted.On(this.onRequestCompleted.bind(this));
  }

  private onRequesting(e: CancelRequestEventArgs): void {
    const program = this.controller.GetProgramName();
    const panel = this.controller.GetPanelName();
    const commandType = e.commandType;
    const commandValue = e.commandValue;

    this.updateMode(commandType, commandValue, panel); // 🔄 update mode

    console.log(`[Requesting] userInRole: ${this.userInRole}, mode: ${this.mode}, Program: ${program}, Panel: ${panel}, Command: ${commandValue}`);

    if (this.userInRole && program === "CRS610") {
      if (panel === "CRA610E0") {
        if (
  (this.mode === "-1" || this.mode === "3") &&
    commandType === "KEY" &&
    ["F3", "F12", "F03"].indexOf(commandValue) !== -1
    ) {
          console.log(`Blocking key: ${commandValue}`);
          e.cancel = true;
        }
      }
    }
  }

  private onRequestCompleted(e: RequestEventArgs): void {
    const program = this.controller.GetProgramName();
    const panel = this.controller.GetPanelName();
    const commandType = e.commandType;
    const commandValue = e.commandValue;

    this.updateMode(commandType, commandValue, panel); // 🔄 update mode again

    if (!this.userInRole || program !== "CRS610") return;
    console.log("userInRole----------------->");
    if (panel === "CRA610E0") {
      //const WRSTAT = ScriptUtil.FindChild(this.content, "WRSTAT");
      //if (this.mode === "-1" || this.mode === "3") {
        //$('#WRSTAT').prop('disabled', true);
        //$('#WRSTAT').addClass('disabled').prop('disabled', true);
        //$('#WRSTAT').prop('readonly', true);
        //$('#btnLookup_WRSTAT').css({ 'pointer-events': 'none', 'opacity': '0.5' });
      setTimeout(() => {
              const $dropdown = $(".dropdown[role='combobox']");

              if ($dropdown.length > 0) {
                // 1. Disable interactions
                $dropdown.css({
                  'pointer-events': 'none',
                  'opacity': '0.5',
                  'cursor': 'default'
                });

                // 2. Optional: add visual disabled effect
                $dropdown.addClass('disabled');

                // 3. Optional: remove tab focus
                $dropdown.attr('tabindex', '-1');

                console.log("Custom dropdown disabled.");
              } else {
                console.warn("Dropdown not found.");
              }
            }, 0);


        console.log("WRSTAT set to Disable.");
      //}
      
    }

    if (panel === "CRA610J0") {
    
    const fieldsToDisable = ["WRTEPY", "WRPYCD", "WRBLCD", "WRCRLM", "WRCRL2", "WRCRL3", "WRODUD"];

        $('#WRTEPY').prop('disabled', true);
        $('#WRTEPY').addClass("disabled").prop("disabled", true);

        $('#WRPYCD').prop('disabled', true);
        $('#WRPYCD').addClass("disabled").prop("disabled", true);

        //$('#WRBLCD').prop('readonly', true);
        //$('#btnLookup_WRBLCD').css({ 'pointer-events': 'none', 'opacity': '0.5' });

        setTimeout(() => {
              const $dropdown = $(".dropdown[role='combobox']");

              if ($dropdown.length > 0) {
                // 1. Disable interactions
                $dropdown.css({
                  'pointer-events': 'none',
                  'opacity': '0.5',
                  'cursor': 'default'
                });

                // 2. Optional: add visual disabled effect
                $dropdown.addClass('disabled');

                // 3. Optional: remove tab focus
                $dropdown.attr('tabindex', '-1');

                console.log("Custom dropdown disabled.");
              } else {
                console.warn("Dropdown not found.");
              }
            }, 0);


        console.log("WRSTAT set to Disable.");
      //}
        //---------------------------------------------------------------------------

        $('#WRCRLM').prop('disabled', true);
        $('#WRCRLM').addClass("disabled").prop("disabled", true);

        $('#WRCRL2').prop('disabled', true);
        $('#WRCRL2').addClass("disabled").prop("disabled", true);

        $('#WRCRL3').prop('disabled', true);
        $('#WRCRL3').addClass("disabled").prop("disabled", true);

        $('#WRODUD').prop('disabled', true);
        $('#WRODUD').addClass("disabled").prop("disabled", true);
        console.log("fieldsToDisable disabled.");

    }
  }

  private isInRole(): boolean {
    const userRoles = ScriptUtil.GetUserContext()?.Roles || [];

    for (const userRole of userRoles) {
      if (this.roleIn.indexOf(userRole) !== -1) {
        return true;
      }
    }
    return false;
  }

  private updateMode(commandType: string, commandValue: string, panel: string): void {
    if (commandType === "LSTOPT" && panel === "CRA610BC") {
      this.mode = commandValue;
      console.log(`Mode updated from list panel: ${this.mode}`);
    } else if (!this.mode) {
      // Try reading from field like WWMOD (replace if needed)
      const modeFromField = ScriptUtil.GetFieldValue("WWMOD");
      if (modeFromField) {
        this.mode = modeFromField;
        console.log(`Mode inferred from WWMOD field: ${this.mode}`);
      }
    }

    // Fallback from controller (if supported)
    if (!this.mode && typeof this.controller["GetMode"] === "function") {
      const fallbackMode = (this.controller as any).GetMode();
      if (fallbackMode) {
        this.mode = fallbackMode;
        console.log(`Mode fallback from controller: ${this.mode}`);
      }
    }
  }

  public static Init(scriptArgs: IScriptArgs): void {
    new CRS610_CustomerControl(scriptArgs);
  }
}
