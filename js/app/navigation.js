var app = app || {};

app.loadPage = function (url, pushState, initial) {
    app.showLoading();
    url = url.replace(/^\/+/g, '');
    var q = url.indexOf('?');
    url = url.substring(0, q !== -1 ? q : url.length);

    if (!app.isLocalhost) {
        url = url.substring(url.indexOf("/") + 1);
    }

    app.left.find('.tree a.label.active').removeClass('active');
    app.left.find('a.label[href="' + url + '"]').addClass('active');
    var tempUrl = url;
    app.content.load('ajax/pages/' + (url === '' ? 'home' : url) + '.html', function () {
        url = tempUrl;
            if (url === '') {
                if (app.main.children('#svg-browser').length === 0) {
                    $.get('ajax/svg/browser.html', function (data) {
                        $(data).prependTo(app.main);
                    });
                }
                if (app.main.children('#svg-os').length === 0) {
                    $.get('ajax/svg/os.html', function (data) {
                        $(data).prependTo(app.main);
                    });
                }
            } else if (url === 'form') {
                app.pageForm();
            }
            app.pageLoaded(initial);
        });

    if (app.isLocalhost) {
        url = '/' + url;
    } else {
        url = '/Panels/' + url;
    }

    if (pushState) {
        window.history.pushState(null, null, url);
        loadPage = true;
    }
};

(function (l) {
    if (l.search) {
        app.url = {};
        l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
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

var loadPage = window.history.state;
window.onpopstate = function (event) {
    if (loadPage) {
        app.loadPage(location.pathname, false, true);
    }
};

$(function () {
    app.left.find('> .content > div').load('ajax/layout/menu.html', function () {
        app.header.find('.aside.left').addClass('loaded');
        if (app.url && app.url.p) {
            app.left.find('a.label[href="' + app.url.p.replace(/^\/+/g, '') + '"]').addClass('active');
        } else {
            app.left.find('a.label[href="/"]').addClass('active');
        }
    });

    if (app.url && app.url.p) {
        app.loadPage(app.url.p, true, true);
    } else {
        app.loadPage('', false, true);
    }

    app.left.on('click', '.tree a.label:not(.active)', function (e) {
        e.preventDefault();
        var $this = $(this);
        app.loadPage($this.attr('href'), true, false);
    });
});