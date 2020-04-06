{
    layoutr.checkRanges = (ranges) => {
        if (ranges.length) {
            if (!layoutr.html.hasClass('range-loaded')) {
                layoutr.showLoading();
                layoutr.promiseRange = Promise.all([
                    layoutr.load.css(layoutr.host + layoutr.cssDist + 'nouislider.css'),
                    layoutr.load.js(layoutr.host + layoutr.jsDist + 'nouislider.js')
                ]).finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('range-loaded');
            }

            layoutr.promiseRange.then(() => {
                ranges.each((i, e) => {
                    let range = $(e),
                        start = range.attr('data-value') ? range.attr('data-value').split(',').map(Number) : 50,
                        min = layoutr.tryParseInt(range.attr('data-min'), 0),
                        max = layoutr.tryParseInt(range.attr('data-max'), 100),
                        orientation = range.attr('data-orientation') ? range.attr('data-orientation') : undefined,
                        connect = range.attr('data-connect') === 'true';
                    
                    noUiSlider.create(range[0], {
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
                layoutr.showPopupAlert('Failed to load range', 'danger');
                console.error(e);
            });
        }
    };
}