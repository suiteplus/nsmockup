'use strict';
var vmSim = require('../vm-sim'),
    database = require('../database'),
    ssParams = require('./utils/ss-params'),
    ssValidate = require('./utils/ss-validate');

/**
 * Schedule Function idea from Netsuite API.
 *
 * @param opt {{
 *    name: String,
  *   files: [String],
  *   params: Object,
  *   func: String
 * }}
 */
module.exports = (opt) => {
    if (!opt || !opt.files || opt.files.length === 0) return;

    // load Libraries
    for (let i = 0; i < opt.files.length; i++) {
        vmSim.addScript(opt.files[i]);
    }

    if (!opt.func) {
        return ssValidate.throwError('principal function not def: "opt.func"');
    }
    let func = opt.func;
    if (typeof func === 'string') {
        ssValidate.principalFunction(func);
    } else {
        return ssValidate.throwError('invalid type of principal function, string only: "opt.func"');
    }

    // load params configurations
    ssParams.load(opt.params);

    // save reference
    database.createScript({
        type: 'schedule',
        name: opt.name,
        func: opt.func,
        files: opt.files,
        params: opt.params
    });
};
