var app = app || {};

app.assignment.dragAndDrop = function (assignment) {
    assignment.attr('data-moving', 0);
    var id = assignment.attr('data-id'),
        from = assignment.find('.from .container'),
        items = assignment.find('.item'),
        checkboxes = items.find('input[type=checkbox]');

    var getChecked = function () {
        return $($.map(checkboxes, function (item) {
            if (item.checked) {
                return item;
            }
        }));
    };

    var getItem = function (id) {
        return $($.map(items, function (item) {
            if (item.getAttribute("data-id") === id) {
                return item;
            }
        }));
    };

    var reset = function () {
        items.removeClass('valid invalid');
        var checked = getChecked();
        if (checked.length) {
            checked.prop('checked', false);
        }
        from.append(items);
        assignment.removeClass('validated moving');
        items = items.shuffle();
    };

    var getCorrect = function () {
        // this should be retrieved with api call
        if (id === '1') {
            return [
                {
                    id: '1', // TV
                    items: ['5', '7']
                },
                {
                    id: '2', // Games
                    items: ['6', '8']
                },
                {
                    id: '3', // Music
                    items: ['2', '4']
                },
                {
                    id: '4', // Sport
                    items: ['1', '3']
                }
            ];
        }
    };

    assignment.find('.container').each(function () {
        Sortable.create($(this)[0], {
            group: 'container', draggable: ".item",
            animation: 0,
            scroll: false,
            forceFallback: true,
            fallbackOnBody: true,
            ghostClass: 'drag-and-drop-sortable-ghost',
            chosenClass: 'drag-and-drop-sortable-chosen',
            onAdd: function () {
                setTimeout(function () {
                    var checked = getChecked();
                    if (checked.length) {
                        checked.prop('checked', false);
                        assignment.removeClass('moving');
                    }
                });
            }
        });
    });

    assignment.on('click', '.item input[type=checkbox]', function () {
        var $this = $(this),
            item = $this.parents('.item'),
            moving = parseInt(assignment.attr('data-moving'));
        if ($this.is(':checked')) {
            moving++;
            assignment.attr('data-moving', moving);
            assignment.addClass('moving');
        } else {
            moving--;
            assignment.attr('data-moving', moving);
            if (moving === 0) {
                assignment.removeClass('moving');
            }
        }
    });

    assignment.on('click', '.place', function () {
        assignment.removeClass('moving');
        var checked = getChecked();
        if (checked.length) {
            checked.prop('checked', false);
            $(this).parent('.header').next().children('.container').append(checked.parent());
        }
    });

    assignment.on('click', 'button[type="submit"]', function () {
        if (!assignment.hasClass('validated')) {
            var checked = getChecked();
            if (checked.length) {
                checked.prop('checked', false);
            }
            assignment.addClass('validated');
            var correct = getCorrect();
            $(correct).each(function (i, data) {
                var container = assignment.find('.to .container[data-id="' + data.id + '"]');
                container.children().each(function () {
                    var item = $(this);
                    if ($.inArray(item.attr('data-id'), data.items) !== -1) {
                        item.addClass('valid');
                    } else {
                        item.addClass('invalid');
                    }
                });
            });
        }
    });

    assignment.on('click', 'button[type="reset"]', function () {
        reset();
    });

    assignment.on('click', 'button.correct', function () {
        reset();
        assignment.addClass('validated');
        var correct = getCorrect();
        $(correct).each(function (i, data) {
            var container = assignment.find('.to .container[data-id="' + data.id + '"]');
            $(data.items).each(function (j, id) {
                var item = getItem(id);
                item.addClass('valid');
                item.appendTo(container);
            });
        });
    });
};