{
    let closeLeftClickOutsideButton,
        closeLeftClickOutsideValue,
        closeRightClickOutsideButton,
        closeRightClickOutsideValue;

    layoutr.applySettings = (id, name, type, value, set) => {
        if (set) {
            let entry = {
                "id": id,
                "name": name,
                "type": type,
                "value": value
            },
                exists = $.grep(layoutr.settings, (e) => { return e.name === name; });
            if (exists.length) {
                // found
                exists[0].id = id;
                exists[0].value = value;
            } else {
                // not found
                layoutr.settings.push(entry);
            }
            localStorage.setItem('settings', JSON.stringify(layoutr.settings));
            if (name === 'custom-scrollbars') {
                location.reload();
            }
        } else {
            if (type === "checkbox" || type === "radio") {
                layoutr.right.find(`#settings-${id}`).prop('checked', value);
            } else if (type === "slider") {
                layoutr.right.find(`#settings-${id}`).slider('setValue', value);
            }
        }
        if (type === 'checkbox' || type === "radio") {
            if (type === 'radio') {
                $.each(layoutr.right.find(`input[type=radio][name="settings-${name}"]:not(#settings-${id})`), (i, radio) => {
                    layoutr.html.removeClass($(radio).attr('id').replace('settings-', ''));
                });
            }
            if (name === 'theme') {
                layoutr.loadTheme(id);
            } else if (name === 'focus' && value) {
                layoutr.enableFocus();
            } else if (name === 'tts' && value) {
                //layoutr.enableTTS();
            } else if (name === 'swipe' && value) {
                layoutr.enableSwipe();
            } else if (name === 'aside-left') {
                if (id === 'left-overlay' || id === 'left-push') {
                    closeLeftClickOutsideButton.prop("disabled", true);
                    closeLeftClickOutsideButton.prop("checked", true);
                } else if (id === 'left-shrink') {
                    closeLeftClickOutsideButton.prop("disabled", false);
                    closeLeftClickOutsideButton.prop("checked", closeLeftClickOutsideValue ? closeLeftClickOutsideValue : false);
                }
                layoutr.asideChanged();
            } else if (name === 'aside-right') {
                if (id === 'right-overlay' || id === 'right-push') {
                    closeRightClickOutsideButton.prop("disabled", true);
                    closeRightClickOutsideButton.prop("checked", true);
                } else if (id === 'right-shrink') {
                    closeRightClickOutsideButton.prop("disabled", false);
                    closeRightClickOutsideButton.prop("checked", closeRightClickOutsideValue ? closeRightClickOutsideValue : false);
                }
                layoutr.asideChanged();
            }
            if (value) {
                layoutr.html.addClass(id);
            } else {
                layoutr.html.removeClass(id);
            }
            if (id === 'two-columns') {
                layoutr.html.trigger('columns-changed');
            } else if (id === 'signed-in' || id === 'focus' || id === 'tts') {
                layoutr.html.trigger('header-changed');
            } else if (id === 'close-left-click-outside') {
                closeLeftClickOutsideValue = value;
            } else if (id === 'close-right-click-outside') {
                closeRightClickOutsideValue = value;
            }
        }
    };

    $(() => {
        layoutr.load.html(`${layoutr.host}${layoutr.htmlDist}layout/settings.html`).then((response) => {
            let $this = layoutr.right.find('> .content > div');

            $this.html(response);

            closeLeftClickOutsideButton = $this.find('#settings-close-left-click-outside');
            closeRightClickOutsideButton = $this.find('#settings-close-right-click-outside');

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
        }).catch((e) => {
            layoutr.showPopupAlert('Failed to load settings html', 'danger');
            console.error(e);
        });

        layoutr.right.on('click', '#settings-clear-localstorage', () => {
            localStorage.clear();
            location.reload();
        });
    });
}