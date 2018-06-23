define(function () {
    return Handlebars.registerHelper({
        json: function (context) {
            return JSON.stringify(context);
        },
        eq: function (v1, v2) {
            // equal
            return v1 === v2;
        },
        ne: function (v1, v2) {
            // not equal
            return v1 !== v2;
        },
        lt: function (v1, v2) {
            // less
            return v1 < v2;
        },
        gt: function (v1, v2) {
            // greater
            return v1 > v2;
        },
        lte: function (v1, v2) {
            // less or equal
            return v1 <= v2;
        },
        gte: function (v1, v2) {
            // greater or equal
            return v1 >= v2;
        },
        and: function (v1, v2) {
            return v1 && v2;
        },
        or: function (v1, v2) {
            return v1 || v2;
        },
        contentHeader: function (ch) {
            let result = [];

            if (ch) {
                result.push('<div class="content-header"> ');
                result.push('<div class="cover ' + ch.class + '" ');
                $(ch.attributes).each(function (i, e) {
                    result.push(e.name + '="' + e.value + '" ');
                });
                result.push('>');
                result.push('<div>');
                if (ch.title) {
                    result.push('<span class="title">' + ch.title + '</span>');
                }
                if (ch.author) {
                    result.push('<span class="author">' + ch.author + '</span>');
                }
                $(ch.position).each(function (i, e) {
                    result.push('<div class="position ' + e.class + '">');
                    $(e.children).each(function (j, f) {
                        result.push('<div class="' + f.class + '">');
                        if (f.text) {
                            result.push(f.text);
                        }
                        result.push('</div>');
                    });
                    result.push('</div>');
                });

                result.push('</div>');
                result.push('</div>');
                result.push('</div>');
            }

            return result.join('');
        }
    });
});