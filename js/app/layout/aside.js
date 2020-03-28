{
    let transitionLock = false;

    layoutr.asideChanged = () => {
        if (layoutr.isTransitions()) {
            let awaitInterval = setInterval(() => {
                if (!transitionLock) {
                    clearInterval(awaitInterval);
                } else {
                    layoutr.html.trigger('aside-changed');
                }
            }, layoutr.awaitInterval);
            setTimeout(() => {
                transitionLock = false;
            }, layoutr.transitionTime);
        } else {
            transitionLock = false;
            layoutr.html.trigger('aside-changed');
        }
    };

    layoutr.toggleAside = (aside, pageChanged) => {
        if (!transitionLock) {
            transitionLock = true;
            layoutr.html.attr('data-authentication', '');
            let currentAside = layoutr.html.attr('data-aside');
            if (currentAside.length) {
                if (aside === undefined || currentAside === aside) {
                    let scrollTop = layoutr.scrollTop();
                    layoutr.html.attr('data-aside', '');
                    layoutr.main.focus();
                    layoutr.body.scrollTop(scrollTop); // edge, safari
                    layoutr.html.scrollTop(scrollTop); // chrome, firefox, ie
                } else {
                    layoutr.html.attr('data-aside', aside);
                }
            } else {
                layoutr.html.attr('data-aside', aside);
            }
            if (aside === 'left') {
                layoutr.left.focus();
            } else if (aside === 'right') {
                layoutr.right.focus();
            }

            layoutr.asideChanged();
            layoutr.setHtmlScroll();
        }
    };

    $(() => {
        layoutr.main.find('.aside.left').click(() => {
            layoutr.toggleAside('left');
        });

        layoutr.main.find('.aside.right').click(() => {
            layoutr.toggleAside('right');
        });
    });
}