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
            app.right.find('#settings-' + id).prop('checked', value);
        } else if (type === "slider") {
            app.right.find('#settings-' + id).slider('setValue', value);
        }
    }
    if (type === 'checkbox' || type === "radio") {
        if (type === 'radio') {
            $.each(app.right.find('input[type=radio][name="settings-' + name + '"]:not(#settings-' + id + ')'), function (i, radio) {
                app.html.removeClass($(radio).attr('id').replace('settings-', ''));
            });
        }
        if (name === 'theme') {
            var stylesheet = app.body.children('link[rel="stylesheet"][href^="' + app.host + 'dist/css/theme/"]');
            var href = stylesheet.attr('href');
            var split1 = href.split('/');
            var split2 = split1[split1.length - 1].split('.');
            href = [];
            for (i = 0; i < split1.length - 1; i++) {
                href.push(split1[i] + '/');
            }
            var theme = id.substring(id.indexOf("-") + 1);
            href.push(theme);

            for (i = 1; i < split2.length; i++) {
                href.push('.' + split2[i]);
            }
            href = href.join("");
            stylesheet.attr('href', href);
        }
        if (name === 'reading-ruler') {
            if (value) {
                app.enableReadingRuler();
            }
        }
        if (value) {
            app.html.addClass(id);
        } else {
            app.html.removeClass(id);
        }
        if (id === 'two-columns') {
            app.rb();
        }
        if (id === 'signed-in') {
            app.responsiveHeader();
        }
    }
};

$(function () {
    app.right.find('> .content > div').load(app.host + 'ajax/layout/settings.html', function () {
        $.each(app.settings, function (i, entry) {
            app.applySettings(entry.id, entry.name, entry.type, entry.value, false);
        });
        app.header.find('.aside.right').addClass('loaded');
        $(this).on('change', 'input[type=checkbox], input[type=radio]', function () {
            var $this = $(this),
                id = $this.attr('id').replace('settings-', ''),
                name = $this.attr('name').replace('settings-', ''),
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
    });

    app.right.on('click', '#settings-clear-localstorage', function () {
        localStorage.clear();
        location.reload();
    });
});