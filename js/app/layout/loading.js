{
    layoutr.showLoading = () => {
        layoutr.loadingCount++;
        layoutr.disableScroll();
        layoutr.html.addClass('loading');
    };

    layoutr.hideLoading = () => {
        layoutr.loadingCount--;
        if (layoutr.loadingCount <= 0) {
            layoutr.loadingCount = 0;
            layoutr.html.removeClass('loading');
            layoutr.setHtmlScroll();
        }
    };
}