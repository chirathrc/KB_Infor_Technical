﻿// /**
//  * Author      : Rahul Killedar (Fortude)
//  * Created on  : 2025-07-03
//  * Summary     : This script customizes behavior for users accessing the CRS610 program. 
//  * It restricts specific function keys based on user role and interaction mode, 
//  * and also disables or pre-sets fields on designated panels to enforce business rules.
//  *
//  * Version Log :
//  * Changed By     | Date       | Summary of the change
//  * ---------------|------------|-----------------------------
//  * Rahul Killedar | 2025-07-03 | Initial script creation
//  */

// class CRS610_CustomerControl {
//   private controller: IInstanceController;
//   private log: IScriptLog;
//   private content: JQuery;
//   private userId: string = "";
//   private userInRole: boolean = false;
//   private mode: string = "";
//   private readonly roleIn: string[] = ["GC-SA-001", "GC-SA-002", "GC-SA-003"];

//   private unsubscribeRequesting: Function;
//   private unsubscribeRequestCompleted: Function;

//   constructor(scriptArgs: IScriptArgs) {
//     this.controller = scriptArgs.controller;
//     this.log = scriptArgs.log;
//     this.content = this.controller.GetContent();
//     this.userId = ScriptUtil.GetUserContext().User;

//     console.log("CRS610_CustomerControl initializing... in " + this.controller.GetPanelName());
//     this.userInRole = this.isInRole();

//     // this.controller.Requesting.On(this.onRequesting.bind(this));
//     // this.controller.RequestCompleted.On(this.onRequestCompleted.bind(this));


//   }

//   private run(): void {

//     this.unsubscribeRequesting = this.controller.Requesting.On(this.onRequesting.bind(this));
//     this.unsubscribeRequestCompleted = this.controller.RequestCompleted.On(this.onRequestCompleted.bind(this));
//     console.log("User Role Valudation = " + this.isInRole());
//     console.log("Current Mode = " + this.controller.GetMode());

//     if (this.controller.GetPanelName() == "CRA610E0" && this.userInRole) {

//       console.log("In CRA610E0 and userInRole is true************************************");
//       ///Chirath Update 
//       const element = document.getElementById('WRSTAT') as HTMLSelectElement;
//       if (!element) return;

//       // 1. Functional disable (Browser level)
//       element.disabled = true;

//       // 2. Interaction disable (Safety layer for custom Soho UI)
//       const container = element.closest('.conditional-style-container') as HTMLElement;
//       if (container) {
//         container.style.pointerEvents = 'none';
//         container.style.opacity = '0.6';
//       }

//     }

//     if (this.controller.GetPanelName() === "CRA610J0" && this.userInRole) {

//       console.log("In CRA610J0 and userInRole is true************************************");

//       const fieldsToDisable = ["WRTEPY", "WRPYCD", "WRBLCD", "WRCRLM", "WRCRL2", "WRCRL3", "WRODUD"];

//       $('#WRTEPY').prop('disabled', true);
//       $('#WRTEPY').addClass("disabled").prop("disabled", true);

//       $('#WRPYCD').prop('disabled', true);
//       $('#WRPYCD').addClass("disabled").prop("disabled", true);

//       //$('#WRBLCD').prop('readonly', true);
//       //$('#btnLookup_WRBLCD').css({ 'pointer-events': 'none', 'opacity': '0.5' });

//       setTimeout(() => {
//         // const $dropdown = $(".dropdown[role='combobox']");

//         // if ($dropdown.length > 0) {
//         //   // 1. Disable interactions
//         //   $dropdown.css({
//         //     'pointer-events': 'none',
//         //     'opacity': '0.5',
//         //     'cursor': 'default'
//         //   });

//         //   // 2. Optional: add visual disabled effect
//         //   $dropdown.addClass('disabled');

//         //   // 3. Optional: remove tab focus
//         //   $dropdown.attr('tabindex', '-1');

//         //   console.log("Custom dropdown disabled.");
//         // } else {
//         //   console.warn("Dropdown not found.");
//         // }

//         // Target by ID and set the disabled property
//         // $('#WRBLCD').prop('disabled', true).trigger('updated');
//         $('[id="WRBLCD"]').prop('disabled', true).trigger('updated');

//       }, 0);


//       console.log("WRSTAT set to Disable.");
//       //}
//       //---------------------------------------------------------------------------

//       $('#WRCRLM').prop('disabled', true);
//       $('#WRCRLM').addClass("disabled").prop("disabled", true);

//       $('#WRCRL2').prop('disabled', true);
//       $('#WRCRL2').addClass("disabled").prop("disabled", true);

