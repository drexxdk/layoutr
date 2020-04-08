{
    layoutr.checkLazy = (elements) => {
        let wrongSrc = $.grep(elements, (e, i) => {
            return e.dataset.src.startsWith(layoutr.imgDist);
        });
        $.each(elements, (i, e) => {
            let element = $(e);
            if (element.attr('data-src').startsWith(layoutr.imgDist)) {
                element.attr('data-src', element.attr('data-src').replace(layoutr.imgDist, layoutr.host + layoutr.imgDist));
            }
        });
        elements.lazy({
            afterLoad: (element) => {
                element.removeClass('lazy');
            }
        });
    };
};