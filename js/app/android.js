var app = app || {};

$(function () {
    if (app.html.hasClass('android')) {
        // android doesn't handle vh correctly, so it gets converted to px
        // might be a problem for ios also, but haven't tested it there yet
        app.fullscreen.img.css('max-height', window.innerHeight);
        $(window).on('resize', function () {
            if (!app.fullscreen.hasClass('hidden')) {
                app.fullscreen.img.css('max-height', window.innerHeight);
            }
        });
        
        app.body.css("touch-action", "pan-down");
        $(window).scroll(function () {
            if ($(document).scrollTop() > 0) {
                app.body.css("touch-action", "auto");
            } else {
                app.body.css("touch-action", "pan-down");
            }
        });

        var aside = $(app.left, app.right).children('.content');
        aside.css("touch-action", "pan-down");
        aside.scroll(function () {
            if (aside.scrollTop() > 0) {
                aside.css("touch-action", "auto");
            } else {
                aside.css("touch-action", "pan-down");
            }
        });
    }
});