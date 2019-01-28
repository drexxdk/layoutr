{
    layoutr.setOnline = () => {
        let online = navigator.onLine;

        layoutr.body.find('.alert[data-type="connected"]').remove();
        if (online) {
            layoutr.showPopupAlert('You are online', 'success', 'bottom right', 'connected');
        } else {
            layoutr.showPopupAlert('You are offline', 'danger', 'bottom right', 'connected');
        }
    };

    $(() => {
        window.addEventListener('online', layoutr.setOnline);
        window.addEventListener('offline', layoutr.setOnline);

        if (!navigator.onLine) {
            layoutr.setOnline();
        }
    });
}