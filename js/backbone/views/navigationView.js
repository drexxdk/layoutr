define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['navigationTemplate'],
        onRender: function () {
            app.navigationTree = this.$el.find('.tree');
            app.navigation = JSON.parse(localStorage.getItem("navigation"));
            if (app.navigation === null) app.navigation = [];
            $.each(app.navigation, function (i, entry) {
                app.applyNavigation(entry.id, entry.value, false);
            });
            app.navigationTree.on('change', 'input[type=checkbox]', function () {
                var $this = $(this),
                    id = $this.attr('id'),
                    value = $this.is(':checked');
                app.applyNavigation(id, value, true);
            });
            app.header.find('.aside.left').addClass('loaded');
            if (app.url && app.url.p) {
                app.navigationTree.find('a.label[href="' + app.url.p.replace(/^\/+/g, '') + '"]').addClass('active');
            } else {
                app.navigationTree.find('a.label[href=""]').addClass('active');
            }
        }
    });
});