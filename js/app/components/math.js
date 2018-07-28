var app = app || {};

app.checkMath = (math) => {
    if (math.length) {
        if (!app.html.hasClass('math-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/katex.css">'));
            app.html.addClass('math-loaded');
        }

        $.getScript('dist/js/katex.js', () => {
            math.each((i, e) => {
                let $this = $(e);
                renderMathInElement($this[0]);
                setTimeout(() => {
                    $this.removeClass('math');
                });
            });
        });
    }
};