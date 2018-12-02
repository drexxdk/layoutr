(function () {
    "use strict";

    layoutr.enableSwipe = () => {
        if (bowser.android) {
            let xDown = null,
                yDown = null,
                offsetBefore;

            let handleTouchStart = (e) => {
                if (layoutr.isSwipe()) {
                    xDown = e.touches[0].clientX;
                    yDown = e.touches[0].clientY;

                    offsetBefore = $(e.target).offset().left;
                }
            };

            let handleTouchMove = (e) => {
                if (layoutr.isSwipe()) {
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
                                if (!layoutr.isModal() && !layoutr.isLoading()) {
                                    currentAside = layoutr.html.attr('data-aside');
                                    if (currentAside === 'left' && currentAside !== 'right') {
                                        layoutr.toggleAside();
                                    } else if (currentAside !== 'right') {
                                        layoutr.toggleAside('right');
                                    }
                                }
                            } else if (xDiff < -distance) {
                                /* right swipe */
                                if (!layoutr.isModal() && !layoutr.isLoading()) {
                                    currentAside = layoutr.html.attr('data-aside');
                                    if (currentAside === 'right' && currentAside !== 'left') {
                                        layoutr.toggleAside();
                                    } else if (currentAside !== 'left') {
                                        layoutr.toggleAside('left');
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
}());