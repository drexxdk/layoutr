var app = app || {};

$(function () {
    if (app.html.hasClass('android')) {
        
        var pageYOffset;
        var lastTouchY = 0;
        var touchstartHandler = function (e) {
            if (e.touches.length != 1) return;
            lastTouchY = e.touches[0].clientY;
            // Pull-to-refresh will only trigger if the scroll begins when the
            // document's Y offset is zero.
            pageYOffset = window.pageYOffset == 0;
        }

        var touchmoveHandler = function (e) {
            var touchY = e.touches[0].clientY;
            var touchYDelta = touchY - lastTouchY;
            lastTouchY = touchY;
            if (pageYOffset) {
                // To suppress pull-to-refresh it is sufficient to preventDefault the
                // first overscrolling touchmove.
                pageYOffset = false;
                if (touchYDelta > 0) {
                    e.preventDefault();
                    return;
                }
            }
        }

        document.addEventListener('touchstart', touchstartHandler, { passive: false });
        document.addEventListener('touchmove', touchmoveHandler, { passive: false });
        
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