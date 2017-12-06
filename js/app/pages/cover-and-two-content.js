var app = app || {};

app.pageCoverAndTwoContent = function () {
    app.content.load('ajax/content/cover-and-two-content.html', function () {
        app.pageLoaded();
    });
};