app.assignment.move = function (assignment) {
    assignment.attr('data-moving', 0);
    var from = assignment.find('.from .container');
    var items = assignment.find('.item');
    var checkboxes = items.find('input[type=checkbox]');

    var getChecked = function () {
        return $($.map(checkboxes, function (n, i) {
            if (n.checked) {
                return n;
            }
        }));
    };

    var getItem = function (id) {
        return $($.map(items, function (n, i) {
            if (n.getAttribute("data-id") === id) {
                return n;
            }
        }));
    };

    assignment.find('.container').each(function () {
        Sortable.create($(this)[0], {
            group: 'container', draggable: ".item",
            animation: 0,
            scroll: false,
            forceFallback: true,
            fallbackOnBody: true,
            onAdd: function () {
                setTimeout(function () {
                    var checked = getChecked();
                    if (checked.length) {
                        checked.prop('checked', false);
                        assignment.removeClass('moving');
                    }
                }, 0);
            }
        });
    });

    assignment.on('click', '.item input[type=checkbox]', function () {
        var $this = $(this);
        var item = $this.parents('.item');
        var moving = parseInt(assignment.attr('data-moving'));
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

            // this should be retrieved with api call
            var correct = [
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

            $(correct).each(function (i, data) {
                $(data.items).each(function (j, id) {
                    var item = getItem(id);
                    if (item.parent().attr('data-id') === data.id) {
                        item.addClass('valid');
                    } else if (item.parents('.to').length) {
                        item.addClass('invalid');
                    }
                });
            });
        }
    });

    assignment.on('click', 'button[type="reset"]', function () {
        items.removeClass('valid invalid');
        var checked = getChecked();
        if (checked.length) {
            checked.prop('checked', false);
        }
        from.append(items);
        assignment.removeClass('validated moving');
    });
}