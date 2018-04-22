var app = app || {};

app.responsiveHeader = function () {
    $(function () {
        var h1 = app.header.find('h1');
        var link = h1.children('a');

        function check() {
            app.unauthenticated.addClass('text');
            var a = h1.outerWidth();
            var b = link.outerWidth();
            if (h1.outerWidth() < link.outerWidth()) {
                app.unauthenticated.removeClass('text');
            }
            app.unauthenticated.addClass('checked');
        }
        
        var awaitCSS = setInterval(function () {
            if (app.cssLoaded()) {
                clearInterval(awaitCSS);

                $(window).on('resize', function () {
                    check();
                });

                check();
            }
        }, app.cssInterval);
    });
};