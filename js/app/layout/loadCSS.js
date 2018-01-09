var app = app || {};

app.isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

// source map is not generated for minified css
var suffix = '.css';
if (!app.isLocalhost) {
    suffix = ".min" + suffix;
}
loadCSS("dist/css/app" + suffix);