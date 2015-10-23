'use strict';
var URI = require('../server-config').URI;

const uri = URI.restlet;

module.exports = (app) => {
    let methods = ['GET', 'POST', 'PUT', 'DELETE'],
        route = app.route(uri);

    // middlewares
    let header = require('../middlewares/header'),
        loadDB = require('../middlewares/load-db');

    // controllers
    let ctrl = require('../controllers/restlet-ctrl');

    // ####################
    // Include Headers
    // ####################
    route.all(header(methods));

    // ####################
    // Include Routes
    // ####################

    methods.forEach(method => {
        let method_ = method.toLowerCase();

        route[method_](
            loadDB,
            ctrl.exec
        );
    });
};