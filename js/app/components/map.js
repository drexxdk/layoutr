var google;

(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.checkMap = (maps) => {
        layoutr.head.find('script[src^="https://maps.googleapis.com/maps-api-"]').remove();
        if (maps.length) {

            if (!layoutr.html.hasClass('map-loaded')) {
                layoutr.head.append($('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcomDjRS4Nu3RQCkkSIQ0nrBhuQM0gng"></script>'));
                layoutr.html.addClass('map-loaded');
            }
            let awaitInterval = setInterval(() => {
                if (google !== undefined) {
                    clearInterval(awaitInterval);
                    maps.each((i, e) => {
                        let $this = $(e),
                            lat = layoutr.tryParseFloat($this.attr('data-lat'), 37.4029937),
                            lng = layoutr.tryParseFloat($this.attr('data-lng'), -122.1811793),
                            zoom = layoutr.tryParseInt($this.attr('data-zoom'), 4),
                            cords = { lat: lat, lng: lng };

                        let map = new google.maps.Map($this[0], {
                            zoom: zoom,
                            center: cords
                        });

                        let marker = new google.maps.Marker({
                            position: cords,
                            map: map
                        });

                        $(window).bind('resize.map', $.throttle(layoutr.throttleInterval, false, () => {
                            google.maps.event.trigger($this[0], 'resize');
                        }));

                        layoutr.html.on('aside-changed.map', () => {
                            google.maps.event.trigger($this[0], 'resize');
                        });
                    });
                }
            }, layoutr.awaitInterval);
        } else {
            $(window).unbind('resize.map');
            layoutr.html.off('aside-changed.map');
        }
    };
}(window));