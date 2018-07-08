var app = app || {};

$(() => {
    app.html.on('model-check', () => {
        let contentHeader = app.content.children('.content-header:not(.full)');
        if (contentHeader.length) {
            if (app.isModal() && contentHeader.css('position') === 'fixed') {
                let halfOverflowY = app.scrollbarWidth / 2;
                contentHeader.children().css('width', 'calc(100% - ' + halfOverflowY + 'px)');
            } else {
                contentHeader.children().css('width', '');
            }
        }
    });
});