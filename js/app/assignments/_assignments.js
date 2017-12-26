var app = app || {};

app.assignment = function (assignments) {
    if (assignments.length) {
        $.getScript('/dist/js/assignments.min.js', function () {
            $(assignments).each(function (index, assignment) {
                assignment = $(assignment);
                if (assignment.hasClass('move multiple')) {
                    app.assignment.move(assignment);
                }
            });
        });
    }
};