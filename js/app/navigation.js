var app = app || {};

$(function () {
    app.left.find('> .content > div').load('ajax/layout/menu.html');

    if (app.q && app.q.p) {
        debugger;
    }
    app.pageHome();

    app.left.on('click', '.tree a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var href = $this.attr('href');
        if (href === '/') {
            app.pageHome();
        } else if (href === 'page2') {
            app.page2();
        } else if (href === 'page3') {
            app.page3();
        } else {
            app.content.load('ajax/content/' + href + '.html');
        }
        
        window.history.replaceState(null, null,
            '/' + href.replace(/^\/+/g, '')
        );
    });
});