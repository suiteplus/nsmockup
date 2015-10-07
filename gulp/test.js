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
    plugins = gulpLoadPlugins(),
    appRoot = process.cwd(),
    paths = {
        js: [
            appRoot + '/nsapi.js',
            appRoot + '/lib/**/*.js',
            appRoot + '/src/**/*.js'
        ]
    };
var defaultTasks = ['env:test', 'test:jshint', 'test:coverage'];

gulp.task('env:test', function () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.NODE_ENV = 'test';
    process.env.running_under_istanbul = true;
});

gulp.task('test:jshint', function () {
    return gulp.src(paths.js)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('test:coverage', function () {
    let executeTests = function () {
        let path = '/test/**/*' + (file ? file + '*' : '') + '-test.js';
        gulp.src([appRoot + path])
            .pipe(plugins.mocha({
                reporters: 'spec'
            }))
            .pipe(plugins.istanbul.writeReports({
                reports: ['lcovonly']
            })); // Creating the reports after tests runned
    };

    // instrumentation nsapi.js
    gulp.src(paths.js.concat(['!'+ appRoot + '/src/server/**/*.js']))
        .pipe(plugins.istanbul({
            includeUntested: true,
            instrumenter: require('isparta').Instrumenter

        })) // Covering files
        .pipe(plugins.istanbul.hookRequire())// Force `require` to return covered files
        .on('finish', () => executeTests());

});

gulp.task('test', defaultTasks);