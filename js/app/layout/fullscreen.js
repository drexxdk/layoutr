var app = app || {};
var fullscreenScrollTop;

app.requestFullScreen = function () {
    if (!app.fullscreen && bowser.desktop) {
        fullscreenScrollTop = app.scrollTop();
        if (app.document.requestFullscreen) {
            app.document.requestFullscreen();
        }
        else if (app.document.msRequestFullscreen) {
            app.document.msRequestFullscreen();
        }
        else if (app.document.mozRequestFullScreen) {
            app.document.mozRequestFullScreen();
        }
        else if (app.document.webkitRequestFullscreen) {
            app.document.webkitRequestFullscreen();
        }
    }
};

document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
document.addEventListener('mozfullscreenchange', fullscreenChange, false);
document.addEventListener('fullscreenchange', fullscreenChange, false);
document.addEventListener('MSFullscreenChange', fullscreenChange, false);

function fullscreenChange(e) {
    app.fullscreen = !app.fullscreen;
    if (!app.fullscreen && bowser.desktop) {
        if (app.isModal()) {
            app.closeModal();
        }
        app.body.scrollTop(fullscreenScrollTop);
        app.html.scrollTop(fullscreenScrollTop);
    }
};

app.exitFullScreen = function () {
    if (app.fullscreen && bowser.desktop) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
};

app.toggleFullScreen = function (element) {
    if (app.fullscreen)
        exitFullScreen();
    else
        requestFullScreen(element);
};