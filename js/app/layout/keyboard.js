(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    $(function () {
        layoutr.body.on("keydown", (e) => {
            let target = $(e.target),
                parent = target.parent();
            if (layoutr.isLoading()) {
                if (e.which === 9 || e.ctrlKey && e.keyCode === 65) { // tab ||  ctrl + a
                    e.preventDefault();
                }
            } else {
                if (e.which === 37 && !layoutr.isFocus() && !layoutr.isModal()) { // left
                    if (layoutr.isAsideLeft()) {
                        layoutr.toggleAside(); // closes right
                    } else if (!layoutr.isAsideRight()) {
                        layoutr.toggleAside('right'); // opens right
                    }
                } else if (e.which === 39 && !layoutr.isFocus() && !layoutr.isModal()) { // right
                    if (layoutr.isAsideRight()) {
                        layoutr.toggleAside(); // closes left
                    } else if (!layoutr.isAsideLeft()) {
                        layoutr.toggleAside('left'); // opens left
                    }
                } else if (e.which === 27) { // esc
                    e.stopPropagation();
                    if (layoutr.tts !== undefined && layoutr.tts.IsSpeaking()) {
                        layoutr.stopTTS();
                    } else if (layoutr.isFocus()) {
                        layoutr.hideFocus();
                    } else if (layoutr.isModal()) {
                        layoutr.closeModal();
                    } else {
                        if (layoutr.isAside()) {
                            layoutr.toggleAside(); // closes aside
                        }
                        let popups = layoutr.body.children('.popup');
                        if (popups.length) {
                            popups.fadeOut(layoutr.fadeOutTime, () => {
                                popups.remove();
                            });
                        }
                        let dropdowns = layoutr.content.find('div.dropdown.open');
                        if (dropdowns.length) {
                            dropdowns.removeClass('open');
                        }
                        layoutr.html.attr('data-authentication', '');
                    }
                }
                if (e.which === 13) { // enter
                    let dropdown = target.parents('div.dropdown');
                    if (dropdown.length || parent.parent().hasClass('accordion')) {
                        target.click();
                        e.preventDefault();
                        if (dropdown.length) {
                            dropdown.children('div').focus();
                        }
                    } else if (parent.hasClass('checkbox') || parent.hasClass('radio') || parent.hasClass('switch') || target.hasClass('toggle')) {
                        target.siblings('input').click();
                        e.preventDefault();
                    }
                }
            }
        });

        layoutr.body.on('keyup', (e) => {
            if (!layoutr.isLoading() && !layoutr.isFocus()) {
                if (e.which === 9) { // tab
                    let target = $(e.target);
                    if (!target.parents('div.dropdown.open').length) {
                        $('div.dropdown.open').removeClass('open');
                    }
                    if (!target.parents('#authenticated.open').length || target.closest('#authenticated > button').length) {
                        $('#authenticated.open').removeClass('open');
                    }
                    if (layoutr.isModal()) {
                        if (!target.parents('#modal').length) {
                            layoutr.closeModal();
                        }
                    } else {
                        let aside = target.parents('aside');
                        if (aside.length === 0 && target.is('aside')) {
                            aside = target;
                        }
                        if (aside.length && aside.attr('id') !== layoutr.html.attr('data-aside')) {
                            layoutr.toggleAside(aside.attr('id'));
                        } else if (!aside.length && layoutr.isAside()) {
                            layoutr.toggleAside();
                        }
                    }
                }
            }
        });
    });
}());