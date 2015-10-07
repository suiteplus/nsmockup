'use strict';
var fork = require('child_process').fork;

var started = false;

exports.isStarted = () => started;

if (!process.env.$NS_SERVER) {
    let server;

    exports.exec = (step, cb) => {
        if (step === 'start') {
            const modulePath = __dirname + '/fake-server';
            // setup cluster if running with istanbul coverage
            //if (process.env.running_under_istanbul) {
            //    let mocha = './node_modules/mocha/bin/_mocha',
            //        istanbul = './node_modules/.bin/istanbul';
            //    server = fork(modulePath, {
            //        execPath: istanbul,
            //        execArgv: [
            //            'cover', mocha,
            //            '--report', 'lcovonly',
            //            '--print', 'none',
            //            '--include-pid', './src/**/*.js', '--'
            //        ].concat(process.argv.slice(2))
            //    });
            //} else {
                server = fork(modulePath);
            //}
        }
        server.on('message', function (m) {
            //console.log('SERVER', m);
            started = m === 'started';
            cb && cb();
        });

        server.send(step);
    };
} else {
    exports.exec = (step, cb) => {
        console.log('invalid step', step);
        cb && cb();
    };
}