var app = app || {};

var scrollbarWidth = () => {
    app.body.insertAdjacentHTML('beforeend', '<div id="scrollbar-width"></div>');
    let element = app.body.querySelector('#scrollbar-width');
    element.style.overflow = 'scroll';
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    element.style.width = '100px';
    element.style.height = '100px';
    app.scrollbarWidth = element.offsetWidth - element.clientWidth;
    element.remove();
};

app.disableScroll = () => {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        if (app.isModal()) {
            app.checkModal();
            app.modal.focus();
        }
        let scrollTop = app.scrollTop();
        app.html.addClass('scroll-disabled');
        app.body.scrollTop(scrollTop);
        app.main.scrollTop(scrollTop);
    }
};

app.enableScroll = () => {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        if (app.isSiteLoaded()) {
            let scrollTop = app.scrollTop();
            app.html.removeClass('scroll-disabled modal');
            app.main.focus();
            app.body.scrollTop(scrollTop); // edge, safari
            app.html.scrollTop(scrollTop); // chrome, firefox, ie
        } else {
            app.html.removeClass('scroll-disabled modal');
        }
    }
};

app.setHtmlScroll = () => {
    if (!app.isModal() && !app.isLoading() && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && !app.isAsideLeft() && !app.isAsideRight())) {
        app.enableScroll();
    } else if (app.isModal() || app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.isAsideLeft() || app.isAsideRight())) {
        app.disableScroll();
    }
};

$(() => {
    scrollbarWidth();
});

$(window).resize($.throttle(app.throttleInterval, false, () => {
    app.checkModal();
    app.setHtmlScroll();
    scrollbarWidth();
    setScrollTop();
}));

var setScrollTop = () => {
    let scrollTop = app.scrollTop();

    let entry = {
        href: window.location.href,
        scrollTop: scrollTop
    };

    localStorage.setItem('scroll', JSON.stringify(entry));
};

$(window).scroll($.throttle(app.throttleInterval, false, () => {
    setScrollTop();
}));