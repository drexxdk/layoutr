var app = app || {};

$(function () {

    app.tooltip = $('#tooltip');
    app.tooltip.title = app.tooltip.find('#tooltip-title');
    app.tooltip.description = app.tooltip.find('#tooltip-description');

    app.main.on('click', '.tooltip', function () {
        var $this = $(this);
        var title = $this.attr('data-tooltip-title');
        var description = $this.attr('data-tooltip-description');

        if (title.length || description.length) {
            if (title.length) {
                app.tooltip.addClass('has-title');
                app.tooltip.title.text(title);
            } else {
                app.tooltip.removeClass('has-title');
            }
            if (description.length) {
                app.tooltip.addClass('has-description');
                app.tooltip.description.text(description);
            } else {
                app.tooltip.removeClass('has-description');
            }

            app.tooltip.toggleClass('hidden');

            var parent = $this[0].getBoundingClientRect();
            var child = app.tooltip[0].getBoundingClientRect();

            var top = parent.top - child.height;
            var left = parent.left + (parent.width / 2) - (child.width / 2);

            app.tooltip.css({
                'top' : top,
                'left': left
            });
        }
    });
});