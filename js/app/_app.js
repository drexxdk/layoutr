var app = app || {};




$(function () {
    app.html = $('html');
    app.head = $('head');
    app.body = $('body');
    app.main = $('main');
    app.content = $('#content > div');
    app.header = $('header');
    app.footer = $('footer');
    app.left = $('#left');
    app.right = $('#right');
    app.loading = $('#loading');
    app.transitionTime = 400;
    app.fadeOutTime = 500;
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;
    app.overflow = $('#overflow');
    app.modal = $('#modal');
    app.scrollbarWidth = 0;

    var scrollbarWidth = function () {
            app.body.append('<div id="scrollbar-width"></div>');
            var element = app.body.children('#scrollbar-width');
            element.css({
                'overflow': "scroll",
                'visibility': "hidden",
                'position': 'absolute',
                'width': '100px',
                'height': '100px'
            });
            app.scrollbarWidth = element[0].offsetWidth - element[0].clientWidth;
            element.remove();
    };
    scrollbarWidth();

    app.isSmallBreakpoint = function () {
        return $(window).outerWidth() < 732 || !app.html.hasClass('left-push') && app.html.attr('data-aside') === 'left' || !app.html.hasClass('right-push') && app.html.attr('data-aside') === 'right';
    };

    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });

    if (bowser.msedge) {
        app.html.addClass('msedge'); // used by app.enableScroll()
    } else if (bowser.msie) {
        app.html.addClass('msie'); // not currently used for anything
    }
    if (bowser.mobile) {
        app.html.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.html.addClass('tablet'); // does nothing currently
    } else {
        app.html.addClass('desktop'); // enables hover effects
    }

    if (bowser.android) {
        app.html.addClass('android'); // used by fullscreen
    } else if (bowser.ios) {
        app.html.addClass('ios'); // not currently used for anything
    }

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    var transitionLock = false;

    app.toggleAside = function (aside) {
        if (!transitionLock) {
            transitionLock = true;
            var currentAside = app.html.attr('data-aside');
            if (currentAside.length) {
                if (aside === undefined || currentAside === aside) {
                    app.html.attr('data-aside', '');
                } else {
                    app.html.attr('data-aside', aside);
                }
            } else {
                app.html.attr('data-aside', aside);
            }
            if (app.html.hasClass('transitions')) {
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
        $(data).prependTo(app.main);
    });

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

    app.left.find('> .content > div').load('ajax/layout/menu.html');
    app.page1();

    $(window).click(function (e) {
        var target = $(e.target);
        var modal = target.closest(app.modal[0]);
        if (modal.length) {
            var image = app.html.attr('data-modal') === 'image' && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length;
            var form = !target.closest('#modal > div > div > div').length && app.html.attr('data-modal') === 'form';
            if (image || form) {
                app.closeModal();
            }
        } else {
            var isSmallBreakpoint = app.isSmallBreakpoint();
            var left = app.html.attr('data-aside') === 'left' && (app.html.hasClass('close-left-click-outside') || isSmallBreakpoint) && !target.closest("#left").length;
            var right = app.html.attr('data-aside') === 'right' && (app.html.hasClass('close-right-click-outside') || isSmallBreakpoint) && !target.closest("#right").length;
            var notTarget = !target.closest("#fullscreen").length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length;

            if ((left || right) && notTarget) {
                app.enableScroll();
                app.html.attr('data-aside', '');
                app.checkGoogleMaps();
            }
        }




        
    });
});