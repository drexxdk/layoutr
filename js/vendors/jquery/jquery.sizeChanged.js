// this is a Jquery plugin function that fires an event when the size of an element is changed
// usage: $().sizeChanged(function(){})

(function ($) {

$.fn.sizeChanged = function (handleFunction) {
    var element = this;
    var lastWidth = element.width();
    var lastHeight = element.height();

    setInterval(function () {
        if (lastWidth === element.width()&&lastHeight === element.height())
            return;
        if (typeof (handleFunction) == 'function') {
            handleFunction({ width: lastWidth, height: lastHeight },
                           { width: element.width(), height: element.height() });
            lastWidth = element.width();
            lastHeight = element.height();
        }
    }, 100);


    return element;
};

}(jQuery));