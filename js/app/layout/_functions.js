(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    layoutr.isSmallBreakpoint = () => {
        return $(window).outerWidth() < 732 || layoutr.isAsideLeft() && !layoutr.isAsideLeftShrink() || layoutr.isAsideRight() && !layoutr.isAsideRightShrink();
    };

    layoutr.isAside = () => {
        return layoutr.html.attr('data-aside').length;
    };

    layoutr.isAsideLeft = () => {
        return layoutr.html.attr('data-aside') === 'left';
    };

    layoutr.isAsideRight = () => {
        return layoutr.html.attr('data-aside') === 'right';
    };

    layoutr.isAsideLeftShrink = () => {
        return layoutr.html.hasClass('left-shrink') && layoutr.isAsideLeft();
    };

    layoutr.isAsideRightShrink = () => {
        return layoutr.html.hasClass('right-shrink') && layoutr.isAsideRight();
    };

    layoutr.isAsideLeftCloseOnClickOutside = () => {
        return layoutr.html.hasClass('close-left-click-outside');
    };
    layoutr.isAsideRightCloseOnClickOutside = () => {
        return layoutr.html.hasClass('close-right-click-outside');
    };

    layoutr.isModal = () => {
        return layoutr.html.hasClass('modal');
    };

    layoutr.isModalForm = () => {
        return layoutr.html.attr('data-modal') === 'form';
    };

    layoutr.isModalImage = () => {
        return layoutr.html.attr('data-modal') === 'image';
    };

    layoutr.isFocus = () => {
        return layoutr.html.hasClass('focus') && layoutr.html.attr('data-focus') === 'true';
    }

    layoutr.isTTS = () => {
        return layoutr.html.hasClass('tts');
    }

    layoutr.isTTSEnabled = () => {
        return layoutr.html.hasClass('tts') && layoutr.html.attr('data-tts') === 'true';
    }
    layoutr.isAuthentication = () => {
        return layoutr.html.attr('data-authentication') !== '';
    };

    layoutr.isLoading = () => {
        return layoutr.html.hasClass('loading');
    };

    layoutr.isScrollDisabled = () => {
        return layoutr.html.hasClass('scroll-disabled');
    };

    layoutr.isCloseLeftPageChange = () => {
        return layoutr.html.hasClass('close-left-page-change');
    };

    layoutr.isTransitions = () => {
        return layoutr.html.hasClass('transitions');
    };

    layoutr.isSwipe = () => {
        return layoutr.html.hasClass('swipe');
    };

    layoutr.isSiteLoaded = () => {
        return layoutr.html.hasClass('site-loaded');
    };

    layoutr.capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    layoutr.scrollTop = () => {
        return Math.max(layoutr.body.scrollTop(), layoutr.main.scrollTop(), layoutr.html.scrollTop());
    };

    layoutr.tryParseInt = (str, defaultValue) => {
        let retValue = defaultValue;
        if (str !== undefined && str !== null && str.length > 0 && !isNaN(str)) {
            retValue = parseInt(str);
        }
        return retValue;
    };

    layoutr.tryParseFloat = (str, defaultValue) => {
        let retValue = defaultValue;
        if (str !== undefined && str !== null && str.length > 0 && !isNaN(str)) {
            retValue = parseFloat(str);
        }
        return retValue;
    };

    layoutr.tryParseJSON = (str, defaultValue) => {
        let retValue = defaultValue;
        try {
            retValue = JSON.parse(str);
        } catch (e) {
        }
        return retValue;
    };

    layoutr.isTrue = (str) => {
        return str === 'true';
    };

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
}());