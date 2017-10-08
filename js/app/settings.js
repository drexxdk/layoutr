var app = app || {};
app.localStorage = typeof Storage !== "undefined";
app.settings = [];

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
    app.right.load('ajax/layout/settings.html', function () {
        var $this = $(this);
        if (app.localStorage) {
            app.settings = JSON.parse(localStorage.getItem("settings"));
            if (app.settings === null) app.settings = [];
        }

        $this.find('#font-size').slider({
            min: 12,
            max: 20,
            step: 2,
            value: 16,
            tooltip: "hide"
        }).on('change', function () {
            var $this = $(this);
            var id = $this.attr('id');
            var type = "slider";
            var value = $this.slider('getValue');
            app.applySettings(id, type, value, true);
        });

        $this.on('click', 'input[type=checkbox]', function () {
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
                app.applySettings(entry.id, entry.type, entry.value, false);
            });
        }

        $(document).click(function (e) {
            if (app.main.hasClass('close-left-click-outside') || app.main.hasClass('close-right-click-outside')) {
                var target = $(e.target);
                if (!target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length) {
                    if (app.main.hasClass('left-open') && app.main.hasClass('close-left-click-outside') && !target.closest("#left").length) {
                        app.main.removeClass('left-open');
                    } else if (app.main.hasClass('right-open') && app.main.hasClass('close-right-click-outside') && !target.closest("#right").length) {
                        app.main.removeClass('right-open');
                    }
                    app.checkGoogleMaps();
                }
            }
        });
    });
});