//       $('#WRCRL3').prop('disabled', true);
//       $('#WRCRL3').addClass("disabled").prop("disabled", true);

//       $('#WRODUD').prop('disabled', true);
//       $('#WRODUD').addClass("disabled").prop("disabled", true);
//       console.log("fieldsToDisable disabled.");

//     }

//   }

//   private detachEvents(): void {
//     if (this.unsubscribeRequesting) {
//       this.unsubscribeRequesting();
//       this.unsubscribeRequesting = null;
//     }
//     if (this.unsubscribeRequestCompleted) {
//       this.unsubscribeRequestCompleted();
//       this.unsubscribeRequestCompleted = null;
//     }
//   }

//   private onRequesting(e: CancelRequestEventArgs): void {
//     const program = this.controller.GetProgramName();
//     const panel = this.controller.GetPanelName();
//     const commandType = e.commandType;
//     const commandValue = e.commandValue;

//     this.updateMode(commandType, commandValue, panel); // 🔄 update mode

//     console.log(`[Requesting] userInRole: ${this.userInRole}, mode: ${this.mode}, Program: ${program}, Panel: ${panel}, Command: ${commandValue}`);

//     if (this.userInRole && program === "CRS610") {
//       if (panel === "CRA610E0") {
//         if (
//           (this.mode === "-1" || this.mode === "3") &&
//           commandType === "KEY" &&
//           ["F3", "F12", "F03"].indexOf(commandValue) !== -1
//         ) {
//           console.log(`Blocking key: ${commandValue}`);
//           e.cancel = true;
//         }
//       }
//     }
//   }

//   private onRequestCompleted(e: RequestEventArgs): void {
//     const program = this.controller.GetProgramName();
//     const panel = this.controller.GetPanelName();
//     const commandType = e.commandType;
//     const commandValue = e.commandValue;

//     this.updateMode(commandType, commandValue, panel); // 🔄 update mode again

//     if (!this.userInRole || program !== "CRS610") return;
//     console.log("userInRole----------------->");
//     if (panel === "CRA610E0") {
//       //const WRSTAT = ScriptUtil.FindChild(this.content, "WRSTAT");
//       //if (this.mode === "-1" || this.mode === "3") {
//       //$('#WRSTAT').prop('disabled', true);
//       //$('#WRSTAT').addClass('disabled').prop('disabled', true);
//       //$('#WRSTAT').prop('readonly', true);
//       //$('#btnLookup_WRSTAT').css({ 'pointer-events': 'none', 'opacity': '0.5' });


//       // setTimeout(() => {
//       //   //_________Developed By Rahul 
//       //   // const $dropdown = $(".dropdown[role='combobox']");

//       //   // if ($dropdown.length > 0) {
//       //   //   // 1. Disable interactions
//       //   //   $dropdown.css({
//       //   //     'pointer-events': 'none',
//       //   //     'opacity': '0.5',
//       //   //     'cursor': 'default'
//       //   //   });

//       //   //   // 2. Optional: add visual disabled effect
//       //   //   $dropdown.addClass('disabled');

//       //   //   // 3. Optional: remove tab focus
//       //   //   $dropdown.attr('tabindex', '-1');

//       //   //   console.log("Custom dropdown disabled.");
//       //   // } else {
//       //   //   console.warn("Dropdown not found.");
//       //   // }

//       //   //_________Developed By Rahul 


//       //   // ///Chirath Update 
//       //   // const element = document.getElementById('WRSTAT') as HTMLSelectElement;
//       //   // if (!element) return;

//       //   // // 1. Functional disable (Browser level)
//       //   // element.disabled = true;

//       //   // // 2. Interaction disable (Safety layer for custom Soho UI)
//       //   // const container = element.closest('.conditional-style-container') as HTMLElement;
//       //   // if (container) {
//       //   //   container.style.pointerEvents = 'none';
//       //   //   container.style.opacity = '0.6';
//       //   // }

//       // }, 0);


//       console.log("WRSTAT set to Disable.");
//       //}
//     }

//     // if (panel === "CRA610J0") {

//     //   const fieldsToDisable = ["WRTEPY", "WRPYCD", "WRBLCD", "WRCRLM", "WRCRL2", "WRCRL3", "WRODUD"];

//     //   $('#WRTEPY').prop('disabled', true);
//     //   $('#WRTEPY').addClass("disabled").prop("disabled", true);

//     //   $('#WRPYCD').prop('disabled', true);
//     //   $('#WRPYCD').addClass("disabled").prop("disabled", true);

