{
    layoutr.checkDatatable = (tables) => {
        if (tables.length) {
            if (!layoutr.html.hasClass('datatables-loaded')) {
                layoutr.showLoading();
                layoutr.promiseDatatables = layoutr.load.js('dist/js/datatables.js').finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('datatables-loaded');
            }
            layoutr.promiseDatatables.then(() => {
                let count = 0,
                    gap = 'gap-3';
                let table_header_input = (instance, wrapper) => {
                    let ths = wrapper.find('thead th'),
                        elements = jQuery.grep(ths, (e) => {
                            let column = $(e);
                            return column.hasClass('dropdown') || column.hasClass('text');
                        });
                    for (let i = 0; i < ths.length; i++) {
                        let column = $(ths[i]),
                            text = column.html(),
                            minWidth = column.attr('data-min-width'),
                            style = minWidth ? `min-width: ${minWidth}px;` : '',
                            html =
                                `<div style="${style}">
    <div>
        <span>${text}</span>
    </div>
    ${elements.length ? '<div></div>' : ''}
</div>`;
                        column.empty().append(html);
                        let index = column.index();

                        if (column.hasClass('dropdown')) {
                            let select = $('<select class="dropdown align-left nowrap"><option value=""></option></select>')
                                .appendTo(column.find('> div > div:last-child'))
                                .on('change', (e) => {
                                    instance.column(index).search(e.currentTarget.value).draw();
                                });

                            instance.column(i).data().unique().sort(layoutr.sort).each((d, j) => {
                                select.append(`<option value="${d}">${d}</option>`);
                            });
                        } else if (column.hasClass('text')) {
                            let input = $('<input type="text" />')
                                .appendTo(column.find('> div > div:last-child'))
                                .on('keyup', (e) => {
                                    let $this = $(e.currentTarget),
                                        val = $this.val();

                                    if ($this.attr('data-last') !== val) {
                                        instance.column(index).search(val).draw();
                                    }
                                    $this.attr('data-last', val);
                                });
                            input.parent().addClass('form-group');
                        }
                        //debugger;
                    }
                };
                let table_header_sort = (instance, wrapper) => {
                    wrapper.find('thead th').off('click');

                    let enabled = wrapper.find('thead th:not(.sorting-disabled)'),
                        disabled = wrapper.find('thead th.sorting-disabled');

                    disabled.removeAttr('tabindex');

                    enabled.find('> div > div:first-child').append('<span class="sort-btn"></span>');
                    enabled.click((e) => {
                        let $this = $(e.target);
                        if (!$this.closest('div.dropdown').length && !$this.closest('input').length) {
                            let parent = $this.parents('th'),
                                index = parent.index();
                            if (parent.hasClass('sorting_asc')) {
                                instance.column(index).order('desc').draw();

                            } else {
                                instance.column(index).order('asc').draw();
                            }
                        }
                    });
                };
                let table_header_length = (wrapper, header) => {
                    let length = wrapper.find('.dataTables_length'),
                        dropdown = length.find('select');

                    length.append(dropdown);
                    length.children('label').remove();
                    dropdown.addClass('dropdown').attr('data-width', 100);
                    header.append(length);
                };
                let table_header_buttons = (wrapper, header) => {
                    let container = wrapper.find('.dt-buttons');

                    container.append(`<div class="flex wrap ${gap}"></div>`);

                    let div = container.children('div'),
                        buttons = container.children('button');

                    container.append(div);
                    buttons.addClass('btn');
                    div.append(buttons);
                    header.append(container);
                };
                let table_header_filter = (wrapper, header) => {
                    let filter = wrapper.find('.dataTables_filter');

                    filter.addClass('input-group');
                    filter.find('input').appendTo(filter);
                    filter.append('<div class="input-group-addon"><svg focusable="false"><use xlink:href="#svg-search"></use></svg></div>');
                    filter.find('label').remove();
                    header.append(filter);
                };
                let table_content = (wrapper, content) => {
                    let table = wrapper.find('table');
                    content.append(table);
                    return table;
                };
                let table_footer_info = (wrapper, footer) => {
                    let info = wrapper.find('.dataTables_info');
                    footer.append(info);
                };
                let paginateFix = (paginate) => {
                    let span = paginate.children('span'),
                        prev = paginate.find('.paginate_button.previous'),
                        next = paginate.find('.paginate_button.next');

                    prev.html('<svg focusable="false"><use xlink:href="#svg-arrow"></use></svg>');
                    next.html('<svg focusable="false"><use xlink:href="#svg-arrow"></use></svg>');

                    prev.prependTo(span);
                    next.appendTo(span);
                };
                let table_footer_paginate = (wrapper, footer, paginate) => {
                    paginate.addClass('flex wrap');
                    footer.append('<div class="dataTables_paginate_container"></div>');
                    let container = footer.find('.dataTables_paginate_container');
                    paginateFix(paginate);
                    container.append(paginate);
                };
                let table_dropdowns = (wrapper) => {
                    let dropdowns = wrapper.find('select.dropdown');
                    layoutr.checkDropdown(dropdowns);
                };

                tables.each((i, e) => {
                    let $this = $(e),
                        exportOptions = {
                            "format": {
                                header: (text, index, th) => {
                                    return $(th).find('span:first').html();
                                }
                            }
                        };
                    $this.addClass('nowrap');
                    $this.DataTable({
                        "dom": 'lBfrtip',
                        "bSortCellsTop": true,
                        buttons: [
                            {
                                extend: 'copyHtml5',
                                footer: false,
                                exportOptions: exportOptions
                            },
                            {
                                extend: 'excelHtml5',
                                footer: false,
                                exportOptions: exportOptions
                            },
                            {
                                extend: 'csvHtml5',
                                footer: false,
                                exportOptions: exportOptions
                            }
                        ],
                        responsive: true,
                        initComplete: (settings) => {
                            let instance = settings.oInstance.api(true),
                                wrapper = $(settings.nTableWrapper);

                            wrapper.append(`<div class="dataTables_header flex column grow"><div class="flex wrap ${gap}"></div></div>`);
                            let header = wrapper.find('> .dataTables_header > div');

                            wrapper.append('<div class="dataTables_content table"></div>');
                            let content = wrapper.find('> .dataTables_content');

                            wrapper.append(`<div class="dataTables_footer"><div class="flex wrap vertical-center ${gap}"></div></div>`);
                            let footer = wrapper.find('> .dataTables_footer > div');

                            table_header_input(instance, wrapper);
                            table_header_sort(instance, wrapper);
                            table_header_length(wrapper, header);
                            table_header_buttons(wrapper, header);
                            table_header_filter(wrapper, header);

                            let table = table_content(wrapper, content);

                            table_footer_info(wrapper, footer);

                            let paginate = wrapper.find('.dataTables_paginate');
                            table_footer_paginate(wrapper, footer, paginate);

                            table_dropdowns(wrapper);

                            count++;
                            if (count === tables.length) {
                                layoutr.hideLoading();
                            }

                            $this.on('draw.dt', () => {
                                let columns = instance.columns().responsiveHidden();
                                $this.trigger('responsive-resize', [table[0], columns]);
                            });

                            layoutr.html.on('aside-changed.datatables', () => {
                                instance.responsive.recalc();
                            });

                            $this.on('responsive-resize', (e, datatable, columns) => {
                                let count = columns.reduce((a, b) => {
                                    return b === false ? a + 1 : a;
                                }, 0);

                                let elements = table.find('tbody tr:not(.child) > *:first-child:not(.dataTables_empty)');
                                elements.removeAttr('tabindex');

                                elements.children('i').remove();
                                if (count) {
                                    elements.prepend('<i tabindex="0"><svg focusable="false"><use xlink:href="#svg-plus"></use></svg><svg focusable="false"><use xlink:href="#svg-minus"></use></svg></i>');
                                }
                            });

                        }
                    });
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load datatables', 'danger');
                console.error(e);
            });
        }
    };
}