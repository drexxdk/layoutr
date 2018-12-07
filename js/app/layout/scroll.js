{
    var scrollbarWidth = () => {
        layoutr.body.append('<div id="scrollbar-width"></div>');
        let element = layoutr.body.children('#scrollbar-width');
        element.css({
            'overflow': "scroll",
            'visibility': "hidden",
            'position': 'absolute',
            'width': '100px',
            'height': '100px'
        });
        layoutr.scrollbarWidth = element[0].offsetWidth - element[0].clientWidth;
        element.remove();
    };

    layoutr.disableScroll = () => {
        if (layoutr.htmlOverflowEnabled) {
            layoutr.htmlOverflowEnabled = false;
            if (layoutr.isModal()) {
                layoutr.checkModal();
                layoutr.modal.focus();
            }
            let scrollTop = layoutr.scrollTop();
            layoutr.html.addClass('scroll-disabled');
            layoutr.body.scrollTop(scrollTop);
            layoutr.main.scrollTop(scrollTop);
        }
    };

    layoutr.enableScroll = () => {
        if (!layoutr.htmlOverflowEnabled) {
            layoutr.htmlOverflowEnabled = true;
            if (layoutr.isSiteLoaded()) {
                let scrollTop = layoutr.scrollTop();
                layoutr.html.removeClass('scroll-disabled modal');
                layoutr.main.focus();
                layoutr.body.scrollTop(scrollTop); // edge, safari
                layoutr.html.scrollTop(scrollTop); // chrome, firefox, ie
            } else {
                layoutr.html.removeClass('scroll-disabled modal');
            }
        }
    };

    layoutr.setHtmlScroll = () => {
        if (!layoutr.isModal() && !layoutr.isLoading() && !layoutr.htmlOverflowEnabled && (!layoutr.isSmallBreakpoint() || layoutr.isSmallBreakpoint() && !layoutr.isAsideLeft() && !layoutr.isAsideRight())) {
            layoutr.enableScroll();
        } else if (layoutr.isModal() || layoutr.isSmallBreakpoint() && layoutr.htmlOverflowEnabled && (layoutr.isAsideLeft() || layoutr.isAsideRight())) {
            layoutr.disableScroll();
        }
    };

    $(() => {
        scrollbarWidth();
    });

    layoutr.setScrollTop = () => {
        let entry = {
            href: window.location.href,
            scrollTop: layoutr.scrollTop()
        };
        localStorage.setItem('scroll', JSON.stringify(entry));
    };

}