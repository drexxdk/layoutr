var app = app || {};

app.pageLoaded = function (initial) {
    app.body.scrollTop(0); // edge, safari
    app.html.scrollTop(0); // chrome, firefox, ie
    if (app.html.hasClass('msie')) {
        app.body.css('overflow', 'hidden');
    }
    setTimeout(function () {
        if (app.html.hasClass('msie')) {
            app.body.css('overflow', '');
        }
        if (!initial) {
            app.toggleAside(undefined, true);
        }
    }, 200);
    app.contentHeader = app.content.children('.content-header:not(.full)');
    app.lazy(app.content.find('.lazy'));
    app.accordion(app.content.find('.accordion'));
    app.dropdown(app.content.find('select.dropdown'));
    app.responsiveBackground();
    app.tooltipster(app.content.find('.tooltip'));
    app.assignment(app.content.find('.assignment'));
    app.katex(app.content.find('.katex'));
    app.youtube = undefined;
    app.google = undefined;
    app.hideLoading();
    if (initial) {
        app.html.addClass('siteLoaded');
    }
};