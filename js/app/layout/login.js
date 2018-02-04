var app = app || {};

app.loginForm = function () {
    app.addValidation(
        app.modal.find('#login'),
        {
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                password: true
            }
        },
        {
            username: {
                required: "Please enter your username",
            },
            password: {
                required: "Please enter your password"
            },
        }
    );
};