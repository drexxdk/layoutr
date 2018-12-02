(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.loadTheme = (id) => {

        let loadStyleSheet = (path, fn, scope) => {
            var body = layoutr.body[0],
                link = document.createElement('link');

            link.setAttribute('href', path);
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');

            var sheet, cssRules;

            // get the correct properties to check for depending on the browser
            if ('sheet' in link) {
                sheet = 'sheet';
                cssRules = 'cssRules';
            }
            else {
                sheet = 'styleSheet';
                cssRules = 'rules';
            }

            let interval_id = setInterval(function () {
                try {
                    if (link[sheet] && link[sheet][cssRules].length) {
                        clearInterval(interval_id);
                        clearTimeout(timeout_id);
                        fn.call(scope || window, true, link);
                    }
                } catch (e) { } finally { }
            }, 10),
                timeout_id = setTimeout(function () {
                    clearInterval(interval_id);
                    clearTimeout(timeout_id);
                    body.removeChild(link);
                    fn.call(scope || window, false, link);
                }, 15000);

            body.appendChild(link);

            return link;
        }

        layoutr.showLoading();
        let stylesheet = layoutr.body.children('link[rel="stylesheet"][href^="' + layoutr.host + 'dist/css/theme/"]'),
            href = stylesheet.attr('href'),
            split1 = href.split('/'),
            split2 = split1[split1.length - 1].split('.');
        href = [];
        for (let i = 0; i < split1.length - 1; i++) {
            href.push(split1[i] + '/');
        }
        let theme = id.substring(id.indexOf("-") + 1);
        href.push(theme);

        for (let i = 1; i < split2.length; i++) {
            href.push('.' + split2[i]);
        }
        href = href.join("");
        loadStyleSheet(href, (success, link) => {
            if (success) {
                stylesheet.remove();
            }
            else {
                layoutr.showPopupAlert('Failed to load theme', 'danger');
            }
            layoutr.hideLoading();
        });
    }
}());