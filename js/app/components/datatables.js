var app = app || {};

app.datatables = function (tables) {
    if (tables.length) {
        if (!app.html.hasClass('datatables-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/datatables.min.css">'));
            app.html.addClass('datatables-loaded');
        }

        $.getScript('dist/js/datatables.min.js', function () {

            function table_header_input(instance) {
                instance.columns().every(function () {
                    let header = this.header(),
                        text = header.innerText,
                        column = $(header).empty().append('<div><div><span>' + text + '</span></div><div></div></div>'),
                        index = column.index();
                    if (column.hasClass('dropdown')) {
                        let select = $('<select class="dropdown theme-light align-left nowrap"><option value=""></option></select>')
                            .appendTo(column.find('> div > div:last-child'))
                            .on('change', function () {
                                let val = $(this).val();
                                instance.column(index)
                                    .search(val)
                                    .draw();
                            });

                        this.data().unique().sort().each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>');
                        });
                    } else if (column.hasClass('text')) {
                        let input = $('<input type="text" />')
                            .appendTo(column.find('> div > div:last-child'))
                            .on('keyup change', function () {
                                let val = $(this).val();
                                instance.column(index)
                                    .search(val)
                                    .draw();
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
                dropdown.addClass('dropdown theme-light').attr('data-width', 100);
                header.append(length);
            }

            function table_header_buttons(wrapper, header) {
                let container = wrapper.find('.dt-buttons');

                container.append('<div class="flex inline column wrap space-3"></div>');

                let div = container.children('div'),
                    buttons = container.children('button');

                container.append(div);
                buttons.addClass('btn theme-light');
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

            function table_footer_info(wrapper, footer) {
                let info = wrapper.find('.dataTables_info');
                footer.append(info);
            }

            function table_footer_paginate(wrapper, footer) {
                let paginate = wrapper.find('.dataTables_paginate');
                footer.append(paginate);
            }

            function table_dropdowns(wrapper) {
                let dropdowns = wrapper.find('select.dropdown');
                app.dropdown(dropdowns);
            }

            tables.each(function () {
                var $this = $(this);
                $this.addClass('display cell-border nowrap dataTable dtr-inline');
                var table = $this.DataTable({
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

                        wrapper.addClass('flex space-3');
                        wrapper.prepend('<div class="dataTables_header"><div class="flex column space-3 wrap"></div></div>');
                        let header = wrapper.find('> .dataTables_header > div');

                        wrapper.append('<div class="dataTables_footer"><div class="flex column space-3 wrap vertical-center"></div></div>');
                        let footer = wrapper.find('> .dataTables_footer > div');

                        table_header_input(instance);
                        table_header_sort(instance);
                        table_header_length(wrapper, header);
                        table_header_buttons(wrapper, header);
                        table_header_filter(wrapper, header);
                        table_footer_info(wrapper, footer);
                        table_footer_paginate(wrapper, footer);
                        table_dropdowns(wrapper);
                    }
                });

            });
        });
    }
};