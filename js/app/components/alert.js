var app = app || {};

$(function () {
    app.body.on('click', '.alert .close', function () {
        let $this = $(this).parent();
        $this.fadeOut(app.fadeOutTime, function () {
            let parent = $this.parent();
            if (parent.hasClass('popup') && parent.children().length === 1) {
                parent.remove();
            } else {
                $this.remove();
            }
        });
    });
});