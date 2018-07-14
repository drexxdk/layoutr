var app = app || {};

WebFont.load({
    typekit: {
        id: ['bhz3dxx']
    },
    active: function () {
        app.fonts = true;
    },
    inactive: function () {
        app.fonts = true;
    }
});