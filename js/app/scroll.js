var app = app || {};

app.disableScroll = function () {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        app.body.data('scroll-position', scrollPosition);
        app.html.addClass('scrollDisabled');
        app.body.scrollTop(scrollPosition[1]).scrollLeft(scrollPosition[0]);
    }
};

app.enableScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        app.html.removeClass('scrollDisabled');
        var scrollPosition = app.body.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        if (bowser.msie && !app.html.hasClass('footer-fixed')) {
            // ie pushes footer out of view without this fix
            app.footer.css('position', 'fixed');
            setTimeout(function () {
                app.footer.css('position', '');
            }, 0);
        }
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