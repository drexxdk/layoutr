var app = app || {};
var youtube;
$(function () {
    app.content.on('click', '#toggle-youtube', function () {
        if (youtube === undefined) {
            $('<div id="youtube"><div class="embed-responsive aspect-ratio-16by9"><iframe src="https://www.youtube.com/embed/7flYUW9-A_M" allowfullscreen></iframe></div></div>').insertAfter($(this));
            youtube = app.content.find('#youtube');
        } else {
            youtube.toggle();
        }
    });
});