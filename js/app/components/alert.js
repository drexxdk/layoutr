var app = app || {};

$(function () {
    app.body.on('click', '.alert .close', (e) => {
        let $this = $(e.currentTarget).parent();
        $this.fadeOut(app.fadeOutTime, () => {
            let parent = $this.parent();
            if (parent.hasClass('popup') && parent.children().length === 1) {
                parent.remove();
            } else {
                $this.remove();
            }
        });
    });
});