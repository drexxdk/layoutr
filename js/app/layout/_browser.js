if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.match(/Trident\/7\./)) {
    document.documentElement.classList.add('browser-not-supported');
    document.getElementsByTagName("body")[0].innerHTML =
`<main>
    <h1>Internet Explorer is not supported</h1>
    <p>You're using a web browser we don't support.<br />
    Try one of these options to have a better experience on layoutr.</p>
    <ul>
        <li>Open Microsoft Edge</li>
        <li><a href="https://www.google.com/chrome/">Download Google Chrome</a></li>
        <li><a href="https://www.mozilla.org/firefox">Download Mozilla Firefox</a></li>
    </ul>
</main>`;
    throw 'browser-not-supported';
}