var app = app || {};

app.katex = function (katex) {
    if (katex.length) {
        $.getScript('dist/js/katex.min.js', function () {
            katex.each(function () {
                renderMathInElement($(this)[0]);
            });
        });
    }
};