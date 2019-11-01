{
    layoutr.radioCheckboxSwitchForm = () => {
        layoutr.addValidation(
            layoutr.content.find('#radio-checkbox-switchform'),
            {
                gender: "required",
                interests: "required",
                agree: "required",
                font_size: "required"
            },
            {
                gender: "Please select your gender",
                interests: "Please select at least one interest",
                agree: "Please accept our policy"
            }
        );
    };
}