{
    layoutr.checkMedia = (media) => {
        if (media.length) {
            if (!layoutr.html.hasClass('media-loaded')) {
                layoutr.showLoading();
                layoutr.promiseMedia = Promise.all([
                    layoutr.load.css('dist/css/plyr.css'),
                    layoutr.load.js('dist/js/plyr.js')
                ]).finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('media-loaded');
            }

            layoutr.promiseMedia.then(() => {
                media.each((i, item) => {
                    let player = new Plyr(item);

                    player.on('play', function () {
                        if (layoutr.media !== player && layoutr.media.playing) {
                            layoutr.media.pause();
                        }
                        layoutr.media = player;
                    });
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load media', 'danger');
                console.error(e);
            });
        }
    };

    layoutr.destroyMedia = () => {
        if (layoutr.media && layoutr.media.playing) {
            layoutr.media.destroy();
        }
    };

    layoutr.pauseMedia = () => {
        if (layoutr.media && layoutr.media.playing) {
            layoutr.media.pause();
        }
    };
}