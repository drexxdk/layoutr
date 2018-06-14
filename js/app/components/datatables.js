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
                $this.addClass('display nowrap dataTable dtr-inline');
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
                            let column = this,
                                index = $(column.header()).index(),
                                select = $('<select class="dropdown align-left nowrap"><option value=""></option></select>')
                                    .appendTo($(column.header()))
                                    .on('change', function () {
                                        let $this = $(this),
                                            val = $.fn.dataTable.util.escapeRegex(
                                                $this.val()
                                            );

                                        table.column(index)
                                            .search(val ? '^' + val + '$' : '', true, false)
                                            .draw();
                                    });

                            column.data().unique().sort().each(function (d, j) {
                                select.append('<option value="' + d + '">' + d + '</option>')
                            });

                        });

                        let wrapper = $(settings.nTableWrapper),
                            dropdown = wrapper.find('.dataTables_length select');

                        dropdown.addClass('dropdown').attr('data-width', 100);
                        var dropdowns = wrapper.find('select.dropdown');

                        app.dropdown(dropdowns);

                        wrapper.find('thead th').each(function (index, th) {
                            $(th).unbind('click');
                            $(th).append('<button class="sort-btn"></button>');
                            //$(th).append('<button class="sort-btn btn-desc">&#9660;</button>');

                            $(th).find('.sort-btn').click(function () {
                                var parent = $(this).parent();
                                if (parent.hasClass('sorting_asc')) {
                                    table.column(index).order('desc').draw();

                                } else {
                                    table.column(index).order('asc').draw();
                                }
                            });
                        });  

                        //$(tableHeader).each(function (i, e) {
                        //    var th = $(e.cell);
                        //    var index = th.index();
                        //    var dropdown = th.children('div.dropdown');
                        //    if (dropdown.length) {
                        //        var minWidth = dropdown.width();
                        //        debugger;
                        //    }
                        //});
                    }
                });
            });
        });
    }
};