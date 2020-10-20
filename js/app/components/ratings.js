{
    layoutr.checkRatings = (ratings) => {
        ratings.each((i, item) => {
            item = $(item);
            let total = layoutr.tryParseInt(item.attr('data-total'), 5),
                rating = $('<div class="ratings"></div>'),
                value = layoutr.tryParseFloat(item.val(), 0);

            rating.insertAfter(item);

            for (i = 1; i <= total; i++) {
                let full = i <= value;
                let half = i < (value + 1) && i > value;
                let selected = full || half;
                
                rating.append(`<button class="${selected ? 'selected' : ''}${full ? ' full' : ''}${half ? ' half' : ''}"><svg focusable="false"><use xlink:href="#svg-${selected ? (full ? 'star-2' : 'star-1') : 'star'}"></use></svg></label>`);
            }

            rating.on('mouseover', 'button', (e) => {
                rating.addClass('highlight');
                let self = $(e.currentTarget),
                    index = self.index();

                let active = rating.find(`> button:nth-of-type(-n+${index + 1})`);
                active.addClass('highlight');
                active.find('svg use').attr('xlink:href', '#svg-star-2');

                let inactive = rating.find(`> button:nth-of-type(n+${index + 2})`);
                inactive.removeClass('highlight');
                inactive.find('svg use').attr('xlink:href', '#svg-star');
            });

            rating.on('mouseout', (e) => {
                rating.removeClass('highlight');
                let self = $(e.currentTarget);
                self.find('> button').removeClass('highlight');
                self.find('> button:not(.selected) svg use').attr('xlink:href', '#svg-star');
                self.find('> button.selected.full svg use').attr('xlink:href', '#svg-star-2');
                self.find('> button.selected.half svg use').attr('xlink:href', '#svg-star-1');
            });

            rating.on('click', 'button', (e) => {
                let self = $(e.currentTarget),
                    index = self.index(),
                    buttons = rating.children('button');

                value = index + 1;
                item.attr('value', value);

                buttons.removeClass('full half user');

                buttons.each((i, e) => {
                    let button = $(e);

                    if (button.index() <= index) {
                        button.addClass('selected full user').find('svg use').attr('xlink:href', '#svg-star-2');
                    } else {
                        button.removeClass('selected').find('svg use').attr('xlink:href', '#svg-star');
                    }
                });
            });
        });
    }
}