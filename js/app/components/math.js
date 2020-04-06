{
    layoutr.checkMath = (math) => {
        if (math.length) {
            if (!layoutr.html.hasClass('math-loaded')) {
                layoutr.showLoading();
                layoutr.promiseMath = Promise.all([
                    layoutr.load.css(layoutr.host + layoutr.cssDist + 'katex.css'),
                    layoutr.load.js(layoutr.host + layoutr.jsDist + 'katex.js')
                ]).finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('math-loaded');
            }

            layoutr.promiseMath.then(() => {
                math.each((i, e) => {
                    let $this = $(e);
                    renderMathInElement($this[0]);
                    setTimeout(() => {
                        $this.removeClass('math');
                    });
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load math', 'danger');
                console.error(e);
            });
        }
    };
}