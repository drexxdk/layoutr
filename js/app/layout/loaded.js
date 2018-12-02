(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.contentLoaded = (element) => {
        layoutr.checkResponsiveBackground(element.find('.rb'));
        layoutr.checkLazy(element.find('.lazy'));
        layoutr.checkAccordion(element.find('.accordion'));
        layoutr.checkDropdown(element.find('select.dropdown'));
        layoutr.checkTooltip(element.find('.tooltip'));
        layoutr.checkAssignment(element.find('.assignment'));
        layoutr.checkMath(element.find('.math'));
        layoutr.checkMedia(element.find('audio, video'));
        layoutr.checkMap(element.find('.map'));
        layoutr.checkDatatable(element.find('.dataTable'));
        layoutr.checkSwiper(element.find('.swiper'));
    }

    layoutr.pageLoaded = (initial) => {
        layoutr.main.css('overflow', 'auto');
        layoutr.main.scrollTop(0);
        layoutr.main.css('overflow', '');
        layoutr.html.animate({ scrollTop: 0 }, 0);
        setTimeout(() => {
            if (!initial && layoutr.isCloseLeftPageChange()) {
                layoutr.toggleAside(undefined, true);
            }
        }, 200);

        if (initial) {
            let awaitInterval = setInterval(() => {
                if (layoutr.fontsLoaded) {
                    clearInterval(awaitInterval);
                    layoutr.hideLoading();
                    layoutr.html.addClass('site-loaded');
                    layoutr.responsiveHeader();
                    layoutr.contentLoaded(layoutr.content);

                    let scroll = JSON.parse(localStorage.getItem("scroll"));

                    if (scroll !== null && window.location.href === scroll.href) {
                        layoutr.body.scrollTop(layoutr.body[0].scrollHeight >= scroll.scrollTop ? scroll.scrollTop : layoutr.body[0].scrollHeight); // edge, safari
                        layoutr.html.scrollTop(layoutr.html[0].scrollHeight >= scroll.scrollTop ? scroll.scrollTop : layoutr.html[0].scrollHeight); // chrome, firefox, ie
                    }
                }
            }, layoutr.awaitInterval);
        } else {
            layoutr.hideLoading();
            layoutr.contentLoaded(layoutr.content);
        }
    };
}());