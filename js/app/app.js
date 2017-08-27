var app = app || {};

$(function () {
    app.main = $('#main');
    app.content = $('#content');
    app.header = $('header');
    app.footer = $('footer');
    app.left = $('#left');
    app.right = $('#right');
    app.html = $('html');
    app.body = $('body');
    app.html = $('html');
    app.transitionTime = 400;

    var youtube;

    if (bowser.msedge) {
        app.main.addClass('msedge');
    } else if (bowser.msie) {
        app.main.addClass('msie');
    }

    app.footer.html('\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen');

    $('.aside').click(function () {
        var $this = $(this);
        if ($this.is('#toggle-menu')) {
            app.main.toggleClass('left-open').removeClass('right-open');
        } else if ($this.is('#toggle-settings')) {
            app.main.toggleClass('right-open').removeClass('left-open');
        }
        app.checkGoogleMaps();
    });

    if (app.main.hasClass('close-left-click-outside') || app.main.hasClass('close-right-click-outside')) {
        $(document).click(function (e) {
            var target = $(e.target);
            if (!target.closest("#loading").length && !target.closest(".aside").length) {
                if (app.main.hasClass('close-left-click-outside') && !target.closest("#left").length) {
                    app.main.removeClass('left-open');
                } else if (app.main.hasClass('close-right-click-outside') && !target.closest("#right").length) {
                    app.main.removeClass('right-open');
                }
                app.checkGoogleMaps();
            }
        });
    }

    app.body.on('click', '#toggle-youtube', function () {
        if (youtube === undefined) {
            app.content.find('> .content > div').prepend('<section id="youtube"><div class="embed-responsive embed-responsive-16by9"><iframe src="https://www.youtube.com/embed/HZ5m_nlfZe4?ecver=2" allowfullscreen></iframe></div></section>');
            youtube = app.content.find('#youtube');
        } else {
            youtube.toggle();
        }
    });

    app.body.on('click', '#toggle-google-maps', function () {
        if (!app.checkGoogleMaps()) {
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBEcomDjRS4Nu3RQCkkSIQ0nrBhuQM0gng', function (data, textStatus, jqxhr) {
                app.content.find('> .content > div').prepend('<section id="google-maps"><div class="embed-responsive embed-responsive-16by9"></div></section>');
                googleMaps = document.getElementById('google-maps').children[0];
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
            });

        } else {
            $(googleMaps).toggle();
        }
    });

    app.content.load("ajax/content/page1.html", function () {
        app.addValidation(app.content.find('#form'));
    });
});