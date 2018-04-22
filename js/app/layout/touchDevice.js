var app = app || {};

var swipe = function () {
    var xDown = null,
        yDown = null,
        offsetBefore;

    var handleTouchStart = function (evt) {
        if (app.isAndroidSwipe()) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;

            offsetBefore = $(evt.target).offset().left;
        }
    };

    var handleTouchMove = function (evt) {
        if (app.isAndroidSwipe()) {
            var offsetAfter = $(evt.target).offset().left;
            if (!xDown || !yDown || offsetBefore !== offsetAfter) {
                return;
            }
            var xUp = evt.changedTouches[0].clientX,
                yUp = evt.changedTouches[0].clientY,
                xDiff = xDown - xUp,
                yDiff = yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                var distance = parseInt($(window).width() / 2);
                if (yDiff > -100 || yDiff < 100) {
                    var currentAside;
                    if (xDiff > distance) {
                        /* left swipe */
                        if (!app.isModal() && !app.isLoading()) {
                            currentAside = app.html.attr('data-aside');
                            if (currentAside === 'left' && currentAside !== 'right') {
                                app.toggleAside();
                            } else if (currentAside !== 'right') {
                                app.toggleAside('right');
                            }
                        }
                    } else if (xDiff < -distance) {
                        /* right swipe */
                        if (!app.isModal() && !app.isLoading()) {
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
        }
    };
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchMove, false);
};

$(function () {
    if (bowser.android) {
        swipe();
        // android doesn't handle vh correctly, so it gets converted to px
        $(window).resize(function () {
            if (app.isModal() && app.isModalImage()) {
                app.modal.find('#modal-img').css('max-height', window.innerHeight);
            }
            setTimeout(function () {
                var top = app.header.offset().top;
                if (top > 0) {
                    app.header.css('margin-top', -top);
                } else {
                    app.header.css('margin-top', '');
                }
            }, 500);
        });
    }
});