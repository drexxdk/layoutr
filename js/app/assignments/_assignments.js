var app = app || {};

app.getAssignmentItem = (items, id) => {
    return $($.map(items, (item) => {
        if (item.getAttribute("data-id") === id) {
            return item;
        }
    }));
};

app.checkAssignment = (assignments) => {
    if (assignments.length) {
        $.getScript('dist/js/assignments.js', () => {
            $(assignments).each((i, assignment) => {
                assignment = $(assignment);
                app.checkAssignmentSort(assignment);
                app.checkAssignmentDragAndDrop(assignment);
                app.checkAssignmentColor(assignment);
            });
        });
    } else {
        $(window).off('throttledresize.assignment');
    }
};