var app = app || {};

$(function () {
    function isTouchDevice() {
        return 'ontouchstart' in window;
    }

    if (isTouchDevice()) {
        $.getScript("dist/js/touchDevice.js", function (data, textStatus, jqxhr) {
            app.body
                .on('swipeleft', function (e) {
                    if (!html.hasClass('scrollDisabled')) {
                        var currentAside = app.html.attr('data-aside');
                        if (currentAside === 'left' && currentAside !== 'right') {
                            app.toggleAside();
                        } else if (currentAside !== 'right') {
                            app.toggleAside('right');
                        }
                    }
                })
                .on('swiperight', function (e) {
                    if (!html.hasClass('scrollDisabled')) {
                        var currentAside = app.html.attr('data-aside');
                        if (currentAside === 'right' && currentAside !== 'left') {
                            app.toggleAside();
                        } else if (currentAside !== 'left') {
                            app.toggleAside('left');
                        }
                    }
                });
        });
    }
});