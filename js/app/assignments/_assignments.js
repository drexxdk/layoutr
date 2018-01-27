var app = app || {};

app.assignment = function (assignments) {
    if (assignments.length) {
        if (!app.html.hasClass('assignments-loaded')) {
            app.body.append($('<script type="text/javascript" src="dist/js/assignments.min.js">'));
            app.html.addClass('assignments-loaded');
        }
        $(assignments).each(function (index, assignment) {
            assignment = $(assignment);
            if (assignment.hasClass('drag-and-drop')) {
                app.assignment.dragAndDrop(assignment);
            } else if (assignment.hasClass('sort')) {
                app.assignment.sort(assignment);
            }
        });
    }
};