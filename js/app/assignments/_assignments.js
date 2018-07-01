var app = app || {};

app.getAssignmentItem = function (items, id) {
    return $($.map(items, function (item) {
        if (item.getAttribute("data-id") === id) {
            return item;
        }
    }));
};

app.checkAssignment = function (assignments) {
    if (assignments.length) {
        $.getScript('dist/js/assignments.js', function () {
            $(assignments).each(function (index, assignment) {
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