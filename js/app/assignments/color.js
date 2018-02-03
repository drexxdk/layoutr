var app = app || {};

app.assignment.color = function (assignment) {
    var assignmentId = assignment.attr('data-id'),
        controls = assignment.find('.controls > button'),
        container = assignment.find('.flex-table'),
        items = container.children(),
        activeId = controls.filter(".active").attr('data-id'),
        correctSvg = '<svg focusable="false"><use xlink:href="#svg-checkmark"></use></svg>',
        wrongSvg = '<svg focusable="false"><use xlink:href="#svg-close"></use></svg>';

    var reset = function () {
        controls.filter('.eraser').addClass('active');
        controls.filter(':not(.eraser)').removeClass('active').empty();
        items.removeAttr('data-id');
        assignment.removeClass('validated');
    };

    var getCorrect = function () {
        // this should be retrieved with api call
        if (assignmentId === '1') {
            return [
                {
                    id: 'blue',
                    value: 3
                },
                {
                    id: 'green',
                    value: 2
                },
                {
                    id: 'red',
                    value: 4
                }
            ];
        }
    };

    var getItems = function (id) {
        var result = 0;
        items.each(function () {
            var $this = $(this);
            var itemId = $this.attr('data-id');
            if (itemId !== undefined && id === itemId) {
                result++;
            }
        });
        return result;
    };

    assignment.on('click', 'button[type="submit"]', function () {
        if (!assignment.hasClass('validated')) {
            assignment.addClass('validated');
            var correct = getCorrect();
            $(correct).each(function (i, data) {
                var selected = getItems(data.id),
                    append = (data.value === selected) ? correctSvg : wrongSvg;
                controls.filter('[data-id="' + data.id + '"]').append(append);
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
            for (i = 0; i < data.value; i++) {
                $(items.filter(':not([data-id])')[0]).attr('data-id', data.id);
            }
            controls.filter('[data-id="' + data.id + '"]').append(correctSvg);
        });
    });

    controls.on('click', function () {
        var $this = $(this);
        $this.addClass('active').siblings('.active').removeClass('active');
        activeId = $this.attr('data-id');
    });

    items.on('click', function () {
        var $this = $(this);
        $this.attr('data-id', activeId);
    });
};