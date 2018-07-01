var app = app || {};

app.checkLazy = function (elements) {
    elements.lazy({
        afterLoad: function (element) {
            element.removeClass('lazy');
        }
    });
};