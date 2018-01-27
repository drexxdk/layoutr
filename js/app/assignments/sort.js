var app = app || {};

app.assignment.sort = function (assignment) {
    var container = assignment.find('.container');
    Sortable.create(container[0], {
        draggable: ".item",
        animation: 0,
        scroll: false,
        forceFallback: true,
        fallbackOnBody: true,
        ghostClass: 'sort-sortable-ghost',
        chosenClass: 'sort-sortable-chosen'
    });

    var checkWidth = function () {
        container.removeClass('row').addClass('column');
        var containerLeft = container[0].getBoundingClientRect().left;
        var firstItem = container.find('> .item:first-child');
        var firstItemLeft = firstItem[0].getBoundingClientRect().left - parseInt(firstItem.css('margin-left'));
        if (firstItemLeft < containerLeft) {
            container.removeClass('column').addClass('row');
        }
    };

    checkWidth();

    $(window).on("throttledresize.assignment", function () {
        checkWidth();
    });
};