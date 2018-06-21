var app = app || {};
var layoutr = layoutr || {};

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
            app.html.addClass('navigation-loaded');
        },
        events: {
            'change input[type=checkbox]': 'navigationChange',
            'click .tree a.label:not(.active)': 'navigate'
        },
        navigationChange: function (e) {
            var $this = $(e.target),
                id = $this.attr('id'),
                value = $this.is(':checked');
            app.applyNavigation(id, value, true);
        },
        navigate(e) {
            e.preventDefault();
            var $this = $(e.target);
            layoutr.router.navigate($this.attr('href'), { trigger: true })
        }
    });
});