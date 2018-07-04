var app = app || {};

app.checkLazy = (elements) => {
    elements.lazy({
        afterLoad: (element) => {
            element.removeClass('lazy');
        }
    });
};