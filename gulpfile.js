/// <binding ProjectOpened='default' />

var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');

var config = {
    templatesDir: 'js/backbone/templates/**/*.hbs'
};

gulp.task('templates', function () {
    var partials =
        gulp.src(['js/backbone/templates/partials/**/_*.hbs'])
            .pipe(handlebars())
            .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
                imports: {
                    processPartialName: function (filePath) {
                        var name = declare.processNameByPath(filePath);
                        return "'" + name.split('.').join('/').replace('js/backbone/templates/partials/', '') + "'";
                    }
                }
            }));

    var templates =
        gulp.src('js/backbone/templates/**/[^_]*.hbs')
            .pipe(handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: 'templates',
                noRedeclare: true,
                processName: function (filePath) {
                    var name = declare.processNameByPath(filePath);
                    return name.split('.').join('/').replace('js/backbone/templates/', '')
                }
            }));

    return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function () {
    gulp.watch(config.templatesDir, ['templates'])
});

gulp.task('default', ['templates', 'watch']);