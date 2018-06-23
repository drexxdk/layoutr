var app = app || {};

define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['pageTemplate'],
        onAttach() {
            app.pageLoaded(app.initial);
        }
    });
});