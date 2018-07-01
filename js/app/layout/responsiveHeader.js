var app = app || {};

app.responsiveHeader = function () {
    let h1 = app.header.find('h1'),
        link = h1.children('a');

    function check() {
        app.unauthenticated.addClass('text');
        let a = h1.outerWidth(),
            b = link.outerWidth();
        if (h1.outerWidth() < link.outerWidth()) {
            app.unauthenticated.removeClass('text');
        }
        app.unauthenticated.addClass('checked');
    }
        
    function awaitCSS() {
        setInterval(function () {
            if (app.cssLoaded()) {
                clearInterval(awaitCSS);

                $(window).on('resize', function () {
                    check();
                });

                check();
            }
        }, app.cssInterval);
    }
    awaitCSS();
};