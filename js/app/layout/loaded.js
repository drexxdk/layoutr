var app = app || {};

app.contentLoaded = (element) => {
    app.checkRb(element.find('.rb'));
    app.checkContentHeader();
    app.checkLazy(element.find('.lazy'));
    app.checkAccordion(element.find('.accordion'));
    app.checkDropdown(element.find('select.dropdown'));
    app.checkTooltip(element.find('.tooltip'));
    app.checkAssignment(element.find('.assignment'));
    app.checkMath(element.find('.math'));
    app.checkMedia(element.find('audio, video'));
    app.checkMap(element.find('.map'));
    app.checkDatatables(element.find('.dataTable'));
}

app.pageLoaded = (initial) => {
    app.main.css('overflow', 'auto');
    app.main.scrollTop(0);
    app.main.css('overflow', '');
    app.html.animate({ scrollTop: 0 }, 0);
    app.contentHeader = app.content.children('.content-header:not(.full)');
    setTimeout(() => {
        if (!initial && app.isCloseLeftPageChange()) {
            app.toggleAside(undefined, true);
        }
    }, 200);
    app.contentLoaded(app.content);
    app.hideLoading();
    if (initial) {
        app.html.addClass('site-loaded');
    }
};