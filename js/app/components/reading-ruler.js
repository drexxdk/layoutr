var app = app || {};

app.readingRuler = function () {
    $.getScript('dist/js/reading-ruler.min.js', function () {
        var readingRuler = $("#reading-ruler");
        readingRuler.find('> .component > div')
            .draggable({
                axis: "y",
                containment: "parent"
            })
            .resizable({ handles: "n, s", containment: "parent" });

        readingRuler.on('click', '.close', function () {
            app.hideReadingRuler();
        });
    });
};

app.showReadingRuler = function () {
    app.html.attr('data-reading-ruler', true);
};
app.hideReadingRuler = function () {
    app.html.attr('data-reading-ruler', false);
};