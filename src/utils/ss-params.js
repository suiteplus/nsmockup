'use strict';
var nlapiGetContext = require('../../lib/nsfunc/context-api').nlapiGetContext;

exports.load = (params) => {
    if (!params) return;

    let pref = nlapiGetContext().preference,
        keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
        let param = keys[i];
        pref[param] = params[param];
    }
};
