var app = app || {};

app.applySettings = function (id, type, value, set) {
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
            app.html.addClass(id);
        } else {
            app.html.removeClass(id);
        }
        if (id === 'two-columns') {
            app.responsiveBackground();
        }
    }
};

$(function () {
    app.right.find('> .content > div').load('ajax/layout/settings.html', function () {
        app.header.find('.aside.right').addClass('loaded');
        var $this = $(this);
        if (app.localStorage) {
            app.settings = JSON.parse(localStorage.getItem("settings"));
            if (app.settings === null) app.settings = [];
        }

        $this.on('click', 'input[type=checkbox]', function () {
            var $this = $(this);
            var id = $this.attr('id');
            var type = "checkbox";
            var value = $this.is(':checked');
            app.applySettings(id, type, value, true);
            if (id === 'two-columns') {
                app.checkGoogleMaps();
            }
            if (id === 'left-shrink' || id === 'right-shrink') {
                app.setHtmlScroll();
            }
        });
        if (app.localStorage) {
            $.each(app.settings, function (i, entry) {
                app.applySettings(entry.id, entry.type, entry.value, false);
            });
        }
    });
});