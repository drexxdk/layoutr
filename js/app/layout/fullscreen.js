var app = app || {};

app.isFullScreen = function () {
    return document.fullScreenElement && document.fullScreenElement !== null
        || document.mozFullScreen
        || document.webkitIsFullScreen;
};

var fullscreenScrollTop;

app.requestFullScreen = function () {
    if (bowser.desktop) {
        fullscreenScrollTop = app.scrollTop();
        if (app.document.requestFullscreen)
            app.document.requestFullscreen();
        else if (app.document.msRequestFullscreen)
            app.document.msRequestFullscreen();
        else if (app.document.mozRequestFullScreen)
            app.document.mozRequestFullScreen();
        else if (app.document.webkitRequestFullscreen)
            app.document.webkitRequestFullscreen();
    }
};

if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', fullscreenEnded, false);
    document.addEventListener('mozfullscreenchange', fullscreenEnded, false);
    document.addEventListener('fullscreenchange', fullscreenEnded, false);
    document.addEventListener('MSFullscreenChange', fullscreenEnded, false);

    function fullscreenEnded() {
        if (bowser.desktop && (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)) {
            app.body.scrollTop(fullscreenScrollTop);
            app.html.scrollTop(fullscreenScrollTop);
        }
    };
}

app.exitFullScreen = function () {
    if (bowser.desktop) {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
    }
};

app.toggleFullScreen = function (element) {
    if (isFullScreen())
        exitFullScreen();
    else
        requestFullScreen(element);
};