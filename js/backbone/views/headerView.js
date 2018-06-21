define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['headerTemplate'],
        events: {
            'click .aside.left': 'toggleNavigation',
            'click .aside.right': 'toggleSettings'
        },
        toggleNavigation: function () {
            app.toggleAside('left');
        },
        toggleSettings: function () {
            app.toggleAside('right');
        }
    });
});