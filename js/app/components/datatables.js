var app = app || {};

app.checkDatatable = (tables) => {
    if (tables.length) {
        let count = 0;
        app.showLoading();
        $.getScript('dist/js/datatables.min.js', () => {
            let spacing = 'space-3';

            let table_header_input = (instance) => {
                let columns = instance.columns().header();
                let elements = jQuery.grep(columns, (e) => {
                    let column = $(e);
                    return column.hasClass('dropdown') || column.hasClass('text');
                });
                instance.columns().every(function () {
                    let th = this.header(),
                        text = th.innerText,
                        column = $(th),
                        style = '';


                    let minWidth = column.attr('data-min-width');
                    if (minWidth) {
                        style += 'min-width: ' + minWidth + 'px;';
                    }

                    column.empty().append('<div style="' + style + '"><div><span>' + text + '</span></div>' + (elements.length ? '<div></div>' : '') + '</div>');
                    let index = column.index();

                    if (column.hasClass('dropdown')) {
                        let select = $('<select class="dropdown align-left nowrap"><option value=""></option></select>')
                            .appendTo(column.find('> div > div:last-child'))
                            .on('change', (e) => {
                                instance.column(index).search(e.currentTarget.value).draw();
                            });

                        this.data().unique().sort().each((d, j) => {
                            select.append('<option value="' + d + '">' + d + '</option>');
                        });
                    } else if (column.hasClass('text')) {
                        let input = $('<input type="text" />')
                            .appendTo(column.find('> div > div:last-child'))
                            .on('keyup change', (e) => {
                                instance.column(index).search(e.currentTarget.value).draw();
                            });
                        input.parent().addClass('form-group');
                    }
                });
            }
            let table_header_sort = (instance, wrapper) => {
                let th = wrapper.find('thead th');
                th.unbind('click');
                th.find('> div > div:first-child').append('<span class="sort-btn"></span>');
                th.click((e) => {
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
            }
            let table_header_length = (wrapper, header) => {
                let length = wrapper.find('.dataTables_length'),
                    dropdown = length.find('select');

                length.append(dropdown);
                length.children('label').remove();
                dropdown.addClass('dropdown').attr('data-width', 100);
                header.append(length);
            }
            let table_header_buttons = (wrapper, header) => {
                let container = wrapper.find('.dt-buttons');

                container.append('<div class="flex column wrap ' + spacing + '"></div>');

                let div = container.children('div'),
                    buttons = container.children('button');

                container.append(div);
                buttons.addClass('btn');
                div.append(buttons);
                header.append(container);
            }
            let table_header_filter = (wrapper, header) => {
                let filter = wrapper.find('.dataTables_filter');

                filter.addClass('input-group');
                filter.find('input').appendTo(filter);
                filter.append('<div class="input-group-addon"><svg focusable="false"><use xlink:href="#svg-search"></use></svg></div>');
                filter.find('label').remove();
                header.append(filter);
            }
            let table_content = (wrapper, content) => {
                let table = wrapper.find('table');
                content.append(table);
                return table;
            }
            let table_footer_info = (wrapper, footer) => {
                let info = wrapper.find('.dataTables_info');
                footer.append(info);
            }
            let paginateFix = (paginate) => {
                let span = paginate.children('span'),
                    prev = paginate.find('.paginate_button.previous'),
                    next = paginate.find('.paginate_button.next');

                prev.html('<svg focusable="false"><use xlink:href="#svg-arrow"></use></svg>');
                next.html('<svg focusable="false"><use xlink:href="#svg-arrow"></use></svg>');

                prev.prependTo(span);
                next.appendTo(span);
            }
            let table_footer_paginate = (wrapper, footer, paginate) => {
                paginate.addClass('flex column wrap');
                footer.append('<div class="dataTables_paginate_container"></div>');
                let container = footer.find('.dataTables_paginate_container');
                paginateFix(paginate);
                container.append(paginate);
            }
            let table_dropdowns = (wrapper) => {
                let dropdowns = wrapper.find('select.dropdown');
                app.checkDropdown(dropdowns);
            }

            tables.each((i, e) => {
                let $this = $(e);
                $this.addClass('nowrap');
                $this.DataTable({
                    "dom": 'lBfrtip',
                    "bSortCellsTop": true,
                    buttons: [
                        //'copy', 'excel', 'csv'
                        'copyHtml5', 'excelHtml5', 'csvHtml5'
                    ],
                    responsive: true,
                    initComplete: function (settings, json) {
                        let instance = this.api(),
                            wrapper = $(settings.nTableWrapper);

                        wrapper.append('<div class="dataTables_header flex grow"><div class="flex column wrap ' + spacing + '"></div></div>');
                        let header = wrapper.find('> .dataTables_header > div');

                        wrapper.append('<div class="dataTables_content table"></div>');
                        let content = wrapper.find('> .dataTables_content');

                        wrapper.append('<div class="dataTables_footer"><div class="flex column wrap vertical-center ' + spacing + '"></div></div>');
                        let footer = wrapper.find('> .dataTables_footer > div');

                        table_header_input(instance);
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
                        if (count = tables.length) {
                            app.hideLoading();
                        }

                        $this.on('draw.dt', function () {
                            paginateFix(paginate);
                            let columns = instance.columns().responsiveHidden();
                            $this.trigger('responsive-resize.dt', [this, columns]);
                        });

                        app.html.on('aside-changed.datatables', () => {
                            instance.responsive.recalc();
                        });

                        $this.on('responsive-resize.dt', (e, datatable, columns) => {
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
        });
    } else {
        app.html.off('aside-changed.datatables');
    }
};