var app = app || {};

app.page1 = function () {
    app.content.load('ajax/content/page1.html', function () {
        setTimeout(function () {
            app.toggleAside();
        }, 200);
        app.contentHeader = app.content.children('.header');
        app.lazyload(app.content.find('.lazy'));
        app.accordion(app.content.find('.accordion'));
        app.dropdown(app.content.find('select.dropdown'));

        app.content.find('#font_size').slider({
            min: 12,
            max: 20,
            step: 2,
            value: 16,
            focus: true
        });

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
                agree: "required",
                font_size: "required"
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

        var alert = [];
        alert.push('<div class="alert theme-primary">');
        alert.push('<div><p>This is a primary alert—check it out!</p></div>');
        alert.push('<button class="close" aria-label="Close popup"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button>');
        alert.push('</div>');
        alert = alert.join('');

        app.content.find('#popup-position').on('click', '.btn', function () {
            var position = $(this).attr('data-position');
            var popup = app.main.children('.popup[data-position="' + position + '"]');

            if (popup.length) {
                popup.append(alert);
            } else {
                var html = [];
                //  position ' + position + '
                html.push('<div class="popup position ' + position + '" data-position="' + position + '">');
                html.push(alert);
                html.push('</div>');
                html = html.join("");
                app.main.prepend(html);
            }
        });
    });
};