var app = app || {};

app.responsiveHeader = function () {
    $(function () {
        var h1 = app.header.find('h1');
        var link = h1.children('a');

        function check() {
            app.unauthenticated.removeClass('icons');
            if (h1.outerWidth() < link.outerWidth()) {
                app.unauthenticated.addClass('icons');
            }
        }

        $(window).on('resize', function () {
            check();
        });
        check();

    });
};