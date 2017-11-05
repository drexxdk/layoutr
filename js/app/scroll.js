var app = app || {};

app.disableScroll = function () {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        var scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        app.body.data('scroll-top', scrollTop);
        app.html.addClass('scrollDisabled');
        app.body.scrollTop(scrollTop);
    }
};

app.enableScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        app.html.removeClass('scrollDisabled');
        var scrollTop = app.body.data('scroll-top');
        app.html.scrollTop(scrollTop);

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