﻿var app = app || {};

$(function () {
    if (app.html.hasClass('android')) {

        var setTouchAndSwipe = function (element, scrollElement, scrollTopElement) {
            if (scrollElement === undefined) {
                scrollElement = element;
            }
            if (scrollTopElement === undefined) {
                scrollTopElement = element;
            }

            element.css("touch-action", "pan-down");
            scrollElement.scroll(function () {
                // this disables page refresh when swiping down
                if (scrollTopElement.scrollTop() > 0) {
                    element.css("touch-action", "auto");
                } else {
                    element.css("touch-action", "pan-down");
                }
            });
        };

        var viewport = app.head.find('meta[name="viewport"]');
        viewport.attr('content', viewport.attr('content') + ', maximum-scale=1.0, user-scalable=no');

        // android doesn't handle vh correctly, so it gets converted to px
        // might be a problem for ios also, but haven't tested it there yet
        app.fullscreen.img.css('max-height', window.innerHeight);
        $(window).on('resize', function () {
            if (!app.fullscreen.hasClass('hidden')) {
                app.fullscreen.img.css('max-height', window.innerHeight);
            }
        });
        app.main.on('click', '.fullscreen', function () {
            app.fullscreen.img.css('max-height', window.innerHeight);
        });

        setTouchAndSwipe(app.body, $(window), $(document));
        setTouchAndSwipe(app.left.children('.content'));
        setTouchAndSwipe(app.right.children('.content'));
    }
});