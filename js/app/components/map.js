var app = app || {},
    google;

app.checkMap = function (maps) {
    app.head.find('script[src^="https://maps.googleapis.com/maps-api-"]').remove();
    if (maps.length) {
        if (!app.html.hasClass('map-loaded')) {
            app.head.append($('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcomDjRS4Nu3RQCkkSIQ0nrBhuQM0gng"></script>'));
            app.html.addClass('map-loaded');
        }

        let timeout = 100;
        function checkGoogle() {
            if (google !== undefined) {
                maps.each(function () {
                    let $this = $(this),
                        lat = app.tryParseFloat($this.attr('data-lat'), 37.4029937),
                        lng = app.tryParseFloat($this.attr('data-lng'), -122.1811793),
                        zoom = app.tryParseInt($this.attr('data-zoom'), 4),
                        cords = { lat: lat, lng: lng };

                    let map = new google.maps.Map($this[0], {
                        zoom: zoom,
                        center: cords
                    });

                    let marker = new google.maps.Marker({
                        position: cords,
                        map: map
                    });

                    $(window).on("throttledresize.map", function () {
                        google.maps.event.trigger($this[0], 'resize');
                    });
                });
                return;
            }
            setTimeout(checkGoogle, timeout);
        };
        checkGoogle();
    } else {
        $(window).off('throttledresize.map');
    }
};