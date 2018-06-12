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
                $this
                    .addClass('display nowrap dataTable dtr-inline')
                    .dataTable({
                        responsive: true,
                        columnDefs: [
                            {
                                // -1 = last
                                // -3 = third last
                                targets: [-1, -3],
                                className: 'dt-body-right' // text align right
                            }
                        ]
                    });
            });
        });
    }
};