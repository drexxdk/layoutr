var app = app || {};

app.checkAssignmentSort = (assignment) => {
    if (assignment.hasClass('sort')) {
        let id = assignment.attr('data-id'),
            container = assignment.find('.container'),
            items = assignment.find('.item');
        Sortable.create(container[0], {
            draggable: ".item",
            animation: 0,
            scroll: false,
            forceFallback: true,
            fallbackOnBody: true,
            chosenClass: 'sort-sortable-chosen'
        });

        if (!container.hasClass('wrap')) {
            let checkWidth = () => {
                container.css('height', container.height()).removeClass('row').addClass('column');
                let containerLeft = container[0].getBoundingClientRect().left,
                    firstItem = container.find('> .item:first-child'),
                    firstItemLeft = firstItem[0].getBoundingClientRect().left - parseInt(firstItem.css('margin-left'));
                if (firstItemLeft < containerLeft) {
                    container.removeClass('column').addClass('row');
                }
                container.css('height', '').addClass('checked');
            };

            let awaitCSS = setInterval(() => {
                if (app.cssLoaded()) {
                    clearInterval(awaitCSS);

                    checkWidth();

                    $(window).on("throttledresize.assignment", () => {
                        checkWidth();
                    });
                }
            }, app.cssInterval);
        }

        let reset = () => {
            items.removeClass('valid invalid');
            assignment.removeClass('validated');
            items = items.shuffle();
        };

        let getCorrect = () => {
            // this should be retrieved with api call
            if (id === '1') {
                return ['3', '1', '2', '5', '4', '7', '6', '8', '9'];
            } else if (id === '2') {
                return ['4', '2', '1', '3'];
            }
        };

        assignment.on('click', 'button[type="submit"]', () => {
            if (!assignment.hasClass('validated')) {
                assignment.addClass('validated');
                let correct = getCorrect();
                $(correct).each((i, id) => {
                    let item = app.getAssignmentItem(items, id);
                    if (item.index() === i) {
                        item.addClass('valid');
                    } else {
                        item.addClass('invalid');
                    }
                });
            }
        });

        assignment.on('click', 'button[type="reset"]', () => {
            reset();
        });

        function insertAtIndex(i, item) {
            if (i === 0) {
                container.prepend(item);
            } else {
                container.find('> .item:nth-child(' + i + ')').after(item);
            }
        };

        assignment.on('click', 'button.correct', () => {
            reset();
            assignment.addClass('validated');
            let correct = getCorrect();
            $(correct).each((i, id) => {
                let item = app.getAssignmentItem(items, id);
                item.addClass('valid');
                insertAtIndex(i, item);
            });
        });
    }
};