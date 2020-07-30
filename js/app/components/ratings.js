{
    layoutr.checkRatings = (ratings) => {
        ratings.each((i, item) => {
            item = $(item);
            let total = layoutr.tryParseInt(item.attr('data-total'), 5),
                rating = $('<div class="ratings"></div>'),
                value = layoutr.tryParseInt(item.val(), 0);

            rating.insertAfter(item);

            for (i = 1; i <= total; i++) {
                let selected = i <= value;
                rating.append(`<button class="${selected ? 'selected' : ''}"><svg focusable="false"><use xlink:href="#svg-${selected ? 'star-2' : 'star'}"></use></svg></label>`);
            }

            rating.on('mouseover', 'button', (e) => {
                let self = $(e.currentTarget),
                    index = self.index();

                rating.find(`> button:nth-of-type(-n+${index + 1}) svg use`).attr('xlink:href', '#svg-star-2');
                rating.find(`> button:nth-of-type(n+${index + 2}) svg use`).attr('xlink:href', '#svg-star');

            });

            rating.on('mouseout', (e) => {
                let self = $(e.currentTarget);

                self.find('> button:not(.selected) svg use').attr('xlink:href', '#svg-star');
                self.find('> button.selected svg use').attr('xlink:href', '#svg-star-2');
            });

            rating.on('click', 'button', (e) => {
                let self = $(e.currentTarget),
                    index = self.index();

                value = index + 1;
                item.attr('value', value);

                rating.children('button').each((i, e) => {
                    let button = $(e);

                    if (button.index() <= index) {
                        button.addClass('selected').find('svg use').attr('xlink:href', '#svg-star-2');
                    } else {
                        button.removeClass('selected').find('svg use').attr('xlink:href', '#svg-star');
                    }
                });
            });
        });
    }
}