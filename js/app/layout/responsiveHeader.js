var app = app || {};

app.responsiveHeader = () => {
    let h1 = app.header.find('h1'),
        link = h1.children('a');

    let check = () => {
        h1.addClass('show-title');
        app.unauthenticated.addClass('show-text');
        if (h1.outerWidth() < link.outerWidth()) {
            app.unauthenticated.removeClass('show-text');
            if (h1.outerWidth() < link.outerWidth()) {
                h1.removeClass('show-title');
            }
        }
    }

    $(window).on('resize', () => {
        check();
    });

    check();

    app.html.on('header-changed.responsiveHeader', () => {
        check();
    });
};