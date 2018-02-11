var app = app || {};

$(function () {
    app.body.on('click', '.alert .close', function () {
        var $this = $(this).parent();
        $this.fadeOut(app.fadeOutTime, function () {
            var parent = $this.parent();
            if (parent.hasClass('popup') && parent.children().length === 1) {
                parent.remove();
            } else {
                $this.remove();
            }
        });
    });
});