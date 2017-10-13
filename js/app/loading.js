var app = app || {};

app.showLoading = function () {
    app.disableHtmlScroll();
    app.body.addClass('loading');
};

app.hideLoading = function () {
    app.body.removeClass('loading');
    app.setHtmlScroll();
};

$(function () {
    app.body.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});