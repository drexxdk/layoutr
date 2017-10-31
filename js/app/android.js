var app = app || {};

$(function () {
    if (app.html.hasClass('android')) {

        var setTouchAndSwipe = function (element, scrollElement = element, scrollTopElement = element) {
            element.css("touch-action", "pan-down");
            scrollElement.scroll(function () {
                // this disables page refresh when swiping down
                if (scrollTopElement.scrollTop() > 0) {
                    element.css("touch-action", "auto");
                } else {
                    element.css("touch-action", "pan-down");
                }
            });
            //element.on('touchstart touchend click', '.hack', function (e) {
            //    // this disables click after swiping
            //    // might be caused by ghostlab
            //    e.preventDefault();
            //});
        }

        // android doesn't handle vh correctly, so it gets converted to px
        // might be a problem for ios also, but haven't tested it there yet
        app.fullscreen.img.css('max-height', window.innerHeight);
        $(window).on('resize', function () {
            if (!app.fullscreen.hasClass('hidden')) {
                app.fullscreen.img.css('max-height', window.innerHeight);
            }
        });

        setTouchAndSwipe(app.body, $(window), $(document));
        setTouchAndSwipe(app.left.children('.content'));
        setTouchAndSwipe(app.right.children('.content'));
    }
});