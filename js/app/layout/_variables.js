var app = app || {};

app.siteName = 'layoutr';

app.html = document.querySelector('html');
app.head = document.querySelector('head');
app.body = document.querySelector('body');
app.main = document.querySelector('main');
app.content = document.querySelector('#content > div');
app.header = document.querySelector('header');
app.footer = document.querySelector('footer');
app.left = document.querySelector('#left');
app.right = document.querySelector('#right');
app.loading = document.querySelector('#loading');
app.overflow = document.querySelector('#overflow');
app.modal = document.querySelector('#modal');
app.title = document.querySelector('#title');
app.authentication = document.querySelector('#authentication');
app.unauthenticated = app.authentication.querySelector('.unauthenticated');
app.authenticated = app.authentication.querySelector('.authenticated');
app.user = app.authentication.querySelector('div > .user');
app.userLinks = app.user.querySelector('.links');

app.cookie = document.querySelector('#cookie');
app.Focus = document.querySelector('#focus');

app.throttleInterval = 50;
app.debounceInterval = 50;

app.transitionTime = 400;
app.fadeOutTime = 500;
app.htmlOverflowEnabled = true;
app.smallBreakpoint = 732;
app.scrollbarWidth = 0;
app.loadingCount = 0;
app.document = document.documentElement;
app.fullscreen = false;
app.ajax = 'dist/ajax/';

app.navigation = [];

bowser.desktop = !bowser.mobile && !bowser.tablet;