var app = app || {};

var marginR;

var updateContentHeader = function () {
    app.contentHeader.css('width', '');
    if (app.contentHeader !== undefined && app.body.css('overflow') === 'hidden' && app.main.hasClass('two-columns') && app.contentHeader.css('position') === 'fixed') {
        app.contentHeader.addClass('no-transitions').css('width', app.contentHeader.outerWidth() + -marginR / 2 + 'px');
    }
};

app.disableHtmlScroll = function () {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        var initWidth = app.body.outerWidth();
        var initHeight = app.body.outerHeight();
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        app.body.data('scroll-position', scrollPosition);
        app.body.data('previous-overflow', app.html.css('overflow'));
        app.body.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
        marginR = app.body.outerWidth() - initWidth;
        var marginB = app.body.outerHeight() - initHeight;
        app.body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
        var headerFooterTag = 'padding-right';
        if (app.main.attr('data-aside') === 'right') {
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
        app.main.resize(updateContentHeader);
    }
};

app.enableHtmlScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        app.main.removeResize(updateContentHeader);
        app.body.css('overflow', app.body.data('previous-overflow'));
        var scrollPosition = app.body.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);
        app.body.removeAttr('style');
        app.header.removeAttr('style');
        app.right.removeAttr('style');
        app.footer.removeAttr('style');
        var popups = app.main.children('.popup');
        if (popups.length) {
            popups.removeAttr('style');
        }
        if (app.contentHeader !== undefined) {
            app.contentHeader.removeClass('no-transitions').css({
                'right': '',
                'padding-right': '',
                'width': ''
            });
        }
    }
};

app.setHtmlScroll = function () {
    if (app.fullscreen.hasClass('hidden') && app.loading.hasClass('hidden') && !app.htmlOverflowEnabled &&  (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && app.main.attr('data-aside') !== 'left' && app.main.attr('data-aside') !== 'right')) {
        app.enableHtmlScroll();
    } else if (app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.main.attr('data-aside') === 'left' || app.main.attr('data-aside') === 'right')) {
        app.disableHtmlScroll();
    }
};