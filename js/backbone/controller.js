define(['marionette'],
    function (Marionette) {

        return Marionette.Object.extend({
            home: function () {
                const rootView = this.getOption('rootView');
                rootView.showHome();
            },
            page: function (id) {
                const rootView = this.getOption('rootView');
                rootView.showPage(id);
            }
        });
    }
);