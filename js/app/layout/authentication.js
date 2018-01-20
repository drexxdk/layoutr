var app = app || {};

$(function () {
    app.authenticated.on('click', '> button', function () {
        var $this = $(this).parent();
        $this.toggleClass('open');
        if ($this.hasClass('open')) {
            app.authenticated.find('> div > div').focus();
        } else {
            app.main.focus();
        }
    });
});