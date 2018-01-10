var app = app || {};

app.tooltip = function (tooltips) {
    tooltips.each(function () {
        var $this = $(this);
        var interactive = $this.hasClass('interactive');
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