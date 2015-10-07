'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate');

/**
 * NetSuite: Schedule mockup.
 *
 * @param opt {{
 *    name: String,
 *    files: [String],
 *    params: Object,
 *    func: String,
 *    exec: Boolean
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    }

    if (!opt.func) {
        return ssValidate.throwError('principal function not def: "opt.func"');
    }

    // save reference
    let context = database.createSuiteScript({
        type: 'schedule',
        name: opt.name,
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

    if (opt.exec) {
        // execute script on his context
        vmSim.evalContext(func + '()', context);
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
