var app = app || {};

app.enableSwipe = function () {
    let xDown = null,
        yDown = null,
        offsetBefore;

    function handleTouchStart(evt) {
        if (app.isSwipe()) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;

            offsetBefore = $(evt.target).offset().left;
        }
    };

    function handleTouchMove(evt) {
        if (app.isSwipe()) {
            let offsetAfter = $(evt.target).offset().left;
            if (!xDown || !yDown || offsetBefore !== offsetAfter) {
                return;
            }
            let xUp = evt.changedTouches[0].clientX,
                yUp = evt.changedTouches[0].clientY,
                xDiff = xDown - xUp,
                yDiff = yDown - yUp;
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                let distance = parseInt($(window).width() / 2);
                if (yDiff > -100 || yDiff < 100) {
                    let currentAside;
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