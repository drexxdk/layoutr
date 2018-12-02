(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    $(() => {
        layoutr.authentication.on('click', '> div > button', (e) => {
            let $this = $(e.currentTarget),
                type = $this.attr('data-type');
            if (layoutr.html.attr('data-authentication') === type) {
                layoutr.html.attr('data-authentication', '');
            } else {
                layoutr.html.attr('data-authentication', type);
                layoutr.authentication.children(':last-child').focus();
            }
        });

        layoutr.authenticatedLinks.on('click', '> a', (e) => {
            e.preventDefault();
        });

        layoutr.addValidation(
            layoutr.authentication.find('.register > form'),
            {
                register_username: {
                    required: true,
                    minlength: 2
                },
                register_password: {
                    required: true,
                    password_regex: true
                },
                register_confirm_password: {
                    required: true,
                    equalTo: "#register_password"
                },
                register_email: {
                    required: true,
                    email: true
                }
            },
            {
                register_username: {
                    required: "Please enter your username"
                },
                register_password: {
                    required: "Please enter your password"
                },
                register_confirm_password: {
                    required: "Please provide a password",
                    equalTo: "Please enter the same password as above"
                },
                register_email: "Please enter a valid email address"
            }
        );

        layoutr.addValidation(
            layoutr.authentication.find('.login > form'),
            {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            {
                username: {
                    required: "Please enter your username"
                },
                password: {
                    required: "Please enter your password"
                }
            }
        );
    });
}());