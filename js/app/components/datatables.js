var app = app || {};

app.datatables = function (tables) {
    if (tables.length) {
        if (!app.html.hasClass('datatables-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/datatables.min.css">'));
            app.html.addClass('datatables-loaded');
        }

        $.getScript('dist/js/datatables.min.js', function () {
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
                        var tableHeader = settings.aoHeader[settings.aoHeader.length - 1];
                        this.api().columns().every(function () {
                            let header = this.header(),
                                text = header.innerText,
                                column = $(header).empty().append('<div><div><span>' + text + '</span></div><div></div></div>'),
                                index = column.index();
                            if (column.hasClass('dropdown')) {
                                let select = $('<select class="dropdown align-left nowrap"><option value=""></option></select>')
                                    .appendTo(column.find('> div > div:last-child'))
                                    .on('change', function () {
                                        let val = $(this).val();
                                        table.column(index)
                                            .search(val ? '^' + val + '$' : '', true, false)
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
                                        table.column(index)
                                            .search(val)
                                            .draw();
                                    });
                                input.parent().addClass('form-group');
                            }

                        });

                        let wrapper = $(settings.nTableWrapper),
                            dropdown = wrapper.find('.dataTables_length select');

                        dropdown.addClass('dropdown').attr('data-width', 100);
                        var dropdowns = wrapper.find('select.dropdown');

                        app.dropdown(dropdowns);

                        wrapper.find('thead th').each(function (index, th) {
                            th = $(th);
                            th.unbind('click');
                            th.find('> div > div:first-child').append('<button class="sort-btn"></button>');
                            th.click(function (e) {
                                var $this = $(e.target);
                                if (!$this.closest('div.dropdown').length && !$this.closest('input').length) {
                                    var parent = $this.parents('th');
                                    if (parent.hasClass('sorting_asc')) {
                                        table.column(index).order('desc').draw();

                                    } else {
                                        table.column(index).order('asc').draw();
                                    }
                                }
                            });
                        });
                    }
                });
            });
        });
    }
};