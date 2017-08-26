var app = app || {};

app.localStorage = typeof Storage !== "undefined";
if (app.localStorage) {
    app.settings = JSON.parse(localStorage.getItem("settings"));
    if (app.settings === null) app.settings = [];
}

app.applySettings = function (id, value, set = false) {
    if (app.localStorage && set) {
        var entry = {
            "id": id,
            "value": value
        };
        var exists = $.grep(app.settings, function (e) { return e.id === id; });
        if (exists.length === 0) {
            // not found
            app.settings.push(entry);
        } else if (exists.length === 1) {
            // 1 found
            exists[0].value = value;
        }
        localStorage.setItem('settings', JSON.stringify(app.settings));
    } else {
        $('#settings').find('#' + id).prop('checked', value);
    }
    if (value) {
        app.main.addClass(id);
    } else {
        app.main.removeClass(id);
    }
};

$(function () {
    if (app.localStorage) {
        $.each(app.settings, function (i, entry) {
            app.applySettings(entry.id, entry.value);
        });
    }

    $('#settings').on('click', 'input[type=checkbox]', function () {
        var $this = $(this);
        var id = $this.attr('id');
        var value = $this.is(':checked');
        app.applySettings(id, value, true);
        if (id === 'two-columns') {
            app.checkGoogleMaps();
        }
    });
});