/// <binding ProjectOpened='_default' />

var gulp = require("gulp"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    gulpif = require("gulp-if"),
    swPrecache = require('sw-precache');

// i cant get babel promise polyfill to work.  

const config = {
    js: {
        prefix: 'js$',
        dist: 'dist/js',
        bundles: [
            {
                name: "fonts",
                files: [
                    'js/vendors/webfontloader.min.js',
                    'js/app/layout/fonts.js'
                ]
            },
            {
                name: "app",
                files: [
                    'js/vendors/jquery/jquery-3.1.1.min.js',
                    'js/vendors/jquery/validate/jquery.validate.min.js',
                    'js/vendors/jquery/jquery.lazy.min.js',
                    'js/vendors/jquery/tooltipster.min.js',
                    'js/vendors/jquery/jquery.debouncedresize.js',
                    'js/vendors/jquery/jquery.throttledresize.js',
                    'js/vendors/jquery/jquery.shuffle.js',
                    'js/vendors/bowser.js',
                    

                    // layout
                    'js/app/layout/_variables.js',
                    'js/app/layout/_functions.js',
                    'js/app/layout/_bowser.js',
                    'js/app/layout/_form.js',
                    'js/app/layout/_app.js',
                    'js/app/layout/loaded.js',
                    'js/app/layout/fullscreen.js',
                    'js/app/layout/scroll.js',
                    'js/app/layout/loading.js',
                    'js/app/layout/aside.js',
                    'js/app/layout/authentication.js',
                    'js/app/layout/cookie.js',
                    'js/app/layout/navigation.js',
                    'js/app/layout/settings.js',
                    'js/app/layout/keyboard.js',
                    'js/app/layout/modal.js',
                    'js/app/layout/responsiveHeader.js',
                    'js/app/layout/focus.js',
                    'js/app/layout/swipe.js',
                    'js/app/layout/tts.js',
                    'js/app/layout/contentHeader.js',
                    'js/app/layout/theme.js',

                    // inputs
                    'js/app/inputs/dropdown.js',

                    // components
                    'js/app/components/accordion.js',
                    'js/app/components/alert.js',
                    'js/app/components/map.js',
                    'js/app/components/math.js',
                    'js/app/components/media.js',
                    'js/app/components/lazy.js',
                    'js/app/components/popup.js',
                    'js/app/components/responsiveBackground.js',
                    'js/app/components/tooltip.js',
                    'js/app/components/datatables.js',
                    'js/app/components/swiper.js',

                    // assignments
                    'js/app/assignments/_assignments.js',

                    // site
                    'js/app/site/form.js'
                ]
            },
            {
                name: "loadCSS",
                files: [
                    'js/vendors/loadCSS/onloadCSS.js',
                    'js/vendors/loadCSS/loadCSS.js',
                    'js/app/layout/loadCSS.js'
                ]
            },
            {
                name: 'katex',
                files: [
                    'js/vendors/katex/katex.min.js',
                    'js/vendors/katex/auto-render.min.js'
                ]
            },
            {
                name: 'plyr',
                files: [
                    'js/vendors/plyr/plyr.js'
                ]
            },
            {
                name: 'swiper',
                files: [
                    'js/vendors/swiper.js'
                ]
            },
            {
                name: 'datatables',
                files: [
                    'js/vendors/datatables/datatables.js',

                    'js/vendors/datatables/extensions/buttons/buttons.js',
                    'js/vendors/datatables/extensions/buttons/jszip.min.js',
                    'js/vendors/datatables/extensions/buttons/buttons.html5.js',

                    'js/vendors/datatables/extensions/responsive.js'
                ]
            },
            {
                name: 'assignments',
                files: [
                    'js/vendors/sortable.min.js',
                    'js/app/assignments/color.js',
                    'js/app/assignments/dragAndDrop.js',
                    'js/app/assignments/sort.js'
                ]
            },
            {
                name: 'focus',
                files: [
                    'js/vendors/jquery/ui/jquery-ui.min.js',
                    'js/vendors/jquery/ui/touch-punch.min.js'
                ]
            },
            {
                name: 'tts',
                files: [
                    'js/vendors/tts/aws-sdk.min.js',
                    'js/vendors/tts/chattykathy.js'
                ]
            },
            {
                name: 'polyfills',
                files: [
                    'js/vendors/polyfills/promise.js'
                ]
            }
        ]
    },
    css: {
        prefix: 'css$',
        bundles: [
            {
                name: 'initial',
                src: 'scss/initial.scss',
                dist: 'dist/css'
            },
            {
                name: 'light',
                src: 'scss/theme/light/_light-theme.scss',
                dist: 'dist/css/theme'
            },
            {
                name: 'dark',
                src: 'scss/theme/dark/_dark-theme.scss',
                dist: 'dist/css/theme'
            },
            {
                name: 'katex',
                src: 'scss/vendors/katex.scss',
                dist: 'dist/css'
            },
            {
                name: 'plyr',
                src: 'scss/vendors/plyr.scss',
                dist: 'dist/css'
            },
            {
                name: 'swiper',
                src: 'scss/vendors/swiper.scss',
                dist: 'dist/css'
            }
        ]
    },
    templates: {
        src: 'js/backbone/templates/**/*.hbs',
        dist: 'dist/js'
    }
};

gulp.task('_serviceWorker', (callback) => {
    var rootDir = 'dist';

    swPrecache.write(`${rootDir}/service-worker.js`, {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
        stripPrefix: rootDir
    }, callback);
});

var generateJSTask = (task) => {
    gulp.task(config.js.prefix + task.name, () => {
        return gulp
            .src(task.files)
            .pipe(concat(task.name + '.js'))
            .pipe(gulp.dest(config.js.dist));
    });
    gulp.task(config.js.prefix + task.name + '.min', () => {
        return gulp
            .src([config.js.dist + '/' + task.name + '.js'])
            .pipe(babel())
            .pipe(concat(task.name + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(config.js.dist));
    });
};

var generateCSSTask = (task) => {
    gulp.task(config.css.prefix + task.name, () => {
        return gulp
            .src(task.src)
            .pipe(sourcemaps.init())
            .pipe(concat(task.name + '.css'))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(task.dist));
    });
    gulp.task(config.css.prefix + task.name + '.min', () => {
        return gulp
            .src(task.dist + '/' + task.name + '.css')
            .pipe(concat(task.name + '.min.css'))
            .pipe(cleanCSS())
            .pipe(gulp.dest(task.dist));
    });
};

for (let i = 0; i < config.js.bundles.length; i++) {
    generateJSTask(config.js.bundles[i]);
}

for (let i = 0; i < config.css.bundles.length; i++) {
    generateCSSTask(config.css.bundles[i]);
}

gulp.task('_watch', () => {
    for (let i = 0; i < config.js.bundles.length; i++) {
        gulp.watch(config.js.bundles[i].files, gulp.series(
            config.js.prefix + config.js.bundles[i].name,
            config.js.prefix + config.js.bundles[i].name + '.min'
        ));
    }
    for (let i = 0; i < config.css.bundles.length; i++) {
        gulp.watch('scss/**/*.scss', gulp.series(
            config.css.prefix + config.css.bundles[i].name,
            config.css.prefix + config.css.bundles[i].name + '.min'
        ));
    }
});

gulp.task('_bundleCSS', gulp.series(
    config.css.bundles.map((elem) => { return config.css.prefix + elem.name; }),
    config.css.bundles.map((elem) => { return config.css.prefix + elem.name + '.min'; })
));

gulp.task('_bundleJS', gulp.series(
    config.js.bundles.map((elem) => { return config.js.prefix + elem.name; }),
    config.js.bundles.map((elem) => { return config.js.prefix + elem.name + '.min'; })
));

gulp.task('_default', gulp.series('_watch'));

gulp.task('_build', gulp.series('_bundleCSS', '_bundleJS', '_serviceWorker'));