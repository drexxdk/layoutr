var app = app || {};

$(function () {
    app.showLoading = function () {
        app.disableScroll();
        app.loading.removeClass('hidden');
    };

    app.hideLoading = function () {
        app.loading.addClass('hidden');
        app.setHtmlScroll();
    };

    app.main.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});