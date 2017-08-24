$(function () {
    var $main = $('#main'),
        $content = $('#content'),
        $header = $('header'),
        $footer = $('footer'),
        $left = $('#left'),
        $right = $('#right'),
        $html = $('html'),
        $body = $('body'),
        googleMaps,
        transitionTime = 400;

    if (bowser.msedge) {
        $main.addClass('msedge');
    } else if (bowser.msie) {
        $main.addClass('msie');
    }

    $footer.html('\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen');

    $('.aside').click(function () {
        var $this = $(this);
        if ($this.is('#toggle-menu')) {
            $main.toggleClass('left-open').removeClass('right-open');
        } else if ($this.is('#toggle-settings')) {
            $main.toggleClass('right-open').removeClass('left-open');
        }
        checkGoogleMaps();
    });

    if ($main.hasClass('close-left-click-outside') || $main.hasClass('close-right-click-outside')) {
        $(document).click(function (e) {
            var target = $(e.target);
            if (!target.closest("#loading").length && !target.closest(".aside").length) {
                if ($main.hasClass('close-left-click-outside') && !target.closest("#left").length) {
                    $main.removeClass('left-open');
                } else if ($main.hasClass('close-right-click-outside') && !target.closest("#right").length) {
                    $main.removeClass('right-open');
                }
                checkGoogleMaps();
            }
        });
    }
    
    $body.on('click', '#toggle-loading', function () {
        showLoading();
        setTimeout(function () {
            hideLoading();
        }, 2000);
    });

    $body.on('click', '#toggle-footer-position', function () {
        $main.toggleClass('footer-fixed');
    });

    $body.on('click', '#toggle-column', function () {
        $main.toggleClass('one-column two-column');
        checkGoogleMaps();
    });

    $body.on('click', '#toggle-transition', function () {
        $main.toggleClass('transition');
    });

    var showLoading = function () {
        var initWidth = $body.outerWidth();
        var initHeight = $body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        $html.data('scroll-position', scrollPosition);
        $html.data('previous-overflow', $html.css('overflow'));
        $html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        var marginR = $body.outerWidth() - initWidth;
        var marginB = $body.outerHeight() - initHeight;
        $body.addClass('loading');
        $body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
        $header.css({ 'padding-right': marginR });
        if ($main.hasClass('right-open')) {
            $right.css({
                'max-width': $right.width() + marginR,
                'padding-right': marginR
            });
        }
        if ($main.hasClass('footer-fixed')) {
            $footer.css({ 'padding-right': marginR });
        }
    }

    var hideLoading = function() {
        $html.css('overflow', $html.data('previous-overflow'));
        var scrollPosition = $html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        $body.removeAttr('style');
        $header.removeAttr('style');
        $right.removeAttr('style');
        $footer.removeAttr('style');
        $body.removeClass('loading');
    }

    var checkGoogleMaps = function () {
        if (googleMaps !== undefined) {
            if ($main.hasClass('transition')) {
                setTimeout(function () {
                    google.maps.event.trigger(googleMaps, 'resize');
                }, transitionTime);
            } else {
                google.maps.event.trigger(googleMaps, 'resize');
            }
            return true;
        } else {
            return false;
        }
    }

    $body.on('click', '#toggle-google-maps', function () {
        if (!checkGoogleMaps()) {
            $content.find('> .content > div').prepend('<section><div id="google-maps" class="embed-responsive embed-responsive-16by9"></div></section>');
            googleMaps = document.getElementById('google-maps');
            var uluru = { lat: -25.363, lng: 131.044 };
            var map = new google.maps.Map(googleMaps, {
                zoom: 4,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
            $(window).resize(function () {
                google.maps.event.trigger(googleMaps, 'resize');
            });
        } else {
            $(googleMaps).toggle();
        }
    });

    $content.load("ajax/content/page1.html");
});