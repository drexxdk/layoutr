(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    WebFont.load({
        typekit: {
            id: ['bhz3dxx']
        },
        active: function () {
            layoutr.fontsLoaded = true;
        },
        inactive: function () {
            layoutr.fontsLoaded = true;
        }
    });
}());