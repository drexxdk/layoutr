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

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.body);
    });
    app.left.load('ajax/layout/menu.html');
    app.content.load('ajax/content/page1.html', function () {
        app.addValidation(
            app.content.find('#form'),
            {
                firstname: "required",
                lastname: "required",
                username: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                agree: "required"
            },
            {
                firstname: "Please enter your firstname",
                lastname: "Please enter your lastname",
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address",
                agree: "Please accept our policy"
            }
        );

        app.accordion(app.content.find('.accordion'));
        
        var youtube;
        app.content.on('click', '#toggle-youtube', function () {
            if (youtube === undefined) {
                app.content.find('> .content > div').prepend('<section id="youtube"><div class="embed-responsive embed-responsive-16by9"><iframe src="https://www.youtube.com/embed/HZ5m_nlfZe4?ecver=2" allowfullscreen></iframe></div></section>');
                youtube = app.content.find('#youtube');
            } else {
                youtube.toggle();
            }
        });
    });
});