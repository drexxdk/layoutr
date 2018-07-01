var app = app || {};

// responsive-background
app.checkRb = function (elements) {
    function setRb(element) {
        let image = element.attr('data-rb-image'),
            filetype = element.attr('data-rb-image-filetype'),
            sizesWidth = element.attr('data-rb-sizes'),
            current = element.attr('data-rb-current'),
            aspectRatio = element.attr('data-rb-aspect-ratio');
        if (image !== undefined && image.length &&
            filetype !== undefined && filetype.length &&
            sizesWidth !== undefined && sizesWidth.length &&
            aspectRatio !== undefined && aspectRatio.length) {
            if ((filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png') &&
                (aspectRatio === '21by9' || aspectRatio === '16by9' || aspectRatio === '4by3' || aspectRatio === '1by1')) {
                sizesWidth = sizesWidth.replace(/\s/g, '').split(',').sort(function (a, b) { return a - b; });
                let goalWidth = element.width(),
                    goalHeight = element.height(),
                    closestWidth,
                    closestHeight,
                    heightPercentage;

                function getHeightInPercentage(num, amount) {
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

                function getHeightInPixels(num, amount) {
                    return num * amount / 100;
                };

                $.each(sizesWidth, function (index) {
                    let width = parseInt(this),
                        height = getHeightInPixels(heightPercentage, width);
                    if (closestWidth === undefined || width < goalWidth || closestWidth < goalWidth ||
                        closestHeight === undefined || height < goalHeight || closestHeight < goalHeight) {
                        closestWidth = width;
                        closestHeight = height;
                    }
                });

                if (current !== undefined && current.length && parseInt(current) < closestWidth || current === undefined || current.length === 0) {
                    app.body.append('<img id="rb" class="hidden" src="' + image + '-' + closestWidth + '.' + filetype + '" />');
                    let tempImage = app.body.children('#rb');
                    tempImage.on('load', function () {
                        tempImage.remove();
                        let src = 'url(' + image + '-' + closestWidth + '.' + filetype + ')';
                        element.css('background-image', src);
                        element.attr('data-rb-current', closestWidth);
                    });
                }
            }
        }
    }

    if(elements.length) {
        elements.each(function (i, e) {
            let element = $(e);
            setRb(element);
            $(window).on('resize.rb', function () {
                setRb(element);
            });

            app.html.on('aside-changed', function () {
                setRb(element);
            });
        });

    } else {
        $(window).off('resize.rb');
    }
    
};