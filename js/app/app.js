var app = app || {};

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732;
};

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
    app.fadeOutTime = 500;
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;

    if (bowser.msedge) {
        app.main.addClass('msedge');
    } else if (bowser.msie) {
        app.main.addClass('msie');
    }
    if (bowser.mobile) {
        app.main.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.main.addClass('tablet'); // does nothing currently
    } else {
        app.main.addClass('desktop'); // enables hover effects
    }

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    app.main.on('click', '.alert .close', function () {
        var $this = $(this).parent();
        $this.fadeOut(app.fadeOutTime, function () {
            var parent = $this.parent();
            if (parent.hasClass('popup') && parent.children().length === 1) {
                parent.remove();
            } else {
                $this.remove();
            }
        });
    });

    $(window).resize(function () {
        app.setHtmlScroll();
    });
    app.setHtmlScroll();

    $('.aside').click(function () {
        var $this = $(this);
        app.enableHtmlScroll();
        if ($this.is('#toggle-menu')) {
            app.main.toggleClass('left-open').removeClass('right-open');
        } else if ($this.is('#toggle-settings')) {
            app.main.toggleClass('right-open').removeClass('left-open');
        }
        app.setHtmlScroll();
        app.checkGoogleMaps();
    });

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.body);
    });
    app.left.load('ajax/layout/menu.html');
    app.content.load('ajax/content/page1.html', function () {
        app.contentHeader = app.content.children('.header');

        app.addValidation(
            app.content.find('#form'),
            {
                firstName: {
                    required: true,
                    minlength: 2
                },
                lastName: {
                    required: true,
                    minlength: 2
                },
                birthDate: {
                    required: true
                },
                username: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    password: true
                },
                confirm_password: {
                    required: true,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                dropdown_1: "required",
                dropdown_2: "required",
                dropdown_3: "required",
                dropdown_4: "required",
                dropdown_5: "required",
                dropdown_6: "required",
                gender: "required",
                interests: "required",
                agree: "required"
            },
            {
                firstName: {
                    required: "Please enter your first name",
                    minlength: "Your first name must consist of at least 2 characters"
                },
                lastName: {
                    required: "Please enter your last name",
                    minlength: "Your last name must consist of at least 2 characters"
                },
                birthDate: {
                    required: "Please enter your birth date"
                },
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password: {
                    required: "Please provide a password"
                },
                confirm_password: {
                    required: "Please provide a password",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address",
                dropdown_1: "Please select an option",
                dropdown_2: "Please select an option",
                dropdown_3: "Please select an option",
                dropdown_4: "Please select an option",
                dropdown_5: "Please select an option",
                dropdown_6: "Please select an option",
                gender: "Please select your gender",
                interests: "Please select at least one interest",
                agree: "Please accept our policy"
            }
        );

        app.accordion(app.content.find('.accordion'));
        app.dropdown(app.content.find('select'));

        var alert = [];
        alert.push('<div class="alert theme-primary">');
        alert.push('<div><p>This is a primary alert—check it out!</p></div>');
        alert.push('<button class="close" aria-label="Close popup"><svg><use xlink:href="#svg-plus"></use></svg></button>');
        alert.push('</div>');
        alert = alert.join('');

        app.content.find('#popup-position').on('click', '.btn', function () {
            var position = $(this).attr('data-position');
            var popup = app.main.children('.popup[data-position="' + position + '"]');

            if (popup.length) {
                popup.append(alert);
            } else {
                var html = [];
                html.push('<div class="popup" data-position="' + position + '">');
                html.push(alert);
                html.push('</div>');
                html = html.join("");
                app.main.prepend(html);
            }
        });

        app.content.find('.datepicker').datepicker({
            changeMonth: true,
            changeYear: true
        });
    });
});