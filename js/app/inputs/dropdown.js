{
    layoutr.checkDropdown = (dropdowns) => {
        dropdowns.each((i, e) => {
            let $this = $(e),
                selected = $this.children('option:selected'),
                attr = $this.attr('class'),
                theme = '',
                width = $this.attr('data-width');
            if (selected.length !== 1) {
                selected = $this.children().first();
            }
            if (typeof attr !== typeof undefined && attr !== false) {
                let temp = attr.split(' ');
                temp = $.grep(temp, (item, index) => {
                    return item.trim().match(/^theme-/);
                });
                if (temp.length === 1) {
                    theme = temp[0];
                }
            }

            let liTemplate = (e) => {
                let li = $(e),
                    text = li.text();
                if (!text.length) {
                    text = '&nbsp;';
                }
                if (text.indexOf('$$') === 0) {
                    li.attr('data-math', text);
                }
                return `
<li data-id="${li.val()}"${li.is(':selected') ? ' class="selected"' : ''}>
    <div tabindex="0" class="theme-light">
        <label>${text}</label>
        <svg focusable="false"><use xlink:href="#svg-checkmark"></use></svg>
    </div>
</li>`;
            };
            let html = 
`<div class="dropdown
    ${$this.hasClass('not-first') ? ' not-first' : ''}
    ${$this.hasClass('nowrap') ? ' nowrap' : ''}
    ${$this.hasClass('check') ? ' check' : ''}
    ${$this.hasClass('ellipsis') ? ' ellipsis' : ''}
    ${$this.hasClass('align-left') ? ' align-left' : ''}
    ${$this.hasClass('align-right') ? ' align-right' : ''}
    ${$this.hasClass('direction-up') ? ' direction-up' : ''}
    "
    ${width !== undefined ? ` style="width: ${width}px"` : ''}
>
    <div tabindex="0" class="${theme}">
        <label>${selected.text()}</label>
        <svg focusable="false"><use xlink:href="#svg-arrow"></use></svg>
    </div>
    <ul class="${theme}">
        ${$this.hasClass('filter') ? `
<li class="filter"><input type="text" placeholder="Filter"></li>
<li class="no-results hidden"><div><label>No results</label></div></li>` : ''}
        ${$.makeArray($this.children()).map(liTemplate).join('')}
    </ul>
</div>`;
            $this.after(html);
            html = $this.next();
            if ($this.hasClass('filter')) {
                let lis = html.find('li:not(.filter):not(.no-results)'),
                    noResults = html.find('li.no-results');
                html.on('keyup', '.filter > input', (e) => {
                    let any = lis.filter((i, li) => {
                        if (li.innerText.indexOf(e.currentTarget.value) === -1) {
                            li.classList.add('hidden');
                            return false;
                        } else {
                            li.classList.remove('hidden');
                            return true;
                        }
                    });

                    any.length ? noResults.addClass('hidden') : noResults.removeClass('hidden');
                });
            }

            if ($this.hasClass('nowrap')) {
                let top = html.children().eq(0),
                    bottom = html.children().eq(1),
                    topWidth = top.width(),
                    bottomWidth = bottom.width();
                if (bottomWidth > topWidth) {
                    top.css('min-width', bottomWidth);
                }
            }

            html.on('click', '> div', (e) => {
                let dropdown = $(e.currentTarget).parent()
                layoutr.dropdown = dropdown;
                dropdown.toggleClass('open');
            });
            html.on('click', 'li:not(.filter)', (e) => {
                let $that = $(e.currentTarget);
                if (!$that.hasClass('selected')) {
                    console.log('test a');
                    $that.siblings('.selected').removeClass('selected');
                    $that.addClass('selected');
                    let option = $this.children(`[value="${$that.attr('data-id')}"]`),
                        text = $that.text(),
                        math = option.attr('data-math');
                    if (math !== undefined) {
                        text = math;
                    }
                    let label = html.children('div').children('label');
                    label.text(text);
                    if (math !== undefined) {
                        renderMathInElement(label[0]);
                    }
                    $this.children(':selected').removeAttr('selected');
                    option.prop('selected', true);
                    $this.change();
                }
                html.removeClass('open');
            });
        });
    };

    $(window).click((e) => {
        if (layoutr.dropdown) {
            let target = $(e.target);
            if (target.closest("div.dropdown").length) {
                $('div.dropdown').not(target.closest(layoutr.dropdown)).removeClass('open');
            }

            if (!target.closest(layoutr.dropdown).length) {
                layoutr.closeDropdown();
            }
        }
    });

    layoutr.closeDropdown = () => {
        if (layoutr.dropdown) {
            layoutr.dropdown.removeClass('open');
        }
    };
}