var app = app || {};
var youtube;
$(function () {
    app.content.on('click', '#toggle-youtube', function () {
        if (youtube === undefined) {
            $('<div id="youtube"><div class="embed aspect-ratio-16by9"><iframe src="https://www.youtube.com/embed/ue80QwXMRHg" allowfullscreen></iframe></div></div>').insertAfter($(this));
            youtube = app.content.find('#youtube');
        } else {
            youtube.toggle();
        }
    });
});