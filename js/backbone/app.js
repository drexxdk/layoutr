require(['/js/backbone/config.js'], function () {
    require(['backbone', 'marionette', 'router', 'views/rootView'],
        function (Backbone, Marionette, Router, RootView) {
            const App = Marionette.Application.extend({
                region: '#root',
                onStart() {
                    const rootView = new RootView();
                    const router = new Router({ rootView: rootView });
                    this.showView(rootView);
                    Backbone.history.start();
                }
            });
            const app = new App();
            app.start();
        }
    );
});