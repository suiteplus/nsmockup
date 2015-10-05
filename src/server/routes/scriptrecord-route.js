'use strict';
var URI = require('../server-config').URI,
    header = require('../middlewares/header'),
    ctrl = require('../controllers/scriptrecord-ctrl');

const uri = URI.scriptrecord;

module.exports = (app) => {
    let methods = ['GET', 'POST', 'PUT', 'DELETE'];

    // ####################
    // Include Headers
    // ####################
    app.route(uri).all(header(methods));

    // ####################
    // Include Routes
    // ####################

    methods.forEach(method => {
        let method_ = method.toLowerCase();
        app.route(uri)[method_](ctrl.exec);
    });
};