{
    layoutr.checkMedia = (media) => {
        if (media.length) {
            if (!layoutr.html.hasClass('media-loaded')) {
                layoutr.showLoading();
                layoutr.promiseMedia = layoutr.load.js(layoutr.host + layoutr.jsDist + 'plyr.js').finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('media-loaded');
            }

            layoutr.promiseMedia.then(() => {
                media.each((i, item) => {
                    let player;
                    if (item.nodeName === "AUDIO") {
                        player = new Plyr(item, {
                            controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume']
                        });
                    } else {
                        player = new Plyr(item, {
                            controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'fullscreen']
                        });
                    }

                    player.on('ready', event => {
                        let instance = event.detail.plyr,
                            time = instance.duration,
                            hours = Math.floor(time / 3600),
                            minutes = Math.floor(time / 60),
                            seconds = Math.floor(time - minutes * 60);
                        let result = '';
                        if (hours) {
                            result += hours.toString().padStart(2, '0') + ':';
                        }
                        result += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
                        instance.elements.display.duration.innerHTML = result;
                    });

                    player.on('play', function () {
                        if (layoutr.media !== undefined && layoutr.media !== player && layoutr.media.playing) {
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