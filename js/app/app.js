var app = app || {};

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732 || !app.html.hasClass('left-push') && app.html.attr('data-aside') === 'left' || !app.html.hasClass('right-push') && app.html.attr('data-aside') === 'right';
};

app.hasTransitions = function () {
    return app.html.hasClass('transitions') && !app.html.hasClass('msedge') && !app.html.hasClass('msie');
};

$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});

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
    app.overflow = $('#overflow');
    
    if (bowser.msedge) {
        app.html.addClass('msedge');
    } else if (bowser.msie) {
        app.html.addClass('msie');
    }
    if (bowser.mobile) {
        app.html.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.html.addClass('tablet'); // does nothing currently
    } else {
        app.html.addClass('desktop'); // enables hover effects
    }

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    $(window).resize(function () {
        app.setHtmlScroll();
    });
    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    var transitionLock = false;

    app.toggleAside = function (aside) {
        if (!transitionLock) {
            transitionLock = true;
            if (aside === undefined) {
                app.html.attr('data-aside', '');
            } else {
                if (app.html.attr('data-aside').length) {
                    if (app.html.attr('data-aside') === aside) {
                        app.html.attr('data-aside', '');
                    } else {
                        app.html.attr('data-aside', aside);
                    }
                } else {
                    app.html.attr('data-aside', aside);
                }
            }
            if (app.hasTransitions()) {
                setTimeout(function () {
                    transitionLock = false;
                    app.checkGoogleMaps();
                }, app.transitionTime);
            } else {
                transitionLock = false;
                app.checkGoogleMaps();
            }
            app.setHtmlScroll();
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
        app.fullscreen.removeClass('hidden');
        app.setHtmlScroll();
    });

    $(window).click(function (e) {
        var target = $(e.target);

        if (target.closest('#fullscreen').length && !(app.isSmallBreakpoint() && app.html.attr('data-aside').length)) {
            app.fullscreen.addClass('hidden');
            app.setHtmlScroll();
        }

        if (app.html.hasClass('close-left-click-outside') || app.html.hasClass('close-right-click-outside')) {
            if (!target.closest("#fullscreen").length && !target.closest(".fullscreen").length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length) {
                if (app.html.attr('data-aside') === 'left' && app.html.hasClass('close-left-click-outside') && !target.closest("#left").length) {
                    app.enableScroll();
                    app.html.attr('data-aside', '');
                } else if (app.html.attr('data-aside') === 'right' && app.html.hasClass('close-right-click-outside') && !target.closest("#right").length) {
                    app.enableScroll();
                    app.html.attr('data-aside', '');
                }
                app.checkGoogleMaps();
            }
        }
    });
});