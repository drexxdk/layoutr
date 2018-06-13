var app = app || {};

app.datatables = function (tables) {
    if (tables.length) {
        if (!app.html.hasClass('datatables-loaded')) {
            app.head.append($('<link rel="stylesheet"href="dist/css/datatables.min.css">'));
            app.html.addClass('datatables-loaded');
        }

        $.getScript('dist/js/datatables.min.js', function () {
            tables.each(function () {
                var table = $(this);
                table
                    .addClass('display nowrap dataTable dtr-inline')
                    .dataTable({
                        "dom": 'lBfrtip',
                        buttons: [
                            //'copy', 'excel', 'csv'
                            'copyHtml5', 'excelHtml5', 'csvHtml5'
                        ],
                        responsive: true,
                        //columnDefs: [
                        //    {
                        //        // -1 = last
                        //        // -3 = third last
                        //        targets: [-1, -3],
                        //        className: 'dt-body-right' // text align right
                        //    }
                        //],
                        "initComplete": function (settings, json) {
                            var id = settings.sTableId,
                                wrapper = $(settings.nTableWrapper),
                                dropdown = wrapper.find('select');

                            dropdown.addClass('dropdown').attr('data-width', 100);
                            app.dropdown(dropdown);
                        }
                    });
                
            });
        });
    }
};