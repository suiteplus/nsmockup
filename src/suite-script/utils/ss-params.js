'use strict';

exports.load = (params, ctx) => {
    if (!params) return;

    let context = ctx || global,
        pref = context.nlapiGetContext().preference,
        keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
        let param = keys[i];
        pref[param] = params[param];
    }
};
