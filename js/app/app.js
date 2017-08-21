$(function () {
    var main = $('#main'),
        left = $('#left'),
        right = $('#right'),
        footer = $('footer'),
        $html = $('html'),
        $body = $('body');

    footer.html('\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen');

    $('.aside').click(function () {
        var $this = $(this);
        if ($this.hasClass('left')) {
            main.toggleClass('left-open').removeClass('right-open');
        } else if ($this.hasClass('right')) {
            main.toggleClass('right-open').removeClass('left-open');
        }
    });

    $(document).click(function (e) {
        var target = $(e.target);
        if (!target.closest("aside").length && !target.closest(".aside").length) {
            main.removeClass('right-open'); /* left-open */
        }
    });

    var showLoading = function () {
        $body.addClass('loading');
        lockScroll();
        setTimeout(function () {
            $body.removeClass('loading');
            unlockScroll();
        }, 2000);
    }

    $('#toggle-loading').click(function () {
        showLoading();
    });

    $('#toggle-footer-position').click(function () {
        main.toggleClass('footer-fixed');
    });

    $('#toggle-column').click(function () {
        main.toggleClass('one-column two-column');
    });

    $('#toggle-transition').click(function () {
        main.toggleClass('transition');
    });

    function lockScroll() {
        var initWidth = $body.outerWidth();
        var initHeight = $body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        $html.data('scroll-position', scrollPosition);
        $html.data('previous-overflow', $html.css('overflow'));
        $html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        var marginR = $body.outerWidth() - initWidth;
        var marginB = $body.outerHeight() - initHeight;
        $body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
    }

    function unlockScroll() {
        $html.css('overflow', $html.data('previous-overflow'));
        var scrollPosition = $html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        $body.css({ 'margin-right': 0, 'margin-bottom': 0 });
    }
});