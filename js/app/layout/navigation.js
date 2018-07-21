var app = app || {};

app.loadPage = (url, pushState, initial) => {
    app.showLoading();
    url = url.replace(/^\/+/g, '');
    let q = url.indexOf('?');
    url = url.substring(0, q !== -1 ? q : url.length);
    app.left.find('.tree a.label.active').removeClass('active');
    url = url.replace('/', '');
    app.left.find('a.label[href="' + url + '"]').addClass('active');
    let tempUrl = url;
    app.content.load(app.host + app.ajax + 'pages/' + (url === '' ? 'home' : url) + '.html', (response, status, xhr) => {
        url = tempUrl;
        let statusCode = xhr.status;
        if (statusCode === 200) {
            if (url === '') {
                app.title.html('');
                document.title = app.siteName;
                if (app.body.children('#svg-browser').length === 0) {
                    $.get(app.host + app.ajax + 'svg/browser.html', (data) => {
                        $(data).prependTo(app.body);
                    });
                }
                if (app.body.children('#svg-os').length === 0) {
                    $.get(app.host + app.ajax + 'svg/os.html', (data) => {
                        $(data).prependTo(app.body);
                    });
                }
            } else {
                let title = app.capitalize(url.replaceAll('-', ' '));
                app.title.html(title);
                document.title = title + ' - ' + app.siteName;
                if (url === 'form') {
                    app.pageForm();
                }
            }
        } else {
            app.content.load(app.host + app.ajax + 'pages/error.html', () => {
                let title = app.content.find('#error-title');
                if (statusCode === 404) {
                    title.html(statusCode + ' - Page not found');
                } else if (statusCode === 500) {
                    title.html(statusCode + ' - Server error');
                } else {
                    title.html(statusCode + ' - ' + statusText);
                }
            });
        }
        app.html.attr('data-status', statusCode);
        
        app.html.trigger('header-changed.responsiveHeader');
        let awaitCSS = setInterval(() => {
            if (app.cssLoaded) {
                clearInterval(awaitCSS);
                app.pageLoaded(initial);
            }
        }, app.cssInterval);
    });
    url = '/' + (app.isLocalhost ? '' : window.location.pathname.split('/')[1] + '/') + url;
    if (pushState) {
        window.history.pushState(null, null, url);
        loadPage = true;
    }
};

app.internalLinkClick = (href, e) => {
    if (!e.ctrlKey) {
        e.preventDefault();
        app.loadPage(href, true, false);
    }
};

(function (l) {
    if (l.search) {
        app.url = {};
        l.search.slice(1).split('&').forEach((v) => {
            let a = v.split('=');
            app.url[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (app.url.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + app.url.p +
                (app.url.q ? '?' + app.url.q : '') +
                l.hash
            );
        }
    }
}(window.location));

let loadPage = window.history.state;
window.onpopstate = (e) => {
    if (loadPage) {
        let url = location.pathname;
        if (!app.isLocalhost) {
            url = url.substring(url.indexOf("/", url.indexOf("/") + 1));
        }
        app.loadPage(url, false, true);
    }
};

app.applyNavigation = (id, value, set) => {
    if (set) {
        let entry = {
            "id": id,
            "value": value
        },
            exists = $.grep(app.navigation, (e) => { return e.name === name; });
        if (exists.length === 0) {
            // not found
            app.navigation.push(entry);
        } else if (exists.length === 1) {
            // found
            exists[0].value = value;
        }
        localStorage.setItem('navigation', JSON.stringify(app.navigation));
    } else {
        app.left.find('#' + id).prop('checked', value);
    }
};

$(function () {
    app.left.find('> .content > div').load(app.host + app.ajax + 'layout/navigation.html', () => {
        app.navigationTree = app.left.find('.tree');
        app.navigation = JSON.parse(localStorage.getItem("navigation"));
        if (app.navigation === null) app.navigation = [];
        $.each(app.navigation, function (i, entry) {
            app.applyNavigation(entry.id, entry.value, false);
        });
        app.navigationTree.on('change', 'input[type=checkbox]', (e) => {
            let $this = $(e.currentTarget),
                id = $this.attr('id'),
                value = $this.is(':checked');
            app.applyNavigation(id, value, true);
        });
        app.header.find('.aside.left').addClass('loaded');
        if (app.url && app.url.p) {
            app.navigationTree.find('a.label[href="' + app.url.p.replace(/^\/+/g, '') + '"]').addClass('active');
        } else {
            app.navigationTree.find('a.label[href=""]').addClass('active');
        }
    });

    if (app.url && app.url.p) {
        app.loadPage(app.url.p, true, true);
    } else {
        app.loadPage('', false, true);
    }

    app.left.on('click', '.tree a.label:not(.active)', (e) => {
        app.internalLinkClick($(e.currentTarget).attr('href'), e);
    });

    app.header.on('click', 'h1 a', (e) => {
        app.internalLinkClick($(e.currentTarget).attr('href'), e);
    });

    app.left.on('click', '#navigation-expand', () => {
        app.navigationTree.find('input[type=checkbox]:not(:checked)').click();
    });

    app.left.on('click', '#navigation-collapse', () => {
        app.navigationTree.find('input[type=checkbox]:checked').click();
    });
});