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
            ]
        };
    var defaultTasks = ['env:test'/*, 'jshint'*/, 'coverage'];

    gulp.task('env:test', function () {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        process.env.NODE_ENV = 'test';
    });

    gulp.task('coverage', function () {
        //return gulp.src(paths.js)
        //    .pipe(plugins.istanbul(/*{
        //        includeUntested: true,
        //        instrumenter: require('isparta').Instrumenter
        //    }*/)) // Covering files
        //    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
        //    .on('finish', function () {
                let path = '/test/**/*'+ (file ? file + '*' : '') + '-test.js';
                gulp.src([appRoot + path])
                    .pipe(plugins.mocha({
                        reporters: 'spec'
                    }));
            //        .pipe(plugins.istanbul.writeReports({
            //            reports: ['lcovonly']
            //        })); // Creating the reports after tests runned
            //});
    });

    gulp.task('test', defaultTasks);
})();