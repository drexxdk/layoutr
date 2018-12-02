(function () {
    "use strict";

    layoutr.responsiveHeader = () => {
        let h1 = layoutr.header.find('h1'),
            link = h1.children('a');

        let check = () => {
            h1.addClass('show-title');
            layoutr.unauthenticated.addClass('show-text');
            if (h1.outerWidth() < link.outerWidth()) {
                layoutr.unauthenticated.removeClass('show-text');
                if (h1.outerWidth() < link.outerWidth()) {
                    h1.removeClass('show-title');
                }
            }
        }

        $(window).on('resize', () => {
            check();
        });

        check();

        layoutr.html.on('header-changed.responsiveHeader', () => {
            check();
        });
    };
}());