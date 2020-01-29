{
    layoutr.checkDropdown = (dropdowns) => {
        dropdowns.each((i, e) => {
            let select = $(e),
                selected = select.find('option:selected'),
                attr = select.attr('class'),
                theme = '',
                name = select.attr('name'),
                width = select.attr('data-width');
            if (selected.length !== 1) {
                selected = select.children().first();
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

            let liTemplate = (e, i) => {
                let li = $(e),
                    text;
                if (li.is('optgroup')) {
                    text = li[0].label;
                } else {
                    text = li.text();
                }
                if (select.hasClass('not-first') && !li.is('optgroup') && li.val() === "") {
                    return;
                }
                if (!text.length) {
                    text = '&nbsp;';
                }
                if (text.indexOf('$$') === 0) {
                    li.attr('data-math', text);
                }

                if (li.is('optgroup')) {
                    return `
<li class="optgroup">
    <label>${text}</label>
    <ul>
        ${ $.makeArray(li.children()).map(liTemplate).join('')}
    </ul>
</li>`;
                } else {
                    return `
<li tabindex="0" class="theme-light ${select.hasClass('align-left') ? ' align-left' : ''} ${select.hasClass('align-right') ? ' align-right' : ''} ${li.is(':selected') ? ' selected' : ''}" data-id="${li.val()}">
    ${select.is('[multiple]') && !(e.value === "" && i === 0) ? `<div class="switch round">
                                    <input id="${name}_${i}" name="${name}_${i}" type="checkbox">
                                    <label tabindex="0" for="${name}_${i}"><i></i><span>${text}</span></label>
                                </div>` : `<label>${text}</label>`}
    ${select.hasClass('check') ? '<svg focusable="false"><use xlink:href="#svg-checkmark"></use></svg>' : ''}
</li>`;
                }
            };

            let html = `
<div class="dropdown
    ${select.hasClass('nowrap') ? ' nowrap' : ''}
    ${select.hasClass('check') ? ' check' : ''}
    ${select.hasClass('ellipsis') ? ' ellipsis' : ''}
    ${select.hasClass('align-left') ? ' align-left' : ''}
    ${select.hasClass('align-right') ? ' align-right' : ''}
    ${select.hasClass('direction-up') ? ' direction-up' : ''}
    ${select.is('[multiple]') ? ' multiple align-left' : ''}
    "
    ${width !== undefined ? ` style="width: ${width}px"` : ''}
>
    <div tabindex="0" class="${theme}">
        <label>${selected.text()}</label>
        <svg focusable="false"><use xlink:href="#svg-arrow"></use></svg>
    </div>
    <ul class="${theme}">
        ${select.hasClass('filter') ? `
<li class="filter"><input type="text" placeholder="Filter"></li>
<li class="no-results hidden"><div><label>No results</label></div></li>` : ''}
        ${$.makeArray(select.children()).map(liTemplate).join('')}
    </ul>
</div>`;
            select.after(html);
            let dropdown = select.next();
            if (select.hasClass('filter')) {
                let lis = dropdown.find('li:not(.filter):not(.no-results):not(.optgroup)'),
                    noResults = dropdown.find('li.no-results');
                dropdown.on('keyup', '.filter > input', (e) => {
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
                    let optgroups = dropdown.find('li.optgroup');
                    optgroups.each((i, optgroup) => {
                        optgroup = $(optgroup);
                        if (optgroup.find('li:not(.hidden)').length) {
                            optgroup.removeClass('hidden');
                        } else {
                            optgroup.addClass('hidden');
                        }
                    });
                });
            }

            if (select.hasClass('nowrap')) {
                let top = dropdown.children().eq(0),
                    bottom = dropdown.children().eq(1),
                    topWidth = top.width(),
                    bottomWidth = bottom.width();
                if (bottomWidth > topWidth) {
                    top.css('min-width', bottomWidth);
                }
            }

            dropdown.on('click', '> div', (e) => {
                layoutr.dropdown = dropdown;
                dropdown.toggleClass('open');
            });
            dropdown.on('click', 'li:not(.filter):not(.optgroup)', (e) => {
                // clicking on input inside, makes it call click twice
                e.stopPropagation();
                e.preventDefault();
                let li = $(e.currentTarget);
                if (select.is('[multiple]') || !li.hasClass('selected')) {
                    let option = select.find(`[value="${li.attr('data-id')}"]`),
                        text = li.text(),
                        label = dropdown.children('div').children('label');

                    if (select.is('[multiple]')) {
                        if (option.index() === 0 && option.val() === "") {
                            if (select.val().length) {
                                li.addClass('selected');
                                option.prop('selected', false);
                                select.children(':selected').not(option).removeAttr('selected');
                                li.siblings().removeClass('selected').find('input').prop('checked', false);
                                option.siblings(':selected').prop('selected', false);
                                label.text(text);
                                dropdown.removeClass('open');
                                select.change();
                            } else {
                                dropdown.removeClass('open');
                            }
                        } else {
                            li.siblings().first('[val=""]').removeClass('selected');
                            li.toggleClass('selected');
                            option.prop('selected', !option.prop('selected'));
                            if (!$(e.target).is('input')) {
                                li.find('input').prop('checked', option.prop('selected'));
                            }
                            text = `${select.children(':selected').length} selected`;
                            label.text(text);
                            select.change();
                        }
                    } else {
                        let math = option.attr('data-math');
                        layoutr.dropdown.find('.selected').removeClass('selected');
                        li.addClass('selected');
                        if (math !== undefined) {
                            text = math;
                        }
                        label.text(text);
                        if (math !== undefined) {
                            renderMathInElement(label[0]);
                        }
                        select.children(':selected').removeAttr('selected');
                        option.prop('selected', true);
                        dropdown.removeClass('open');
                        select.change();
                    }
                } else {
                    dropdown.removeClass('open');
                }
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