{
    layoutr.load = (() => {
        // Function which returns a function: https://davidwalsh.name/javascript-functions
        let _load = (tag) => {
            return (url) => {
                // This promise will be used by Promise.all to determine success or failure
                return new Promise((resolve, reject) => {
                    if (tag === 'link' || tag === 'script' || tag === 'img') {
                        var element = document.createElement(tag);
                        var parent = 'body';
                        var attr = 'src';

                        // Important success and error for the promise
                        element.onload = () => {
                            resolve();
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

                        if (tag === 'link' || tag === 'script') {
                            document[parent].appendChild(element);
                        }
                    } else if (tag === 'html') {
                        fetch(url).then((response) => {
                            if (response.status === 200) {
                                return response.text();
                            } else {
                                reject(response.status);
                            }
                        }).then((response) => {
                            resolve(response);
                        });
                    }
                });
            };
        }

        return {
            css: _load('link'),
            js: _load('script'),
            img: _load('img'),
            html: _load('html')
        }
    })();
}