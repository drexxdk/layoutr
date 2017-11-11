var app = app || {};

$(function () {
    app.main.on('click', '.modal', function () {
        var $this = $(this);

        var type = $this.attr('data-modal-type');
        if (type !== undefined && type.length && (type === 'image' || type === 'login' || type === 'register')) {
            if (type === 'image' && $this.attr('data-modal-img').length) {
                var title = $this.attr('data-modal-title');
                var description = $this.attr('data-modal-description');
                var html = [];
                html.push('<div>');
                if (title !== undefined || description !== undefined) {
                    app.modal.addClass('has-info');
                    html.push('<button id="modal-toggle" class="btn" aria-label="Toggle info">');
                    html.push('<svg focusable="false"><use xlink:href="#svg-info"></use></svg>');
                    html.push('</button>');
                }
                if (title !== undefined) {
                    html.push('<div id="modal-title">' + title + '</div>');
                }
                if (description !== undefined) {
                    html.push('<div id="modal-description">' + description + '</div>');
                }
                html.push('<img id="modal-img" src="' + $this.attr('data-modal-img') + '" />');
                html.push('</div>');
                var div = html.join("");
                app.modal.html(div);
            } else if (type === 'login') {

            } else if (type === 'register') {

            }
            app.modal.attr('data-type', type);
            app.modal.removeClass('hidden');
            app.setHtmlScroll();
        }
    });

    app.main.on('click', '#modal-toggle', function () {
        app.modal.toggleClass('info-shown');
    });

    $(window).click(function (e) {
        var target = $(e.target);
        var modal = target.closest('#modal');
        if (modal.length) {
            if (modal.attr('data-type') === 'image' && !target.closest('#modal-toggle').length && !target.closest('#modal-title').length && !target.closest('#modal-description').length) {
                app.modal.addClass('hidden').removeClass('has-info info-shown').attr('data-type', '').empty();
                app.setHtmlScroll();
            }
        }
    });
});