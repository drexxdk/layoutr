var app = app || {};

app.checkFixedImg = (elements) => {
    if (elements.length) {
        let awaitCSS = setInterval(() => {
            if (app.cssLoaded()) {
                clearInterval(awaitCSS);

                let setPosition = (parent, child) => {
                    let marginTop = -parent.offset().top;
                    if (app.htmlOverflowEnabled) {
                        marginTop = marginTop + app.scrollTop();
                    }
                    child.css('margin-top', marginTop);
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