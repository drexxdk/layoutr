var app = app || {};

app.responsiveBackground = function (elements) {
    var images;
    if (elements !== undefined && elements.length) {
        images = elements;
    } else {
        images = app.body.find('.responsive-background');
    }
    images.each(function () {
        var $this = $(this);
        var image = $this.attr('data-responsive-background-image');
        var filetype = $this.attr('data-responsive-background-image-filetype');
        var sizesWidth = $this.attr('data-responsive-background-sizes');
        var current = $this.attr('data-responsive-background-current');
        var aspectRatio = $this.attr('data-aspect-ratio');
        if (image !== undefined && image.length &&
            filetype !== undefined && filetype.length &&
            sizesWidth !== undefined && sizesWidth.length &&
            aspectRatio !== undefined && aspectRatio.length) {
            if ((filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png') &&
                (aspectRatio === '21by9' || aspectRatio === '16by9' || aspectRatio === '4by3' || aspectRatio === '1by1')) {
                sizesWidth = sizesWidth.replace(/\s/g, '').split(',');
                sizesWidth = sizesWidth.sort(function (a, b) { return a - b; });
                var goalWidth = $this.width();
                var goalHeight = $this.height();
                var closestWidth = null;
                var closestHeight = null;
                var heightPercentage;

                function getHeightInPercentage(num, amount) {
                    return (num * 100) / amount;
                }

                if (aspectRatio === '21by9') {
                    heightPercentage = getHeightInPercentage(9, 21);
                } else if (aspectRatio === '16by9') {
                    heightPercentage = getHeightInPercentage(9, 16);

                } else if (aspectRatio === '4by3') {
                    heightPercentage = getHeightInPercentage(3, 4);

                } else if (aspectRatio === '1by1') {
                    heightPercentage = 100;
                }

                function getHeightInPixels(num, amount) {
                    return num * amount / 100;
                }

                $.each(sizesWidth, function (index) {
                    var $this = parseInt(this);
                    var height = getHeightInPixels(heightPercentage, $this);
                    if (closestWidth === null || Math.abs($this - goalWidth) < Math.abs(closestWidth - goalWidth) || closestWidth < goalWidth ||
                        closestHeight === null || height < goalHeight || closestHeight < goalHeight) {
                        closestWidth = $this;
                        closestHeight = height;
                    }
                });

                if (current !== undefined && current.length && parseInt(current) < closestWidth || current === undefined || current.length === 0) {
                    app.body.append('<img id="responsive-background" class="hidden" src="' + image + '-' + closestWidth + '.' + filetype + '" />');
                    var tempImage = app.body.children('#responsive-background');
                    tempImage.on('load', function () {
                        tempImage.remove();
                        var src = 'url(' + image + '-' + closestWidth + '.' + filetype + ')';
                        $this.css('background-image', src);
                        $this.attr('data-responsive-background-current', closestWidth);
                    });
                }
            }
        }
    });
};

$(window).resize(function () {
    app.responsiveBackground();
});