var app = app || {};

$(() => {
    app.html = $('html');
    app.head = $('head');
    app.body = $('body');
    app.main = $('main');
    app.content = $('#content > div');
    app.header = $('header');
    app.footer = $('footer');
    app.left = $('#left');
    app.right = $('#right');
    app.loading = $('#loading');
    app.overflow = $('#overflow');
    app.modal = $('#modal');
    app.title = $('#title');
    app.authentication = $('#authentication');
    app.unauthenticated = app.authentication.children('.unauthenticated');
    app.authenticated = app.authentication.children('.authenticated');
    app.authenticatedLinks = app.authenticated.find('.authenticated-links');
    app.cookie = $('#cookie');
    app.Focus = $('#focus');

    app.cssInterval = 50;
    app.transitionTime = 400;
    app.fadeOutTime = 500;
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;
    app.scrollbarWidth = 0;
    app.loadingCount = 0;
    app.document = document.documentElement;
    app.fullscreen = false;
    
    app.navigation = [];

    bowser.desktop = !bowser.mobile && !bowser.tablet;
});