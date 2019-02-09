{
    layoutr.enableFocus = () => {
        let component = layoutr.focus.find('> .component > div');

        if (!layoutr.html.hasClass('focus-loaded')) {
            layoutr.showLoading();
            layoutr.promiseFocus = layoutr.load.js('dist/js/focus.js').finally(() => {
                layoutr.hideLoading();
            });
            layoutr.html.addClass('focus-loaded');
        }

        layoutr.promiseFocus.then(() => {
            component
                .draggable({
                    axis: "y",
                    containment: "parent",
                    handle: ".move"
                })
                .resizable({
                    handles: {
                        n: '.ui-resizable-n',
                        s: '.ui-resizable-s'
                    },
                    minHeight: 50,
                    containment: "parent"
                }).on('resize', (e) => {
                    e.stopPropagation();
                });

            layoutr.focus.on('click', '.close', () => {
                layoutr.hideFocus();
            });

            layoutr.main.find('.focus').click(() => {
                layoutr.showFocus();
            });

            let height = $(window).height();
            $(window).resize(() => {
                // do nothing if the height is the same
                if ($(window).height() === height) return;
                height = $(window).height();
                component.removeAttr('style');
            });
        }).catch((e) => {
            layoutr.showPopupAlert('Failed to load focus', 'danger');
            console.error(e);
        });
    };

    layoutr.showFocus = () => {
        layoutr.html.attr('data-authentication', '');
        layoutr.html.attr('data-focus', true);
        layoutr.focus.focus();
    };
    layoutr.hideFocus = () => {
        let scrollTop = layoutr.scrollTop();
        layoutr.html.attr('data-focus', false);
        layoutr.main.focus();
        layoutr.body.scrollTop(scrollTop); // edge, safari
        layoutr.html.scrollTop(scrollTop); // chrome, firefox, ie
    };
}