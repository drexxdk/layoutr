var app = app || {};

app.loadPage = function (url, pushState) {
    app.showLoading();
    url = url.replace(/^\/+/g, '');
    var q = url.indexOf('?');
    url = url.substring(0, q !== -1 ? q : url.length);

    if (!app.isLocalhost) {
        url = url.substring(url.indexOf("/") + 1);
    }

    app.left.find('.tree a.label.active').removeClass('active');
    if (url === '') {
        app.left.find('a.label[href="/"]').addClass('active');
        app.pageHome();
    } else {
        app.left.find('a.label[href="' + url + '"]').addClass('active');
        debugger;
        app.content.load('ajax/content/' + url + '.html', function () {
            app.pageLoaded();
        });
    }

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
        app.q = {};
        l.search.slice(1).split('&').forEach(function (v) {
            var a = v.split('=');
            app.q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
        });
        if (app.q.p !== undefined) {
            window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + (app.q.p || '') +
                (app.q.q ? '?' + app.q.q : '') +
                l.hash
            );
        }
    }
}(window.location));

var loadPage = window.history.state;
window.onpopstate = function (event) {
    if (loadPage) {
        app.loadPage(location.pathname, false);
    }
};

$(function () {
    app.left.find('> .content > div').load('ajax/layout/menu.html', function () {
        if (app.q && app.q.p) {
            app.left.find('a.label[href="' + app.q.p + '"]').addClass('active');
        } else {
            app.left.find('a.label[href="/"]').addClass('active');
        }
    });

    if (app.q && app.q.p) {
        app.loadPage(app.q.p, true);
    } else {
        app.loadPage('', false);
    }

    app.left.on('click', '.tree a.label:not(.active)', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.parents('.tree').find('a.label.active').removeClass('active');
        $this.addClass('active');
        app.loadPage($this.attr('href'), true);
    });
});