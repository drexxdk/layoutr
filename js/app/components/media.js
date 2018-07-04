var app = app || {};

app.checkMedia = (media) => {
    if (media.length) {
        if (!app.html.hasClass('media-loaded')) {
            app.head.append($('<link rel="stylesheet" href="dist/css/plyr.min.css">'));
            app.html.addClass('media-loaded');
        }

        $.getScript('dist/js/plyr.min.js', () => {
            media.each(function (i, item) {
                new Plyr(item);
            });
        });
    }
};