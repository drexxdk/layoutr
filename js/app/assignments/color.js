(function () {
    "use strict";

    layoutr.checkAssignmentColor = (assignment) => {
        if (assignment.hasClass('color')) {
            let assignmentId = assignment.attr('data-id'),
                controls = assignment.find('.controls > button'),
                container = assignment.find('.flex-table'),
                items = container.children(),
                activeId = controls.filter(".active").attr('data-id'),
                correctSvg = '<svg focusable="false"><use xlink:href="#svg-checkmark"></use></svg>',
                wrongSvg = '<svg focusable="false"><use xlink:href="#svg-close"></use></svg>';

            let reset = () => {
                controls.filter('.eraser').addClass('active');
                controls.filter(':not(.eraser)').removeClass('active').empty();
                items.removeAttr('data-id');
                assignment.removeClass('validated');
            };

            let getCorrect = () => {
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
                } else if (assignmentId === '2') {
                    return [
                        {
                            id: 'orange',
                            value: 4
                        },
                        {
                            id: 'teal',
                            value: 2
                        }
                    ];
                }
            };

            let getItems = (id) => {
                let result = 0;
                items.each((i, data) => {
                    let $this = $(data),
                        itemId = $this.attr('data-id');
                    if (itemId !== undefined && id === itemId) {
                        result++;
                    }
                });
                return result;
            };

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated')) {
                    assignment.addClass('validated');
                    let correct = getCorrect();
                    $(correct).each((i, data) => {
                        let selected = getItems(data.id),
                            append = (data.value === selected) ? correctSvg : wrongSvg;
                        controls.filter('[data-id="' + data.id + '"]').append(append);
                    });
                }
            });

            assignment.on('click', 'button[type="reset"]', () => {
                reset();
            });

            assignment.on('click', 'button.correct', () => {
                reset();
                assignment.addClass('validated');
                let correct = getCorrect();
                $(correct).each((i, data) => {
                    for (i = 0; i < data.value; i++) {
                        $(items.filter(':not([data-id])')[0]).attr('data-id', data.id);
                    }
                    controls.filter('[data-id="' + data.id + '"]').append(correctSvg);
                });
            });

            controls.on('click', (e) => {
                let $this = $(e.currentTarget);
                $this.addClass('active').siblings('.active').removeClass('active');
                activeId = $this.attr('data-id');
            });

            items.on('click', (e) => {
                let $this = $(e.currentTarget);
                $this.attr('data-id', activeId);
            });
        };
    };
}());