var app = app || {};

$(() => {
    $.validator.setDefaults({
        submitHandler: () => {
            alert("Fake submitted!");
        }
    });

    $.validator.addMethod('password_regex', (value) => {
        return /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{8,}$/.test(value);
    }, 'Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number');
});

app.addValidation = (form, rules, messages) => {
    form.validate({
        rules: rules,
        messages: messages,
        errorElement: "em",
        errorPlacement: (error, element) => {
            element = element.parent();
            if (element.hasClass('checkbox') || element.hasClass('radio') || element.hasClass('input-group')) {
                element = element.parent();
            }
            element.append(error);
        },
        highlight: (element, errorClass, validClass) => {
            $(element).parents(".form-group").addClass("theme-danger");
        },
        unhighlight: (element, errorClass, validClass) => {
            $(element).parents(".form-group").removeClass("theme-danger");
        }
    });
    form.on('change', 'input, textarea, select', (e) => {
        $(e.currentTarget).valid();
    });
};