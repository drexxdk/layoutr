var app = app || {};

app.enableSwipe = () => {
    if (bowser.android) {
        let xDown = null,
            yDown = null,
            offsetBefore;

        let handleTouchStart = (e) => {
            if (app.isSwipe()) {
                xDown = e.touches[0].clientX;
                yDown = e.touches[0].clientY;

                offsetBefore = $(e.target).offset().left;
            }
        };

        let handleTouchMove = (e) => {
            if (app.isSwipe()) {
                let offsetAfter = $(e.target).offset().left;
                if (!xDown || !yDown || offsetBefore !== offsetAfter) {
                    return;
                }
                let xUp = e.changedTouches[0].clientX,
                    yUp = e.changedTouches[0].clientY,
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
    }
};