(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.checkMedia = (media) => {
        if (media.length) {
            if (!layoutr.html.hasClass('media-loaded')) {
                layoutr.head.append($('<link rel="stylesheet" href="dist/css/plyr.css">'));
                layoutr.html.addClass('media-loaded');
            }

            $.getScript('dist/js/plyr.js', () => {
                media.each(function (i, item) {
                    new Plyr(item);
                });
            });
        }
    };
}());