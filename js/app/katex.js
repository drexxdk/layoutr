var app = app || {};

app.katex = function (katex) {
    if (katex.length) {
        $.getScript('dist/js/katex.min.js', function () {
            katex.each(function () {
                var $this = $(this);
                $.when(renderMathInElement($this[0])).done(function () {
                    $this.show();
                });
            });
        });
    }
};