{
    layoutr.checkLazy = (elements) => {
        elements.lazy({
            afterLoad: (element) => {
                element.removeClass('lazy');
            }
        });
    };
};