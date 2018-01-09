var app = app || {};

app.loadPage = function (url, pushState, initial) {
    app.showLoading();
    url = url.replace(/^\/+/g, '');
    var q = url.indexOf('?');
    url = url.substring(0, q !== -1 ? q : url.length);
    if (!app.isLocalhost) {
        url = url.substring(url.indexOf("/") + 1);
    }
    if (url === '') {
        url = 'pages/home';
    }
    
    app.left.find('.tree a.label.active').removeClass('active');
    app.left.find('a.label[href="' + url + '"]').addClass('active');
    var tempUrl = url;
    app.content.load('ajax/' + url + '.html', function () {
        url = tempUrl;
        if (url === 'pages/home') {
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
        } else if (url === 'inputs/form') {
            app.pageForm();
        }
        app.pageLoaded(initial);
    });
    url = '/' + (app.isLocalhost ? '' : window.location.pathname.split('/')[1] + '/') + url.split('/')[1];
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
        debugger;
        app.loadPage(location.pathname, false, true);
    }
};

app.applyNavigation = function (id, value, set) {
    if (app.localStorage && set) {
        var entry = {
            "id": id,
            "value": value
        };
        var exists = $.grep(app.navigation, function (e) { return e.name === name; });
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
    app.left.find('> .content > div').load('ajax/layout/menu.html', function () {
        if (app.localStorage) {
            app.navigation = JSON.parse(localStorage.getItem("navigation"));
            if (app.navigation === null) app.navigation = [];
            $.each(app.navigation, function (i, entry) {
                app.applyNavigation(entry.id, entry.value, false);
            });
            app.left.on('change', '.tree input[type=checkbox]', function () {
                var $this = $(this);
                var id = $this.attr('id');
                var value = $this.is(':checked');
                app.applyNavigation(id, value, true);
            });
        }
        app.header.find('.aside.left').addClass('loaded');
        if (app.url && app.url.p) {
            app.left.find('a.label[href="' + app.url.p.replace(/^\/+/g, '') + '"]').addClass('active');
        } else {
            app.left.find('a.label[href=""]').addClass('active');
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