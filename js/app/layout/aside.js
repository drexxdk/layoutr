var app = app || {};
let transitionLock = false;

app.toggleAside = (aside, pageChanged) => {
    if (!transitionLock) {
        transitionLock = true;
        app.html.attr('data-authentication', '');
        let currentAside = app.html.attr('data-aside'); 
        if (currentAside.length) {
            if (aside === undefined || currentAside === aside) {
                let scrollTop = app.scrollTop();
                app.html.attr('data-aside', '');
                app.main.focus();
                app.body.scrollTop(scrollTop); // edge, safari
                app.html.scrollTop(scrollTop); // chrome, firefox, ie
            } else {
                app.html.attr('data-aside', aside);
            }
        } else {
            app.html.attr('data-aside', aside);
        }
        if (aside === 'left') {
            app.left.focus();
        } else if (aside === 'right') {
            app.right.focus();
        }
        if (app.isTransitions()) {
            setTimeout(function () {
                transitionLock = false;
                app.html.trigger('aside-changed');
            }, app.transitionTime);
        } else {
            transitionLock = false;
            app.html.trigger('aside-changed');
        }
        app.setHtmlScroll();
    }
};
 
$(() => {
    app.main.find('.aside.left').click(() => {
        app.toggleAside('left');
    });

    app.main.find('.aside.right').click(() => {
        app.toggleAside('right');
    });
});