{
    layoutr.checkSwiper = (swiper) => {
        if (swiper.length) {
            if (!layoutr.html.hasClass('swiper-loaded')) {
                layoutr.showLoading();
                layoutr.promiseSwiper = Promise.all([
                    layoutr.load.css(layoutr.host + layoutr.cssDist + 'swiper.css'),
                    layoutr.load.js(layoutr.host + layoutr.jsDist + 'swiper.js')
                ]).finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('swiper-loaded');
            }

            layoutr.promiseSwiper.then(() => {
                swiper.each((i, e) => {
                    let $this = $(e);
                    $this.append('<div class="swiper-footer"></div>');
                    $this.children('.swiper-footer').append('<div></div>');

                    let footer = $this.find('> .swiper-footer > div'),
                        pagination = $this.hasClass('pagination'),
                        dynamicBullets = $this.hasClass('dynamic-bullets'),
                        navigation = $this.hasClass('navigation'),
                        loop = layoutr.isTrue($this.attr('data-loop')),
                        spaceBetween = $this.hasClass('space-between'),
                        slidesPerView = layoutr.tryParseInt($this.attr('data-slides-per-view'), 1),
                        breakpoints = layoutr.tryParseJSON($this.attr('data-breakpoints'), {});

                    footer.addClass('flex wrap gap-3 center');

                    if (pagination || dynamicBullets) {
                        footer.append('<div class="swiper-pagination flex wrap gap-1 center vertical-center"></div>');
                    }
                    if (navigation) {
                        footer.append('<button class="btn square circle prev theme-dark"><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></button>');
                        footer.append('<button class="btn square circle next theme-dark"><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></button>');
                    }

                    if (spaceBetween) {
                        spaceBetween = 16;
                    }

                    let swiper = new Swiper($this[0], {
                        loop: loop,
                        slidesPerView: slidesPerView,
                        spaceBetween: spaceBetween,

                        // If we need pagination
                        pagination: {
                            el: '.swiper-pagination',
                            dynamicBullets: dynamicBullets
                        },

                        // Navigation arrows
                        navigation: {
                            nextEl: '.swiper-footer .next',
                            prevEl: '.swiper-footer .prev'
                        },

                        // And if we need scrollbar
                        scrollbar: {
                            el: '.swiper-scrollbar'
                        },
                        breakpoints: breakpoints,
                        on: {
                            init: () => {
                                $this.addClass('loaded');
                            },
                            slideChange: () => {
                                layoutr.checkLazy($this.find('.lazy'));
                            }
                        }
                    });
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load swiper', 'danger');
                console.error(e);
            });
        }
    };
}