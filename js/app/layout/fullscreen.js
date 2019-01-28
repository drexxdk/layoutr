{
    let fullscreenScrollTop;

    layoutr.requestFullScreen = () => {
        if (!layoutr.fullscreen && bowser.desktop) {
            fullscreenScrollTop = layoutr.scrollTop();
            if (layoutr.document.requestFullscreen) {
                layoutr.document.requestFullscreen();
            }
            else if (layoutr.document.msRequestFullscreen) {
                layoutr.document.msRequestFullscreen();
            }
            else if (layoutr.document.mozRequestFullScreen) {
                layoutr.document.mozRequestFullScreen();
            }
            else if (layoutr.document.webkitRequestFullscreen) {
                layoutr.document.webkitRequestFullscreen();
            }
        }
    };

    let fullscreenChange = () => {
        layoutr.fullscreen = !layoutr.fullscreen;
        if (!layoutr.fullscreen && bowser.desktop) {
            if (layoutr.isModal()) {
                layoutr.closeModal();
            }
            layoutr.body.scrollTop(fullscreenScrollTop);
            layoutr.html.scrollTop(fullscreenScrollTop);
        }
    };

    document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
    document.addEventListener('mozfullscreenchange', fullscreenChange, false);
    document.addEventListener('fullscreenchange', fullscreenChange, false);
    document.addEventListener('MSFullscreenChange', fullscreenChange, false);

    layoutr.exitFullScreen = () => {
        if (layoutr.fullscreen && bowser.desktop) {
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

    layoutr.toggleFullScreen = (element) => {
        if (layoutr.fullscreen)
            exitFullScreen();
        else
            requestFullScreen(element);
    };
}