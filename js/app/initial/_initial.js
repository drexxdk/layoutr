(function () {
    "use strict";

    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

    var l = window.location;
    var segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
    layoutr.host = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/';

    layoutr.awaitInterval = 50;

    layoutr.isLocalhost = l.hostname === 'localhost' || l.hostname === '127.0.0.1' || l.hostname === '192.168.40.100';

    layoutr.settings = JSON.parse(localStorage.getItem("settings"));
    if (layoutr.settings === null) layoutr.settings = [];

    var theme = 'light';
    layoutr.settings.forEach((entry) => {
        if (entry.name === 'theme') {
            theme = entry.id.substring(entry.id.indexOf("-") + 1);
        }
    });
    
    layoutr.promiseCSS = layoutr.load.css(layoutr.host + "dist/css/theme/" + theme + '.css').catch(() => {
        console.log('Failed to load css');
    });
}());