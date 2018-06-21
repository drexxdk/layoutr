/// <binding ProjectOpened='default' />

var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

var config = {
    templatesDir: 'js/backbone/templates/**/*.hbs'
};

gulp.task('templates', function () {
    gulp.src([
        config.templatesDir,
    ])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
        namespace: 'templates',
        noRedeclare: true,
        processName: function (filePath) {
            var name = declare.processNameByPath(filePath);
            return name.split('.').join('/').replace('js/backbone/templates/', '')
        }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function () {
    gulp.watch(config.templatesDir, ['templates'])
});

gulp.task('default', ['templates', 'watch']);