var app = app || {};

$(function () {
    app.body.on('click', '.show-popup', function () {
        var $this = $(this),
            title = $this.attr('data-popup-title');
        if (title !== undefined) {
            var theme = $this.attr('data-popup-theme'),
                alert = [],
                position = $(this).attr('data-popup-position'),
                popup = app.body.children('.popup[data-position="' + position + '"]');
            if (theme === undefined) {
                theme = 'primary';
            }
            alert.push('<div class="alert theme-' + theme + '">');
            alert.push('<div><p>' + title + '</p></div>');
            alert.push('<button class="close" aria-label="Close popup"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button>');
            alert.push('</div>');
            alert = alert.join('');
            if (position === undefined) {
                position = 'top left';
            }
            if (popup.length) {
                popup.append(alert);
            } else {
                var html = [];
                html.push('<div class="popup position ' + position + '" data-position="' + position + '">');
                html.push(alert);
                html.push('</div>');
                html = html.join("");
                app.body.prepend(html);
            }
        }
    });
});