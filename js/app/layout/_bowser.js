{
    $(() => {
        if (bowser.msedge) {
            layoutr.html.addClass('msedge'); // used by layoutr.enableScroll()
        }
        if (bowser.mobile) {
            layoutr.html.addClass('mobile'); // disables fixed footer
        } else if (bowser.tablet) {
            layoutr.html.addClass('tablet'); // does nothing currently
        } else {
            layoutr.html.addClass('desktop'); // enables hover effects
        }

        if (bowser.android) {
            layoutr.html.addClass('android'); // used by modal
        } else if (bowser.ios) {
            layoutr.html.addClass('ios'); // used to apply focus
        }

        if (bowser.msedge) {
            // disable smooth scrolling, since it causes element jumping/lagging on scroll
            // https://stackoverflow.com/questions/29416448/how-to-disable-smooth-scrolling-in-ie11
            layoutr.body.on("mousewheel", (e) => {
                let target = $(e.target);
                if (!layoutr.isModal() && event.ctrlKey !== true) {
                    e.preventDefault();
                    let aside = target.closest('aside > .content') || target.parents('aside .content'),
                        wheelDelta = e.originalEvent.wheelDelta,
                        currentScrollPosition;
                    if (aside.length) {
                        currentScrollPosition = aside.scrollTop();
                        aside.scrollTop(currentScrollPosition - wheelDelta);
                    } else {
                        currentScrollPosition = window.pageYOffset;
                        window.scrollTo(0, currentScrollPosition - wheelDelta);
                    }
                }
            });

            // at some zoom levels edge/ie makes $(window) heigher than $(document)
            // it causes a gap between footer and the bottom of $(window).
            $(window).scroll(() => {
                let scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop + $(window).height() >= $(document).height()) {
                    layoutr.html.addClass('subpixel');
                } else {
                    layoutr.html.removeClass('subpixel');
                }
            });
        }
    });
}