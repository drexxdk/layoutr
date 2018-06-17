var app = app || {};

app.datatables = function (tables) {
    if (tables.length) {
        $.getScript('dist/js/datatables.min.js', function () {

            var spacing = 'space-3';

            function search(instance, index, element) {
                instance.column(index).search(element.value).draw();
            }

            function table_header_input(instance) {
                instance.columns().every(function () {
                    let header = this.header(),
                        text = header.innerText,
                        column = $(header).empty().append('<div><div><span>' + text + '</span></div><div></div></div>'),
                        index = column.index();
                    if (column.hasClass('dropdown')) {
                        let select = $('<select class="dropdown align-left nowrap"><option value=""></option></select>')
                            .appendTo(column.find('> div > div:last-child'))
                            .on('change', function () {
                                search(instance, index, this);
                            });

                        this.data().unique().sort().each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>');
                        });
                    } else if (column.hasClass('text')) {
                        let input = $('<input type="text" />')
                            .appendTo(column.find('> div > div:last-child'))
                            .on('keyup change', function () {
                                search(instance, index, this);
                            });
                        input.parent().addClass('form-group');
                    }
                });
            }
            function table_header_sort(instance) {
                var th = $(instance.table).find('thead th');
                th.unbind('click');
                th.find('> div > div:first-child').append('<button class="sort-btn"></button>');
                th.click(function (e) {
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
            function table_header_length(wrapper, header) {
                let length = wrapper.find('.dataTables_length'),
                    dropdown = length.find('select');

                length.append(dropdown);
                length.children('label').remove();
                dropdown.addClass('dropdown').attr('data-width', 100);
                header.append(length);
            }
            function table_header_buttons(wrapper, header) {
                let container = wrapper.find('.dt-buttons');

                container.append('<div class="flex column wrap ' + spacing + '"></div>');

                let div = container.children('div'),
                    buttons = container.children('button');

                container.append(div);
                buttons.addClass('btn');
                div.append(buttons);
                header.append(container);
            }
            function table_header_filter(wrapper, header) {
                let filter = wrapper.find('.dataTables_filter');

                filter.addClass('input-group');
                filter.find('input').appendTo(filter);
                filter.append('<div class="input-group-addon"><svg focusable="false"><use xlink:href="#svg-search"></use></svg></div>');
                filter.find('label').remove();
                header.append(filter);
            }

            function table_content(wrapper, content) {
                let table = wrapper.find('table');
                content.append(table);
            }

            function table_footer_info(wrapper, footer) {
                let info = wrapper.find('.dataTables_info');
                footer.append(info);
            }
            function table_footer_paginate(wrapper, footer) {
                let paginate = wrapper.find('.dataTables_paginate');
                paginate.addClass('flex column wrap');

                footer.append('<div class="dataTables_paginate_container"></div>');
                let container = footer.find('.dataTables_paginate_container');

                container.append(paginate);
            }

            function table_dropdowns(wrapper) {
                let dropdowns = wrapper.find('select.dropdown');
                app.dropdown(dropdowns);
            }

            tables.each(function () {
                var $this = $(this);
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
                        var instance = this.api();
                        let wrapper = $(settings.nTableWrapper);
                        
                        wrapper.append('<div class="dataTables_header flex grow"><div class="flex column wrap ' + spacing + '"></div></div>');
                        let header = wrapper.find('> .dataTables_header > div');

                        wrapper.append('<div class="dataTables_content table"></div>');
                        let content = wrapper.find('> .dataTables_content');

                        wrapper.append('<div class="dataTables_footer"><div class="flex column wrap vertical-center ' + spacing + '"></div></div>');
                        let footer = wrapper.find('> .dataTables_footer > div');

                        table_header_input(instance);
                        table_header_sort(instance);
                        table_header_length(wrapper, header);
                        table_header_buttons(wrapper, header);
                        table_header_filter(wrapper, header);

                        table_content(wrapper, content);

                        table_footer_info(wrapper, footer);
                        table_footer_paginate(wrapper, footer);

                        table_dropdowns(wrapper);
                    }
                });

            });
        });
    }
};