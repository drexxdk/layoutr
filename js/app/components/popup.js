(function () {
    "use strict";
    var layoutr = window.layoutr || {};

    $(() => {
        layoutr.body.on('click', '.show-popup-alert', (e) => {
            let $this = $(e.currentTarget),
                title = $this.attr('data-popup-title'),
                theme = $this.attr('data-popup-theme'),
                position = $this.attr('data-popup-position');
            layoutr.showPopupAlert(title, theme, position);
        });
    });

    layoutr.showPopupAlert = (title, theme = 'light', position = 'top left', type = 'default') => {
        if (title !== undefined) {
            let alert = [],
                popup = layoutr.body.children('.popup[data-position="' + position + '"]');
            alert.push('<div class="alert theme-' + theme + '" data-type="' + type + '">');
            alert.push('<div><p>' + title + '</p></div>');
            alert.push('<button class="close" aria-label="Close popup"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button>');
            alert.push('</div>');
            alert = alert.join('');
            if (popup.length) {
                popup.append(alert);
            } else {
                let html = [];
                html.push('<div class="popup position ' + position + '" data-position="' + position + '">');
                html.push(alert);
                html.push('</div>');
                html = html.join("");
                layoutr.body.prepend(html);
            }
        }
    }
}());