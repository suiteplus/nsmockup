'use strict';
var vmSim = require('./vm-sim'),
    ssParams = require('./utils/ss-params'),
    ssValidate = require('./utils/ss-validate');

/**
 * RESTlet Function idea from Netsuite API.
 *
 * @param opt {{
 *    name: String,
  *   files: [String],
  *   params: Object,
  *   funcs: {
  *     [post]: String,
  *     [get]: String,
  *     [delete]: String,
  *     [put]: String
  *   }
 * }}
 */
module.exports = (opt) => {
    if (!opt || !opt.files || opt.files.length === 0) return;

    // load Libraries
    for (let i = 0; i < opt.files.length; i++) {
        vmSim.addScript(opt.files[i]);
    }

    if (!opt.funcs) {
        return ssValidate.throwError('principal functions not def: "opt.funcs"');
    }

    let funcs = Object.keys(opt.funcs);
    if (!funcs || funcs.length === 0) {
        return ssValidate.throwError('principal functions was empty: "opt.funcs"');
    }

    for (let i=0; i<funcs.length; i++) {
        let method = funcs[i].toLowerCase();
        if (~['post', 'get', 'delete', 'put'].indexOf(method)) {
            ssValidate.principalFunction(opt.funcs, method);
        } else {
            should(method).be.equal(null, `invalid method ${method}}`);
        }
    }

    // load params configurations
    ssParams.load(opt.params);
};
