(function () {
    "use strict";

    layoutr.applySettings = (id, name, type, value, set) => {
        if (set) {
            let entry = {
                "id": id,
                "name": name,
                "type": type,
                "value": value
            },
                exists = $.grep(layoutr.settings, (e) => { return e.name === name; });
            if (exists.length === 0) {
                // not found
                layoutr.settings.push(entry);
            } else if (exists.length === 1) {
                // found
                exists[0].id = id;
                exists[0].value = value;
            }
            localStorage.setItem('settings', JSON.stringify(layoutr.settings));
        } else {
            if (type === "checkbox" || type === "radio") {
                layoutr.right.find('#settings-' + id).prop('checked', value);
            } else if (type === "slider") {
                layoutr.right.find('#settings-' + id).slider('setValue', value);
            }
        }
        if (type === 'checkbox' || type === "radio") {
            if (type === 'radio') {
                $.each(layoutr.right.find('input[type=radio][name="settings-' + name + '"]:not(#settings-' + id + ')'), (i, radio) => {
                    layoutr.html.removeClass($(radio).attr('id').replace('settings-', ''));
                });
            }
            if (name === 'theme') {
                layoutr.loadTheme(id);
            }
            if (name === 'focus' && value) {
                layoutr.enableFocus();
            } else if (name === 'tts' && value) {
                layoutr.enableTTS();
            } else if (name === 'swipe' && value) {
                layoutr.enableSwipe();
            }
            if (value) {
                layoutr.html.addClass(id);
            } else {
                layoutr.html.removeClass(id);
            }
            if (id === 'two-columns') {
                layoutr.html.trigger('columns-changed.rb');
            }
            if (id === 'signed-in' || id === 'focus' || id === 'tts') {
                layoutr.html.trigger('header-changed.responsiveHeader');
            }
            if (name === 'aside-left' || 'aside-right') {
                layoutr.asideChanged();
            }
        }
    };

    $(() => {
        layoutr.right.find('> .content > div').load(layoutr.host + layoutr.ajax + 'layout/settings.html', (response, status, xhr) => {
            if (xhr.status === 200) {
                let $this = $(this);
                layoutr.promiseCSS.then(() => {
                    $.each(layoutr.settings, (i, entry) => {
                        layoutr.applySettings(entry.id, entry.name, entry.type, entry.value, false);
                    });
                    layoutr.header.find('.aside.right').addClass('loaded');
                    $this.on('change', 'input[type=checkbox], input[type=radio]', (e) => {
                        let input = $(e.currentTarget),
                            id = input.attr('id').replace('settings-', ''),
                            name = input.attr('name').replace('settings-', ''),
                            type = input.attr('type'),
                            value = input.is(':checked');
                        layoutr.applySettings(id, name, type, value, true);
                        if (id === 'left-shrink' || id === 'right-shrink' ||
                            id === 'left-push' || id === 'right-push' ||
                            id === 'left-overlay' || id === 'right-overlay') {
                            layoutr.setHtmlScroll();
                        }
                    });
                });
            } else {
                layoutr.showPopupAlert('Failed to load settings html', 'danger');
            }
        });

        layoutr.right.on('click', '#settings-clear-localstorage', () => {
            localStorage.clear();
            location.reload();
        });
    });
}());