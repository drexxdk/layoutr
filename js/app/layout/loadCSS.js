(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    var l = window.location;
    var segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
    layoutr.host = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/';


    layoutr.settings = JSON.parse(localStorage.getItem("settings"));
    if (layoutr.settings === null) layoutr.settings = [];

    var theme = 'light';
    layoutr.settings.forEach(function (entry) {
        if (entry.name === 'theme') {
            theme = entry.id.substring(entry.id.indexOf("-") + 1);
        }
    });
    var stylesheet = loadCSS(layoutr.host + "dist/css/theme/" + theme + '.css');
    onloadCSS(stylesheet, function () {
        let body = document.body;
        let awaitCSS = setInterval(() => {
            var visibility = window.getComputedStyle(body, null).getPropertyValue('visibility');
            if (visibility !== 'hidden') {
                clearInterval(awaitCSS);
                layoutr.cssLoaded = true;
            }
        });
    });
}());