var app = app || {};

app.loadPage = function (url, pushState, initial) {
    app.showLoading();
    url = url.replace(/^\/+/g, '');
    var q = url.indexOf('?');
    url = url.substring(0, q !== -1 ? q : url.length);
    app.left.find('.tree a.label.active').removeClass('active');
    url = url.replace('/', '');
    app.left.find('a.label[href="' + url + '"]').addClass('active');
    var tempUrl = url;
    app.content.load(app.host + 'ajax/pages/' + (url === '' ? 'home' : url) + '.html', function () {
        url = tempUrl;
        if (url === '') {
            app.title.html('');
            if (app.body.children('#svg-browser').length === 0) {
                $.get(app.host + 'ajax/svg/browser.html', function (data) {
                    $(data).prependTo(app.body);
                });
            }
            if (app.body.children('#svg-os').length === 0) {
                $.get(app.host + 'ajax/svg/os.html', function (data) {
                    $(data).prependTo(app.body);
                });
            }
        } else {
            app.title.html(app.capitalize(url.replace('-', ' ')));
            if (url === 'form') {
                app.pageForm();
            }
        }
        app.pageLoaded(initial);
    });
    url = '/' + (app.isLocalhost ? '' : window.location.pathname.split('/')[1] + '/') + url;
    if (pushState) {
        window.history.pushState(null, null, url);
        loadPage = true;
    }
};

app.internalLinkClick = function (href, e) {
    e.preventDefault();
    app.loadPage(href, true, false);
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
        var url = location.pathname;
        if (!app.isLocalhost) {
            url = url.substring(url.indexOf("/", url.indexOf("/") + 1));
        }
        app.loadPage(url, false, true);
    }
};

app.applyNavigation = function (id, value, set) {
    if (set) {
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
    app.left.find('> .content > div').load(app.host + 'ajax/layout/navigation.html', function () {
        app.navigationTree = app.left.find('.tree');
        app.navigation = JSON.parse(localStorage.getItem("navigation"));
        if (app.navigation === null) app.navigation = [];
        $.each(app.navigation, function (i, entry) {
            app.applyNavigation(entry.id, entry.value, false);
        });
        app.navigationTree.on('change', 'input[type=checkbox]', function () {
            var $this = $(this),
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

    app.left.on('click', '.tree a.label:not(.active)', function (e) {
        app.internalLinkClick($(this).attr('href'), e);
    });

    app.header.on('click', 'h1 a', function (e) {
        app.internalLinkClick($(this).attr('href'), e);
    });

    app.left.on('click', '#navigation-expand', function () {
        app.navigationTree.find('input[type=checkbox]:not(:checked)').click();
    });

    app.left.on('click', '#navigation-collapse', function () {
        app.navigationTree.find('input[type=checkbox]:checked').click();
    });
});