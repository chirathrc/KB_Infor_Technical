/**
 * Author      : Chirath Rothila
 * Created on  : 2026-08-24
 * Version Log :
 * ------------------|------------|-----------------------------
 * Chirath Rothila    | 2026-08-24 | Fixed decimal/thousands parsing for S1CUAM formatting, removed color styling
 */

class APS100_RD {
    private controller: IInstanceController;
    private log: IScriptLog;
    private grid: IActiveGrid;
    private divider = ScriptUtil.GetUserContext().DCFM;

    constructor(scriptArgs: IScriptArgs) {
        this.controller = scriptArgs.controller;
        this.log = scriptArgs.log;
        this.grid = this.controller.GetGrid();
        console.log("Devider Initialized: " + this.divider);
    }

    public static Init(scriptArgs: IScriptArgs): void {
        new APS100_RD(scriptArgs).run();
    }

    public run(): void {

        this.applyFormattingToAllGrids();
        this.setupGlobalPanelObserver();
    }

    private applyFormattingToAllGrids(): void {
        var grids = document.querySelectorAll('ids-data-grid');
        for (var i = 0; i < grids.length; i++) {
            this.setupGridFormatting(grids[i] as HTMLElement);
        }
    }

    private setupGlobalPanelObserver(): void {
        var self = this;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    if (node instanceof HTMLElement) {
                        // Detects grid directly or if it's inside a newly added panel container
                        if (node.tagName === 'IDS-DATA-GRID') {
                            self.setupGridFormatting(node);
                        } else {
                            var nested = node.querySelectorAll('ids-data-grid');
                            for (var j = 0; j < nested.length; j++) {
                                self.setupGridFormatting(nested[j] as HTMLElement);
                            }
                        }
                    }
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    private setupGridFormatting(grid: HTMLElement): void {
        // Prevention: Don't attach twice to the same panel
        if (!grid || !grid.shadowRoot || (grid as any)._h5FormatterActive) return;

        var self = this;
        var apply = function () {
            var spans = grid.shadowRoot!.querySelectorAll('div[data-testid*="datagrid-cell"] span');
            // var targetFields = ['S1CUAM', 'OAORNO', 'OACUNO', 'AMT', 'VAL'];
            var targetFields = ['S1CUAM'];

            for (var i = 0; i < spans.length; i++) {
                var span = spans[i] as HTMLElement;
                var parent = span.closest('div[data-testid]');
                var testid = parent ? parent.getAttribute('data-testid') || '' : '';

                var isTarget = false;
                for (var f = 0; f < targetFields.length; f++) {
                    if (testid.indexOf(targetFields[f]) !== -1) {
                        isTarget = true;
                        break;
                    }
                }

                if (isTarget) {
                    var original = span.textContent ? span.textContent.trim() : '';
                    var formatted = self.formatERPValue(original);
                    if (span.textContent !== formatted) {
                        span.textContent = formatted;
                    }
                }
            }
        };

        apply();

        // SCROLL HANDLING: Watches for row changes within this specific grid's shadow DOM
        var gridObserver = new MutationObserver(function () { apply(); });
        gridObserver.observe(grid.shadowRoot, { childList: true, subtree: true });

        (grid as any)._h5FormatterActive = true;
    }

    private formatERPValue(value: string): string {
        if (!value) return value;
        var clean = value.trim();
        if (clean.slice(-1) === "-") clean = "-" + clean.slice(0, -1);

        var numeric: number;
        if (this.divider === ",") {
            // European format: "." = thousands separator, "," = decimal separator.
            // Strip thousands dots, then convert the decimal comma to a period so parseFloat reads it correctly.
            var normalized = clean.replace(/\./g, '').replace(',', '.');
            numeric = parseFloat(normalized);
            if (isNaN(numeric)) return value;
            return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(numeric);
        } else {
            // US format: "," = thousands separator, "." = decimal separator.
            var normalizedUS = clean.replace(/,/g, '');
            numeric = parseFloat(normalizedUS);
            if (isNaN(numeric)) return value;
            return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(numeric);
        }
    }
}