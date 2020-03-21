{
    layoutr.contentLoaded = (element) => {
        layoutr.checkResponsiveBackground(notLoaded(element.find('.rb')));
        layoutr.checkLazy(notLoaded(element.find('.lazy')));
        layoutr.checkAccordion(notLoaded(element.find('.accordion')));
        layoutr.checkDropdown(notLoaded(element.find('select.dropdown')));
        layoutr.checkTooltip(notLoaded(element.find('.tooltip')));
        layoutr.checkAssignment(notLoaded(element.find('.assignment')));
        layoutr.checkMath(notLoaded(element.find('.math')));
        layoutr.checkMedia(notLoaded(element.find('audio, video')));
        layoutr.checkMap(notLoaded(element.find('.map')));
        layoutr.checkDatatable(notLoaded(element.find('.dataTable')));
        layoutr.checkSwiper(notLoaded(element.find('.swiper')));
        layoutr.checkTabs(notLoaded(element.find('.tabs')));
        layoutr.checkRanges(notLoaded(element.find('.range')));
        layoutr.checkAudioVisualiser(notLoaded(element.find('.audio-visualiser')));
    };

    let notLoaded = (elements) => {
        elements = elements.filter((i, element) => {
            return !$(element).hasClass('loaded');
        });
        elements.addClass('loaded');
        return elements;
    };

    layoutr.pageLoaded = (initial) => {
        let promiseScrollTop = new Promise((resolve, reject) => {
            layoutr.main.css('overflow', 'auto');
            layoutr.main.scrollTop(0);
            layoutr.main.css('overflow', '');
            setTimeout(() => {
                layoutr.html.scrollTop(0);
                resolve();
            });
        }).then(() => {
            setTimeout(() => {
                if (!initial && layoutr.isCloseLeftPageChange()) {
                    layoutr.toggleAside(undefined, true);
                }
            }, 200);

            if (initial) {
                layoutr.promiseFont.then(() => {
                    layoutr.site.css('display', 'block');
                    layoutr.responsiveHeader();
                    layoutr.contentLoaded(layoutr.content);
                    let scroll = JSON.parse(localStorage.getItem("scroll"));
                    layoutr.enableScroll();
                    // promise version doesn't always scroll to correct position
                    $.Deferred((defer) => {
                        if (scroll !== null && window.location.href === scroll.href) {
                            let scrollTop = layoutr.body[0].scrollHeight >= scroll.scrollTop ? scroll.scrollTop : layoutr.body[0].scrollHeight;
                            $("html, body").animate({
                                scrollTop: scrollTop
                            }, 0, defer.resolve);
                        } else {
                            defer.resolve();
                        }
                    }).done(() => {
                        layoutr.hideLoading();
                        layoutr.html.addClass('site-loaded');
                        layoutr.site.removeAttr('style');
                        $(window).scroll($.throttle(layoutr.throttleInterval, false, () => {
                            layoutr.setScrollTop();
                        }));

                        $(window).resize($.throttle(layoutr.throttleInterval, false, () => {
                            layoutr.checkModal();
                            layoutr.setHtmlScroll();
                            layoutr.setScrollTop();
                        }));
                    });
                });
            } else {
                layoutr.hideLoading();
                layoutr.contentLoaded(layoutr.content);
            }
        });
    };
}