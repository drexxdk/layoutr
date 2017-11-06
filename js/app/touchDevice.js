var app = app || {};

$(function () {
    function isTouchDevice() {
        return 'ontouchstart' in window;
    }

    if (isTouchDevice()) {
        $.getScript("dist/js/touchDevice.js", function (data, textStatus, jqxhr) {
            app.body
                .on('swipeleft', function (e) {
                    var currentAside = app.html.attr('data-aside');
                    if (currentAside === 'left' && currentAside !== 'right') {
                        app.toggleAside();
                    } else {
                        app.toggleAside('right');
                    }
                })
                .on('swiperight', function (e) {
                    var currentAside = app.html.attr('data-aside');
                    if (currentAside === 'right' && currentAside !== 'left') {
                        app.toggleAside();
                    } else {
                        app.toggleAside('left');
                    }
                });
        });
    }
});