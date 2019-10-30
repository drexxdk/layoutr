{
    layoutr.checkRanges = (ranges) => {
        if (ranges.length) {
            if (!layoutr.html.hasClass('range-loaded')) {
                layoutr.showLoading();
                layoutr.promiseRange = Promise.all([
                    layoutr.load.css('dist/css/nouislider.css'),
                    layoutr.load.js('dist/js/nouislider.js')
                ]).finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('range-loaded');
            }

            layoutr.promiseRange.then(() => {
                ranges.each((i, e) => {
                    let range = $(e),
                        div = $('<div></div>'),
                        start = range.attr('value') ? range.attr('value').split(',').map(Number) : 50,
                        min = layoutr.tryParseInt(range.attr('min'), 0),
                        max = layoutr.tryParseInt(range.attr('max'), 100),
                        orientation = range.attr('data-orientation') ? range.attr('data-orientation') : undefined,
                        connect = range.attr('data-connect') === 'true';
                    
                    div.insertAfter(range);

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
                layoutr.showPopupAlert('Failed to load range', 'danger');
                console.error(e);
            });
        }
    };
}