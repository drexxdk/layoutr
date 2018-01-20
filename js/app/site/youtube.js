var app = app || {};

$(function () {
    app.content.on('click', '#toggle-youtube', function () {
        if (app.youtube === undefined) {
            $('<div id="youtube" class="full-width"><div class="embed aspect-ratio-16by9"><iframe src="https://www.youtube.com/embed/ue80QwXMRHg" allowfullscreen></iframe></div></div>').insertAfter($(this));
            app.youtube = app.content.find('#youtube');
        } else {
            app.youtube.toggle();
        }
    });
});