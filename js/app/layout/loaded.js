{
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
        layoutr.checkTabs(element.find('.tabs'));
        layoutr.checkSlider(element.find('.slider'));
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
                    $('#site').css('display', 'block');
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