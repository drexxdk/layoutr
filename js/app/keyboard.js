var app = app || {};

$(function () {
    app.body.on("keydown", function (e) {
        var target = $(e.target);
        var parent = target.parent();
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
                if (!app.modal.hasClass('hidden')) {
                    app.modal.addClass('hidden'); // closes fullscreen
                    app.setHtmlScroll();
                }
                var popups = app.main.children('.popup');
                if (popups.length) {
                    popups.fadeOut(app.fadeOutTime, function () {
                        popups.remove();
                    });
                }
            }
            if (e.which === 13) { // enter
                if (parent.hasClass('checkbox') || parent.hasClass('radio') || parent.hasClass('switch') || target.hasClass('toggle')) {
                    target.siblings('input').click();
                    e.preventDefault();
                } else if (parent.hasClass('dropdown') || parent.parent().hasClass('accordion')) {
                    target.click();
                    e.preventDefault();
                }
            }
        }
        if (e.which === 9) { // tab
            if (!app.loading.hasClass('hidden') || !app.modal.hasClass('hidden')) {
                e.preventDefault();
                return;
            }
            if (parent.hasClass('dropdown') && parent.hasClass('open')) {
                target.click();
                e.preventDefault();
                return;
            }
        }
    });
    
    app.body.on('keyup', function (e) {
        if (e.which === 9) { // tab
            var target = $(e.target);
            var aside = target.parents('aside');
            if (aside.length && aside.attr('id') !== app.html.attr('data-aside')) {
                app.toggleAside(aside.attr('id'));
            } else if (!aside.length && app.html.attr('data-aside').length) {
                app.toggleAside();
            }
        }
    });
});