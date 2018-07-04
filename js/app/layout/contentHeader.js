var app = app || {};

app.checkContentHeader = () => {
    if(app.contentHeader.length) {
        //$(window).on('scroll.contentHeader', () => {
        //    //debugger;
        //});
    } else {
        $(window).off('scroll.contentHeader');
    }
};