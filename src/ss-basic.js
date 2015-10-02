'use strict';
var vmSim = require('./vm-sim');

module.exports = (opt) => {
    let nlapiGetContext = require('../lib/nsfunc/context-api').nlapiGetContext;
    if (!opt || !opt.files || opt.files.length === 0) return;

    for (let i = 0; i < opt.files.length; i++) {
        vmSim.addScript(opt.files[i]);
    }
    if (opt.params) {
        let pref = nlapiGetContext().preference,
            keys = Object.keys(opt.params);
        for (let i = 0; i < keys.length; i++) {
            let param = keys[i];
            pref[param] = opt.params[param];
        }
    }
};
