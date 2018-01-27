var app = app || {};

$(function () {
    app.cookie.on('click', '#cookie-accept', function () {
        localStorage.setItem('cookie', 'cookie');
        app.html.removeClass('cookie');
    });

    var cookie = localStorage.getItem("cookie");
    if (cookie === null) {
        app.html.addClass('cookie');
    }
});