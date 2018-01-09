var app = app || {};

app.showLoading = function () {
    app.loadingCount++;
    app.disableScroll();
    app.html.addClass('loading');
};

app.hideLoading = function () {
    app.loadingCount--;
    if (app.loadingCount === 0) {
        app.html.removeClass('loading');
        app.setHtmlScroll();
    }
};

$(function () {
    app.main.on('click', '.toggle-loading', function () {
        app.showLoading();
        setTimeout(function () {
            app.hideLoading();
        }, 2000);
    });
});