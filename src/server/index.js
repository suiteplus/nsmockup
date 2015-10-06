'use strict';
var fork = require('child_process').fork;

var started = false;

exports.isStarted = () => started;

if (!global.$NS_SERVER) {
    let server;

    exports.exec = (step, cb) => {
        if (step === 'start') server = fork(__dirname+ '/fake-server');
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