var app = app || {};

$(function () {
    app.disableScroll = function () {
        if (app.htmlOverflowEnabled) {
            app.htmlOverflowEnabled = false;
            if (app.html.hasClass('modal')) {
                app.checkModal();
                app.modal.focus();
            }
            var scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            app.html.addClass('scrollDisabled');
            app.body.scrollTop(scrollTop);
            app.main.scrollTop(scrollTop);
        }
    };

    app.enableScroll = function () {
        if (!app.htmlOverflowEnabled) {
            app.htmlOverflowEnabled = true;
            var scrollTop = app.body.scrollTop() || app.main.scrollTop() || app.html.scrollTop();
            app.html.removeClass('scrollDisabled modal');
            app.main.focus();
            app.body.scrollTop(scrollTop); // edge, safari
            app.html.scrollTop(scrollTop); // chrome, firefox, ie
        }
    };

    app.setHtmlScroll = function () {
        if (!app.html.attr('data-modal').length && app.loading.hasClass('hidden') && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && app.html.attr('data-aside') !== 'left' && app.html.attr('data-aside') !== 'right')) {
            app.enableScroll();
        } else if (app.html.attr('data-modal').length || app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.html.attr('data-aside') === 'left' || app.html.attr('data-aside') === 'right')) {
            app.disableScroll();
        }
    };

    $(window).resize(function () {
        app.checkModal();
        app.setHtmlScroll();
    });
});