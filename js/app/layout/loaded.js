var app = app || {};

app.contentLoaded = function (element) {
    app.lazy(element.find('.lazy'));
    app.accordion(element.find('.accordion'));
    app.dropdown(element.find('select.dropdown'));
    app.tooltip(element.find('.tooltip'));
    app.assignment(element.find('.assignment'));
    app.math(element.find('.math'));
    app.media(element.find('audio, video'));
    app.map(element.find('.map'));
    app.datatables(element.find('.dataTable'));
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
        app.initial = false;
    }
};