var app = app || {};

app.contentLoaded = (element) => {
    app.checkResponsiveBackground(element.find('.rb'));
    app.checkLazy(element.find('.lazy'));
    app.checkAccordion(element.find('.accordion'));
    app.checkDropdown(element.find('select.dropdown'));
    app.checkTooltip(element.find('.tooltip'));
    app.checkAssignment(element.find('.assignment'));
    app.checkMath(element.find('.math'));
    app.checkMedia(element.find('audio, video'));
    app.checkMap(element.find('.map'));
    app.checkDatatable(element.find('.dataTable'));
    app.checkFixedImg(element.find('.fixed-img'))
}

app.pageLoaded = (initial) => {
    app.main.css('overflow', 'auto');
    app.main.scrollTop(0);
    app.main.css('overflow', '');
    app.html.animate({ scrollTop: 0 }, 0);
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