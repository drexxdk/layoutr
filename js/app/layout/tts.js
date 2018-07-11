var app = app || {};

app.clearSelection = () => {
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(document.createRange());
}

app.stopTTS = () => {
    app.clearSelection();
    if (app.tts && app.tts.IsSpeaking()) {
        app.tts.ShutUp();
    }
};

app.enableTTS = () => {
    if (bowser.desktop && !bowser.msie) {
        let snapSelectionToWord = () => {
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
            return selection;
        }

        let getText = (node, selection) => {
            let text = [],
                nonWhitespaceMatcher = /\S/,
                getTextNodes = (node) => {
                    let parent = $(node.parentNode),
                        special = false;

                    if (selection.containsNode(node, false) && (node.nodeName.toLowerCase() === 'input' ||
                        node.nodeName.toLowerCase() === 'textarea') && nonWhitespaceMatcher.test(node.value)) {
                        special = true;
                    }
                    
                    if (!special &&
                        selection.containsNode(node, true) &&
                        node.nodeType === 3 &&
                        nonWhitespaceMatcher.test(node.nodeValue) &&
                        parent.is(':visible') &&
                        parent.css('user-select') !== 'none' &&
                        parent.parents().css('user-select') !== 'none' &&
                        node.parentNode.tagName !== 'SCRIPT'
                    ) {
                        if (!(selection.extentNode.nodeType !== 3 && $(selection.extentNode).is(parent))) {
                            if (!node.nodeValue.match(/\.\s*$/) && node.nextElementSibling === null && parent.is('h1 span, h1, h2, h3, h4, h5, h6, p, th, td, .dataTable th span')) {
                                text.push(node.nodeValue + '. ');
                            } else {
                                text.push(node.nodeValue);
                            }
                        }
                        if (text.length === 1) {
                            if ($(selection.anchorNode).is(selection.focusNode)) {
                                text[0] = text[0].substring(0, selection.focusOffset).substring(selection.baseOffset);
                            } else {
                                text[0] = text[0].substring(selection.baseOffset);
                            }
                            if (text[0] === '. ' || text[0] === ' ') {
                                text[0] = '';
                            }
                        }
                    } else {
                        for (let i = 0; i < node.childNodes.length; i++) {
                            getTextNodes(node.childNodes[i]);
                        }
                    }
                }

            getTextNodes(node);
            if (text.length && text.length > 1) {
                text[text.length - 1] = text[text.length - 1].substring(0, selection.focusOffset);
            }
            text = text.join(' ').replace(/(?:\r\n|\r|\n)/g, ' ').replace(/ +\./g, '. ').replace(/\s\s+/g, ' ').replace(',.', '.').trim();
            return text;
        }

        if (bowser.msie) {
            if (!app.html.hasClass('polyfills-loaded')) {
                app.head.append($('<script src="dist/js/polyfills.min.js"></script>'));
                app.html.addClass('polyfills-loaded')
            }
        }

        $.getScript('dist/js/tts.min.js', () => {
            let awsCredentials = new AWS.Credentials('AKIAI5JMCVBZ4CWSSOOQ', 'FM7j9FbQLkUU8u3tHScv0IOG4IoayUkp/RNNNNni'),
                settings = {
                    awsCredentials: awsCredentials,
                    awsRegion: 'eu-central-1',
                    pollyVoiceId: 'Russell'
                };

            app.tts = ChattyKathy(settings);

            app.html.attr('data-tts', true);

            $(window).on('mousedown touchstart', (e) => {
                if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled()) {
                    app.clearSelection();
                }
            });

            $(window).on('mouseup touchend', (e) => {
                if (!$(document.activeElement).is('input, textarea, button, select, .dropdown')) {
                    if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled() && e.originalEvent.detail < 3) {
                        setTimeout(() => {
                            let selection = snapSelectionToWord(),
                                text = getText(selection.getRangeAt(0).commonAncestorContainer, selection);

                            if (text.length) {
                                app.tts.SpeakWithPromise(text).then(() => {
                                    app.clearSelection();
                                });
                            } else {
                                app.stopTTS();
                            }
                        });
                    }
                }
            });

            app.header.find('.tts').click(() => {
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