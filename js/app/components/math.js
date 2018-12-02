(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.checkMath = (math) => {
        if (math.length) {
            if (!layoutr.html.hasClass('math-loaded')) {
                layoutr.head.append($('<link rel="stylesheet"href="dist/css/katex.css">'));
                layoutr.html.addClass('math-loaded');
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
}());