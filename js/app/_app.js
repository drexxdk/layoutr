var app = app || {};

$.ajaxSetup({
    cache: true
});

$(function () {
    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    $.get('ajax/svg/base.html', function (data) {
        $(data).prependTo(app.main);
    });
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