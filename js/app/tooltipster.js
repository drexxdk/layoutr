var app = app || {};

$(function () {
    app.tooltipster = function (elements) {
        elements.tooltipster({
            interactive: true,
            trigger: 'custom',
            triggerOpen: {
                mouseenter: true,
                touchstart: true
            },
            triggerClose: {
                mouseleave: true
            }
        });
    };
});