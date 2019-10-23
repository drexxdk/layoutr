{
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
            let popup = layoutr.body.children(`.popup[data-position="${position}"]`),
                html =
                    `<div class="alert theme-${theme}" data-type="${type}">
<div><p>${title}</p></div>
<button class="close" aria-label="Close popup"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button>
</div>`;
            if (popup.length) {
                popup.append(html);
            } else {
                html = `<div class="popup position ${position}" data-position="${position}">${html}</div>`;
                layoutr.body.prepend(html);
            }
            layoutr.popups.push(layoutr.body.children('.popup')[0]);
        }
    };

    layoutr.destroyPopups = () => {
        if (layoutr.popups.length) {
            let popups = $(layoutr.popups);
            popups.fadeOut(layoutr.fadeOutTime, () => {
                popups.remove();
            });
        }
    };
}