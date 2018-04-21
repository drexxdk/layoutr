var app = app || {};

app.guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732 || app.isAsideLeft() && !app.isAsideLeftShrink() || app.isAsideRight() && !app.isAsideRightShrink();
};

app.isAside = function () {
    return app.html.attr('data-aside').length;
};

app.isAsideLeft = function () {
    return app.html.attr('data-aside') === 'left';
};

app.isAsideRight = function () {
    return app.html.attr('data-aside') === 'right';
};

app.isAsideLeftShrink = function () {
    return app.html.hasClass('left-shrink') && app.isAsideLeft();
};

app.isAsideRightShrink = function () {
    return app.html.hasClass('right-shrink') && app.isAsideRight();
};

app.isAsideLeftCloseOnClickOutside = function () {
    return app.html.hasClass('close-left-click-outside');
};
app.isAsideRightCloseOnClickOutside = function () {
    return app.html.hasClass('close-right-click-outside');
};

app.isModal = function () {
    return app.html.hasClass('modal');
};

app.isModalForm = function () {
    return app.html.attr('data-modal') === 'form';
};

app.isModalImage = function () {
    return app.html.attr('data-modal') === 'image';
};

app.isAuthentication = function () {
    return app.html.attr('data-authentication') !== '';
};

app.isLoading = function () {
    return app.html.hasClass('loading');
};

app.isScrollDisabled = function () {
    return app.html.hasClass('scroll-disabled');
};

app.isCloseLeftPageChange = function () {
    return app.html.hasClass('close-left-page-change');
};

app.isTransitions = function () {
    return app.html.hasClass('transitions');
};

app.isAndroidSwipe = function () {
    return app.html.hasClass('android-swipe');
};

app.isSiteLoaded = function () {
    return app.html.hasClass('site-loaded');
};

app.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

app.scrollTop = function () {
    return Math.max(app.body.scrollTop(), app.main.scrollTop(), app.html.scrollTop());
};

app.tryParseInt = function (str, defaultValue) {
    var retValue = defaultValue;
    if (str !== undefined && str !== null && str.length > 0 && !isNaN(str)) {
        retValue = parseInt(str);
    }
    return retValue;
};

app.tryParseFloat = function (str, defaultValue) {
    var retValue = defaultValue;
    if (str !== undefined && str !== null && str.length > 0 && !isNaN(str)) {
        retValue = parseFloat(str);
    }
    return retValue;
};

app.cssLoaded = function() {
    return app.body.css('visibility') !== 'hidden';
}