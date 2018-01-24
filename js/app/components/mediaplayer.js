var app = app || {};

app.mediaplayer = function (mediaplayers) {
    mediaplayers.each(function () {
        var $this = $(this);
        var type = $this.prop('nodeName').toLowerCase();
        if (type === 'audio' || type === 'video') {
            // work in progress
            // trying different plugins
        }
    });
};