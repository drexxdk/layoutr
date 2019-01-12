{
    layoutr.checkAssignmentDragAndDrop = (assignment) => {
        if (assignment.hasClass('drag-and-drop')) {
            assignment.attr('data-moving', 0);
            let id = assignment.attr('data-id'),
                from = assignment.find('.from .container'),
                items = assignment.find('.item'),
                checkboxes = items.find('input[type=checkbox]');

            let getChecked = () => {
                return $($.map(checkboxes, (item) => {
                    if (item.checked) {
                        return item;
                    }
                }));
            };

            let reset = () => {
                items.removeClass('valid invalid');
                let checked = getChecked();
                if (checked.length) {
                    checked.prop('checked', false);
                }
                from.append(items);
                assignment.removeClass('validated moving');
                items = items.shuffle();
            };

            let getCorrect = () => {
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
            if (bowser.desktop) {
                assignment.find('.container').each((i, e) => {
                    Sortable.create(e, {
                        group: 'container', draggable: ".item",
                        animation: 0,
                        scroll: false,
                        forceFallback: true,
                        fallbackOnBody: true,
                        chosenClass: 'drag-and-drop-sortable-chosen',
                        onAdd: () => {
                            setTimeout(() => {
                                let checked = getChecked();
                                if (checked.length) {
                                    checked.prop('checked', false);
                                    assignment.removeClass('moving');
                                }
                            });
                        }
                    });
                });
            }

            checkboxes.on('click', (e) => {
                let $this = $(e.currentTarget),
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

            assignment.on('click', '.place', (e) => {
                let $this = $(e.currentTarget)
                assignment.removeClass('moving');
                let checked = getChecked();
                if (checked.length) {
                    checked.prop('checked', false);
                    $this.parent('.header').next().children('.container').append(checked.parent());
                }
            });

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated')) {
                    let checked = getChecked();
                    if (checked.length) {
                        checked.prop('checked', false);
                    }
                    assignment.addClass('validated');
                    let correct = getCorrect();
                    $(correct).each((i, data) => {
                        let container = assignment.find(`.to .container[data-id="${data.id}"]`);
                        container.children().each((i, child) => {
                            let item = $(child);
                            if ($.inArray(item.attr('data-id'), data.items) !== -1) {
                                item.addClass('valid');
                            } else {
                                item.addClass('invalid');
                            }
                        });
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
                    let container = assignment.find(`.to .container[data-id="${data.id}"]`);
                    $(data.items).each((j, id) => {
                        let item = layoutr.getAssignmentItem(items, id);
                        item.addClass('valid');
                        item.appendTo(container);
                    });
                });
            });
        }
    };
}