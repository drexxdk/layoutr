var app = app || {};

app.katex = function (katex) {
    if (katex.length) {
        if (!app.html.hasClass('katex-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/katex.min.css">'));
            app.body.append($('<script type="text/javascript" src="dist/js/katex.min.js">'));
            app.html.addClass('katex-loaded');
        }
        katex.each(function () {
            var $this = $(this);
            $.when(renderMathInElement($this[0])).done(function () {
                $this.removeClass('katex');
            });
        });
    }
};