var app = app || {};

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