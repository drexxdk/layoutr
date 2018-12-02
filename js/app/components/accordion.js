(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.checkAccordion = (elements) => {
        elements.on("click", ".headline", (e) => {
            let content = $(e.currentTarget).next();
            if (content.hasClass('open')) {
                content
                    .removeClass('open')
                    .slideUp("800");
            } else {
                content
                    .addClass("open")
                    .slideToggle("800")
                    .parents('.accordion').find(".content.open").not(content).removeClass('open').slideUp("800");
            }
        });
    };
}());