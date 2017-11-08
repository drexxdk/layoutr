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
        app.main.on('click', '.fullscreen', function () {
            app.fullscreen.img.css('max-height', window.innerHeight);
        });
    }
});