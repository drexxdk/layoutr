(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    $(() => {
        layoutr.cookie.on('click', '#cookie-accept', () => {
            localStorage.setItem('cookie', 'cookie');
            layoutr.html.removeClass('cookie');
        });

        let cookie = localStorage.getItem("cookie");
        if (cookie === null) {
            layoutr.html.addClass('cookie');
        }
    });
}());