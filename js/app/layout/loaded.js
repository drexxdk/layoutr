var app = app || {};

app.contentLoaded = function (elemenet) {
    app.lazy(elemenet.find('.lazy'));
    app.accordion(elemenet.find('.accordion'));
    app.dropdown(elemenet.find('select.dropdown'));
    app.tooltip(elemenet.find('.tooltip'));
    app.assignment(elemenet.find('.assignment'));
    app.math(elemenet.find('.math'));
    app.media(elemenet.find('audio, video'));
    app.map(elemenet.find('.map'));
}

app.pageLoaded = function (initial) {
    $(window).off('throttledresize.assignment');
    $(window).off('throttledresize.map');
    app.head.find('script[src^="https://maps.googleapis.com/maps-api-"]').remove();
    app.main.css('overflow', 'auto');
    app.main.scrollTop(0);
    app.main.css('overflow', '');
    app.html.animate({ scrollTop: 0 }, 0);
    setTimeout(function () {
        if (!initial && app.isCloseLeftPageChange()) {
            app.toggleAside(undefined, true);
        }
    }, 200);
    app.rb();
    app.contentLoaded(app.content);
    app.hideLoading();
    if (initial) {
        app.html.addClass('site-loaded');
    }
};