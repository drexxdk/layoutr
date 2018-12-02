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

const dist = 'dist';

const config = {
    js: {
        prefix: 'js$',
        dist: dist + '/js',
        bundles: [
            {
                name: 'initial',
                watch: [
                    'js/app/initial/_initial.js',
                    //'js/app/initial/service-worker-registration.js',
                    'js/app/initial/analytics-helper.js'
                ]
            },
            {
                name: "fonts",
                watch: [
                    'js/vendors/webfontloader.min.js',
                    'js/app/layout/fonts.js'
                ]
            },
            {
                name: "app",
                watch: 'js/**/*.js',
                bundle: [
                    'js/vendors/jquery/jquery-3.1.1.min.js',
                    'js/vendors/jquery/validate/jquery.validate.min.js',
                    'js/vendors/jquery/jquery.lazy.min.js',
                    'js/vendors/jquery/tooltipster.min.js',
                    'js/vendors/jquery/jquery.ba-throttle-debounce.js',
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
                    'js/app/layout/connected.js',

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
                watch: [
                    'js/vendors/loadCSS/onloadCSS.js',
                    'js/vendors/loadCSS/loadCSS.js',
                    'js/app/layout/loadCSS.js'
                ]
            },
            {
                name: 'katex',
                watch: [
                    'js/vendors/katex/katex.min.js',
                    'js/vendors/katex/auto-render.min.js'
                ]
            },
            {
                name: 'plyr',
                watch: [
                    'js/vendors/plyr/plyr.js'
                ]
            },
            {
                name: 'swiper',
                watch: [
                    'js/vendors/swiper.js'
                ]
            },
            {
                name: 'datatables',
                watch: [
                    'js/vendors/jquery/datatables/datatables.js',

                    'js/vendors/jquery/datatables/extensions/buttons/buttons.js',
                    'js/vendors/jquery/datatables/extensions/buttons/jszip.min.js',
                    'js/vendors/jquery/datatables/extensions/buttons/buttons.html5.js',

                    'js/vendors/jquery/datatables/extensions/responsive.js'
                ]
            },
            {
                name: 'assignments',
                watch: [
                    'js/vendors/sortable.min.js',
                    'js/app/assignments/color.js',
                    'js/app/assignments/dragAndDrop.js',
                    'js/app/assignments/sort.js'
                ]
            },
            {
                name: 'focus',
                watch: [
                    'js/vendors/jquery/ui/jquery-ui.min.js',
                    'js/vendors/jquery/ui/touch-punch.min.js'
                ]
            },
            {
                name: 'tts',
                watch: [
                    'js/vendors/tts/aws-sdk.min.js',
                    'js/vendors/tts/chattykathy.js'
                ]
            },
            {
                name: 'polyfills',
                watch: [
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
                dist: dist + '/css',
                watch: ['scss/initial.scss']
            },
            {
                name: 'light',
                src: 'scss/theme/light/_light-theme.scss',
                dist: dist + '/css/theme',
                watch: ['scss/**/*.scss', '!scss/vendors/*.scss', '!scss/initial.scss']
            },
            {
                name: 'dark',
                src: 'scss/theme/dark/_dark-theme.scss',
                dist: dist + '/css/theme',
                watch: ['scss/**/*.scss', '!scss/vendors/*.scss', '!scss/initial.scss']
            },
            {
                name: 'katex',
                src: 'scss/vendors/katex.scss',
                dist: dist + '/css',
                watch: ['scss/vendors/katex.scss']
            },
            {
                name: 'plyr',
                src: 'scss/vendors/plyr.scss',
                dist: dist + '/css',
                watch: ['scss/vendors/plyr.scss']
            },
            {
                name: 'swiper',
                src: 'scss/vendors/swiper.scss',
                dist: dist + '/css',
                watch: ['scss/vendors/swiper.scss']
            }
        ]
    },
    templates: {
        src: 'js/backbone/templates/**/*.hbs',
        dist: dist + '/js'
    }
};

gulp.task('_serviceWorker', (callback) => {
    swPrecache.write('service-worker.js', {
        staticFileGlobs: [
            dist + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
            'index.html',
            '404.html'
        ],
        navigateFallback: 'index.html'
    }, callback);
});

var generateJSTask = (task) => {
    gulp.task(config.js.prefix + task.name + '.dev', () => {
        return gulp
            .src(task.bundle ? task.bundle : task.watch)
            .pipe(sourcemaps.init())
            .pipe(concat(task.name + '.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.js.dist));
    });

    gulp.task(config.js.prefix + task.name + '.prod', () => {
        return gulp
            .src(task.bundle ? task.bundle : task.watch)
            .pipe(concat(task.name + '.js'))
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(config.js.dist));
    });
};

var generateCSSTask = (task) => {
    gulp.task(config.css.prefix + task.name + '.dev', () => {
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

    gulp.task(config.css.prefix + task.name + '.prod', () => {
        return gulp
            .src(task.src)
            .pipe(concat(task.name + '.css'))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
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

gulp.task('$watch.dev', () => {
    for (let i = 0; i < config.js.bundles.length; i++) {
        gulp.watch(config.js.bundles[i].watch, gulp.series(
            config.js.prefix + config.js.bundles[i].name + '.dev'
        ));
    }
    for (let i = 0; i < config.css.bundles.length; i++) {
        gulp.watch(config.css.bundles[i].watch, gulp.series(
            config.css.prefix + config.css.bundles[i].name + '.dev'
        ));
    }
});

gulp.task('$watch.prod', () => {
    for (let i = 0; i < config.js.bundles.length; i++) {
        gulp.watch(config.js.bundles[i].watch, gulp.series(
            config.js.prefix + config.js.bundles[i].name + '.prod'
        ));
    }
    for (let i = 0; i < config.css.bundles.length; i++) {
        gulp.watch(config.css.bundles[i].watch, gulp.series(
            config.css.prefix + config.css.bundles[i].name + '.prod'
        ));
    }
});

gulp.task('_bundle.dev', gulp.series(
    config.css.bundles.map((elem) => { return config.css.prefix + elem.name + '.dev'; }),
    config.js.bundles.map((elem) => { return config.js.prefix + elem.name + '.dev'; })
));

gulp.task('_bundle.prod', gulp.series(
    config.css.bundles.map((elem) => { return config.css.prefix + elem.name + '.prod'; }),
    config.js.bundles.map((elem) => { return config.js.prefix + elem.name + '.prod'; })
));

gulp.task('_default', gulp.series('_bundle.dev', '$watch.dev'));

gulp.task('$build.dev', gulp.series('_bundle.dev'));

gulp.task('$build.prod', gulp.series('_bundle.prod', '_serviceWorker'));