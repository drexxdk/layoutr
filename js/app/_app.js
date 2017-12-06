var app = app || {};

(function (l) {
    if (l.search) {
        app.q = {};
        l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
            app.q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (app.q.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + (app.q.p || '') +
                (app.q.q ? ('?' + app.q.q) : '') +
                l.hash
            );
            debugger;
        }
    }
}(window.location))

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732 || app.isAsideLeft() && !app.isAsideLeftPush() || app.isAsideRight() && !app.isAsideRightPush();
};

app.isAside = function () {
    return app.html.attr('data-aside').length;
};

app.isAsideLeft = function () {
    return app.html.attr('data-aside') === 'left';
};

app.isAsideRight = function () {
    return app.html.attr('data-aside') === 'right';
};

app.isAsideLeftPush = function () {
    return app.html.hasClass('left-push') && app.isAsideLeft();
};

app.isAsideRightPush = function () {
    return app.html.hasClass('right-push') && app.isAsideRight();
};

app.isAsideLeftCloseOnClickOutside = function () {
    return app.html.hasClass('close-left-click-outside');
};
app.isAsideRightCloseOnClickOutside = function () {
    return app.html.hasClass('close-right-click-outside');
};

app.isModal = function () {
    return app.html.hasClass('modal');
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
});

$(window).click(function (e) {
    var target = $(e.target);
    var modal = target.closest(app.modal[0]);
    
    if (app.html.hasClass('ios')) {
        // ios browsers doesn't apply :focus to buttons in many cases,
        // this forces :focus to be applied correctly.
        if (target.parents('button').length) {
            target.parents('button').focus();
        } else if (target.closest('button').length) {
            target.focus();
        }
    }
        
    if (modal.length || target.parents('#modal').length) {
        var image = app.isModalImage() && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length;
        var form = app.isModalForm() && !target.closest('#modal > div > div > div').length;
        if (image || form || target.closest('#modal-close').length) {
            app.closeModal();
        }
    } else {
        var isSmallBreakpoint = app.isSmallBreakpoint();
        var left = app.isAsideLeft() && (app.isAsideLeftCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#left").length;
        var right = app.isAsideRight() && (app.isAsideRightCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#right").length;
        var notTarget = !target.closest('.modal').length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length;

        if ((left || right) && notTarget) {
            app.enableScroll();
            app.html.attr('data-aside', '');
            app.checkGoogleMaps();
        }
    }
});