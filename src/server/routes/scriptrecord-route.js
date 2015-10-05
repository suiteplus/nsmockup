'use strict';
var URI = require('../server-config').URI,
    header = require('../middlewares/suitelet-header'),
    ctrl = require('../controllers/scriptrecord-ctrl');

const uri = URI.suitelet;

module.exports = (app) => {
    // ####################
    // Include Headers
    // ####################
    app.route(uri).all(header());

    // ####################
    // Include Routes
    // ####################

    app.route(uri).get(ctrl.get);

    app.route(uri).get(ctrl.post);
};