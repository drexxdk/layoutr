var layoutr = layoutr || {};

require(['/js/backbone/config.js'], function () {
    require(['backbone', 'marionette', 'router', 'views/rootView'],
        function (Backbone, Marionette, Router, RootView) {
            const App = Marionette.Application.extend({
                region: '#root',
                onStart: function () {
                    layoutr.rootView = new RootView();
                    layoutr.router = new Router({ rootView: layoutr.rootView });
                    this.showView(layoutr.rootView);
                    Backbone.history.start();
                }
            });
            layoutr.app = new App();
            layoutr.app.start();
        }
    );
});