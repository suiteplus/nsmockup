'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate');

/**
 * NetSuite: Schedule mockup.
 *
 * @param opt {{
 *    [id]: string,
 *    name: string,
 *    [bundle]: {
 *      main: string,
 *      var: string
 *    },
 *    files: [string],
 *    params: object,
 *    function: string,
 *    [func]: string,
 *    exec: boolean
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    } else  if (!opt.function && !opt.func) {
        return ssValidate.throwError('principal function not def: "opt.function"');
    }

    if(!opt.function) {
        opt.function = opt.func;
    }

    // save reference
    let context = database.createSuiteScript({
        type: 'schedule',
        code: opt.id || opt.name,
        name: opt.name,
        bundle: opt.bundle,
        function: opt.function,
        files: opt.files,
        params: opt.params
    });

    let func = opt.function;
    if (typeof func === 'string') {
        ssValidate.principalFunction(func, null, context);
    } else {
        return ssValidate.throwError('invalid type of principal function, string only: "opt.function"');
    }

    if (opt.exec) {
        // execute script on his context
        vmSim.evalContext(func + '()', context);
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
