var app = app || {};

$.validator.setDefaults({
    submitHandler: function () {
        alert("Submitted!");
    }
});

$.validator.addMethod('password', function (value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
}, 'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number');

app.addValidation = function (form, rules, messages) {
    form.validate({
        rules: rules,
        messages: messages,
        errorElement: "em",
        errorPlacement: function (error, element) {
            element = element.parent();
            if (element.hasClass('checkbox') || element.hasClass('radio') || element.hasClass('input-group')) {
                element = element.parent();
            }
            element.append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("theme-danger").removeClass("theme-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("theme-success").removeClass("theme-danger");
        }
    });
    form.on('change', 'input, textarea, select', function () {
        $(this).valid();
    });
};