var app = app || {};

$(function () {
    app.main.on('click', '.fullscreen', function () {
        var $this = $(this);
        var newSrc = $this.attr('data-fullscreen-img');
        var newTitle = $this.attr('data-fullscreen-title');
        if (app.fullscreen.img === undefined) {
            // open for the first time
            app.fullscreen.append('<div>' + (newTitle !== undefined ? '<div class="title">' + newTitle + '</div>' : '<div class="title"></div>') + '<img src="' + newSrc + '" alt="" /></div>');
            app.fullscreen.img = app.fullscreen.find('img');
            app.fullscreen.title = app.fullscreen.find('.title');
        } else if (app.fullscreen.img.attr('src') !== newSrc) {
            // open different fullscreen
            app.fullscreen.img.attr('src', newSrc);
            if (newTitle === undefined) {
                // remove title
                app.fullscreen.title.html('');
            } else if (app.fullscreen.title.val() !== newTitle) {
                // set title
                app.fullscreen.title.html(newTitle);
            }
        }
        // display fullscreen
        app.fullscreen.removeClass('hidden');
        // disable scroll
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