var app = app || {};

app.lazy = function (elements) {
    elements.lazy({
        afterLoad: function (element) {
            element.removeClass('lazy');
        }
    });
};