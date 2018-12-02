(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    layoutr.loadPage = (url, pushState, initial) => {
        layoutr.showLoading();
        layoutr.content.load(layoutr.host + layoutr.ajax + 'pages' + (url === '/' ? '/home' : url) + '.html', (response, status, xhr) => {
            let q = url.indexOf('?');
            url = url.substring(0, q !== -1 ? q : url.length);
            layoutr.left.find('.tree a.label.active').removeClass('active');
            layoutr.left.find('a.label[href="' + url + '"]').addClass('active');
            layoutr.html.attr('data-status', status);
            let statusCode = xhr.status;
            layoutr.title.html('');
            document.title = layoutr.siteName;
            if (statusCode === 200) {
                if (url === '/') {
                    if (layoutr.body.children('#svg-browser').length === 0) {
                        $.get(layoutr.host + layoutr.ajax + 'svg/browser.html', (data) => {
                            $(data).prependTo(layoutr.body);
                        });
                    }
                    if (layoutr.body.children('#svg-os').length === 0) {
                        $.get(layoutr.host + layoutr.ajax + 'svg/os.html', (data) => {
                            $(data).prependTo(layoutr.body);
                        });
                    }
                } else {
                    let title = layoutr.capitalize(url.replace('/', '').replaceAll('-', ' '));
                    layoutr.title.html(title);
                    document.title = title + ' - ' + layoutr.siteName;
                    if (url === '/form') {
                        layoutr.pageForm();
                    }
                }
                layoutr.html.trigger('header-changed.responsiveHeader');
            } else {
                layoutr.content.load(layoutr.host + layoutr.ajax + 'pages/error.html', () => {
                    document.title = statusCode + ' - ' + layoutr.siteName;
                    let title = statusCode + ' - ';
                    if (statusCode === 404) {
                        title += 'Page not found';
                    } else if (statusCode === 500) {
                        title += 'Server error';
                    } else {
                        title += statusText;
                    }
                    layoutr.content.find('#error-title').html(title);
                    layoutr.html.trigger('header-changed.responsiveHeader');
                });
            }

            let awaitInterval = setInterval(() => {
                if (layoutr.cssLoaded) {
                    clearInterval(awaitInterval);
                    layoutr.pageLoaded(initial);
                }
            }, layoutr.awaitInterval);
        });
        let historyUrl = (layoutr.isLocalhost ? '' : '/' + window.location.pathname.split('/')[1]) + url;
        if (pushState) {
            window.history.pushState(null, null, historyUrl);
            loadPage = true;
        }
    };

    layoutr.internalLinkClick = (href, e) => {
        if (!e.ctrlKey) {
            e.preventDefault();
            layoutr.loadPage(href, true, false);
        }
    };

    (function (l) {
        if (l.search) {
            layoutr.url = {};
            l.search.slice(1).split('&').forEach((v) => {
                let a = v.split('=');
                layoutr.url[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
            });
            if (layoutr.url.p !== undefined) {
                window.history.replaceState(null, null,
                    l.pathname.slice(0, -1) + layoutr.url.p +
                    (layoutr.url.q ? '?' + layoutr.url.q : '') +
                    l.hash
                );
            }
        }
    }(window.location));

    let loadPage = window.history.state;
    window.onpopstate = (e) => {
        if (loadPage) {
            let url = location.pathname;
            if (!layoutr.isLocalhost) {
                url = url.substring(url.indexOf("/", url.indexOf("/") + 1));
            }
            layoutr.loadPage(url, false, true);
        }
    };

    layoutr.applyNavigation = (id, value, set) => {
        if (set) {
            let entry = {
                "id": id,
                "value": value
            },
                exists = $.grep(layoutr.navigation, (e) => { return e.name === name; });
            if (exists.length === 0) {
                // not found
                layoutr.navigation.push(entry);
            } else if (exists.length === 1) {
                // found
                exists[0].value = value;
            }
            localStorage.setItem('navigation', JSON.stringify(layoutr.navigation));
        } else {
            layoutr.left.find('#' + id).prop('checked', value);
        }
    };

    $(function () {
        layoutr.left.find('> .content > div').load(layoutr.host + layoutr.ajax + 'layout/navigation.html', () => {
            layoutr.navigationTree = layoutr.left.find('.tree');
            layoutr.navigation = JSON.parse(localStorage.getItem("navigation"));
            if (layoutr.navigation === null) layoutr.navigation = [];
            $.each(layoutr.navigation, function (i, entry) {
                layoutr.applyNavigation(entry.id, entry.value, false);
            });
            layoutr.navigationTree.on('change', 'input[type=checkbox]', (e) => {
                let $this = $(e.currentTarget),
                    id = $this.attr('id'),
                    value = $this.is(':checked');
                layoutr.applyNavigation(id, value, true);
            });
            layoutr.header.find('.aside.left').addClass('loaded');
            if (layoutr.url && layoutr.url.p) {
                layoutr.navigationTree.find('a.label[href="' + layoutr.url.p.replace(/^\/+/g, '') + '"]').addClass('active');
            } else {
                layoutr.navigationTree.find('a.label[href=""]').addClass('active');
            }
        });
        if (layoutr.url && layoutr.url.p) {
            layoutr.loadPage(layoutr.url.p, true, true);
        } else {
            var l = window.location;
            var segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
            var url = '/' + l.pathname.slice(1).split('/').slice(segmentCount);
            layoutr.loadPage(url, true, true);
        }
        layoutr.left.on('click', '.tree a.label:not(.active)', (e) => {
            layoutr.internalLinkClick($(e.currentTarget).attr('href'), e);
        });

        layoutr.body.on('click', '.internal-link', (e) => {
            layoutr.internalLinkClick($(e.currentTarget).attr('href'), e);
        });

        layoutr.left.on('click', '#navigation-expand', () => {
            layoutr.navigationTree.find('input[type=checkbox]:not(:checked)').click();
        });

        layoutr.left.on('click', '#navigation-collapse', () => {
            layoutr.navigationTree.find('input[type=checkbox]:checked').click();
        });
    });
}());