var app = app || {};

$(() => {
    if (bowser.msedge) {
        app.html.addClass('msedge'); // used by app.enableScroll()
    } else if (bowser.msie) {
        app.html.addClass('msie'); // not currently used for anything
    }
    if (bowser.mobile) {
        app.html.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.html.addClass('tablet'); // does nothing currently
    } else {
        app.html.addClass('desktop'); // enables hover effects
    }

    if (bowser.android) {
        app.html.addClass('android'); // used by modal
    } else if (bowser.ios) {
        app.html.addClass('ios'); // used to apply focus
    }

    if (bowser.msie || bowser.msedge) {
        // disable smooth scrolling, since it causes element jumping/lagging on scroll
        // https://stackoverflow.com/questions/29416448/how-to-disable-smooth-scrolling-in-ie11
        app.body.on("mousewheel", (e) => {
            let target = $(e.target);
            if (!app.isModal() && event.ctrlKey !== true) {
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
                app.html.addClass('subpixel');
            } else {
                app.html.removeClass('subpixel');
            }
        });
    }
});