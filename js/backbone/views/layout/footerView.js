define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['layout/footerTemplate'],
        modelEvents: {
            'change': 'render'
        }
    });
});