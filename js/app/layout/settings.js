var app = app || {};

app.applySettings = (id, name, type, value, set) => {
    if (set) {
        let entry = {
            "id": id,
            "name": name,
            "type": type,
            "value": value
        },
            exists = $.grep(app.settings, (e) => { return e.name === name; });
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
            $.each(app.right.find('input[type=radio][name="settings-' + name + '"]:not(#settings-' + id + ')'), (i, radio) => {
                app.html.removeClass($(radio).attr('id').replace('settings-', ''));
            });
        }
        if (name === 'theme') {
            app.loadTheme(id);
        }
        if (name === 'focus' && value) {
            app.enableFocus();
        } else if (name === 'tts' && value) {
            app.enableTTS();
        } else if (name === 'swipe' && value) {
            app.enableSwipe();
        }
        if (value) {
            app.html.addClass(id);
        } else {
            app.html.removeClass(id);
        }
        if (id === 'two-columns') {
            app.html.trigger('columns-changed.rb');
        }
        if (id === 'signed-in' || id === 'focus' || id === 'tts') {
            app.html.trigger('header-changed.responsiveHeader');
        }
        if (name === 'aside-left' || 'aside-right') {
            app.asideChanged();
        }
    }
};

$(() => {
    app.right.find('> .content > div').load(app.host + app.ajax + 'layout/settings.html', function () {
        let awaitCSS = setInterval(() => {
            if (app.cssLoaded) {
                clearInterval(awaitCSS);
                $.each(app.settings, (i, entry) => {
                    app.applySettings(entry.id, entry.name, entry.type, entry.value, false);
                });
                app.header.find('.aside.right').addClass('loaded');
                $(this).on('change', 'input[type=checkbox], input[type=radio]', (e) => {
                    let $this = $(e.currentTarget),
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
            }
        }, app.cssInterval);
    });

    app.right.on('click', '#settings-clear-localstorage', () => {
        localStorage.clear();
        location.reload();
    });
});