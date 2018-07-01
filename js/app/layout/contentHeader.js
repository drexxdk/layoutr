var app = app || {};

app.checkContentHeader = function() {
    if(app.contentHeader.length) {
        $(window).on('scroll.contentHeader', function() {
            debugger;
        });
    } else {
        $(window).off('scroll.contentHeader');
    }
};