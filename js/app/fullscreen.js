var app = app || {};

$(function () {
    app.main.on('click', '.fullscreen', function () {
        var $this = $(this);
        var newSrc = $this.attr('data-fullscreen-img');
        var newTitle = $this.attr('data-fullscreen-title');
        var newDescription = $this.attr('data-fullscreen-description');
        app.fullscreen.img.attr('src', newSrc);
        app.fullscreen.img.css('max-height', window.innerHeight);

        if (newTitle !== undefined || newDescription !== undefined) {
            app.fullscreen.addClass('has-info');
        }

        if (newTitle !== undefined) {
            app.fullscreen.title.html(newTitle);
        }

        if (newDescription !== undefined) {
            app.fullscreen.description.html(newDescription);
        }

        app.fullscreen.removeClass('hidden');
        app.setHtmlScroll();
    });

    app.main.on('click', '#fullscreen-toggle', function () {
        app.fullscreen.toggleClass('info-shown');
    });

    if (app.html.hasClass('android')) {
        // android doesn't handle vh correctly, so it gets converted to px
        // might be a problem for ios also, but haven't tested it there yet
        $(window).on('resize', function () {
            if (!app.fullscreen.hasClass('hidden')) {
                app.fullscreen.img.css('max-height', window.innerHeight);
            }
        });
    }
});

$(window).click(function (e) {
    var target = $(e.target);

    if (target.closest('#fullscreen').length && !target.closest('#fullscreen-toggle').length) {
        app.fullscreen.addClass('hidden').removeClass('has-info info-shown');
        app.fullscreen.img.attr('src', '');
        app.fullscreen.title.empty();
        app.fullscreen.description.empty();
        app.setHtmlScroll();
    }
});