//     //   //$('#WRBLCD').prop('readonly', true);
//     //   //$('#btnLookup_WRBLCD').css({ 'pointer-events': 'none', 'opacity': '0.5' });

//     //   setTimeout(() => {
//     //     // const $dropdown = $(".dropdown[role='combobox']");

//     //     // if ($dropdown.length > 0) {
//     //     //   // 1. Disable interactions
//     //     //   $dropdown.css({
//     //     //     'pointer-events': 'none',
//     //     //     'opacity': '0.5',
//     //     //     'cursor': 'default'
//     //     //   });

//     //     //   // 2. Optional: add visual disabled effect
//     //     //   $dropdown.addClass('disabled');

//     //     //   // 3. Optional: remove tab focus
//     //     //   $dropdown.attr('tabindex', '-1');

//     //     //   console.log("Custom dropdown disabled.");
//     //     // } else {
//     //     //   console.warn("Dropdown not found.");
//     //     // }

//     //     // Target by ID and set the disabled property
//     //     // $('#WRBLCD').prop('disabled', true).trigger('updated');
//     //     $('[id="WRBLCD"]').prop('disabled', true).trigger('updated');

//     //   }, 0);


//     //   console.log("WRSTAT set to Disable.");
//     //   //}
//     //   //---------------------------------------------------------------------------

//     //   $('#WRCRLM').prop('disabled', true);
//     //   $('#WRCRLM').addClass("disabled").prop("disabled", true);

//     //   $('#WRCRL2').prop('disabled', true);
//     //   $('#WRCRL2').addClass("disabled").prop("disabled", true);

//     //   $('#WRCRL3').prop('disabled', true);
//     //   $('#WRCRL3').addClass("disabled").prop("disabled", true);

//     //   $('#WRODUD').prop('disabled', true);
//     //   $('#WRODUD').addClass("disabled").prop("disabled", true);
//     //   console.log("fieldsToDisable disabled.");

//     // }

//     this.detachEvents();
//   }

//   private isInRole(): boolean {
//     const userRoles = ScriptUtil.GetUserContext()?.Roles || [];

//     for (const userRole of userRoles) {
//       if (this.roleIn.indexOf(userRole) !== -1) {
//         return true;
//       }
//     }
//     return false;
//   }

//   private updateMode(commandType: string, commandValue: string, panel: string): void {
//     if (commandType === "LSTOPT" && panel === "CRA610BC") {
//       this.mode = commandValue;
//       console.log(`Mode updated from list panel: ${this.mode}`);
//     } else if (!this.mode) {
//       // Try reading from field like WWMOD (replace if needed)
//       const modeFromField = ScriptUtil.GetFieldValue("WWMOD");
//       if (modeFromField) {
//         this.mode = modeFromField;
//         console.log(`Mode inferred from WWMOD field: ${this.mode}`);
//       }
//     }

//     // Fallback from controller (if supported)
//     if (!this.mode && typeof this.controller["GetMode"] === "function") {
//       const fallbackMode = (this.controller as any).GetMode();
//       if (fallbackMode) {
//         this.mode = fallbackMode;
//         console.log(`Mode fallback from controller: ${this.mode}`);
//       }
//     }
//   }

//   public static Init(scriptArgs: IScriptArgs): void {
//     new CRS610_CustomerControl(scriptArgs).run();
//   }
// }


