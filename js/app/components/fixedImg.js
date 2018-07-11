var app = app || {};

app.checkFixedImg = (elements) => {
    if (elements.length) {
        let awaitCSS = setInterval(() => {
            if (app.cssLoaded()) {
                clearInterval(awaitCSS);

                let setPosition = (parent, child) => {
                    child.css('margin-top', -parent.offset().top + app.scrollTop());
                };

                elements.each((i, e) => {
                    let child = $(e),
                        parent = child.parent();

                    $(window).on('scroll.fixed-img', () => {
                        setPosition(parent, child);
                    });

                    $(window).on('resize.fixed-img', () => {
                        setPosition(parent, child);
                    });

                    setPosition(parent, child);
                });
            }
        }, app.cssInterval);
    } else {
        $(window).off('scroll.fixed-img');
        $(window).off('resize.fixed-img');
    }
};