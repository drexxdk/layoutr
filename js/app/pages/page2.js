var app = app || {};

app.page2 = function () {
    app.content.load('ajax/content/page2.html', function () {
        setTimeout(function () {
            app.toggleAside();
        }, 200);
        app.contentHeader = app.content.children('.header');
    });
};