{
    layoutr.dropdownForm = () => {
        layoutr.addValidation(
            layoutr.content.find('#dropdown-form'),
            {
                dropdown_1: "required",
                dropdown_2: "required",
                dropdown_3: "required",
                dropdown_4: "required",
                dropdown_5: "required",
                dropdown_6: "required",
                dropdown_7: "required",
                dropdown_8: "required",
                dropdown_9: "required"
            },
            {
                dropdown_1: "Please select an option",
                dropdown_2: "Please select an option",
                dropdown_3: "Please select an option",
                dropdown_4: "Please select an option",
                dropdown_5: "Please select an option",
                dropdown_6: "Please select an option",
                dropdown_7: "Please select an option",
                dropdown_8: "Please select an option",
                dropdown_9: "Please select an option"
            }
        );
    };
}