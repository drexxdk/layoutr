var app = app || {};

app.enableFocus = () => {
    let component = app.Focus.find('> .component > div');

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

        app.Focus.on('click', '.close', () => {
            app.hideFocus();
        });

        app.main.find('.focus').click(() => {
            app.showFocus();
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

app.showFocus = () => {
    app.html.attr('data-authentication', '');
    app.html.attr('data-focus', true);
    app.Focus.focus();
};
app.hideFocus = () => {
    let scrollTop = app.scrollTop();
    app.html.attr('data-focus', false);
    app.main.focus();
    app.body.scrollTop(scrollTop); // edge, safari
    app.html.scrollTop(scrollTop); // chrome, firefox, ie
};