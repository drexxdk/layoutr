var app = app || {};

app.math = function (math) {
    if (math.length) {
        if (!app.html.hasClass('math-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/katex.min.css">'));
            app.html.addClass('math-loaded');
        }

        $.getScript('dist/js/katex.min.js', function () {
            math.each(function () {
                var $this = $(this);
                renderMathInElement($this[0]);
                setTimeout(function () {
                    $this.removeClass('math');
                });
            });
        });
    }
};