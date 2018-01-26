var app = app || {};

app.applySettings = function (id, name, type, value, set) {
    if (set) {
        var entry = {
            "id": id,
            "name": name,
            "type": type,
            "value": value
        },
            exists = $.grep(app.settings, function (e) { return e.name === name; });
        if (exists.length === 0) {
            // not found
            app.settings.push(entry);
        } else if (exists.length === 1) {
            // found
            exists[0].id = id;
            exists[0].value = value;
        }
        localStorage.setItem('settings', JSON.stringify(app.settings));
    } else {
        if (type === "checkbox" || type === "radio") {
            app.right.find('#' + id).prop('checked', value);
        } else if (type === "slider") {
            app.right.find('#' + id).slider('setValue', value);
        }
    }

    if (type === 'checkbox' || type === "radio") {
        if (type === 'radio') {
            $.each(app.right.find('input[type=radio][name=' + name + ']:not(#' + id + ')'), function (i, radio) {
                app.html.removeClass($(radio).attr('id'));
            });
        }
        if (value) {
            app.html.addClass(id);
        } else {
            app.html.removeClass(id);
        }
        if (id === 'two-columns') {
            app.rb();
        }
    }
};

$(function () {
    app.right.find('> .content > div').load('ajax/layout/settings.html', function () {
        app.settings = JSON.parse(localStorage.getItem("settings"));
        if (app.settings === null) app.settings = [];
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
            if (id === 'two-columns') {
                app.checkGoogleMaps();
            }
            if (id === 'left-shrink' || id === 'right-shrink' ||
                id === 'left-push' || id === 'right-push' ||
                id === 'left-overlay' || id === 'right-overlay') {
                app.setHtmlScroll();
            }
        });
    });

    app.right.on('click', '.clear-localstorage', function () {
        localStorage.clear();
        location.reload();
    });
});