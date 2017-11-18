var app = app || {};

$(function () {
    app.pageLoaded = function () {
        app.html.animate({ scrollTop: 0 }, 0);
        if (app.html.hasClass('msie')) {
            app.body.css('overflow', 'hidden');
        }
        setTimeout(function () {
            if (app.html.hasClass('msie')) {
                app.body.css('overflow', '');
            }
            app.toggleAside(undefined, true);
        }, 200);
        app.contentHeader = app.content.children('.header');
        app.lazy(app.content.find('.lazy'));
        app.accordion(app.content.find('.accordion'));
        app.dropdown(app.content.find('select.dropdown'));
        app.responsiveBackground(app.content.find('.responsive-background'));
        app.tooltipster(app.content.find('.tooltip'));
    };
});