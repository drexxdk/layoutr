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
        }
    });
});