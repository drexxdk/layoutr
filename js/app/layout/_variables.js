var layoutr = window.layoutr || {};

$(() => {
    layoutr.siteName = 'layoutr';

    layoutr.html = $('html');
    layoutr.head = $('head');
    layoutr.body = $('body');
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
    layoutr.authenticatedLinks = layoutr.authenticated.find('.authenticated-links');
    layoutr.cookie = $('#cookie');
    layoutr.focus = $('#focus');

    layoutr.throttleInterval = 50;
    layoutr.debounceInterval = 50;

    layoutr.transitionTime = 400;
    layoutr.fadeOutTime = 500;
    layoutr.htmlOverflowEnabled = true;
    layoutr.smallBreakpoint = 732;
    layoutr.scrollbarWidth = 0;
    layoutr.loadingCount = 0;
    layoutr.document = document.documentElement;
    layoutr.fullscreen = false;
    layoutr.ajax = 'dist/ajax/';

    layoutr.navigation = [];
    bowser.desktop = !bowser.mobile && !bowser.tablet;
});