(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.enableFocus = () => {
        let component = layoutr.focus.find('> .component > div');

        $.getScript('dist/js/focus.js', () => {
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
                    containment: "parent"
                }).on('resize', function (e) {
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
}());