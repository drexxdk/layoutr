var app = app || {};

define(['marionette', 'controller', 'backbone'],
    function (Marionette, Controller, Backbone) {
        return Marionette.AppRouter.extend({
            controller: Controller,
            appRoutes: {
                '': 'home',
                'page/:id': 'page',
                'page/:id/:id': 'page',
                'page/:id/:id/:id': 'page'
            },
            initialize: function () {
                this.controller = new Controller();
            }
        });
    }
);
