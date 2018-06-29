var app = app || {};

app.readingRuler = function () {
    var readingRuler = $("#reading-ruler"),
        component = readingRuler.find('> .component > div');

    $.getScript('dist/js/reading-ruler.min.js', function () {
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

        readingRuler.on('click', '.close', function () {
            app.hideReadingRuler();
        });

        app.main.find('.reading-ruler').click(function () {
            app.showReadingRuler();
        });

        $(window).resize(function () {
            component.removeAttr('style');
        });
    });
};

app.showReadingRuler = function () {
    app.html.attr('data-reading-ruler', true);
};
app.hideReadingRuler = function () {
    app.html.attr('data-reading-ruler', false);
};