var app = app || {};

app.showLoading = () => {
    app.loadingCount++;
    app.disableScroll();
    app.html.addClass('loading');
};

app.hideLoading = () => {
    app.loadingCount--;
    if (app.loadingCount <= 0) {
        app.loadingCount = 0;
        app.html.removeClass('loading');
        app.setHtmlScroll();
    }
};