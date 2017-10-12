var app = app || {};

app.isSmallBreakpoint = function () {
    return $(window).width() < 732;
}

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
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;

    if (bowser.msedge) {
        app.main.addClass('msedge');
    } else if (bowser.msie) {
        app.main.addClass('msie');
    }
    if (bowser.mobile) {
        app.main.addClass('mobile');
    } else if (bowser.tablet) {
        app.main.addClass('tablet');
    } else {
        app.main.addClass('desktop');
    }
    //app.main.addClass('mobile');

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    $(document).on('click', '.alert .close', function () {
        var $this = $(this).parent();
        $this.fadeOut(500, function () {
            $this.addClass('hidden').css('display', '');
        });
    });

    $('.aside').click(function () {
        var $this = $(this);
        if ($this.is('#toggle-menu')) {
            app.main.toggleClass('left-open').removeClass('right-open');
            if (!app.main.hasClass('desktop')) {
                if (app.isSmallBreakpoint() && app.main.hasClass('left-open')) {
                    app.disableHtmlScroll();
                } else {
                    app.enableHtmlScroll();
                }
            }
            if (app.main.hasClass('left-open')) {
                app.left.children('.content').click();
            } else {
                app.html.focus();
            }
        } else if ($this.is('#toggle-settings')) {
            app.main.toggleClass('right-open').removeClass('left-open');
            if (!app.main.hasClass('desktop')) {
                if (app.isSmallBreakpoint() && app.main.hasClass('right-open')) {
                    app.disableHtmlScroll();
                } else {
                    app.enableHtmlScroll();
                }
            }
            if (app.main.hasClass('right-open')) {
                app.right.children('.content').click();
            } else {
                app.html.focus();
            }
        }
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

        app.content.find('#popup-position').on('click', '.btn', function () {
            var position = $(this).attr('data-position');
            var popup = app.main.children('.popup[data-position="' + position + '"]');
            if (popup.length) {
                popup.toggleClass('hidden');
            } else {
                var html = [];
                html.push('<div class="popup alert theme-primary" data-position="' + position + '">');
                html.push('<div><p>This is a primary alert—check it out!</p></div>');
                html.push('<button class="close" aria-label="Close popup"><svg><use xlink:href="#svg-plus"></use></svg></button>');
                html.push('</div>');
                html = html.join("");
                app.main.prepend(html);
            }
        });

        //app.content.find('.datepicker').datepicker();
        app.content.find('.datepicker').datepicker({
            changeMonth: true,
            changeYear: true
        });

    });
});