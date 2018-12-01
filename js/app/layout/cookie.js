var app = app || {};

app.cookie.addEventListener('click', () => {
    if (e.target.matches('#cookie-accept')) {
        localStorage.setItem('cookie', 'cookie');
        app.html.removeClass('cookie');
    }
});

let cookie = localStorage.getItem("cookie");
if (cookie === null) {
    app.html.classList.add('cookie');
}