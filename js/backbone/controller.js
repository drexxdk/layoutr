var layoutr = layoutr || {};

define(['marionette'],
    function (Marionette) {

        return Marionette.Object.extend({
            home: function () {
                layoutr.rootView.showHome();
            },
            page: function (id) {
                layoutr.rootView.showPage(id);
            }
        });
    }
);