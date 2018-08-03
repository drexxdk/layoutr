var app = app || {};

WebFont.load({
    typekit: {
        id: ['bhz3dxx']
    },
    active: function () {
        app.fontsLoaded = true;
    },
    inactive: function () {
        app.fontsLoaded = true;
    }
});
