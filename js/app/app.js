var app = app || {};

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732;
};

app.hasTransitions = function () {
    return app.main.hasClass('transitions') && !app.main.hasClass('msedge') && !app.main.hasClass('msie');
};

$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});

//$(document).ajaxComplete(function () {
//    debugger;
//});

$(function () {
    app.main = $('main');
    app.content = $('#content > div');
    app.header = $('header');
    app.footer = $('footer');
    app.left = $('#left');
    app.right = $('#right');
    app.html = $('html');
    app.body = $('body');
    app.loading = $('#loading');
    app.fullscreen = $('#fullscreen');
    app.transitionTime = 400;
    app.fadeOutTime = 500;
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;
    
    if (bowser.msedge) {
        app.main.addClass('msedge');
    } else if (bowser.msie) {
        app.main.addClass('msie');
    }
    if (bowser.mobile) {
        app.main.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.main.addClass('tablet'); // does nothing currently
    } else {
        app.main.addClass('desktop'); // enables hover effects
    }

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    $(window).resize(function () {
        app.setHtmlScroll();
    });
    app.setHtmlScroll();

    var transitionLock = false;

    app.toggleAside = function (aside) {
        if (!transitionLock) {
            transitionLock = true;
            if (aside === undefined) {
                app.main.attr('data-aside', '');
            } else {

                if (app.main.attr('data-aside') !== aside && app.isSmallBreakpoint()) {
                    app.disableHtmlScroll();
                }

                if (app.main.attr('data-aside').length) {
                    if (app.main.attr('data-aside') === aside) {
                        app.main.attr('data-aside', '');
                    } else {
                        app.main.attr('data-aside', aside);
                    }
                } else {
                    app.main.attr('data-aside', aside);
                }
            }

            if (app.hasTransitions()) {
                setTimeout(function () {
                    transitionLock = false;
                    app.setHtmlScroll();
                    app.checkGoogleMaps();
                }, app.transitionTime);
            } else {
                transitionLock = false;
                app.setHtmlScroll();
                app.checkGoogleMaps();
            }

        }
    };


    $('.aside.left').click(function () {
        app.toggleAside('left');
    });

    $('.aside.right').click(function () {
        app.toggleAside('right');
    });

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.body);
    });

    app.left.on('click', '.tree a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var href = $this.attr('href');
        if (href === 'page1') {
            app.page1();
        } else {
            app.content.load('ajax/content/' + href + '.html');
        }
    });

    app.left.find('> .content > div').load('ajax/layout/menu.html');
    app.page1();

    app.main.on('click', '.fullscreen', function () {
        var $this = $(this);
        var newSrc = $this.attr('data-img');
        if (app.fullscreen.img === undefined) {
            app.fullscreen.append('<img src="' + newSrc + '" alt="" />');
            app.fullscreen.img = app.fullscreen.children();
        } else if (app.fullscreen.img.attr('src') !== newSrc) {
            app.fullscreen.img.attr('src', newSrc);
        }
        app.disableHtmlScroll();
        app.fullscreen.removeClass('hidden');
    });

    $(window).click(function (e) {
        var target = $(e.target);

        if (target.closest('#fullscreen').length && !(app.isSmallBreakpoint() && app.main.attr('data-aside').length)) {
            app.fullscreen.addClass('hidden');
            app.enableHtmlScroll();
        }

        if (app.main.hasClass('close-left-click-outside') || app.main.hasClass('close-right-click-outside')) {
            if (!target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length) {
                if (app.main.attr('data-aside') === 'left' && app.main.hasClass('close-left-click-outside') && !target.closest("#left").length) {
                    app.enableHtmlScroll();
                    app.main.attr('data-aside', '');
                } else if (app.main.attr('data-aside') === 'right' && app.main.hasClass('close-right-click-outside') && !target.closest("#right").length) {
                    app.enableHtmlScroll();
                    app.main.attr('data-aside', '');
                }
                app.checkGoogleMaps();
            }
        }
    });
});