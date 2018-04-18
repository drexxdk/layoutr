var app = app || {};

$(function () {
    app.authentication.on('click', '> div > button', function () {
        var $this = $(this);
        var type = $this.attr('data-type');
        if (app.html.attr('data-authentication') === type) {
            app.html.attr('data-authentication', '');
        } else {
            app.html.attr('data-authentication', type);
            app.unauthenticated.find('> div').focus();
        }
    });
    
    app.authenticatedLinks.on('click', '> a', function (e) {
        e.preventDefault();
    });
});