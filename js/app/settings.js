var app = app || {};

app.localStorage = typeof Storage !== "undefined";
if (app.localStorage) {
    app.settings = JSON.parse(localStorage.getItem("settings"));
    if (app.settings === null) app.settings = [];
}

app.applySettings = function (id, type, value, set = false) {
    if (app.localStorage && set) {
        var entry = {
            "id": id,
            "type": type,
            "value": value
        };
        var exists = $.grep(app.settings, function (e) { return e.id === id; });
        if (exists.length === 0) {
            // not found
            app.settings.push(entry);
        } else if (exists.length === 1) {
            // found
            exists[0].value = value;
        }
        localStorage.setItem('settings', JSON.stringify(app.settings));
    } else {
        if (type === "checkbox") {
            $('#settings').find('#' + id).prop('checked', value);
        } else if (type === "slider") {
            $('#settings').find('#' + id).slider('setValue', value);
        }
    }

    if (type === 'checkbox') {
        if (value) {
            app.main.addClass(id);
        } else {
            app.main.removeClass(id);
        }
    } else if (id === 'font-size') {
        if (app.main.hasClass('transitions')) {
            app.main.removeClass('transitions');
            app.html.css('font-size', value + 'px');
            setTimeout(function () {
                app.main.addClass('transitions');
            }, 500);
            
        } else {
            app.html.css('font-size', value + 'px');
        }
    }
};

$(function () {
    $('#settings').find('#font-size').slider({
        min: 12,
        max: 32,
        step: 1,
        value: 16,
        tooltip: "hide"
    }).on('change', function () {
        var $this = $(this);
        var id = $this.attr('id');
        var type = "slider";
        var value = $this.slider('getValue');
        app.applySettings(id, type, value, true);
    });

    $('#settings').on('click', 'input[type=checkbox]', function () {
        var $this = $(this);
        var id = $this.attr('id');
        var type = "checkbox";
        var value = $this.is(':checked');
        app.applySettings(id, type, value, true);
        if (id === 'two-columns') {
            app.checkGoogleMaps();
        }
    });

    if (app.localStorage) {
        $.each(app.settings, function (i, entry) {
            app.applySettings(entry.id, entry.type, entry.value);
        });
    }
});