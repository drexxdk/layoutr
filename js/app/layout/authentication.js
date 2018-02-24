var app = app || {};

$(function () {

    app.unauthenticated.on('click', '> button', function () {
        var $this = $(this);
        var type = $this.attr('data-type');
        if (app.unauthenticated.attr('data-type') === type) {
            app.unauthenticated.attr('data-type', '');
        } else {
            app.unauthenticated.attr('data-type', type);
            app.unauthenticated.find('> div').focus();
        }
    });

    app.authenticated.on('click', '> button', function () {
        var $this = $(this).parent();
        $this.toggleClass('open');
        if ($this.hasClass('open')) {
            app.authenticated.find('> div').focus();
        } else {
            var scrollTop = app.scrollTop();
            app.main.focus();
            app.body.scrollTop(scrollTop); // edge, safari
            app.html.scrollTop(scrollTop); // chrome, firefox, ie
        }
    });

    app.authenticatedLinks.on('click', '> a', function (e) {
        e.preventDefault();
    });
});