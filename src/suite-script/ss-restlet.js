'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate'),
    should = require('should');

/**
 * NetSuite: RESTlet mockup.
 *
 * @param opt {{
 *    name: String,
 *    files: [String],
 *    params: Object,
 *    funcs: {
 *      [post]: String,
 *      [get]: String,
 *      [delete]: String,
 *      [put]: String
 *    }
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    }

    if (!opt.funcs) {
        return ssValidate.throwError('principal functions not def: "opt.funcs"');
    }

    let funcs = Object.keys(opt.funcs);
    if (!funcs || funcs.length === 0) {
        return ssValidate.throwError('principal functions was empty: "opt.funcs"');
    }

    // save reference
    let context = database.createSuiteScript({
        type: 'restlet',
        name: opt.name,
        funcs: opt.funcs,
        files: opt.files,
        params: opt.params
    });

    for (let i=0; i<funcs.length; i++) {
        let method = funcs[i].toLowerCase();
        if (~['post', 'get', 'delete', 'put'].indexOf(method)) {
            ssValidate.principalFunction(opt.funcs, method, context);
        } else {
            should(method).be.equal(null, `invalid method ${method}}`);
        }
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
