var app = app || {};

app.pageCover = function () {
    app.content.load('ajax/content/cover.html', function () {
        app.pageLoaded();
    });
};