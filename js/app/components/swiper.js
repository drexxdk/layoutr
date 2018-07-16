var app = app || {};

app.checkSwiper = (swiper) => {
    if (swiper.length) {
        if (!app.html.hasClass('swiper-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/swiper.min.css">'));
            app.html.addClass('swiper-loaded');
        }

        $.getScript('dist/js/swiper.js', () => {
            swiper.each((i, e) => {
                let $this = $(e),
                    pagination = $this.hasClass('pagination'),
                    dynamicBullets = $this.hasClass('dynamic-bullets'),
                    navigation = $this.hasClass('navigation'),
                    spaceBetween = $this.hasClass('space-between') ? 32 : 0,
                    slidesPerView = app.tryParseInt($this.attr('data-slides-per-view'), 1);

                if (pagination || dynamicBullets) {
                    $this.append('<div class="swiper-pagination"></div>');

                }
                if (navigation) {
                    $this.append('<div class="swiper-button-prev"></div>');
                    $this.append('<div class="swiper-button-next"></div>');
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
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
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
                        }
                    }
                });
            });
        });
    }
};