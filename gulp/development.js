(function() {
    'use strict';

    var gulp = require('gulp'),
        gulpLoadPlugins = require('gulp-load-plugins'),
        through = require('through'),
        plugins = gulpLoadPlugins(),
        appRoot = process.cwd(),
        paths = {
            js: [
                appRoot + '/nsapi.js',
                appRoot + '/src/**/*.js'
            ]
        };

    var defaultTasks = ['env:development', 'dev:jshint', 'watch'];

    gulp.task('env:development', function () {
        process.env.NODE_ENV = 'development';
    });

    gulp.task('dev:jshint', function () {
        return gulp.src(paths.js)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'));
    });

    gulp.task('watch', function () {
        gulp.watch(paths.js, ['dev:jshint']).on('error', e => console.error(e));
    });

    gulp.task('development', defaultTasks);
})();