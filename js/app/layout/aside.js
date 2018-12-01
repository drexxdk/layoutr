var app = app || {};
let transitionLock = false;

app.asideChanged = () => {
    let trigger = () => {
        app.html.trigger('aside-changed.datatables');
        app.html.trigger('aside-changed.rb');
        app.html.trigger('aside-changed.map');
    }

    if (app.isTransitions()) {
        let awaitInterval = setInterval(() => {
            if (!transitionLock) {
                clearInterval(awaitInterval);
            } else {
                trigger();
            }
        }, app.awaitInterval);
        setTimeout(function () {
            transitionLock = false;
        }, app.transitionTime);
    } else {
        transitionLock = false;
        trigger();
    }
}

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

        app.asideChanged();
        app.setHtmlScroll();
    }
};

app.main.querySelector('.aside.left').addEventListener('click', () => {
    app.toggleAside('left');
});

app.main.querySelector('.aside.right').addEventListener('click', () => {
    app.toggleAside('right');
});