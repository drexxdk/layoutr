var app = app || {};

app.accordion = function (élement) {
    élement.on("click", ".headline", function () {
        var content = $(this).next();
        if (content.hasClass('open')) {
            content
                .removeClass('open')
                .slideUp("800");
        } else {
            content
                .addClass("open")
                .slideToggle("800")
                .parents('.accordion').find(".content.open").not(content).removeClass('open').slideUp("800");
        }
    });
};