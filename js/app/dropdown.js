var app = app || {};

app.dropdown = function (dropdowns) {
    dropdowns.each(function () {
        var $this = $(this);
        var selected = $this.children('option:selected');
        if (selected.length !== 1) {
            selected = $this.children().first();
        }
        var html = [];
        html.push('<div class="dropdown">')
        html.push('<div><div class="btn btn-light"><label>' + selected.text() + '</label><svg><use xlink:href="#svg-plus"></use></svg></div></div>');
        html.push('<ul>');
        $this.children().each(function (index) {
            var $that = $(this);
            html.push('<li data-id="' + index + '"' + ($that.is(':selected') ? ' class="selected"' : '') + '><div class="btn btn-light">' + $that.text() + '</div></li>');
        });
        html.push('</ul>');
        html.push('</div>');
        var dropdown = html.join("");
        $this.after(dropdown);
        dropdown = $this.next();
        dropdown.on('click', 'div', function () {
            var $that = $(this);
            $that.parent().toggleClass('open');
        });
        dropdown.on('click', 'li', function () {
            var $that = $(this);
            if (!$that.hasClass('selected')) {
                $that.siblings('.selected').removeClass('selected');
                $that.addClass('selected');
                dropdown.children('div').children('div').children('label').text($that.text());
            }
            dropdown.removeClass('open');
        });
    });





};