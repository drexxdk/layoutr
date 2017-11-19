var app = app || {};

$(function () {
    app.body.on("keydown", function (e) {
        var target = $(e.target);
        var parent = target.parent();
        if (!app.html.hasClass('loading')) {
            if (e.which === 37 && !app.html.hasClass('modal')) { // left
                if (app.html.attr('data-aside') === 'left') {
                    app.toggleAside(); // closes right
                } else if (app.html.attr('data-aside') !== 'right') {
                    app.toggleAside('right'); // opens right
                }
            } else if (e.which === 39 && !app.html.hasClass('modal')) { // right
                if (app.html.attr('data-aside') === 'right') {
                    app.toggleAside(); // closes left
                } else if (app.html.attr('data-aside') !== 'left') {
                    app.toggleAside('left'); // opens left
                }
            } else if (e.which === 27) { // esc
                if (app.html.hasClass('modal')) {
                    app.closeModal();
                } else {
                    if (app.html.attr('data-aside').length) {
                        app.toggleAside(); // closes aside
                    }
                    var popups = app.main.children('.popup');
                    if (popups.length) {
                        popups.fadeOut(app.fadeOutTime, function () {
                            popups.remove();
                        });
                    }
                }
            }
            if (e.which === 13) { // enter
                if (parent.hasClass('checkbox') || parent.hasClass('radio') || parent.hasClass('switch') || target.hasClass('toggle')) {
                    target.siblings('input').click();
                    e.preventDefault();
                } else if (parent.hasClass('dropdown') || target.parents('div.dropdown').length || parent.parent().hasClass('accordion')) {
                    target.click();
                    e.preventDefault();
                }
            }
        }
        if (e.which === 9) { // tab
            if (app.html.hasClass('loading')) {
                e.preventDefault();
                return;
            }
        }
    });

    app.body.on('keyup', function (e) {
        if (!app.html.hasClass('loading')) {
            if (e.which === 9) { // tab
                var target = $(e.target);
                if (!target.parents('div.dropdown.open').length) {
                    $('div.dropdown.open').removeClass('open');
                }
                if (app.html.hasClass('modal')) {
                    if (!target.parents('#modal').length) {
                        app.closeModal();
                    }
                } else {
                    var aside = target.parents('aside');
                    if (aside.length && aside.attr('id') !== app.html.attr('data-aside')) {
                        app.toggleAside(aside.attr('id'));
                    } else if (!aside.length && app.html.attr('data-aside').length) {
                        app.toggleAside();
                    }
                }
            }
        }
    });
});