var app = app || {};

$(function () {
    var swipe = function () {

        var xDown = null;
        var yDown = null;

        var handleTouchStart = function (evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };

        var handleTouchMove = function (evt) {
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
                    var currentAside;
                    if (xDiff > distance) {
                        /* left swipe */
                        if (!app.html.hasClass('modal') && app.loading.hasClass('hidden')) {
                            currentAside = app.html.attr('data-aside');
                            if (currentAside === 'left' && currentAside !== 'right') {
                                app.toggleAside();
                            } else if (currentAside !== 'right') {
                                app.toggleAside('right');
                            }
                        }
                    } else if (xDiff < -distance) {
                        /* right swipe */
                        if (!app.html.hasClass('modal') && app.loading.hasClass('hidden')) {
                            currentAside = app.html.attr('data-aside');
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
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchMove, false);
    };
    
    if (app.html.hasClass('android')) {
        swipe();
        // android doesn't handle vh correctly, so it gets converted to px
        $(window).on('resize', function () {
            if (app.html.hasClass('modal') && app.html.attr('data-modal') === 'image') {
                app.modal.find('#modal-img').css('max-height', window.innerHeight);
            }
        });
    }
});