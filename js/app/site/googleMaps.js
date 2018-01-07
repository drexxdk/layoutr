var app = app || {};
var google;

app.checkGoogleMaps = function () {
    if (app.google !== undefined && google !== undefined) {
        if (app.isTransitions()) {
            setTimeout(function () {
                google.maps.event.trigger(app.google, 'resize');
            }, app.transitionTime);
        } else {
            google.maps.event.trigger(app.google, 'resize');
        }
        return true;
    } else {
        return false;
    }
};

$(function () {
    app.content.on('click', '#toggle-google-maps', function () {
        if (!app.checkGoogleMaps()) {
            $('<div id="google-maps"><div class="embed aspect-ratio-16by9"></div></div>').insertAfter($(this));
            app.google = document.getElementById('google-maps').children[0];
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcomDjRS4Nu3RQCkkSIQ0nrBhuQM0gng', function (data, textStatus, jqxhr) {
                var uluru = { lat: -25.363, lng: 131.044 };
                var map = new google.maps.Map(app.google, {
                    zoom: 4,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
                $(window).resize('#google-maps', function () {
                    google.maps.event.trigger(app.google, 'resize');
                });
            });
        } else {
            $(app.google).parent().toggle();
        }
    });
});