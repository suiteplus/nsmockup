'use strict';
//var fork = require('child_process').fork,
//    server = fork(__dirname+ '/fake-server');
var cluster = require('cluster');
if (cluster.isMaster) {
    cluster.setupMaster({
        exec: __dirname + '/fake-server.js'
    });

    var server,
        started = false;
    exports.isStarted = () => started;

    exports.exec = (step, cb) => {
        if (step === 'start') server = cluster.fork();
        server.on('message', function (m) {
            console.log('SERVER', m);
            if (typeof m === 'object') {
                server.send({res: 1});
            } else {
                started = m === 'started';
                cb && cb();
            }
        });

        server.send(step);
    };
}