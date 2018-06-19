var app = app || {};

require(['/js/backbone/config.js'], function () {
    require(['backbone', 'marionette', 'router', 'views/shared/layoutView'],
        function (Backbone, Marionette, Router, LayoutView) {

            Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
                return Handlebars.compile(rawTemplate);
            };

            app.router = new Router();

            function start() {
                this.layout = new LayoutView();
                this.layout.render();

                Backbone.history.start({ pushState: true });
            }
            
            start();
        }
    );
});