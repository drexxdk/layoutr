var app = app || {};

$(function () {
    app.showLoading = function () {
        app.disableScroll();
        app.html.addClass('loading');
    };

    app.hideLoading = function () {
        app.html.removeClass('loading');
        app.setHtmlScroll();
    };

    app.main.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});