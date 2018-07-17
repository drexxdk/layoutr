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

                    let footer = $this.children('.swiper-footer'),
                        pagination = $this.hasClass('pagination'),
                        dynamicBullets = $this.hasClass('dynamic-bullets'),
                        navigation = $this.hasClass('navigation'),
                        spaceBetween = $this.hasClass('space-between') ? 32 : 0,
                        slidesPerView = app.tryParseInt($this.attr('data-slides-per-view'), 1);

                    if (pagination || dynamicBullets) {
                        footer.append('<div class="swiper-pagination"></div>');

                    }
                    if (navigation) {
                        footer.append('<button class="btn square circle prev"><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></button>');
                        footer.append('<button class="btn square circle next"><svg focusable="false"><use xlink:href="#svg-arrow"></use></svg></button>');
                    }

                    var swiper = new Swiper($this[0], {
                        spaceBetween: spaceBetween,
                        // Optional parameters
                        //direction: 'vertical',
                        loop: true,
                        slidesPerView: slidesPerView,

                        // If we need pagination
                        pagination: {
                            el: '.swiper-pagination',
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
                        on: {
                            init: () => {
                                $this.addClass('loaded');
                            },
                            slideChange: () => {
                                app.checkLazy($this.find('.lazy'));
                            },
                            paginationRender: (el) => {
                                if (navigation) {
                                    $(el).append(footer.children('.btn'))
                                }
                            }
                        }
                    });
                }
            });
        });
    }
};