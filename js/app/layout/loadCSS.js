var app = app || {};

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
app.host = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/';


app.settings = JSON.parse(localStorage.getItem("settings"));
if (app.settings === null) app.settings = [];

// source map is not generated for minified css
var suffix = '.css';
if (!app.isLocalhost) {
    suffix = ".min" + suffix;
}
var theme = 'light';
app.settings.forEach(function (entry) {
    if (entry.name === 'theme') {
        theme = entry.id.substring(entry.id.indexOf("-") + 1);
    }
});
var stylesheet = loadCSS(app.host + "dist/css/theme/" + theme + suffix);
onloadCSS(stylesheet, function () {
    let body = document.body;
    let awaitCSS = setInterval(() => {
        var visibility = window.getComputedStyle(body, null).getPropertyValue('visibility');
        if (visibility !== 'hidden') {
            clearInterval(awaitCSS);
            app.cssLoaded = true;
        }
    });
});