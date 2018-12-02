var layoutr = window.layoutr || {};

layoutr.awaitInterval = 50;

layoutr.isLocalhost = (function () {
    var l = window.location;
    return l.hostname === 'localhost' || l.hostname === '127.0.0.1' || l.hostname === '192.168.40.100';
}());