var app = app || {};

$(function () {
    app.main.on('click', '.fullscreen', function () {
        var $this = $(this);
        var newSrc = $this.attr('data-img');
        if (app.fullscreen.img === undefined) {
            app.fullscreen.append('<div><img src="' + newSrc + '" alt="" /></div>');
            app.fullscreen.img = app.fullscreen.children();
        } else if (app.fullscreen.img.attr('src') !== newSrc) {
            app.fullscreen.img.attr('src', newSrc);
        }
        app.fullscreen.removeClass('hidden');
        app.setHtmlScroll();
    });
});

$(window).click(function (e) {
    var target = $(e.target);

    if (target.closest('#fullscreen').length) {
        app.fullscreen.addClass('hidden');
        app.setHtmlScroll();
    }
});