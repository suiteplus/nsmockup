'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate');

/**
 * NetSuite: Suitelet mockup.
 *
 * @param opt {{
 *    [id]: string,
 *    name: string,
 *    [deployment]: string,
 *    [bundle]: {
 *      main: string,
 *      var: string
 *    },
 *    files: [string],
 *    params: object,
 *    func: string
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    } else if (!opt.func) {
        return ssValidate.throwError('principal function not def: "opt.func"');
    }

    if (opt.deployment) {
        opt.deployment = 'customdeploy' + opt.id.replace('customscript', '');
    }

    // save reference and get new context
    let context = database.createSuiteScript({
        type: 'suitelet',
        code: opt.id || opt.name,
        name: opt.name,
        bundle: opt.bundle,
        deployment: opt.deployment,
        func: opt.func,
        files: opt.files,
        params: opt.params
    });

    let func = opt.func;
    if (typeof func === 'string') {
        ssValidate.principalFunction(func, null, context);
    } else {
        return ssValidate.throwError('invalid type of principal function, string only: "opt.func"');
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
