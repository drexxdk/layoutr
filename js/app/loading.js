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
};

app.enableHtmlScroll = function () {
    app.html.css('overflow', app.html.data('previous-overflow'));
    var scrollPosition = app.html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    app.body.removeAttr('style');
    app.header.removeAttr('style');
    app.right.removeAttr('style');
    app.footer.removeAttr('style');
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
    app.body.on('click', '#toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});