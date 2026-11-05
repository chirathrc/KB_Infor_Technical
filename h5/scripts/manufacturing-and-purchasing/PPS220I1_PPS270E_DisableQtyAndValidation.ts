/**
 * Author      : Chirath Rothila (Fortude)
 * Created on  : 2026-05-27
 * Summary     : Validate the qty entered in PPA270/E and disable Qty to Notify column in PPS220/L1.
 *
 * Version Log :
 * Changed By      | Date         | Summary of the change
 * ----------------|--------------|--------------------------------------------------
 * Chirath Rothila | 2026-05-27   | Added validation for qty entered in PPA270/E
 *                 |              | and disabled Qty to Notify column in PPS220/L1.
 * Chirath Rothila | 2026-05-29   | Fixed duplicate tab issue. gridWrapper._idsDataGrid
 *                 |              | is the real IDS-DATA-GRID DOM node, scoped to this
 *                 |              | controller instance. No querySelector needed.
 */

class PPS220I1_PPS270E_DisableQtyAndValidation {
    private controller: IInstanceController;
    private log: IScriptLog;
    private unsubscribeReqCompleted: any;
    private unsubscribeRequesting: any;
    private unsubscribeRequested: any;

    private readonly DISABLE_FIELDS: Record<string, string> = {
        "WITNQA": "6",
        "TNQA": "7"
    };

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
    }

    public static Init(args: IScriptArgs): void {
        new PPS220I1_PPS270E_DisableQtyAndValidation(args).run();
    }

    private run(): void {
        this.log.Info("Script Initialized - Panel: " + this.controller.GetPanelName());

        if (this.controller.GetPanelName() != "PPA220IC" && this.controller.GetPanelName() != "PPA270E0") {
            this.log.Info("In Wrong Panel - " + this.controller.GetPanelName());
            return;
        }

        if (this.controller.GetPanelName() == "PPA270E0") {
            this.unsubscribeRequesting = this.controller.Requesting.On((e) => this.onRequesting(e));
            this.unsubscribeRequested = this.controller.Requested.On((e) => this.onRequested(e));
            return;
        }

        // PPA220IC
        this.applyGridDisable();
        this.attachEvents();
        this.initializeColumnStyling();
    }

    /**
     * gridWrapper._idsDataGrid is confirmed (via runtime debug) to be the actual
     * IDS-DATA-GRID DOM element — tagName: "IDS-DATA-GRID", has addEventListener.
     * It is already scoped to this controller's grid instance, so duplicate tabs
     * each resolve their own element independently with no querySelector needed.
     *
     * gridWrapper.columns is used for column flag mutation (readonly/editable/focusable)
     * since the wrapper holds the column definitions array directly.
     */
    private applyGridDisable(): void {
        setTimeout(() => {
            const gridWrapper = ListControl.ListView.GetDatagrid(this.controller) as any;
            if (!gridWrapper) {
                this.log.Warning("Grid wrapper not found.");
                return;
            }

            const gridDomEl = gridWrapper._idsDataGrid;
            if (!gridDomEl) {
                this.log.Warning("_idsDataGrid DOM element not found on grid wrapper.");
                return;
            }

            this.log.Info("Grid DOM element resolved via _idsDataGrid.");
            this.disableTargetColumns(gridWrapper, gridDomEl);
            this.attachTabGuard(gridDomEl);
        }, 100);
    }

    private onRequesting(args: CancelRequestEventArgs): void {
        this.log.Info("onRequesting");
        if (args.commandType === "KEY" && args.commandValue === "ENTER") {
            const maxQty = parseFloat(ScriptUtil.GetFieldValue("WEORQA"));
            const enteredQty = parseFloat(ScriptUtil.GetFieldValue("WBTNQA"));
            if (enteredQty > maxQty) {
                this.controller.ShowMessage("Notified quantity cannot be greater than order quantity.");
                args.cancel = true;
            }
        }
    }

    private onRequested(args: RequestEventArgs): void {
        this.log.Info("onRequested");
        if (this.unsubscribeRequesting) { this.unsubscribeRequesting(); }
        if (this.unsubscribeRequested) { this.unsubscribeRequested(); }
    }

    private disableTargetColumns(gridWrapper: any, gridDomEl: any): void {
        // Mutate column definitions on the wrapper
        if (gridWrapper.columns) {
            gridWrapper.columns = gridWrapper.columns.map((col: any) => {
                if (Object.keys(this.DISABLE_FIELDS).indexOf(col.id) !== -1) {
                    return { ...col, readonly: true, editable: false, focusable: false };
                }
                return col;
            });
        }

        // Block mouse-click edits on the real DOM element
        gridDomEl.addEventListener('beforecelledit', (e: any) => {
            if (Object.keys(this.DISABLE_FIELDS).indexOf(e.detail.column.id) !== -1) {
                e.detail.response(false);
            }
        });
    }

    private attachTabGuard(gridDomEl: any): void {
        if (!gridDomEl) return;

        gridDomEl.addEventListener("keydown", (e: KeyboardEvent) => {
            const shadowRoot = gridDomEl.shadowRoot;
            if (!shadowRoot) return;
            const active = shadowRoot.activeElement;
            if (!active) return;

            const colIndex = active.getAttribute("aria-colindex");
            if (colIndex && this.isDisabledColIndex(colIndex)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                if (e.key === "Tab") {
                    this.moveFocusPastDisabled(gridDomEl, colIndex, e.shiftKey);
                }
            }
        }, true);

        gridDomEl.addEventListener("focusin", (e: FocusEvent) => {
            const target = e.target as any;
            if (!target) return;
            const colIndex = target.getAttribute("aria-colindex");
            if (colIndex && this.isDisabledColIndex(colIndex)) {
                target.blur();
                this.moveFocusPastDisabled(gridDomEl, colIndex, false);
            }
        }, true);
    }

    private isDisabledColIndex(colIndex: string): boolean {
        for (const field in this.DISABLE_FIELDS) {
            if (this.DISABLE_FIELDS[field] === colIndex) { return true; }
        }
        return false;
    }

    private moveFocusPastDisabled(gridDomEl: any, currentColIndex: string, reverse: boolean): void {
        if (!gridDomEl.shadowRoot) return;

        const allCells: any[] = Array.from(
            gridDomEl.shadowRoot.querySelectorAll("ids-data-grid-cell[aria-colindex]")
        );

        allCells.sort((a: any, b: any) =>
            parseInt(a.getAttribute("aria-colindex"), 10) -
            parseInt(b.getAttribute("aria-colindex"), 10)
        );

        const currentIdx = parseInt(currentColIndex, 10);
        const candidates = reverse
            ? allCells.filter((c: any) => parseInt(c.getAttribute("aria-colindex"), 10) < currentIdx).reverse()
            : allCells.filter((c: any) => parseInt(c.getAttribute("aria-colindex"), 10) > currentIdx);

        for (const c of candidates) {
            if (!this.isDisabledColIndex(c.getAttribute("aria-colindex"))) {
                c.focus();
                return;
            }
        }
    }

    private attachEvents(): void {
        this.unsubscribeReqCompleted = this.controller.RequestCompleted.On((e: any) => {
            if (e.commandType === "PAGE" || e.commandValue === "REFRESH") {
                this.applyGridDisable();
            }
        });
    }

    private initializeColumnStyling(): void {
        const applyStyles = (): void => {
            // 1. Find every grid on the page
            const grids = document.querySelectorAll<HTMLElement & { shadowRoot: ShadowRoot }>('ids-data-grid');

            grids.forEach((grid) => {
                const shadow = grid.shadowRoot;
                if (!shadow) return;

                // 2. Find the header for this specific grid
                const headerCells = Array.from(
                    shadow.querySelectorAll<HTMLElement>('.ids-data-grid-header-cell')
                );

                const targetHeader = headerCells.find((header) =>
                    header.textContent?.trim().includes('Qty to notify')
                );

                if (targetHeader) {
                    const colIndex = targetHeader.getAttribute('aria-colindex');
                    const styleId = 'shared-panel-column-style';

                    // 3. Inject style into this specific grid's shadow root
                    let styleEl = shadow.getElementById(styleId) as HTMLStyleElement | null;
                    if (!styleEl) {
                        styleEl = document.createElement('style');
                        styleEl.id = styleId;
                        shadow.appendChild(styleEl);
                    }

                    // Updated: Removed background color/text color and added border/pseudo-element removal
                    styleEl.textContent = `
                    /* Remove the line created by pseudo-elements (::after/::before) */
                    .ids-data-grid-row > .ids-data-grid-cell[aria-colindex="${colIndex}"]::after,
                    .ids-data-grid-row > .ids-data-grid-cell[aria-colindex="${colIndex}"]::before {
                        display: none !important;
                        content: none !important;
                        border: none !important;
                    }
                `;
                }
            });
        };

        // Run immediately for existing panels
        applyStyles();

        // 4. Watch the document for when new panels/grids are added
        const observer = new MutationObserver(() => {
            applyStyles();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}