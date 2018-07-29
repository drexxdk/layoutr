var app = app || {};

app.setOnline = () => {
    let online = navigator.onLine;

    app.body.find('.alert[data-type="connected"]').remove();
    if (online) {
        app.showPopupAlert('You are online', 'success', 'bottom right', 'connected');
    } else {
        app.showPopupAlert('You are offline', 'danger', 'bottom right', 'connected');
    }
}

window.addEventListener('load', function () {
    window.addEventListener('online', app.setOnline);
    window.addEventListener('offline', app.setOnline);
});

if (!navigator.onLine) {
    app.setOnline();
}