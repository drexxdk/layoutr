var app = app || {};

app.assignment.sort = function (assignment) {
    var id = assignment.attr('data-id'),
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
        var checkWidth = function () {
            container
                .css('height', container.height())
                .removeClass('row')
                .addClass('checking column');
            var containerLeft = container[0].getBoundingClientRect().left,
                firstItem = container.find('> .item:first-child'),
                firstItemLeft = firstItem[0].getBoundingClientRect().left - parseInt(firstItem.css('margin-left'));
            if (firstItemLeft < containerLeft) {
                container.removeClass('column').addClass('row');
            }
            container
                .removeClass('checking')
                .css('height', '');
        };

        checkWidth();

        $(window).on("throttledresize.assignment", function () {
            checkWidth();
        });
    }

    var reset = function () {
        items.removeClass('valid invalid');
        assignment.removeClass('validated');
        items = items.shuffle();
    };

    var getCorrect = function () {
        // this should be retrieved with api call
        if (id === '1') {
            return ['3', '1', '2', '5', '4', '7', '6', '8', '9'];
        } else if (id === '2') {
            return ['4', '2', '1', '3'];
        }
    };

    assignment.on('click', 'button[type="submit"]', function () {
        if (!assignment.hasClass('validated')) {
            assignment.addClass('validated');
            var correct = getCorrect();
            $(correct).each(function (i, id) {
                var item = app.getItem(items, id);
                if (item.index() === i) {
                    item.addClass('valid');
                } else {
                    item.addClass('invalid');
                }
            });
        }
    });

    assignment.on('click', 'button[type="reset"]', function () {
        reset();
    });

    var insertAtIndex = function (i, item) {
        if (i === 0) {
            container.prepend(item);
        } else {
            container.find('> .item:nth-child(' + i + ')').after(item);
        }
    };

    assignment.on('click', 'button.correct', function () {
        reset();
        assignment.addClass('validated');
        var correct = getCorrect();
        $(correct).each(function (i, id) {
            var item = app.getItem(items, id);
            item.addClass('valid');
            insertAtIndex(i, item);
        });
    });
};