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