var layoutr = layoutr || {};

require(['/js/backbone/config.js'], function () {
    require(['backbone', 'marionette', 'router', 'views/layout/rootView', 'helpers'],
        function (Backbone, Marionette, Router, RootView, Helpers) {
            const App = Marionette.Application.extend({
                region: '#root',
                onStart: function () {
                    layoutr.rootView = new RootView();
                    layoutr.router = new Router({ rootView: layoutr.rootView });
                    this.showView(layoutr.rootView);
                    Backbone.history.start({ pushState: true });
                }
            });
            layoutr.app = new App();
            layoutr.app.start();
        }
    );
});