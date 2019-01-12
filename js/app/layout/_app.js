{
    layoutr.promiseCSS = layoutr.load.css(`${layoutr.host}dist/css/theme/${layoutr.theme}.css`).catch(() => {
        console.error('Failed to load css');
    });
    
    $(() => {
        layoutr.footer.html(`<p>\u00A9 ${new Date().getFullYear()} Frederik Nielsen</p>`);

        //layoutr.setHtmlScroll(); // outcomment if it can be disabled at first page load

        layoutr.load.html(`${layoutr.host}${layoutr.ajax}svg/base.html`).then((response) => {
            $(response).prependTo(layoutr.body);
        }).catch(() => {
            layoutr.showPopupAlert('Failed to load base svg html', 'danger');
        });

        if (bowser.android) {
            // android doesn't handle vh correctly, so it gets converted to px
            $(window).resize(() => {
                if (layoutr.isModal() && layoutr.isModalImage()) {
                    layoutr.modal.find('#modal-img').css('max-height', window.innerHeight);
                }
            });
        }
    });

    $(window).click((e) => {
        let target = $(e.target),
            modal = target.closest(layoutr.modal[0]);

        if (!layoutr.isLoading() && !layoutr.isFocus()) {
            if (bowser.ios) {
                // ios browsers doesn't apply :focus to buttons in many cases,
                // this forces :focus to be applied correctly.
                if (target.parents('button').length) {
                    target.parents('button').focus();
                } else if (target.closest('button').length) {
                    target.focus();
                }
            }

            if (layoutr.isAuthentication() && !target.closest('#authentication').length && !target.closest('#modal').length) {
                layoutr.html.attr('data-authentication', '');
            } else if (modal.length) {
                let image = layoutr.isModalImage() && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length,
                    form = layoutr.isModalForm() && !target.closest('#modal > div > div > div').length;
                if (image || form || target.closest('#modal-close').length) {
                    layoutr.closeModal();
                }
            } else {
                let isSmallBreakpoint = layoutr.isSmallBreakpoint(),
                    left = layoutr.isAsideLeft() && (layoutr.isAsideLeftCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#left").length,
                    right = layoutr.isAsideRight() && (layoutr.isAsideRightCloseOnClickOutside() || isSmallBreakpoint) && !target.closest("#right").length,
                    notTarget = !target.closest(".aside").length && !target.closest('.popup').length && !target.closest('#cookie').length;
                if ((left || right) && notTarget && !layoutr.isLoading()) {
                    layoutr.enableScroll();
                    layoutr.toggleAside(undefined, false);
                }
            }
        }
    });
}