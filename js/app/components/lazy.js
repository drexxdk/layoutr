(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.checkLazy = (elements) => {
        elements.lazy({
            afterLoad: (element) => {
                element.removeClass('lazy');
            }
        });
    };
}());