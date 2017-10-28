var app = app || {};
$(function () {
    app.body.on("keydown", function (e) {
        if (app.loading.hasClass('hidden')) {
            if (e.which === 37) { // left
                if (app.html.attr('data-aside') === 'left') {
                    app.toggleAside(); // closes right
                } else if (app.html.attr('data-aside') !== 'right') {
                    app.toggleAside('right'); // opens right
                }
            } else if (e.which === 39) { // right
                if (app.html.attr('data-aside') === 'right') {
                    app.toggleAside(); // closes left
                } else if (app.html.attr('data-aside') !== 'left') {
                    app.toggleAside('left'); // opens left
                }
            } else if (e.which === 27) { // esc
                if (app.html.attr('data-aside').length) {
                    app.toggleAside(); // closes aside
                }
                if (!app.fullscreen.hasClass('hidden')) {
                    app.fullscreen.addClass('hidden'); // closes fullscreen
                }
                var popups = app.main.children('.popup');
                if (popups.length) {
                    popups.fadeOut(app.fadeOutTime, function () {
                        popups.remove();
                    });
                }
            }
        }
    });
});