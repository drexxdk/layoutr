var app = app || {};

$(function () {
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
            var sizes = $this.attr('data-responsive-background-sizes');
            var current = $this.attr('data-responsive-background-current');
            if (image !== undefined && image.length &&
                filetype !== undefined && filetype.length &&
                sizes !== undefined && sizes.length) {
                if (filetype === 'jpg' || filetype === 'jpeg' || filetype === 'png') {
                    sizes = sizes.replace(/\s/g, '').split(',');
                    sizes = sizes.sort(function (a, b) { return a - b; });
                    var goal = $this.width();
                    var closest = null;
                    $.each(sizes, function () {
                        if (closest === null || Math.abs(this - goal) < Math.abs(closest - goal) || closest < goal) {
                            closest = parseInt(this);
                        }
                    });

                    if (current !== undefined && current.length && parseInt(current) < closest || current === undefined || current.length === 0) {
                        app.body.append('<img id="responsive-background" class="hidden" src="' + image + '-' + closest + '.' + filetype + '" />');
                        var tempImage = app.body.children('#responsive-background');
                        tempImage.on('load', function () {
                            tempImage.remove();
                            var src = 'url(' + image + '-' + closest + '.' + filetype + ')';
                            $this.css('background-image', src);
                            $this.attr('data-responsive-background-current', closest);
                        });
                    }
                }
            }
        });
    };

    $(window).resize(function () {
        app.responsiveBackground();
    });
});