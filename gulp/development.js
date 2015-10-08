'use strict';
var file, msg = '**/*-test.js';
process.argv.forEach(function (val, index, array) {
    if (val === '-file' || val === '--f') {
        let env_val = array[index + 1];
        msg = '**/*' + env_val+ '*-test.js';
        file = env_val;
    }
});
console.log('use => load tests: ', msg);

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    through = require('through'),
    plugins = gulpLoadPlugins(),
    appRoot = process.cwd(),
    paths = {
        js: [
            appRoot + '/nsapi.js',
            appRoot + '/lib/**/*.js',
            appRoot + '/src/**/*.js'
        ],
        jsTests: [appRoot + '/test/**/*-test.js']
    };

var defaultTasks = ['env:development', 'dev:jshint', 'dev:coverage', 'watch'];

gulp.task('env:development', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('dev:jshint', function () {
    return gulp.src(paths.js.concat(paths.jsTests))
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});


gulp.task('dev:coverage', function () {
    let jsTests = '/test/**/' + (file ? '*'+file : '' ) +  '*-test.js';
    return gulp.src(appRoot + jsTests)
        .pipe(plugins.plumber())
        .pipe(plugins.mocha({
            reporters: 'spec'
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.js.concat(paths.jsTests), ['dev:jshint', 'dev:coverage'])
        .on('error', e => console.error(e));
});

gulp.task('development', defaultTasks);