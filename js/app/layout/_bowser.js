var app = app || {};

$(() => {
    if (bowser.msedge) {
        app.html.classList.add('msedge'); // used by app.enableScroll()
    } else if (bowser.msie) {
        app.html.classList.add('msie'); // not currently used for anything
    }
    if (bowser.mobile) {
        app.html.classList.add('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.html.classList.add('tablet'); // does nothing currently
    } else {
        app.html.classList.add('desktop'); // enables hover effects
    }

    if (bowser.android) {
        app.html.classList.add('android'); // used by modal
    } else if (bowser.ios) {
        app.html.classList.add('ios'); // used to apply focus
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
                app.html.classList.add('subpixel');
            } else {
                app.html.classList.remove('subpixel');
            }
        });
    }
});