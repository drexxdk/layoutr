var app = app || {};

define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['pageTemplate'],
        onRender() {
            app.pageLoaded(app.initial);
        }
    });
});