var app = app || {};

$(function () {
    var mathjax;
    app.content.on('click', '#toggle-mathjax', function () {
        var $this = $(this);
        if (mathjax === undefined) {
            $.getScript('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML', function (data, textStatus, jqxhr) {
                $('<div id="mathjax"><div class="alert theme-secondary"><div class="flex-items"><div>$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</div></div></div></div>').insertAfter($this);
                mathjax = app.content.find('#mathjax');
            });
        } else {
            mathjax.toggle();
        }
    });
});