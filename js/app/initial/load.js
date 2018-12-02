var layoutr = window.layoutr || {};

(function () {
    "use strict";

    layoutr.load = (function () {
        // Function which returns a function: https://davidwalsh.name/javascript-functions
        let _load = (tag) => {
            return (url) => {
                // This promise will be used by Promise.all to determine success or failure
                return new Promise((resolve, reject) => {
                    var element = document.createElement(tag);
                    var parent = 'body';
                    var attr = 'src';

                    // Important success and error for the promise
                    element.onload = () => {
                        resolve(true);
                    };
                    element.onerror = () => {
                        reject();
                    };

                    // Need to set different attributes depending on tag type
                    switch (tag) {
                        case 'script':
                            element.async = true;
                            break;
                        case 'link':
                            element.type = 'text/css';
                            element.rel = 'stylesheet';
                            attr = 'href';
                            parent = 'head';
                    }

                    // Inject into document to kick off loading
                    element[attr] = url;
                    document[parent].appendChild(element);
                });
            };
        }

        return {
            css: _load('link'),
            js: _load('script'),
            img: _load('img')
        }
    })();
}());