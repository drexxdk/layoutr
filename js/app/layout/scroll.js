var app = app || {};

var scrollbarWidth = function () {
    app.body.append('<div id="scrollbar-width"></div>');
    var element = app.body.children('#scrollbar-width');
    element.css({
        'overflow': "scroll",
        'visibility': "hidden",
        'position': 'absolute',
        'width': '100px',
        'height': '100px'
    });
    app.scrollbarWidth = element[0].offsetWidth - element[0].clientWidth;
    element.remove();
};

app.disableScroll = function () {
    if (app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = false;
        if (app.isModal()) {
            app.checkModal();
            app.modal.focus();
        }
        var scrollTop = app.scrollTop()
        app.html.addClass('scroll-disabled');
        app.body.scrollTop(scrollTop);
        app.main.scrollTop(scrollTop);
    }
};

app.enableScroll = function () {
    if (!app.htmlOverflowEnabled) {
        app.htmlOverflowEnabled = true;
        var scrollTop = app.scrollTop();
        app.html.removeClass('scroll-disabled modal');
        app.main.focus();
        app.body.scrollTop(scrollTop); // edge, safari
        app.html.scrollTop(scrollTop); // chrome, firefox, ie
    }
};

app.setHtmlScroll = function () {
    if (!app.isModal() && !app.isLoading() && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && !app.isAsideLeft() && !app.isAsideRight())) {
        app.enableScroll();
    } else if (app.isModal() || app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.isAsideLeft() || app.isAsideRight())) {
        app.disableScroll();
    }
};

$(window).resize(function () {
    app.checkModal();
    app.setHtmlScroll();
    scrollbarWidth();
});

$(function () {
    scrollbarWidth();
});