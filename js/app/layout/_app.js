var app = app || {};

$.ajaxSetup({
    cache: true
});

$(function () {
    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    $.get('ajax/svg/base.html', function (data) {
        $(data).prependTo(app.body);
    });
    
    app.addValidation(
        app.body.find('#register > form'),
        {
            register_username: {
                required: true,
                minlength: 2
            },
            register_password: {
                required: true,
                password: true
            },
            register_confirm_password: {
                required: true,
                equalTo: "#password"
            },
            register_email: {
                required: true,
                email: true
            },
        },
        {
            register_username: {
                required: "Please enter your username",
            },
            register_password: {
                required: "Please enter your password"
            },
            register_confirm_password: {
                required: "Please provide a password",
                equalTo: "Please enter the same password as above"
            },
            register_email: "Please enter a valid email address"
        }
    );

    app.addValidation(
        app.body.find('#login > form'),
        {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                password: true
            }
        },
        {
            username: {
                required: "Please enter your username",
            },
            password: {
                required: "Please enter your password"
            },
        }
    );
});

$(window).click(function (e) {
    var target = $(e.target),
        modal = target.closest(app.modal[0]);

    if (bowser.ios) {
        // ios browsers doesn't apply :focus to buttons in many cases,
        // this forces :focus to be applied correctly.
        if (target.parents('button').length) {
            target.parents('button').focus();
        } else if (target.closest('button').length) {
            target.focus();
        }
    }
    if (app.unauthenticated.attr('data-type') !== '' && !target.closest('#unauthenticated').length && !target.parents('#unauthenticated').length) {
        app.unauthenticated.attr('data-type', '');
    }
    if (app.authenticated.hasClass('open') && !target.closest('#authenticated').length && !target.parents('#authenticated').length) {
        app.authenticated.removeClass('open');
    }
    if (modal.length || target.parents('#modal').length) {
        var image = app.isModalImage() && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length,
            form = app.isModalForm() && !target.closest('#modal > div > div > div').length;
        if (image || form || target.closest('#modal-close').length) {
            app.closeModal();
        }
    } else {
        var isSmallBreakpoint = app.isSmallBreakpoint(),
            left = app.isAsideLeft() && (app.isAsideLeftCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#left").length,
            right = app.isAsideRight() && (app.isAsideRightCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#right").length,
            notTarget = !target.closest('.modal').length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length && !target.closest('#cookie').length;
        if ((left || right) && notTarget && !app.isLoading()) {
            app.enableScroll();
            app.html.attr('data-aside', '');
        }
    }
});