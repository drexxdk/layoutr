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