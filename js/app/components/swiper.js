var app = app || {};

app.checkSwiper = (swiper) => {
    if (swiper.length) {
        if (!app.html.hasClass('swiper-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/swiper.min.css">'));
            app.html.addClass('swiper-loaded');
        }

        $.getScript('dist/js/swiper.js', () => {
            swiper.each((i, e) => {

                let $this = $(e);
                if (!$this.hasClass('loaded')) {
                    $this.append('<div class="swiper-footer"></div>');
                    $this.children('.swiper-footer').append('<div></div>')

                    let footer = $this.find('> .swiper-footer > div'),
                        pagination = $this.hasClass('pagination'),
                        dynamicBullets = $this.hasClass('dynamic-bullets'),
                        navigation = $this.hasClass('navigation'),
                        loop = app.isTrue($this.attr('data-loop')),
                        spaceBetween = $this.hasClass('space-between'),
                        slidesPerView = app.tryParseInt($this.attr('data-slides-per-view'), 1),
                        breakpoints = app.tryParseJSON($this.attr('data-breakpoints'), {});

                    footer.addClass('flex column wrap space-3 center');

                    if (pagination || dynamicBullets) {
                        footer.append('<div class="swiper-pagination"><div class="flex column wrap space-1 center"></div></div>');
                    }

                    if (navigation) {
                        footer.append('<button class="btn square circle prev theme-dark"><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></button>');
                        footer.append('<button class="btn square circle next theme-dark"><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></button>');
                    }

                    if (spaceBetween) {
                        spaceBetween = 16;
                    }

                    var swiper = new Swiper($this[0], {
                        loop: loop,
                        slidesPerView: slidesPerView,
                        spaceBetween: spaceBetween,

                        // If we need pagination
                        pagination: {
                            el: '.swiper-pagination > div',
                            dynamicBullets: dynamicBullets
                        },

                        // Navigation arrows
                        navigation: {
                            nextEl: '.swiper-footer .next',
                            prevEl: '.swiper-footer .prev',
                        },

                        // And if we need scrollbar
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                        breakpoints: breakpoints,
                        on: {
                            init: () => {
                                $this.addClass('loaded');
                            },
                            slideChange: () => {
                                app.checkLazy($this.find('.lazy'));
                            },
                            paginationRender: (el) => {
                                //if (navigation) {
                                //    $(el).append(footer.children('.btn'))
                                //}
                            }
                        }
                    });
                }
            });
        });
    }
};