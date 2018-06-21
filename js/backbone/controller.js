var layoutr = layoutr || {};

define(['marionette'],
    function (Marionette) {
        return Marionette.Object.extend({
            page: function (id) {
                layoutr.rootView.showPage(id);
            }
        });
    }
);