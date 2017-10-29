var app = app || {};

$(function () {
    app.main.on('click', '.fullscreen', function () {
        var $this = $(this);
        var newSrc = $this.attr('data-fullscreen-img');
        var newTitle = $this.attr('data-fullscreen-title');

        app.fullscreen.img.attr('src', newSrc);
        if (newTitle === undefined) {
            app.fullscreen.removeClass('has-info info-shown');
        } else {
            app.fullscreen.title.html(newTitle);
            app.fullscreen.addClass('has-info info-shown');
        }
        app.fullscreen.removeClass('hidden');
        app.setHtmlScroll();
    });

    app.main.on('click', '#fullscreen-toggle', function () {
        app.fullscreen.toggleClass('info-shown');
    });
});

$(window).click(function (e) {
    var target = $(e.target);

    if (target.closest('#fullscreen').length && !target.closest('#fullscreen-toggle').length) {
        app.fullscreen.addClass('hidden');
        app.setHtmlScroll();
    }
});