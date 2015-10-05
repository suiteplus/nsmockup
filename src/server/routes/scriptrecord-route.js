'use strict';
var header = require('../middlewares/suitelet-header'),
    ctrl = require('../controllers/scriptrecord-ctrl');

var uri = 'app/common/scripting/scriptrecord.nl';

module.exports = (app) => {
    // ####################
    // Include Headers
    // ####################
    app.route(uri).all(header());

    // ####################
    // Include Routes
    // ####################

    // default scriptrecord.nl
    app.route(uri).get(ctrl.get);
};