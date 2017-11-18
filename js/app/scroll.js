var app = app || {};

$(function () {
    app.disableScroll = function () {
        if (app.htmlOverflowEnabled) {
            app.htmlOverflowEnabled = false;
            if (app.html.hasClass('modal')) {
                app.checkModal();
                app.modal.focus();
            }
            var scrollTop = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            app.html.addClass('scrollDisabled');
          
            app.body.scrollTop(scrollTop);
            app.main.scrollTop(scrollTop);
        }
    };

    app.enableScroll = function () {
        if (!app.htmlOverflowEnabled) {
            app.htmlOverflowEnabled = true;
            var scrollTop = app.body.scrollTop() || app.main.scrollTop() || app.html.scrollTop();
            app.html.removeClass('scrollDisabled modal');
            app.main.focus();
            app.body.scrollTop(scrollTop); // edge, safari
            app.html.scrollTop(scrollTop); // chrome, firefox, ie
        }
    };

    app.setHtmlScroll = function () {
        if (!app.html.attr('data-modal').length && app.loading.hasClass('hidden') && !app.htmlOverflowEnabled && (!app.isSmallBreakpoint() || app.isSmallBreakpoint() && app.html.attr('data-aside') !== 'left' && app.html.attr('data-aside') !== 'right')) {
            app.enableScroll();
        } else if (app.html.attr('data-modal').length || app.isSmallBreakpoint() && app.htmlOverflowEnabled && (app.html.attr('data-aside') === 'left' || app.html.attr('data-aside') === 'right')) {
            app.disableScroll();
        }
    };

    app.checkModal = function () {
        if (app.html.hasClass('modal')) {
            app.body.css('padding-right', app.scrollbarWidth);
            if (app.html.attr('data-aside') === 'right') {
                app.right.css('margin-right', app.scrollbarWidth);
            }
        } else {
            app.body.css('padding-right', 0);
            app.right.css('margin-right', 0);
        }

        if (app.contentHeader !== undefined) {
            if (app.html.hasClass('modal') && app.contentHeader.css('position') === 'fixed') {
                var halfOverflowY = app.scrollbarWidth / 2;
                app.contentHeader.children().css('width', 'calc(100% - ' + halfOverflowY + 'px)');
            } else {
                app.contentHeader.children().css('width', '');
            }
        }
    };

    $(window).resize(function () {
        app.checkModal();
        app.setHtmlScroll();
    });
});