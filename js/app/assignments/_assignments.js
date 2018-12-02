(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.getAssignmentItem = (items, id) => {
        return $($.map(items, (item) => {
            if (item.getAttribute("data-id") === id) {
                return item;
            }
        }));
    };

    layoutr.checkAssignment = (assignments) => {
        if (assignments.length) {
            $.getScript('dist/js/assignments.js', () => {
                $(assignments).each((i, assignment) => {
                    assignment = $(assignment);
                    layoutr.checkAssignmentSort(assignment);
                    layoutr.checkAssignmentDragAndDrop(assignment);
                    layoutr.checkAssignmentColor(assignment);
                });
            });
        }
    };
}());