var app = app || {};

app.guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

app.isSmallBreakpoint = () => {
    return $(window).outerWidth() < 732 || app.isAsideLeft() && !app.isAsideLeftShrink() || app.isAsideRight() && !app.isAsideRightShrink();
};

app.isAside = () => {
    return app.html.attr('data-aside').length;
};

app.isAsideLeft = () => {
    return app.html.attr('data-aside') === 'left';
};

app.isAsideRight = () => {
    return app.html.attr('data-aside') === 'right';
};

app.isAsideLeftShrink = () => {
    return app.html.hasClass('left-shrink') && app.isAsideLeft();
};

app.isAsideRightShrink = () => {
    return app.html.hasClass('right-shrink') && app.isAsideRight();
};

app.isAsideLeftCloseOnClickOutside = () => {
    return app.html.hasClass('close-left-click-outside');
};
app.isAsideRightCloseOnClickOutside = () => {
    return app.html.hasClass('close-right-click-outside');
};

app.isModal = () => {
    return app.html.hasClass('modal');
};

app.isModalForm = () => {
    return app.html.attr('data-modal') === 'form';
};

app.isModalImage = () => {
    return app.html.attr('data-modal') === 'image';
};

app.isFocus = () => {
    return app.html.hasClass('focus') && app.html.attr('data-focus') === 'true';
}

app.isTTS = () => {
    return app.html.hasClass('tts');
}

app.isTTSEnabled = () => {
    return app.html.hasClass('tts') && app.html.attr('data-tts') === 'true';
}
app.isAuthentication = () => {
    return app.html.attr('data-authentication') !== '';
};

app.isLoading = () => {
    return app.html.hasClass('loading');
};

app.isScrollDisabled = () => {
    return app.html.hasClass('scroll-disabled');
};

app.isCloseLeftPageChange = () => {
    return app.html.hasClass('close-left-page-change');
};

app.isTransitions = () => {
    return app.html.hasClass('transitions');
};

app.isSwipe = () => {
    return app.html.hasClass('swipe');
};

app.isSiteLoaded = () => {
    return app.html.hasClass('site-loaded');
};

app.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

app.scrollTop = () => {
    return Math.max(app.body.scrollTop(), app.main.scrollTop(), app.html.scrollTop());
};

app.tryParseInt = (str, defaultValue) => {
    let retValue = defaultValue;
    if (str !== undefined && str !== null && str.length > 0 && !isNaN(str)) {
        retValue = parseInt(str);
    }
    return retValue;
};

app.tryParseFloat = (str, defaultValue) => {
    let retValue = defaultValue;
    if (str !== undefined && str !== null && str.length > 0 && !isNaN(str)) {
        retValue = parseFloat(str);
    }
    return retValue;
};

app.tryParseJSON = (str, defaultValue) => {
    let retValue = defaultValue;
    try {
        retValue = JSON.parse(str);
    } catch (e) {
    }
    return retValue;
};

app.isTrue = (str) => {
    return str === 'true';
};