var app = app || {};

var googleMaps;
app.checkGoogleMaps = function () {
    if (googleMaps !== undefined) {
        if (app.main.hasClass(app.transition)) {
            setTimeout(function () {
                google.maps.event.trigger(googleMaps, 'resize');
            }, app.transitionTime);
        } else {
            google.maps.event.trigger(googleMaps, 'resize');
        }
        return true;
    } else {
        return false;
    }
};