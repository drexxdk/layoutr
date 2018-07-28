var app = app || {};

window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        let online = navigator.onLine;

        app.body.find('.alert[data-type="connected"]').remove();
        if (online) {
            app.showPopupAlert('You are now online', 'success', 'bottom right', 'connected');
        } else {
            app.showPopupAlert('You are now offline', 'danger', 'bottom right', 'connected');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});