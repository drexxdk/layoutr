define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['layout/settingsTemplate'],
        onRender: function () {
            $.each(app.settings, function (i, entry) {
                app.applySettings(entry.id, entry.name, entry.type, entry.value, false);
            });
            app.html.addClass('settings-loaded');
            app.responsiveHeader();
        },
        events: {
            'click #clear-localstorage': 'clearLocalStorage',
            'change input[type=checkbox]': 'settingsChange',
            'change input[type=radio]': 'settingsChange'
        },
        clearLocalStorage: function () {
            localStorage.clear();
            location.reload();
        },
        settingsChange: function (e) {
            var $this = $(e.target),
                id = $this.attr('id'),
                name = $this.attr('name'),
                type = $this.attr('type'),
                value = $this.is(':checked');
            app.applySettings(id, name, type, value, true);
            if (id === 'left-shrink' || id === 'right-shrink' ||
                id === 'left-push' || id === 'right-push' ||
                id === 'left-overlay' || id === 'right-overlay') {
                app.setHtmlScroll();
            }
        }
    });
});