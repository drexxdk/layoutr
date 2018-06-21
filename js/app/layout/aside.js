var app = app || {};

var transitionLock = false;

app.toggleAside = function (aside, pageChanged) {
    if (!transitionLock) {
        transitionLock = true;
        app.html.attr('data-authentication', '');
        var currentAside = app.html.attr('data-aside');
        if (currentAside.length) {
            if (aside === undefined || currentAside === aside) {
                var scrollTop = app.scrollTop();
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
                if (pageChanged) {
                    app.rb();
                }
            }, app.transitionTime);
        } else {
            transitionLock = false;
        }
        app.setHtmlScroll();
    }
};