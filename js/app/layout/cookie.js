var app = app || {};

$(function () {
    app.cookie.on('click', '#cookie-accept', function () {
        localStorage.setItem('cookie', 'true');
        app.html.removeClass('cookie');
    });

    var cookie = JSON.parse(localStorage.getItem("cookie"));
    if (cookie === null) {
        app.html.addClass('cookie');
    }
});