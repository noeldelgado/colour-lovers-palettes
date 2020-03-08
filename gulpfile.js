var { src, dest, watch, parallel, series } = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglifyjs'),
    cleanCSS = require('gulp-clean-css'),
    livereload = require('gulp-livereload');

var jsVendorFiles = [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.min.js'
];
var jsAppFiles= [
    'src/scripts/app.js',
    'src/scripts/services/*.js',
    'src/scripts/controllers/*.js',
    'src/scripts/filters/*.js',
    'src/scripts/directives/**/*.js'
];

function css() {
    return src('src/stylesheets/app.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(dest('dist/'));
};

function cssDist() {
    return src('dist/app.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/'));
}

function jsDev() {
    return src(jsAppFiles)
        .pipe(uglify('app.js', {
            mangle : false,
            output : {
                beautify : true
            },
            compress : {
                drop_debugger : false
            }
        }))
        .pipe(dest('dist/'));
}

function jsDist() {
    return src(jsAppFiles)
        .pipe(uglify('app.js', {
            mangle : false
        }))
        .pipe(dest('dist/'));
}

function jsVendor() {
    return src(jsVendorFiles)
        .pipe(uglify('vendors.js'))
        .pipe(dest('dist/'));
}

function watchFn() {
    livereload.listen();
    watch(['src/stylesheets/**', 'src/scripts/directives/**/*.less'], css);
    watch('src/scripts/**/*.js', jsDev);
    watch('**/*.html').on('change', livereload.changed);
    watch('dist/**').on('change', livereload.changed);
}

exports.build = series(css, cssDist, jsVendor, jsDist);
exports.watch = watchFn;
exports.default = series(parallel(css, jsVendor, jsDev), watchFn);
