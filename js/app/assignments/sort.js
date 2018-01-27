var app = app || {};

app.assignment.sort = function (assignment) {
    var $this = assignment.find('.container');
        Sortable.create($this[0], {
            draggable: ".item",
            animation: 0,
            scroll: false,
            forceFallback: true,
            fallbackOnBody: true,
            ghostClass: 'sort-sortable-ghost',
            chosenClass: 'sort-sortable-chosen'
    });
};