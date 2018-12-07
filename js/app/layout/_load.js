{
    layoutr.load = (() => {
        let _load = (tag) => {
            return (url) => {
                return new Promise((resolve, reject) => {
                    if (tag === 'link' || tag === 'script' || tag === 'img') {
                        let element = document.createElement(tag);

                        element.onload = () => {
                            if (tag === 'img') {
                                document['body'].removeChild(element);
                            }
                            resolve();
                        };
                        element.onerror = () => {
                            reject();
                        };
                        if (tag === 'link') {
                            element.type = 'text/css';
                            element.rel = 'stylesheet';
                            element['href'] = url;
                            document['head'].appendChild(element);
                        } else if (tag === 'script' || tag === 'img') {
                            element.async = true;
                            element['src'] = url;
                            if (tag === 'img') {
                                element.className = 'hidden';
                            }
                            document['body'].appendChild(element);
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