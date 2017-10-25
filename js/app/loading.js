var app = app || {};

app.showLoading = function () {
    app.disableHtmlScroll();
    app.loading.removeClass('hidden');
};

app.hideLoading = function () {
    app.loading.addClass('hidden');
    app.setHtmlScroll();
};

$(function () {
    app.main.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});