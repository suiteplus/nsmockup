'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate'),
    should = require('should');

/**
 * NetSuite: RESTlet mockup.
 *
 * @param opt {{
 *    [id]: string,
 *    name: string,
 *    [deployment]: string,
 *    files: [string | [string]],
 *    params: object,
 *    functions: {
 *      [post]: string,
 *      [get]: string,
 *      [delete]: string,
 *      [put]: string
 *    },
 *    [funcs]: {
 *      [post]: string,
 *      [get]: string,
 *      [delete]: string,
 *      [put]: string
 *    }
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    } else if (!opt.functions && !opt.funcs) {
        return ssValidate.throwError('principal functions not def: "opt.functions"');
    }

    if (!opt.functions) {
        opt.functions = opt.funcs;
    }

    let funcs = Object.keys(opt.functions);
    if (!funcs || funcs.length === 0) {
        return ssValidate.throwError('principal functions was empty: "opt.functions"');
    }

    if (opt.deployment) {
        opt.deployment = 'customdeploy' + opt.id.replace('customscript', '');
    }

    // save reference
    let context = database.createSuiteScript({
        type: 'restlet',
        code: opt.id || opt.name,
        name: opt.name,
        deployment: opt.deployment,
        functions: opt.functions,
        files: opt.files,
        params: opt.params
    });

    for (let i = 0; i < funcs.length; i++) {
        let method = funcs[i].toLowerCase();
        if (~['post', 'get', 'delete', 'put'].indexOf(method)) {
            ssValidate.principalFunction(opt.functions, method, context);
        } else {
            should(method).be.equal(null, `invalid method ${method}`);
        }
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
