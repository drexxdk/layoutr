(function () {
    "use strict";

    layoutr.loadTheme = (id) => {
        let stylesheet = layoutr.head.children('link[rel="stylesheet"][href^="' + layoutr.host + 'dist/css/theme/"]'),
            href1 = stylesheet.attr('href'),
            split1 = href1.split('/'),
            split2 = split1[split1.length - 1].split('.');
        let href2 = [];
        for (let i = 0; i < split1.length - 1; i++) {
            href2.push(split1[i] + '/');
        }
        let theme = id.substring(id.indexOf("-") + 1);
        href2.push(theme);

        for (let i = 1; i < split2.length; i++) {
            href2.push('.' + split2[i]);
        }
        href2 = href2.join("");
        if (href1 !== href2) {
            layoutr.showLoading();
            layoutr.load.css(href2).then(() => {
                stylesheet.remove()
                layoutr.hideLoading();
            }).catch(() => {
                layoutr.hideLoading();
                layoutr.showPopupAlert('Failed to load theme', 'danger');
            });
        }
    }
}());