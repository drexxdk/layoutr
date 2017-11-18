var app = app || {};

$(function () {
    app.pageLoaded = function () {
        app.html.animate({ scrollTop: 0 }, 0);
        setTimeout(function () {
            app.toggleAside(undefined, true);
        }, 200);
        app.contentHeader = app.content.children('.header');
        app.lazyload(app.content.find('.lazy'));
        app.accordion(app.content.find('.accordion'));
        app.dropdown(app.content.find('select.dropdown'));
        app.responsiveBackground(app.content.find('.responsive-background'));
        app.tooltipster(app.content.find('.tooltip'));
    };
});