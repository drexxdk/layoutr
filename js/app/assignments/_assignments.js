var app = app || {};

app.getItem = function (items, id) {
    return $($.map(items, function (item) {
        if (item.getAttribute("data-id") === id) {
            return item;
        }
    }));
};

app.assignment = function (assignments) {
    if (assignments.length) {
        $.getScript('dist/js/assignments.min.js', function () {
            $(assignments).each(function (index, assignment) {
                assignment = $(assignment);
                if (assignment.hasClass('drag-and-drop')) {
                    app.assignment.dragAndDrop(assignment);
                } else if (assignment.hasClass('sort')) {
                    app.assignment.sort(assignment);
                } else if (assignment.hasClass('color')) {
                    app.assignment.color(assignment);
                }
            });
        });
    }
};