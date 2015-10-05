'use strict';
var glob = require('glob'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    $port = process.env.PORT || 9394,
    server;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var started = false;
exports.isStarted = () => started;

exports.start = (cb) => {
    server = app.listen($port, () => {
        started = true;
        console.log('nsmockup server started');
        return cb && cb();
    });
};

exports.stop = (cb) => {
    server.close(() => {
        started = false;
        console.log('nsmockup server stopped');
        return cb && cb();
    });
};

// Import Routes
let routes = glob.sync(__dirname + '/routes/*-route.js');
for (let i = 0; i < routes.length; i++) {
    require(path.resolve(routes[i]));
}