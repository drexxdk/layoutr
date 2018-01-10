var app = app || {};

app.math = function (math) {
    if (math.length) {
        if (!app.html.hasClass('math-loaded')) {
            app.body.append($('<script type="text/javascript" src="dist/js/katex.min.js">'));
            app.head.append($('<link rel="stylesheet"href="dist/css/katex.min.css">'));
            app.html.addClass('math-loaded');
        }
        math.each(function () {
            var $this = $(this);
            renderMathInElement($this[0]);
            setTimeout(function () {
                $this.removeClass('math');
            }, 0);
        });
    }
};