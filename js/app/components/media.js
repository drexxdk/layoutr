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
                    new Plyr(item);
                });
            }).catch(() => {
                layoutr.showPopupAlert('Failed to load media', 'danger');
            });
        }
    };
}