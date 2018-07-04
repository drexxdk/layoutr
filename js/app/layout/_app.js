var app = app || {};

$.ajaxSetup({
    cache: true
});

$(() => {
    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    $.get(app.host + 'ajax/svg/base.html', (data) => {
        $(data).prependTo(app.body);
    });

    if (bowser.android) {
        // android doesn't handle vh correctly, so it gets converted to px
        $(window).resize(() => {
            if (app.isModal() && app.isModalImage()) {
                app.modal.find('#modal-img').css('max-height', window.innerHeight);
            }
        });
    }
}); 

$(window).click((e) => {
    let target = $(e.target),
        modal = target.closest(app.modal[0]);

    if (!app.isLoading() && !app.isFocus()) {
        if (bowser.ios) {
            // ios browsers doesn't apply :focus to buttons in many cases,
            // this forces :focus to be applied correctly.
            if (target.parents('button').length) {
                target.parents('button').focus();
            } else if (target.closest('button').length) {
                target.focus();
            }
        }

        if (app.isAuthentication() && !target.closest('#authentication').length && !target.closest('#modal').length) {
            app.html.attr('data-authentication', '');
        } else if (modal.length) {
            let image = app.isModalImage() && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length,
                form = app.isModalForm() && !target.closest('#modal > div > div > div').length;
            if (image || form || target.closest('#modal-close').length) {
                app.closeModal();
            }
        } else {
            let isSmallBreakpoint = app.isSmallBreakpoint(),
                left = app.isAsideLeft() && (app.isAsideLeftCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#left").length,
                right = app.isAsideRight() && (app.isAsideRightCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#right").length,
                notTarget = !target.closest(".aside").length && !target.closest('.popup').length && !target.closest('#cookie').length;
            if ((left || right) && notTarget && !app.isLoading()) {
                app.enableScroll();
                app.html.attr('data-aside', '');
            }
        }
    }
});