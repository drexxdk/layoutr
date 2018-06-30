var app = app || {};

app.enableTTS = function () {
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
                var start = range.startContainer.data.substring(range.startOffset).charAt(0);
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
                var end = range.endContainer.data.substring(0, range.endOffset).slice(-1);
                if (end === ' ') {
                    range.setEnd(range.endContainer, range.endOffset - 1);
                }
            } catch (e) {

            }

            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function clearSelection() {

        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(document.createRange());
    }

    function stopTTS() {
        clearSelection();
        if (app.tts.IsSpeaking()) {
            app.tts.ShutUp();
        }
    }

    if (!app.html.hasClass('selection-loaded')) {
        if (bowser.msie) {

            app.head.append($('<script src="dist/js/polyfills/promise.min.js"></script>'));
        }
        app.head.append($('<script src="dist/js/tts.min.js"></script>'));
        app.html.addClass('selection-loaded');

        var awsCredentials = new AWS.Credentials('AKIAIUIGJHORPPUHXYXA', 'jmVeV3yty4koyYVydkjQEz0EBjsR/IeSVmVwknyw');

        var settings = {
            awsCredentials: awsCredentials,
            awsRegion: 'eu-central-1',
            pollyVoiceId: 'Russell'
        };

        app.tts = ChattyKathy(settings);

        app.html.attr('data-tts', true);

        $(window).on('mousedown touchstart', function (e) {
            clearSelection();
        });

        $(window).on('mouseup touchend', function (e) {
            if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled()) {
                e.stopPropagation();
                setTimeout(function () {
                    snapSelectionToWord();
                    let selection = $.selection();
                    if (selection.length) {
                        app.tts.SpeakWithPromise(selection).then(function () {
                            clearSelection();
                        });
                    } else {
                        stopTTS();
                    }
                });
            }
        });

        app.header.find('.tts').click(function () {
            if (app.html.attr('data-tts') === 'true') {
                app.html.attr('data-tts', false);
                stopTTS();
            } else {
                app.html.attr('data-tts', true);
            }
        });
    }
};