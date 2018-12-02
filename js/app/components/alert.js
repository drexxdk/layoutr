(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    var closeAlert = (target) => {
        target.fadeOut(layoutr.fadeOutTime, () => {
            let parent = target.parent();
            if (parent.hasClass('popup') && parent.children().length === 1) {
                parent.remove();
            } else {
                target.remove();
            }
        });
    }

    $(function () {
        layoutr.body.on('click', '.alert .close', (e) => {
            let target = $(e.currentTarget).parent();
            closeAlert(target);
        });
    });
}());