'use strict';
var vmSim = require('./vm-sim'),
    should = require('should');

/**
 * Basic Function idea from Netsuite API.
 *
 * @param opt {{
 *    name: String,
  *   files: [String],
  *   params: Object,
  *   func: String
 * }}
 */
module.exports = (opt) => {
    let nlapiGetContext = require('../lib/nsfunc/context-api').nlapiGetContext;
    if (!opt || !opt.files || opt.files.length === 0) return;

    // load Libraries
    for (let i = 0; i < opt.files.length; i++) {
        vmSim.addScript(opt.files[i]);
    }

    let validateFunc = (func) => {
        let ff = func.split('.'),
            test = global;
        for (let i=0; i<ff.length; i++) {
            let field = ff[i];
            test = test[field];
            should(test).not.eql(undefined, `function not found: "${func}"`);
        }
    };
    let func = opt.func;
    if (typeof func === 'string') {
        validateFunc(func);
    } else {
        let funcs = Object.keys(func);
        for (let i=0; i<funcs.length; i++) {
            let method = funcs[i].toLowerCase();
            if (~['post','get','delete','put'].indexOf(method)) {
                validateFunc(func[method]);
            } else {
                should(method).be.equal(null, `invalid method ${method}}`);
            }
        }
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
