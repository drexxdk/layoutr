// source map is not generated for minified css
var suffix = '.css';
if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    suffix = ".min" + suffix;
}
loadCSS("dist/css/app" + suffix);