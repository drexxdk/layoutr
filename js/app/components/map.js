var app = app || {};

app.map = function (maps) {
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcomDjRS4Nu3RQCkkSIQ0nrBhuQM0gng', function () {
        maps.each(function () {
            var $this = $(this),
                lat = app.tryParseFloat($this.attr('data-lat'), 37.4029937),
                lng = app.tryParseFloat($this.attr('data-lng'), -122.1811793),
                zoom = app.tryParseInt($this.attr('data-zoom'), 4),
                cords = { lat: lat, lng: lng };

            var map = new google.maps.Map($this[0], {
                zoom: zoom,
                center: cords
            });

            var marker = new google.maps.Marker({
                position: cords,
                map: map
            });

            $(window).on("throttledresize.map", function () {
                google.maps.event.trigger($this[0], 'resize');
            });
        });
    });
};