var app = app || {};

$.validator.setDefaults({
    submitHandler: function () {
        alert("Submitted!");
    }
});

app.addValidation = function (form, rules, messages) {
    form.validate({
        rules: rules,
        messages: messages,
        errorElement: "em",
        errorPlacement: function (error, element) {
            element.parent().append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("danger").removeClass("success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".form-group").addClass("success").removeClass("danger");
        }
    });
};