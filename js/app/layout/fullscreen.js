var app = app || {};

app.isFullScreen = function () {
    return document.fullScreenElement && document.fullScreenElement !== null
        || document.mozFullScreen
        || document.webkitIsFullScreen;
};

app.requestFullScreen = function () {
    if (app.document.requestFullscreen)
        app.document.requestFullscreen();
    else if (app.document.msRequestFullscreen)
        app.document.msRequestFullscreen();
    else if (app.document.mozRequestFullScreen)
        app.document.mozRequestFullScreen();
    else if (app.document.webkitRequestFullscreen)
        app.document.webkitRequestFullscreen();
};

app.exitFullScreen = function () {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
};

app.toggleFullScreen = function (element) {
    if (isFullScreen())
        exitFullScreen();
    else
        requestFullScreen(element);
};