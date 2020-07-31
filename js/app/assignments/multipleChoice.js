{
    layoutr.checkAssignmentMultipleChoice = (assignment) => {
        if (assignment.hasClass('multiple-choice')) {
            let id = assignment.attr('data-id'),
                items = assignment.find('.checkbox'),
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
                assignment.removeClass('validated');
            }

            let getCorrect = () => {
                // this should be retrieved with api call
                if (id === '1') {
                    return [
                        {
                            id: '1', // Marvel Comics characters
                            items: ['1', '2', '4', '6']
                        },
                        {
                            id: '2', // Marvel Comics characters
                            items: ['1', '2', '4', '6']
                        }
                    ];
                }
            };

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated')) {
                    assignment.addClass('validated');
                    let correct = getCorrect();
                    let valid = true;
                    $(correct).each((i, data) => {
                        let container = assignment.find(`.container[data-id="${data.id}"]`);

                        let checked = $.makeArray(container.find('input[type="checkbox"]:checked').map((i, e) => {
                            return e.dataset.id;
                        }));

                        $(data.items).each((j, item) => {
                            if ($.inArray(item, checked) === -1) {
                                valid = false;
                                return;
                            }
                        });

                        container.attr('data-theme', valid ? 'theme-success' : 'theme-danger');
                    });
                }
            });

            assignment.on('click', 'button[type="reset"]', () => {
                reset();
            });

            assignment.on('click', 'button.correct', () => {
                reset();
                //assignment.addClass('validated');
                //let correct = getCorrect();
                //$(correct).each((i, data) => {
                //    let container = assignment.find(`.to .container[data-id="${data.id}"]`);
                //    $(data.items).each((j, id) => {
                //        let item = layoutr.getAssignmentItem(items, id);
                //        item.addClass('valid');
                //        item.appendTo(container);
                //    });
                //});
            });
        }
    }
}