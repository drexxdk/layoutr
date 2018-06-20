define(['marionette'], function (Marionette) {
    return Marionette.View.extend({
        template: templates['settingsTemplate'],
        onRender: function () {
            $.each(app.settings, function (i, entry) {
                app.applySettings(entry.id, entry.name, entry.type, entry.value, false);
            });
            app.header.find('.aside.right').addClass('loaded');
            $(this).on('change', 'input[type=checkbox], input[type=radio]', function () {
                var $this = $(this),
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
            });
            app.responsiveHeader();
        },
        events: {
            'click #clear-localstorage': 'clearLocalStorage'
        },
        clearLocalStorage: function () {
            localStorage.clear();
            location.reload();
        }
    });
});