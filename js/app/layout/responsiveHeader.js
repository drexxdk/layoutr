var app = app || {};

app.responsiveHeader = () => {
    let h1 = app.header.find('h1'),
        link = h1.children('a');

    let check = () => {
        app.unauthenticated.addClass('text');
        let a = h1.outerWidth(),
            b = link.outerWidth();
        if (h1.outerWidth() < link.outerWidth()) {
            app.unauthenticated.removeClass('text');
        }
        app.unauthenticated.addClass('checked');
    }

    let awaitCSS = setInterval(() => {
        if (app.cssLoaded()) {
            clearInterval(awaitCSS);

            $(window).on('resize', () => {
                check();
            });

            check();
        }
    }, app.cssInterval);

    app.html.on('header-changed.responsiveHeader', () => {
        app.html.trigger('aside-changed.datatables');
        app.html.trigger('aside-changed.rb');
    });
};