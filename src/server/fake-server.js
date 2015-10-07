'use strict';
var glob = require('glob'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    srvconf = require('./server-config'),
    server;

process.env.$NS_SERVER = true;

let app = express(),
    nsmockup = require('../../');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// configure log
app.use(morgan('dev'));

// Import Routes
let routes = glob.sync(__dirname + '/routes/*-route.js');
for (let i = 0; i < routes.length; i++) {
    let route = require(path.resolve(routes[i]));
    route(app);
}

process.on('message', function (m) {
    //console.log('NSFAKE SERVER', m);
    if (m === 'start') {
        server = app.listen(srvconf.port, function () {
            console.log('nsmockup server started', srvconf.port);
            if (!global.$db) {
                nsmockup.init({}, () => {
                    return process.send('started');
                });
            } else {
                return process.send('started');
            }
        });
    } else {
        server.close(function () {
            console.log('nsmockup server stopped', srvconf.port);
            return process.send('closed') & process.exit(0);
        });
    }
});