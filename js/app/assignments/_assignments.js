var app = app || {};

app.assignment = function (assignments) {
    if (assignments.length) {
        $.getScript('dist/js/assignments.min.js', function () {
            $(assignments).each(function (index, assignment) {
                assignment = $(assignment);
                if (assignment.hasClass('drag-and-drop')) {
                    app.assignment.dragAndDrop(assignment);
                } else if (assignment.hasClass('sort')) {
                    app.assignment.sort(assignment);
                }
            });
        });
    }
};