var app = app || {};

$(function () {
    app.left.find('> .content > div').load('ajax/layout/menu.html');

    app.left.on('click', '.tree a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var href = $this.attr('href');
        if (href === 'page1') {
            app.page1();
        } else if (href === 'page2') {
            app.page2();
        } else {
            app.content.load('ajax/content/' + href + '.html');
        }
    });
});