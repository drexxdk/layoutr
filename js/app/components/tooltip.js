(function () {
    "use strict";

    layoutr.checkTooltip = (tooltips) => {
        tooltips.each((i, e) => {
            let $this = $(e),
                interactive = $this.hasClass('interactive');
            $this.tooltipster({
                animationDuration: 0,
                interactive: interactive,
                trigger: 'custom',
                triggerOpen: {
                    mouseenter: true,
                    touchstart: true
                },
                triggerClose: {
                    mouseleave: true,
                    tap: true,
                    scroll: true
                }
            });
        });
    };
}());