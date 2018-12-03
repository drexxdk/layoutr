jQuery.fn.extend({
    fadeIn: function(ms) {
        let elem = this;
        return new Promise(function (resolve, reject) {
            elem.css({
                'opacity': 0,
                'filter': 'alpha(opacity=0)',
                'display': 'block',
                'visibility': 'visible'
            });
            if (ms) {
                var opacity = 0;
                var timer = setInterval(function () {
                    opacity += 50 / ms;
                    if (opacity >= 1) {
                        clearInterval(timer);
                        opacity = 1;
                        resolve();
                    }
                    elem.css({
                        'opacity': opacity,
                        'filter': 'alpha(opacity=' + opacity * 100 + ')'
                    });
                }, 50);
            }
            else {
                elem.css({
                    'opacity': 1,
                    'filter': 'alpha(opacity=1)'
                });
                resolve();
            }
        })
    },
    fadeOut: function(ms) {
        let elem = this;
        return new Promise(function (resolve, reject) {
            if (ms) {
                var opacity = 1;
                var timer = setInterval(function () {
                    opacity -= 50 / ms;
                    if (opacity <= 0) {
                        clearInterval(timer);
                        opacity = 0;
                        elem.css({
                            'display': 'none',
                            'visibility': 'hidden'
                        });
                        resolve();
                    }
                    elem.css({
                        'opacity': opacity,
                        'filter': 'alpha(opacity=' + opacity * 100 + ')'
                    })
                }, 50);
            }
            else {
                elem.css({
                    'opacity': 0,
                    'filter': 'alpha(opacity=0)',
                    'display': 'none',
                    'visibility': 'hidden'
                });
                resolve();
            }
        })
    }
});
