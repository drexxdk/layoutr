var app = app || {};

let l = window.location;
app.isLocalhost = l.hostname === "localhost" || l.hostname === "127.0.0.1";
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
let segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
app.host = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/';

// source map is not generated for minified css
let suffix = '.css';
if (!app.isLocalhost) {
    suffix = ".min" + suffix;
}
let theme = 'light';
app.settings = JSON.parse(localStorage.getItem("settings"));
if (app.settings === null) app.settings = [];
app.settings.forEach(function (entry) {
    if (entry.name === 'theme') {
        theme = entry.id.substring(entry.id.indexOf("-") + 1);
    }
});
loadCSS(app.host + "dist/css/theme/" + theme + suffix);