/**
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
* Chirath Rothila| 2025-08-31 | Added disable functionality to the dropdowns
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


  private run(): void {
    console.log("User Role Valudation = " + this.isInRole());
    console.log("Current Mode = " + this.controller.GetMode());

    if (this.controller.GetPanelName() == "CRA610E0" && this.userInRole) {

      console.log("In CRA610E0 and userInRole is true************************************");
      ///Chirath Update 
      // const element = document.getElementById('WRSTAT') as HTMLSelectElement;
      // if (!element) return;

      // // 1. Functional disable (Browser level)
      // element.disabled = true;

      // // 2. Interaction disable (Safety layer for custom Soho UI)
      // const container = element.closest('.conditional-style-container') as HTMLElement;
      // if (container) {
      //   container.style.pointerEvents = 'none';
      //   container.style.opacity = '0.6';
      // }


      const styleId = 'h5-disable-status-visual-fix';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
      /* Target the WRSTAT component specifically */
      [componentname="WRSTAT"] .dropdown-wrapper,
      [componentname="WRSTAT"] .dropdown,
      [componentname="WRSTAT"] select#WRSTAT {
        background-color: #f0f0f0 !important;
        color: #888888 !important;
        border-color: #d3d3d3 !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
        opacity: 0.6 !important;
      }
      
      /* Visual dimming for the associated label and icon */
      [componentname="WRSTAT"] label.h5-label,
      [componentname="WRSTAT"] .icon {
        color: #aaaaaa !important;
        fill: #aaaaaa !important;
      }
    `;
        document.head.appendChild(style);
      }

      /**
       * Function to functionally disable a specific element
       */
      const disableElement = (element: Element) => {
        const statusField = element.matches('[componentname="WRSTAT"]')
          ? element
          : element.querySelector('[componentname="WRSTAT"]');

        if (statusField) {
          const select = statusField.querySelector('select') as HTMLSelectElement;
          if (select) {
            select.disabled = true;
            select.classList.add('is-disabled');
          }

          const visualDropdown = statusField.querySelector('.dropdown');
          if (visualDropdown) {
            visualDropdown.classList.add('is-disabled');
            visualDropdown.setAttribute('aria-disabled', 'true');
            visualDropdown.setAttribute('tabindex', '-1');
          }
        }
      };

      // 2. Disable all current instances
      const existingInstances = document.querySelectorAll('[componentname="WRSTAT"]');
      existingInstances.forEach(disableElement);

      // 3. Setup Observer to handle multiple instances opened later or dynamic refreshes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              disableElement(node);
              // Also check descendants if the parent was added
              node.querySelectorAll('[componentname="WRSTAT"]').forEach(disableElement);
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });


    }

    if (this.controller.GetPanelName() === "CRA610J0" && this.userInRole) {

      console.log("In CRA610J0 and userInRole is true************************************");

      const componentNames = [
        'WRSTAT', // Status
        'WRTEPY', // Payment Terms
        'WRPYCD', // Payment Method
        'WRBLCD', // Customer Stop
        'WRCRLM', // Credit Limit 1
        'WRCRL2', // Credit Limit 2
        'WRCRL3', // Credit Limit 3
        'WRODUD'  // Credit Limit 4
      ];

      // 1. Inject Global CSS for the "Disabled Look"
      const styleId = 'h5-finance-disable-fix';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;

        // Generate CSS selectors for all fields
        const selectors = componentNames.map(id => `
      [componentname="${id}"] .dropdown-wrapper,
      [componentname="${id}"] .dropdown,
      [componentname="${id}"] .h5-combobox-container,
      [componentname="${id}"] input,
      [componentname="${id}"] select
    `).join(',');

        const labelSelectors = componentNames.map(id => `[componentname="${id}"] label.h5-label`).join(',');

        style.innerHTML = `
      ${selectors} {
        background-color: #f0f0f0 !important;
        color: #888888 !important;
        border-color: #d3d3d3 !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
        opacity: 0.6 !important;
      }
      ${labelSelectors} {
        color: #aaaaaa !important;
      }
    `;
        document.head.appendChild(style);
      }

      /**
       * Disables inputs and UI components within a field container
       */
      const disableField = (container: HTMLElement) => {
        const componentName = container.getAttribute('componentname');
        if (componentName && componentNames.indexOf(componentName)) {
          // Functional disable for native elements
          const inputs = container.querySelectorAll('input, select');
          inputs.forEach(input => {
            (input as HTMLInputElement | HTMLSelectElement).disabled = true;
            input.setAttribute('tabindex', '-1');
            input.classList.add('is-disabled');
          });

          // ARIA disable for custom UI components
          const visualUI = container.querySelector('.dropdown, .dropdown-wrapper');
          if (visualUI) {
            visualUI.setAttribute('aria-disabled', 'true');
            visualUI.classList.add('is-disabled');
          }

        };

        // 2. Disable existing fields across all panels
        componentNames.forEach(name => {
          const instances = document.querySelectorAll(`[componentname="${name}"]`);
          instances.forEach(el => disableField(el as HTMLElement));
        });

        // 3. Monitor for new panels/instances
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                // Check if the added node is a field or contains fields
                if (node.hasAttribute('componentname')) disableField(node);
                node.querySelectorAll('[componentname]').forEach(child => disableField(child as HTMLElement));
              }
            });
          });
        });

        observer.observe(document.body, { childList: true, subtree: true });
      }

      // const fieldsToDisable = ["WRTEPY", "WRPYCD", "WRBLCD", "WRCRLM", "WRCRL2", "WRCRL3", "WRODUD"];

      // $('#WRTEPY').prop('disabled', true);
      // $('#WRTEPY').addClass("disabled").prop("disabled", true);

      // $('#WRPYCD').prop('disabled', true);
      // $('#WRPYCD').addClass("disabled").prop("disabled", true);

      // -----------

      //$('#WRBLCD').prop('readonly', true);
      //$('#btnLookup_WRBLCD').css({ 'pointer-events': 'none', 'opacity': '0.5' });

      // setTimeout(() => {
      // const $dropdown = $(".dropdown[role='combobox']");

      // if ($dropdown.length > 0) {
      //   // 1. Disable interactions
      //   $dropdown.css({
      //     'pointer-events': 'none',
      //     'opacity': '0.5',
      //     'cursor': 'default'
      //   });

      //   // 2. Optional: add visual disabled effect
      //   $dropdown.addClass('disabled');

      //   // 3. Optional: remove tab focus
      //   $dropdown.attr('tabindex', '-1');

      //   console.log("Custom dropdown disabled.");
      // } else {
      //   console.warn("Dropdown not found.");
      // }

      // Target by ID and set the disabled property
      // $('#WRBLCD').prop('disabled', true).trigger('updated');

      //------------ down
      //   $('[id="WRBLCD"]').prop('disabled', true).trigger('updated');

      // }, 0);


      console.log("WRSTAT set to Disable.");
      //}
      //---------------------------------------------------------------------------

      // $('#WRCRLM').prop('disabled', true);
      // $('#WRCRLM').addClass("disabled").prop("disabled", true);

      // $('#WRCRL2').prop('disabled', true);
      // $('#WRCRL2').addClass("disabled").prop("disabled", true);

      // $('#WRCRL3').prop('disabled', true);
      // $('#WRCRL3').addClass("disabled").prop("disabled", true);

      // $('#WRODUD').prop('disabled', true);
      // $('#WRODUD').addClass("disabled").prop("disabled", true);
      // console.log("fieldsToDisable disabled.");

    }

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
        // const $dropdown = $(".dropdown[role='combobox']");

        // if ($dropdown.length > 0) {
        //   // 1. Disable interactions
        //   $dropdown.css({
        //     'pointer-events': 'none',
        //     'opacity': '0.5',
        //     'cursor': 'default'
        //   });

        //   // 2. Optional: add visual disabled effect
        //   $dropdown.addClass('disabled');

        //   // 3. Optional: remove tab focus
        //   $dropdown.attr('tabindex', '-1');

        //   console.log("Custom dropdown disabled.");
        // } else {
        //   console.warn("Dropdown not found.");
        // }
      }, 0);


      console.log("WRSTAT set to Disable.");
      //}

    }

    if (panel === "CRA610J0") {

      // const fieldsToDisable = ["WRTEPY", "WRPYCD", "WRBLCD", "WRCRLM", "WRCRL2", "WRCRL3", "WRODUD"];

      // $('#WRTEPY').prop('disabled', true);
      // $('#WRTEPY').addClass("disabled").prop("disabled", true);

      // $('#WRPYCD').prop('disabled', true);
      // $('#WRPYCD').addClass("disabled").prop("disabled", true);

      //$('#WRBLCD').prop('readonly', true);
      //$('#btnLookup_WRBLCD').css({ 'pointer-events': 'none', 'opacity': '0.5' });

      setTimeout(() => {
        // const $dropdown = $(".dropdown[role='combobox']");

        // if ($dropdown.length > 0) {
        //   // 1. Disable interactions
        //   $dropdown.css({
        //     'pointer-events': 'none',
        //     'opacity': '0.5',
        //     'cursor': 'default'
        //   });

        //   // 2. Optional: add visual disabled effect
        //   $dropdown.addClass('disabled');

        //   // 3. Optional: remove tab focus
        //   $dropdown.attr('tabindex', '-1');

        //   console.log("Custom dropdown disabled.");
        // } else {
        //   console.warn("Dropdown not found.");
        // }
      }, 0);


      console.log("WRSTAT set to Disable.");
      //}
      //---------------------------------------------------------------------------

      // $('#WRCRLM').prop('disabled', true);
      // $('#WRCRLM').addClass("disabled").prop("disabled", true);

      // $('#WRCRL2').prop('disabled', true);
      // $('#WRCRL2').addClass("disabled").prop("disabled", true);

      // $('#WRCRL3').prop('disabled', true);
      // $('#WRCRL3').addClass("disabled").prop("disabled", true);

      // $('#WRODUD').prop('disabled', true);
      // $('#WRODUD').addClass("disabled").prop("disabled", true);
      // console.log("fieldsToDisable disabled.");

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
    new CRS610_CustomerControl(scriptArgs).run();
  }
}