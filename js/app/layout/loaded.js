{
    layoutr.contentLoaded = (element) => {
        layoutr.checkResponsiveBackground(notLoaded('rb', element.find('.rb')));
        layoutr.checkLazy(notLoaded('lazy', element.find('.lazy')));
        layoutr.checkAccordion(notLoaded('accordion', element.find('.accordion')));
        layoutr.checkDropdown(notLoaded('dropdown', element.find('select.dropdown')));
        layoutr.checkTooltip(notLoaded('tooltip', element.find('.tooltip')));
        layoutr.checkAssignment(notLoaded('assignment', element.find('.assignment')));
        layoutr.checkMath(notLoaded('math', element.find('.math')));
        layoutr.checkMedia(notLoaded('media', element.find('audio, video')));
        layoutr.checkMap(notLoaded('map', element.find('.map')));
        layoutr.checkDatatable(notLoaded('dataTable', element.find('.dataTable')));
        layoutr.checkSwiper(notLoaded('swiper', element.find('.swiper')));
        layoutr.checkTabs(notLoaded('tabs', element.find('.tabs')));
        layoutr.checkRanges(notLoaded('range', element.find('.range')));
        layoutr.checkAudioVisualiser(notLoaded('audio-visualiser', element.find('.audio-visualiser')));
        layoutr.checkAppear(notLoaded('appear', element.find('.appear')));
        layoutr.checkRatings(notLoaded('ratings', element.find('.ratings')));
    };

    let notLoaded = (name, elements) => {
        elements = elements.filter((i, element) => {
            return !$(element).hasClass(name + '-loaded');
        });
        elements.addClass(name + '-loaded');
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