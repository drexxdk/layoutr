var app = app || {};

app.assignment = function (assignments) {
    $(assignments).each(function (index, assignment) {
        assignment = $(assignment);
        if (assignment.hasClass('move multiple')) {
            app.assignment.move(assignment);
        }
    });
};