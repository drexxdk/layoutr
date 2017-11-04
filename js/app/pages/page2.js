var app = app || {};

app.page2 = function () {
    app.content.load('ajax/content/page2.html', function () {
        app.toggleAside();
        app.contentHeader = app.content.children('.header');
        app.fireflies(app.contentHeader.find('canvas'), ['rgba(32,32,32,', 'rgba(128,128,128,']);
    });
};