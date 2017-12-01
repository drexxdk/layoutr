var app = app || {};

$(function () {
    if (app.html.hasClass('msie') || app.html.hasClass('msedge')) {
        // disable smooth scrolling, since it causes element jumping/lagging on scroll
        // https://stackoverflow.com/questions/29416448/how-to-disable-smooth-scrolling-in-ie11
        app.body.on("mousewheel", function (e) {
            var target = $(e.target);
            if (!app.isModal() && event.ctrlKey !== true) {
                var aside = target.closest('aside > .content') || target.parents('aside .content');
                e.preventDefault();
                var wheelDelta = e.originalEvent.wheelDelta;
                if (aside.length) {
                    var currentScrollPosition = aside.scrollTop();
                    aside.scrollTop(currentScrollPosition - wheelDelta);
                } else {
                    var currentScrollPosition = window.pageYOffset;
                    window.scrollTo(0, currentScrollPosition - wheelDelta);
                }
            }
        });

        // at some zoom levels edge/ie makes $(window) heigher than $(document)
        // it causes a gap between footer and the bottom of $(window).
        $(window).scroll(function () {
            var scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop + $(window).height() >= $(document).height()) {
                app.html.addClass('subpixel');
            } else {
                app.html.removeClass('subpixel');
            }
        });
    }
});