var app = app || {};

(function (l) {
    if (l.search) {
        app.url = {};
        l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
            app.url[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (app.url.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + app.url.p +
                (app.url.q ? '?' + app.url.q : '') +
                l.hash
            );
        }
    }
}(window.location));

define(['marionette', 'controller', 'backbone'],
    function (Marionette, Controller, Backbone) {
        return Marionette.AppRouter.extend({
            controller: Controller,
            appRoutes: {
                '': 'page',
                'page/:id': 'page',
                'assignment/:id': 'page',
                'component/:id': 'page',
                'input/:id': 'page'
            },
            initialize: function (options) {
                this.controller = new Controller(options);
            }
        });
    }
);
