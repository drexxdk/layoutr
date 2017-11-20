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

    app.isSmallBreakpoint = function () {
        return $(window).outerWidth() < 732 || app.isLeft() && !app.isLeftPush() || app.isRight() && !app.isRightPush();
    };

    app.isAside = function () {
        return app.html.attr('data-aside').length;
    };

    app.isLeft = function () {
        return app.html.attr('data-aside') === 'left';
    };

    app.isRight = function () {
        return app.html.attr('data-aside') === 'right';
    };

    app.isLeftPush = function () {
        return app.html.hasClass('left-push') && app.isLeft();
    };

    app.isRightPush = function () {
        return app.html.hasClass('right-push') && app.isRight();
    };
    
    app.isCloseLeftClickOutside = function () {
        return app.html.hasClass('close-left-click-outside');
    };
    app.isCloseRightClickOutside = function () {
        return app.html.hasClass('close-right-click-outside');
    };

    app.isModalForm = function () {
        return app.html.attr('data-modal') === 'form';
    };

    app.isModalImage = function () {
        return app.html.attr('data-modal') === 'image';
    };

    app.isLoading = function () {
        return app.html.hasClass('loading');
    };

    app.isModal = function () {
        return app.html.hasClass('modal');
    };

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
        app.html.addClass('android'); // used by modal
    } else if (bowser.ios) {
        app.html.addClass('ios'); // not currently used for anything
    }

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.main);
    });

    app.page1();

    $(window).click(function (e) {
        var target = $(e.target);
        var modal = target.closest(app.modal[0]);
        if (modal.length || target.parents('#modal').length) {
            var image = app.isModalImage() && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length;
            var form = app.isModalForm() && !target.closest('#modal > div > div > div').length;
            if (image || form || target.closest('#modal-close').length) {
                app.closeModal();
            }
        } else {
            var isSmallBreakpoint = app.isSmallBreakpoint();
            var left = app.html.attr('data-aside') === 'left' && (app.isCloseLeftClickOutside() || isSmallBreakpoint) && !target.closest("#left").length;
            var right = app.html.attr('data-aside') === 'right' && (app.isCloseRightClickOutside() || isSmallBreakpoint) && !target.closest("#right").length;
            var notTarget = !target.closest('.modal').length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length;

            if ((left || right) && notTarget) {
                app.enableScroll();
                app.html.attr('data-aside', '');
                app.checkGoogleMaps();
            }
        }
    });
});