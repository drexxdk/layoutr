var app = app || {};

$(function () {
    app.assignment = function (assignments) {
        $(assignments).each(function (index, assignment) {
            assignment = $(assignment);
            if (assignment.hasClass('move multiple')) {
                //assignment.find('.container').sortable({
                //    connectWith: ".container",
                //    start: function (event, ui) {
                //        assignment.find('input[type=checkbox]:checked').prop('checked', false);
                //    },
                //    stop: function (event, ui) {
                //        ui.item.removeAttr("style");
                //    }
                //});

                //sortable('.container', {
                //    connectWith: 'container',
                //    forcePlaceholderSize: true
                //});

                assignment.find('.container').each(function () {
                    Sortable.create($(this)[0], {
                        group: 'container', draggable: ".item",
                        animation: 0,
                        scroll: false,
                        forceFallback: true,
                        fallbackOnBody: true,
                        onAdd: function () {
                            setTimeout(function () {
                                assignment.find('input[type=checkbox]:checked').prop('checked', false);
                                assignment.removeClass('moving');
                            }, 0);
                        }
                    });
                });
                
                assignment.attr('data-moving', 0);
                var from = assignment.find('.from .container');
                var to = assignment.find('.to .container');
                assignment.on('click', '.item input[type=checkbox]', function () {
                    var $this = $(this);
                    var item = $this.parents('.item');
                    var moving = parseInt(assignment.attr('data-moving'));
                    if ($this.is(':checked')) {
                        moving++;
                        assignment.attr('data-moving', moving);
                        assignment.addClass('moving');
                    } else {
                        moving--;
                        assignment.attr('data-moving', moving);
                        if (moving === 0) {
                            assignment.removeClass('moving');
                        }
                    }
                });

                assignment.on('click', '.place', function () {
                    assignment.removeClass('moving');
                    var items = assignment.find('input[type=checkbox]:checked');
                    if (items.length) {
                        items.prop('checked', false);
                        $(this).parent('.header').next().children('.container').append(items.parent());
                    }
                });

                assignment.on('click', 'button[type="submit"]', function () {
                    console.log('submit');
                });

                assignment.on('click', 'button[type="reset"]', function () {
                    from.append(to.find('.item'));
                    from.find('input[type=checkbox]:checked').prop('checked', false);
                    assignment.removeClass('moving');
                });
            }
        });
    };
});