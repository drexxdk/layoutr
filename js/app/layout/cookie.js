var app = app || {};

$(() => {
    app.cookie.on('click', '#cookie-accept', () => {
        localStorage.setItem('cookie', 'cookie');
        app.html.removeClass('cookie');
    });

    let cookie = localStorage.getItem("cookie");
    if (cookie === null) {
        app.html.addClass('cookie');
    }
});