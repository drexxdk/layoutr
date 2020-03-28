var layoutr = window.layoutr || {};
{
    layoutr.siteName = 'layoutr';

    layoutr.throttleInterval = 50;
    layoutr.debounceInterval = 50;

    layoutr.transitionTime = 400;
    layoutr.fadeOutTime = 500;
    layoutr.accordionTime = 800;
    layoutr.interactionTime = 5000;
    layoutr.htmlOverflowEnabled = true;
    layoutr.smallBreakpoint = 732;
    layoutr.scrollbarWidth = 0;
    layoutr.loadingCount = 0;
    layoutr.document = document.documentElement;
    layoutr.fullscreen = false;
    layoutr.htmlDist = 'dist/html/';
    layoutr.arrowKeyLocked = false;
    layoutr.sort = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare;

    layoutr.media;
    layoutr.dropdown;
    layoutr.navigation = [];
    layoutr.popups = [];
    bowser.desktop = !bowser.mobile && !bowser.tablet;

    layoutr.directions = {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
    };

    let l = window.location,
        segmentCount = l.origin.endsWith('github.io') ? 1 : 0;
    layoutr.host = `${l.protocol}//${l.hostname}${l.port ? `:${l.port}` : ''}${l.pathname.split('/').slice(0, 1 + segmentCount).join('/')}/`;

    layoutr.awaitInterval = 50;
    // window.Areion = Ghostlab
    layoutr.isLocalhost = window.Areion || l.hostname === 'localhost' || l.hostname === '127.0.0.1' || l.hostname === '192.168.40.100';

    layoutr.settings = JSON.parse(localStorage.getItem("settings"));
    if (layoutr.settings === null) layoutr.settings = [];
    layoutr.theme = 'light';
    layoutr.settings.forEach((entry) => {
        if (entry.name === 'theme') {
            layoutr.theme = entry.id.substring(entry.id.indexOf("-") + 1);
        }
    });

    $(() => {
        layoutr.html = $('html');
        layoutr.head = $('head');
        layoutr.body = $('body');
        layoutr.site = $('#site');
        layoutr.main = $('main');
        layoutr.content = $('#content > div');
        layoutr.header = $('header');
        layoutr.footer = $('footer');
        layoutr.left = $('#left');
        layoutr.right = $('#right');
        layoutr.loading = $('#loading');
        layoutr.overflow = $('#overflow');
        layoutr.modal = $('#modal');
        layoutr.title = $('#title');
        layoutr.authentication = $('#authentication');
        layoutr.unauthenticated = layoutr.authentication.children('.unauthenticated');
        layoutr.authenticated = layoutr.authentication.children('.authenticated');
        layoutr.authenticatedLinks = layoutr.authentication.find('.links');
        layoutr.cookie = $('#cookie');
        layoutr.focus = $('#focus');
    });
}