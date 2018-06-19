requirejs.config({
    baseUrl: "/js/backbone",
    paths: {
        underscore: '../vendors/backbone/underscore',
        backbone: '../vendors/backbone/backbone',
        'backbone.radio': '../vendors/backbone/backbone.radio',
        marionette: '../vendors/backbone/backbone.marionette',
        templates: "/dist/js/templates",

    },
    shim: {
        marionette: {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },

        backbone: {
            deps: ['templates', "underscore"],
            exports: "Backbone"
        },

        handlebars: {
            deps: [],
            exports: "Handlebars"
        }
    }
});

define("jquery", [],
    function () {
        return window.$;
    }
);

//define("handlebars", [],
//    function () {
//        return Handlebars;
//    }
//);