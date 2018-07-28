var app = app || {};

var closeAlert = (target) => {
    target.fadeOut(app.fadeOutTime, () => {
        let parent = target.parent();
        if (parent.hasClass('popup') && parent.children().length === 1) {
            parent.remove();
        } else {
            target.remove();
        }
    });
}

$(function () {
    app.body.on('click', '.alert .close', (e) => {
        let target = $(e.currentTarget).parent();
        closeAlert(target);
    });
});