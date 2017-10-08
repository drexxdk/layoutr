var app = app || {};
var youtube;
$(function () {
    app.content.on('click', '#toggle-youtube', function () {
        if (youtube === undefined) {
            app.content.find('> .content > div').prepend('<section id="youtube"><div class="embed-responsive embed-responsive-16by9"><iframe src="https://www.youtube.com/embed/7flYUW9-A_M" allowfullscreen></iframe></div></section>');
            youtube = app.content.find('#youtube');
        } else {
            youtube.toggle();
        }
    });
});