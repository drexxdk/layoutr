var app = app || {};

app.disableHtmlScroll = function () {
    if (app.htmlOverflowEnabled) {
        var initWidth = app.body.outerWidth();
        var initHeight = app.body.outerHeight();
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        app.html.data('scroll-position', scrollPosition);
        app.html.data('previous-overflow', app.html.css('overflow'));
        app.html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
        var marginR = app.body.outerWidth() - initWidth;
        var marginB = app.body.outerHeight() - initHeight;
        app.body.css({ 'margin-right': marginR, 'margin-bottom': marginB });

        var headerFooterTag = 'padding-right';
        if (app.main.hasClass('right-open')) {
            app.right.css({
                'max-width': app.right.outerWidth() + marginR,
                'padding-right': marginR
            });
            headerFooterTag = 'right';
        }
        app.header.css(headerFooterTag, marginR);
        if (app.main.hasClass('footer-fixed')) {
            app.footer.css(headerFooterTag, marginR);
        }

        var popups = app.main.children('.popup');
        popups.each(function (index) {
            var $this = $(this);
            $this.css('margin-right', parseInt($this.css('margin-right')) + marginR + 'px');
        });

        if (app.main.hasClass('two-columns') && app.contentHeader.length && app.contentHeader.css('position') === 'fixed') {
            app.contentHeader.addClass('no-transitions').css('width', app.contentHeader.outerWidth() + -marginR / 2 + 'px');
        }
        app.htmlOverflowEnabled = false;
    }
};

app.enableHtmlScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.html.css('overflow', app.html.data('previous-overflow'));
        var scrollPosition = app.html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        app.body.removeAttr('style');
        app.header.removeAttr('style');
        app.right.removeAttr('style');
        app.footer.removeAttr('style');
        var popups = app.main.children('.popup');
        if (popups.length) {
            popups.removeAttr('style');
        }
        if (app.contentHeader.length) {
            app.contentHeader.removeClass('no-transitions').css({
                'right': '',
                'padding-right': '',
                'width': ''
            });
        }
        app.htmlOverflowEnabled = true;
    }
};

app.setHtmlScroll = function () {
    if (!app.main.hasClass('loading') && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && !app.main.hasClass('left-open') && !app.main.hasClass('right-open'))) {
        app.enableHtmlScroll();
    } else if (app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.main.hasClass('left-open') || app.main.hasClass('right-open'))) {
        app.disableHtmlScroll();
    }
};