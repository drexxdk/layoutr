var app = app || {};

$(function () {
    app.main.on('click', '.modal', function () {
        var $this = $(this);

        var type = $this.attr('data-modal');
        if (type !== undefined && type.length && (type === 'image' || type === 'form')) {
            var id = $this.attr('data-modal-id');
            var html = [];
            html.push('<div><div><div>');
            var title = $this.attr('data-modal-title');
            if (type === 'image' && $this.attr('data-modal-img').length) {
                var description = $this.attr('data-modal-description');
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
                html.push('<img id="modal-img" />');

            } else if (type === 'form') {
                html.push('<div class="header">');
                if (title !== undefined) {
                    html.push('<span class="title">' + title + '</span>');
                }
                html.push('<button id="modal-close" class="close" aria-label="Close ' + (title !== undefined ? title : '') + '"><svg focusable="false"><use xlink:href="#svg-close"></use></svg></button >');
                html.push('</div>');

                if (id === 'login') {
                    html.push('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>');
                } else if (id === 'register') {
                    html.push('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis odio quis nunc porta tincidunt. Praesent in augue velit. Vivamus efficitur nisi eget convallis placerat. Quisque luctus nibh vitae mauris vehicula dignissim. Cras quis velit ac metus maximus luctus eget rutrum nisl. Nulla facilisi. Nullam gravida efficitur fringilla. Etiam pretium condimentum tempus. Sed feugiat tortor vitae est porttitor, eu pharetra arcu fringilla. Sed nec luctus enim, nec rhoncus velit. Fusce dolor sem, varius id rutrum in, efficitur sed magna.<br /><br />' +
                        'Maecenas ut lacinia orci.Phasellus sagittis nisi eu mauris tempus, sit amet lobortis justo dapibus.Nulla facilisi.Aenean venenatis faucibus gravida.Praesent et justo fringilla mauris convallis pretium.Maecenas egestas lectus non erat tincidunt, in egestas risus ultricies.Praesent erat felis, rutrum ac accumsan eget, accumsan ac nisi.Integer sollicitudin risus sed purus maximus porta.Nam maximus, leo at dapibus lobortis, nunc eros molestie justo, vel scelerisque est dolor non tellus.Integer fermentum mi malesuada, placerat mi ac, laoreet risus.<br /><br />' +
                        'Sed et felis a velit accumsan sollicitudin ut a dolor.Integer iaculis quam risus, ac placerat nibh fringilla non.Donec non diam nulla.Vestibulum pretium magna ac malesuada lobortis.Nam eleifend sapien sed efficitur fermentum.Ut magna sapien, mattis nec ligula sollicitudin, ultricies efficitur quam.Praesent vestibulum libero et lorem vulputate, sit amet sagittis velit bibendum.Morbi blandit quis nibh a rhoncus.Phasellus maximus justo ac varius dapibus.Mauris suscipit quam vitae augue ornare, eu rutrum elit tincidunt.Nam rutrum turpis ut bibendum iaculis.Nunc bibendum pretium turpis non ullamcorper.Morbi rhoncus tortor sit amet diam imperdiet luctus.Cras tempor interdum est, et sodales neque semper a.Aliquam imperdiet risus ex, id imperdiet urna egestas in. Vivamus eu suscipit augue.<br /><br />' +
                        'Maecenas nec mauris diam.Aenean lobortis mauris sit amet ligula imperdiet tincidunt.Suspendisse ornare nisl metus, id sagittis ligula feugiat vitae.Nullam viverra velit non augue maximus, quis vulputate nisi tincidunt.Maecenas pretium mi sed tellus placerat molestie.Duis laoreet purus eu lectus accumsan faucibus.Donec cursus odio turpis, ac maximus lacus euismod finibus.Nunc blandit ultricies ultrices.Etiam vitae auctor quam.Ut sem libero, aliquam ut erat vitae, dapibus lacinia erat.Donec nec erat commodo, tincidunt arcu nec, tincidunt ligula.Maecenas id facilisis neque.In sollicitudin ligula non congue convallis.Sed et varius odio.Mauris scelerisque nisl ac ipsum sodales, ut lacinia nisi tempus.<br /><br />' +
                        'Maecenas orci magna, convallis vel blandit id, tincidunt tempus lorem.Duis in purus velit.Vivamus elit urna, congue a congue ut, porttitor id orci.Vestibulum mattis, nisi in eleifend aliquet, lectus velit imperdiet est, at gravida quam erat et lectus.Aliquam vehicula nisi sed turpis posuere pretium.Integer a enim nec nisl faucibus varius.Cras pharetra viverra magna id finibus.Donec aliquet blandit est eu venenatis.Nunc et quam imperdiet, pellentesque neque at, malesuada lorem.Vivamus ut elementum ipsum.Vivamus mauris est, malesuada ut lacinia eu, porta id mauris.Suspendisse potenti.Nulla vel libero ac nunc porta mollis nec ac ligula.</p>');
                }
            }
            html.push('</div></div></div>');
            var div = html.join("");
            app.modal.html(div);
            if (type === 'image') {
                //app.html.addClass('modal');
                var image = app.modal.find('#modal-img');
                image.on('load', function () {
                    if (app.html.hasClass('android')) {
                        image.css('max-height', window.innerHeight);
                    }
                    app.html.attr('data-modal', type);
                });
                image.attr('src', $this.attr('data-modal-img'));
            } else {
                app.html.attr('data-modal', type);
            }
            app.html.addClass('modal')
            app.checkModal();
            app.setHtmlScroll();
        }
    });

    app.main.on('click', '#modal-toggle', function () {
        app.modal.toggleClass('info-shown');
    });

    app.main.on('click', '#modal-close', function () {
        app.closeModal();
    });

    app.closeModal = function () {
        app.html.removeClass('modal').attr('data-modal', '');
        app.modal.removeClass('info-shown').empty();
        app.checkModal();
        app.setHtmlScroll();
    };
});