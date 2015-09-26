(function() {
    'use strict';

    var file;
    process.argv.forEach(function (val, index, array) {
        let mm = '';
        if (val === '-file' || val === '--f') {
            let env_val = array[index + 1];
            mm += 'load tests: **/*' + env_val+ '*-test.js';
            file = env_val;
        }
        mm && console.log('use =>', mm);
    });

    var gulp = require('gulp'),
        gulpLoadPlugins = require('gulp-load-plugins'),
        plugins = gulpLoadPlugins(),
        appRoot = process.cwd(),
        paths = {
            js: [
                appRoot + '/nsapi.js',
                appRoot + '/src/**/*.js'
            ],
            jsRequire: [appRoot + '/nsapi.js'],
            jsVMContext: [appRoot + '/src/**/*.js']
        };
    var defaultTasks = ['env:test', 'test:jshint', 'test:coverage'];

    gulp.task('env:test', function () {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        process.env.NODE_ENV = 'test';
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

        let actual = 0, verifyInstrument = () => { (++actual === 2) && executeTests(); };

        // instrumentation nsapi.js
        gulp.src(paths.jsRequire)
            .pipe(plugins.istanbul({
                includeUntested: true,
                instrumenter: require('isparta').Instrumenter

            })) // Covering files
            .pipe(plugins.istanbul.hookRequire())// Force `require` to return covered files
            .on('finish', () => verifyInstrument());

        // instrumentation other js
        gulp.src(paths.jsVMContext)
            .pipe(plugins.istanbul({
                includeUntested: true,
                instrumenter: require('isparta').Instrumenter

            })) // Covering files
            .pipe(plugins.istanbul.hookRunInThisContext()) // Force `vm.runInThisContext` to return covered files
            .on('finish', () => verifyInstrument());
    });

    gulp.task('test', defaultTasks);
})();