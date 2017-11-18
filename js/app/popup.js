var app = app || {};

$(function () {
    app.main.on('click', '.show-popup', function () {
        var $this = $(this);
        var title = $this.attr('data-popup-title');
        if (title !== undefined) {
            var theme = $this.attr('data-popup-theme');
            if (theme === undefined) {
                theme = 'primary';
            }

            var alert = [];
            alert.push('<div class="alert theme-' + theme + '">');
            alert.push('<div><p>' + title + '</p></div>');
            alert.push('<button class="close" aria-label="Close popup"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button>');
            alert.push('</div>');
            alert = alert.join('');
            
            var position = $(this).attr('data-popup-position');
            if (position === undefined) {
                position = 'top left';
            }

            var popup = app.main.children('.popup[data-position="' + position + '"]');
            if (popup.length) {
                popup.append(alert);
            } else {
                var html = [];
                //  position ' + position + '
                html.push('<div class="popup position ' + position + '" data-position="' + position + '">');
                html.push(alert);
                html.push('</div>');
                html = html.join("");
                app.main.prepend(html);
            }
        }
    });
});