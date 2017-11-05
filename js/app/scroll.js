var app = app || {};

app.disableScroll = function () {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        var scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        app.html.data('scroll-top', scrollTop);
        app.html.addClass('scrollDisabled');
        app.main.scrollTop(scrollTop);
    }
};

app.enableScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        app.html.removeClass('scrollDisabled');
        var scrollTop = app.html.data('scroll-top');

        app.body.scrollTop(scrollTop); // edge, safari
        app.html.scrollTop(scrollTop); // chrome, firefox, ie
    }
};

app.setHtmlScroll = function () {
    if (app.fullscreen.hasClass('hidden') && app.loading.hasClass('hidden') && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && app.html.attr('data-aside') !== 'left' && app.html.attr('data-aside') !== 'right')) {
        app.enableScroll();
    } else if (!app.fullscreen.hasClass('hidden') || app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.html.attr('data-aside') === 'left' || app.html.attr('data-aside') === 'right')) {
        app.disableScroll();
    }
};

$(window).resize(function () {
    app.setHtmlScroll();
});