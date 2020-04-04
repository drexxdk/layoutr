{
    layoutr.checkResponsiveBackground = (elements) => {
        let setRb = (element, clone, image, filetype, sizesWidth, aspectRatio, initial) => {
            let current = element.attr('data-rb-current');
            if (image !== undefined && image.length &&
                filetype !== undefined && filetype.length &&
                sizesWidth !== undefined && sizesWidth.length &&
                aspectRatio !== undefined && aspectRatio.length) {
                if ((filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png') &&
                    (aspectRatio === '21by9' || aspectRatio === '16by9' || aspectRatio === '4by3' || aspectRatio === '1by1')) {
                    sizesWidth = sizesWidth.replace(/\s/g, '').split(',').sort((a, b) => { return a - b; });
                    if (initial) {
                        clone.attr('style', element.attr('style'));
                    }

                    let goalWidth = element.width(),
                        goalHeight = element.height(),
                        closestWidth,
                        closestHeight,
                        heightPercentage;

                    let getHeightInPercentage = (num, amount) => {
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

                    let getHeightInPixels = (num, amount) => {
                        return num * amount / 100;
                    };

                    $.each(sizesWidth, (i, e) => {
                        let width = parseInt(e),
                            height = getHeightInPixels(heightPercentage, width);
                        if (closestWidth === undefined || width < goalWidth || closestWidth < goalWidth ||
                            closestHeight === undefined || height < goalHeight || closestHeight < goalHeight) {
                            closestWidth = width;
                            closestHeight = height;
                        }
                    });

                    if (current !== undefined && current.length && parseInt(current) < closestWidth || current === undefined || current.length === 0) {
                        let src = `${image}-${closestWidth}.${filetype}`;
                        layoutr.load.img(src).then(() => {
                            element.css('background-image', `url(${src})`);
                            setTimeout(() => {
                                clone.css('background-image', `url(${src})`);
                            }, layoutr.imageLoadTime);
                            // Change background-image on two elements at different intervals, to counteract image flickering.
                            element.attr('data-rb-current', closestWidth);
                        }).catch((e) => {
                            layoutr.showPopupAlert('Failed to load responsive background image', 'danger');
                            console.error(e);
                        });
                    }
                }
            }
        };

        if (elements.length) {
            elements.each((i, e) => {
                let element = $(e),
                    image = element.attr('data-rb-image'),
                    filetype = element.attr('data-rb-image-filetype'),
                    sizesWidth = element.attr('data-rb-sizes'),
                    aspectRatio = element.attr('data-rb-aspect-ratio');

                let clone = $('<div class="clone cover"></div>');
                element.append(clone);

                setRb(element, clone, image, filetype, sizesWidth, aspectRatio, true);

                element.sizeChanged($.throttle(layoutr.throttleInterval, false, () => {
                    setRb(element, clone, image, filetype, sizesWidth, aspectRatio, false);
                }));

                layoutr.html.on('columns-changed', () => {
                    setRb(element, clone, image, filetype, sizesWidth, aspectRatio, false);
                });

                layoutr.html.on('aside-changed', () => {
                    setRb(element, clone, image, filetype, sizesWidth, aspectRatio, false);
                });
            });
        }
    };
}