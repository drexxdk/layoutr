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

    app.body.on('click', '#toggle-youtube', function () {
        if (youtube === undefined) {
            app.content.find('> .content > div').prepend('<section id="youtube"><div class="embed-responsive embed-responsive-16by9"><iframe src="https://www.youtube.com/embed/HZ5m_nlfZe4?ecver=2" allowfullscreen></iframe></div></section>');
            youtube = app.content.find('#youtube');
        } else {
            youtube.toggle();
        }
    });

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.body);
    });
    app.left.load('ajax/layout/menu.html');
    app.content.load('ajax/content/page1.html', function () {
        app.addValidation(app.content.find('#form'));
        
        app.content.find('.accordion').on("click", ".headline", function () {
            var content = $(this).next();
            if (content.hasClass('open')) {
                content.removeClass('open').slideUp("800");
            } else {
                content.parents('.accordion').find(".content.open").not(content).removeClass('open').slideUp("800");
                content.slideToggle("800", function () {
                    content.addClass("open");
                });
            }
        });
    });
});