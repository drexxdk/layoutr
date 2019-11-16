{
    layoutr.textboxForm = () => {
        layoutr.addValidation(
            layoutr.content.find('#textbox-form'),
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
                    password_regex: true
                },
                confirm_password: {
                    required: true,
                    // https://stackoverflow.com/questions/2887292/jquery-validation-plugin-equalto-not-working
                    equalTo: "#password1" // bug in jquery.validate doesn't allow same id/name for equalTo
                },
                email: {
                    required: true,
                    email: true
                }
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
                email: "Please enter a valid email address"
            }
        );
    };
}