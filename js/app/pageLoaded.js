var app = app || {};

app.pageLoaded = function () {
    app.body.scrollTop(0); // edge, safari
    app.html.scrollTop(0); // chrome, firefox, ie
    if (app.html.hasClass('msie')) {
        app.body.css('overflow', 'hidden');
    }
    setTimeout(function () {
        if (app.html.hasClass('msie')) {
            app.body.css('overflow', '');
        }
        app.toggleAside(undefined, true);
    }, 200);
    app.contentHeader = app.content.children('.header:not(.full)');
    app.lazy(app.content.find('.lazy'));
    app.accordion(app.content.find('.accordion'));
    app.dropdown(app.content.find('select.dropdown'));
    app.responsiveBackground(app.content.find('.responsive-background'));
    app.tooltipster(app.content.find('.tooltip'));
    app.assignment(app.content.find('.assignment'));
    renderMathInElement(app.content[0]);

    app.youtube = undefined;
    app.google = undefined;
    app.hideLoading();
};