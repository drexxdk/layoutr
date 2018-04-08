var app = app || {};

app.isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

// source map is not generated for minified css
var suffix = '.css';
if (!app.isLocalhost) {
    suffix = ".min" + suffix;
}
var theme = 'light';
app.settings = JSON.parse(localStorage.getItem("settings"));
if (app.settings === null) app.settings = [];
app.settings.forEach(function (entry) {
    if (entry.name === 'theme') {
        theme = entry.id.substring(entry.id.indexOf("-") + 1);
    }
});
loadCSS("dist/css/theme/" + theme + suffix);