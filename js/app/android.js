var app = app || {};

$(function () {
    var swipe = function () {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }
            var xUp = evt.changedTouches[0].clientX;
            var yUp = evt.changedTouches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                var distance = parseInt($(window).width() / 2);
                if (yDiff > -100 || yDiff < 100) {
                    if (xDiff > distance) {
                        /* left swipe */
                        if (app.fullscreen.hasClass('hidden') && app.loading.hasClass('hidden')) {
                            var currentAside = app.html.attr('data-aside');
                            if (currentAside === 'left' && currentAside !== 'right') {
                                app.toggleAside();
                            } else if (currentAside !== 'right') {
                                app.toggleAside('right');
                            }
                        }
                    } else if (xDiff < (-distance)) {
                        /* right swipe */
                        if (app.fullscreen.hasClass('hidden') && app.loading.hasClass('hidden')) {
                            var currentAside = app.html.attr('data-aside');
                            if (currentAside === 'right' && currentAside !== 'left') {
                                app.toggleAside();
                            } else if (currentAside !== 'left') {
                                app.toggleAside('left');
                            }
                        }
                    }
                }
                
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };
    }


    if (app.html.hasClass('android')) {
        swipe();
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