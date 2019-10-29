{
    layoutr.checkSlider = (slider) => {
        if (slider.length) {
            if (!layoutr.html.hasClass('slider-loaded')) {
                layoutr.showLoading();
                layoutr.promiseSlider = Promise.all([
                    layoutr.load.css('dist/css/nouislider.css'),
                    layoutr.load.js('dist/js/nouislider.js')
                ]).finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('slider-loaded');
            }

            layoutr.promiseSlider.then(() => {
                slider.each((i, e) => {
                    let $this = $(e);

                    // https://codepen.io/aaroniker/pen/ZEEWoKj

                    //renderMathInElement($this[0]);
                    //setTimeout(() => {
                    //    $this.removeClass('math');
                    //});
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load slider', 'danger');
                console.error(e);
            });
        }
    };
}