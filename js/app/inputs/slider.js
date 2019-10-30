{
    layoutr.checkSlider = (sliders) => {
        if (sliders.length) {
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
                sliders.each((i, e) => {
                    let slider = $(e),
                        div = $('<div></div>'),
                        start = slider.attr('value') ? slider.attr('value').split(',').map(Number) : 50,
                        min = layoutr.tryParseInt(slider.attr('min'), 0),
                        max = layoutr.tryParseInt(slider.attr('max'), 100),
                        orientation = slider.attr('data-orientation') ? slider.attr('data-orientation') : undefined,
                        connect = slider.attr('data-connect') === 'true';
                    
                    div.insertAfter(slider);

                    noUiSlider.create(div[0], {
                        start: start,
                        orientation: orientation,
                        connect: connect,
                        range: {
                            min: min,
                            max: max
                        }
                    });
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load slider', 'danger');
                console.error(e);
            });
        }
    };
}