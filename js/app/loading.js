var app = app || {};

app.disableHtmlScroll = function () {
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
    app.header.css({ 'padding-right': marginR });
    if (app.main.hasClass('right-open')) {
        app.right.css({
            'max-width': app.right.width() + marginR,
            'padding-right': marginR
        });
    }
    if (app.main.hasClass('footer-fixed')) {
        app.footer.css({ 'padding-right': marginR });
    }

    var popupsCenter = app.main.children('.popup[data-position*="center"]:visible');
    popupsCenter.each(function (index) {
        var $this = $(this);
        var total = parseInt($this.css('margin-left')) - marginR / 2 + 'px';
        $this.css('margin-left', total);
    });

    var popupsRight = app.main.children('.popup[data-position*="right"]:visible');
    popupsRight.each(function (index) {
        var $this = $(this);
        var total = parseInt($this.css('margin-right')) + marginR + 'px';
        $this.css('margin-right', total);
    });

    if (app.main.hasClass('two-columns') && app.contentHeader.length && app.contentHeader.css('position') === 'fixed') {
        var total = app.contentHeader.width() + -marginR / 2 + 'px';
        app.contentHeader.addClass('no-transitions').css('width', total);
    }

};

app.enableHtmlScroll = function () {
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
        app.contentHeader.removeClass('no-transitions').removeAttr('style');
    }
};

app.showLoading = function () {
    app.disableHtmlScroll();
    app.body.addClass('loading');
};

app.hideLoading = function () {
    app.enableHtmlScroll();
    app.body.removeClass('loading');
};

$(function () {
    app.body.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});