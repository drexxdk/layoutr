var app = app || {};

app.pageLoaded = function (initial) {
    $(window).off('debouncedresize.assignment');
    $(window).off('throttledresize.assignment');
    app.main.css('overflow', 'auto');
    app.main.scrollTop(0);
    app.main.css('overflow', '');
    app.html.animate({ scrollTop: 0 }, 0);
    setTimeout(function () {
        if (!initial && app.isCloseLeftPageChange()) {
            app.toggleAside(undefined, true);
        }
    }, 200);
    app.contentHeader = app.content.children('.content-header:not(.full)');
    app.lazy(app.content.find('.lazy'));
    app.accordion(app.content.find('.accordion'));
    app.dropdown(app.content.find('select.dropdown'));
    app.rb();
    app.tooltip(app.content.find('.tooltip'));
    app.assignment(app.content.find('.assignment'));
    app.math(app.content.find('.math'));
    app.youtube = undefined;
    app.google = undefined;
    app.hideLoading();
    if (initial) {
        app.html.addClass('site-loaded');
    }
};