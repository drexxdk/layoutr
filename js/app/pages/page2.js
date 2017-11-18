var app = app || {};

app.page2 = function () {
    app.content.load('ajax/content/page2.html', function () {
        app.pageLoaded();
    });
};