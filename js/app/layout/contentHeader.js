(function () {
    "use strict";

    $(() => {
        layoutr.html.on('model-check', () => {
            let contentHeader = layoutr.content.children('.content-header:not(.full)');
            if (contentHeader.length) {
                if (layoutr.isModal() && contentHeader.css('position') === 'fixed') {
                    let halfOverflowY = layoutr.scrollbarWidth / 2;
                    contentHeader.children().css('width', 'calc(100% - ' + halfOverflowY + 'px)');
                } else {
                    contentHeader.children().css('width', '');
                }
            }
        });
    });
}());