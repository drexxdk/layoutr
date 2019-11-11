{
    layoutr.showModal = (type, closable) => {
        layoutr.html.attr('data-modal', type);
        layoutr.html.attr('data-modal-closable', closable);
        layoutr.html.addClass('modal');
        layoutr.hideLoading();
        layoutr.checkModal();
        layoutr.modal.focus();
    };

    layoutr.closeModal = () => {
        if (layoutr.fullscreen) {
            layoutr.exitFullScreen();
        } else {
            layoutr.html.removeClass('modal').attr('data-modal', '');
            layoutr.modal.removeClass('info-shown').empty();
            layoutr.checkModal();
            layoutr.setHtmlScroll();
        }
    };

    layoutr.checkModal = () => {
        if (layoutr.isModal()) {
            layoutr.body.css('padding-right', layoutr.scrollbarWidth);
            if (layoutr.html.attr('data-aside') === 'right') {
                layoutr.right.css('margin-right', layoutr.scrollbarWidth);
            }
            layoutr.body.children('.popup').css('margin-right', layoutr.scrollbarWidth);
        } else {
            layoutr.body.css('padding-right', 0);
            layoutr.right.css('margin-right', 0);
            layoutr.body.children('.popup').css('margin-right', 0);
        }
        layoutr.html.trigger('model-check');
    };

    $(() => {
        layoutr.body.on('click', '.modal', (e) => {
            let $this = $(e.currentTarget),
                type = $this.attr('data-modal');
            if (type !== undefined && type.length && (type === 'image' || type === 'form')) {
                layoutr.showLoading();
                let dataTitle = $this.attr('data-modal-title'),
                    dataContent = $this.attr('data-modal-content'),
                    dataFullscreen = $this.attr('data-modal-fullscreen') === 'true',
                    dataClosable = $this.attr('data-modal-closable') === undefined || $this.attr('data-modal-closable') === 'true';

                let template = () => {
                    let result;

                    if (type === 'image' && $this.attr('data-modal-img').length) {
                        if (dataTitle !== undefined || dataContent !== undefined) {
                            layoutr.modal.addClass('has-info');
                        }
                        result = 
`${dataTitle !== undefined || dataContent !== undefined ? `
<button id="modal-toggle" class="btn" aria-label="Toggle info">
    <svg focusable="false"><use xlink:href="#svg-info"></use></svg>
</button>
${dataTitle !== undefined ? `<div id="modal-title">${dataTitle}</div>` : ''}
${dataContent !== undefined ? `<div id="modal-content">${dataContent}</div>` : ''}
` : ''}
<img id="modal-img" />`;
                    } else if (type === 'form') {
                        result = 
`<div class="header">
    ${dataTitle !== undefined ? `<span class="title">${dataTitle}</span>` : ''}
    ${dataClosable ?
`<button id="modal-close" class="close expand" aria-label="Close ${dataTitle !== undefined ? dataTitle : ''}">
    <svg focusable="false"><use xlink:href="#svg-close"></use></svg>
</button>` : ''}
</div>
<div class="content">
</div>`;
                    }
                    return result;
                };

                let html = 
`<div>
    <div>
        <div id="modal-container">
            ${template()}
        </div>
    </div>
</div>`;
                layoutr.modal.html(html);
                if (type === 'image') {
                    let image = layoutr.modal.find('#modal-img');
                    image.on('load', () => {
                        if (bowser.android) {
                            image.css('max-height', window.innerHeight);
                        }
                        layoutr.showModal(type, dataClosable);
                    });
                    image.attr('src', $this.attr('data-modal-img'));
                } else {
                    let dataSize = $this.attr('data-modal-size');
                    if (dataSize !== undefined) {
                        layoutr.modal.children('div').attr('data-modal-size', dataSize);
                    }
                    let content = layoutr.modal.find('#modal-container > .content');
                    content.append(dataContent);
                    layoutr.contentLoaded(content);
                    layoutr.pauseMedia();
                    layoutr.showModal(type, dataClosable);
                }
                if (dataFullscreen) {
                    layoutr.requestFullScreen();
                }
            }
        });

        layoutr.body.on('click', '#modal-toggle', () => {
            layoutr.modal.toggleClass('info-shown');
        });
    });
}