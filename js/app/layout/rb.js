﻿var app = app || {};

// responsive-background
app.rb = function () {
    app.content.find('.rb').each(function () {
        var $this = $(this),
            image = $this.attr('data-rb-image'),
            filetype = $this.attr('data-rb-image-filetype'),
            sizesWidth = $this.attr('data-rb-sizes'),
            current = $this.attr('data-rb-current'),
            aspectRatio = $this.attr('data-rb-aspect-ratio');
        if (image !== undefined && image.length &&
            filetype !== undefined && filetype.length &&
            sizesWidth !== undefined && sizesWidth.length &&
            aspectRatio !== undefined && aspectRatio.length) {
            if ((filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png') &&
                (aspectRatio === '21by9' || aspectRatio === '16by9' || aspectRatio === '4by3' || aspectRatio === '1by1')) {
                sizesWidth = sizesWidth.replace(/\s/g, '').split(',').sort(function (a, b) { return a - b; });
                var goalWidth = $this.width(),
                    goalHeight = $this.height(),
                    closestWidth,
                    closestHeight,
                    heightPercentage;

                var getHeightInPercentage = function (num, amount) {
                    return num * 100 / amount;
                };

                if (aspectRatio === '21by9') {
                    heightPercentage = getHeightInPercentage(9, 21);
                } else if (aspectRatio === '16by9') {
                    heightPercentage = getHeightInPercentage(9, 16);

                } else if (aspectRatio === '4by3') {
                    heightPercentage = getHeightInPercentage(3, 4);

                } else if (aspectRatio === '1by1') {
                    heightPercentage = 100;
                }

                var getHeightInPixels = function (num, amount) {
                    return num * amount / 100;
                };

                $.each(sizesWidth, function (index) {
                    var width = parseInt(this),
                        height = getHeightInPixels(heightPercentage, width);
                    if (closestWidth === undefined || width < goalWidth || closestWidth < goalWidth ||
                        closestHeight === undefined || height < goalHeight || closestHeight < goalHeight) {
                        closestWidth = width;
                        closestHeight = height;
                    }
                });

                if (current !== undefined && current.length && parseInt(current) < closestWidth || current === undefined || current.length === 0) {
                    app.body.append('<img id="rb" class="hidden" src="' + image + '-' + closestWidth + '.' + filetype + '" />');
                    var tempImage = app.body.children('#rb');
                    tempImage.on('load', function () {
                        tempImage.remove();
                        var src = 'url(' + image + '-' + closestWidth + '.' + filetype + ')';
                        $this.css('background-image', src);
                        $this.attr('data-rb-current', closestWidth);
                    });
                }
            }
        }
    });
};

$(window).resize(function () {
    app.rb();
});