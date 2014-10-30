var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglifyjs'),
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

gulp.task('less', function() {
    gulp.src('src/stylesheets/app.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js:dev', function() {
    gulp.src(jsAppFiles)
        .pipe(uglify('app.js', {
            mangle : false,
            output : {
                beautify : true
            },
            compress : {
                drop_debugger : false
            }
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js:dist', function() {
    gulp.src(jsAppFiles)
        .pipe(uglify('app.js', {
            mangle : false
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js:vendor', function() {
    gulp.src(jsVendorFiles)
        .pipe(uglify('vendors.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['src/stylesheets/**', 'src/scripts/directives/**/*.less'], ['less']);
    gulp.watch('src/scripts/**/*.js', ['js:dev']);
    gulp.watch('**/*.html').on('change', livereload.changed);
    gulp.watch('dist/**').on('change', livereload.changed);
});

gulp.task('default', ['dev', 'watch']);
gulp.task('dev', ['less', 'js:vendor', 'js:dev']);
gulp.task('dist', ['less', 'js:vendor', 'js:dist']);
