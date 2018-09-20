var app = app || {};

app.awaitInterval = 50;

var l = window.location;
app.isLocalhost = l.hostname === 'localhost' || l.hostname === '127.0.0.1' || l.hostname === '192.168.40.100';