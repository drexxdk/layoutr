var app = app || {};
$(function () {
    app.body.on("keydown", function (e) {
        if (e.which === 37) { // left
            if (app.main.attr('data-aside') === 'left') {
                app.toggleAside();
            } else if (app.main.attr('data-aside') !== 'right') {
                app.toggleAside('right');
            } 
        } else if (e.which === 39) { // right
            if (app.main.attr('data-aside') === 'right') {
                app.toggleAside();
            } else if (app.main.attr('data-aside') !== 'left') {
                app.toggleAside('left');
            } 
        }
    });
});