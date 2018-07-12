var app = app || {};

app.responsiveHeader = () => {
    let h1 = app.header.find('h1'),
        link = h1.children('a');

    let check = () => {
        app.unauthenticated.addClass('text');
        if (h1.outerWidth() < link.outerWidth()) {
            app.unauthenticated.removeClass('text');
        }
        app.unauthenticated.addClass('checked');
    }

    $(window).on('resize', () => {
        check();
    });

    check();

    app.html.on('header-changed.responsiveHeader', () => {
        check();
    });
};