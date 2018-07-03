var app = app || {};

app.clearSelection = function () {
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(document.createRange());
}
app.stopTTS = function () {
    app.clearSelection();
    if (app.tts && app.tts.IsSpeaking()) {
        app.tts.ShutUp();
    }
};

app.enableTTS = function () {
    if (bowser.desktop) {
        function snapSelectionToWord() {
            let selection = window.getSelection();
            if (!selection.isCollapsed) {
                let range = selection.getRangeAt(0);
                if (range.collapsed || range.toString().length === 0) {
                    return;
                }

                try {
                    // select full start word
                    while (range.startOffset > 0 && range.toString()[0].match(/[^\s]/)) {
                        range.setStart(range.startContainer, range.startOffset - 1);
                    }
                    // remove space as first selected
                    let start = range.startContainer.data.substring(range.startOffset).charAt(0);
                    if (start === ' ') {
                        range.setStart(range.startContainer, range.startOffset + 1);
                    }
                } catch (e) {

                }

                try {
                    // select full end word
                    while (range.endOffset < range.endContainer.length && range.toString()[range.toString().length - 1].match(/[^\s]/)) {
                        range.setEnd(range.endContainer, range.endOffset + 1);
                    }
                    // remove space as last selected
                    let end = range.endContainer.data.substring(0, range.endOffset).slice(-1);
                    if (end === ' ') {
                        range.setEnd(range.endContainer, range.endOffset - 1);
                    }
                } catch (e) {

                }

                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        if (bowser.msie) {
            if (!app.html.hasClass('polyfills-loaded')) {
                app.head.append($('<script src="dist/js/polyfills.min.js"></script>'));
                app.html.addClass('polyfills-loaded')
            }
        }

        $.getScript('dist/js/tts.min.js', function () {
            let awsCredentials = new AWS.Credentials('AKIAIUIGJHORPPUHXYXA', 'jmVeV3yty4koyYVydkjQEz0EBjsR/IeSVmVwknyw');

            let settings = {
                awsCredentials: awsCredentials,
                awsRegion: 'eu-central-1',
                pollyVoiceId: 'Russell'
            };

            app.tts = ChattyKathy(settings);

            app.html.attr('data-tts', true);

            $(window).on('mousedown touchstart', function (e) {
                if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled()) {
                    app.clearSelection();
                }
            });

            $(window).on('mouseup touchend', function (e) {
                if (!$(document.activeElement).is('input, textarea, button, select, .dropdown')) {
                    if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled()) {
                        setTimeout(function () {
                            snapSelectionToWord();
                            let selection = $.selection();
                            if (selection.length) {
                                app.tts.SpeakWithPromise(selection).then(function () {
                                    app.clearSelection();
                                });
                            } else {
                                app.stopTTS();
                            }
                        });
                    }
                }
            });

            app.header.find('.tts').click(function () {
                if (app.html.attr('data-tts') === 'true') {
                    app.html.attr('data-tts', false);
                    app.stopTTS();
                } else {
                    app.html.attr('data-tts', true);
                }
            });
        });
    }
};