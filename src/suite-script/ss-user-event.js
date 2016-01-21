'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate'),
    should = require('should');

/**
 * NetSuite: User Event mockup.
 *
 * @param opt {{
 *    [id]: string,
 *    name: string,
 *    files: [string | [string]],
 *    params: object,
 *    functions: {
 *      beforeLoad: string,
 *      beforeSubmit: string,
 *      afterSubmit: string
 *    },
 *    funcs: {
 *      beforeLoad: string,
 *      beforeSubmit: string,
 *      afterSubmit: string
 *    },
 *    records: [string],
 *    [record]: string
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    } else if ((!opt.records || !opt.records.length) && !opt.record) {
        return ssValidate.throwError('user event needs one Record Type: "opt.records"');
    } else if (!opt.functions && !opt.funcs) {
        return ssValidate.throwError('principal functions not def: "opt.functions"');
    }

    if (!opt.functions) {
        opt.functions = opt.funcs;
    }
    if (!opt.records && opt.record) {
        opt.records = [opt.record];
    }

    let funcs = Object.keys(opt.functions);
    if (!funcs || funcs.length === 0) {
        return ssValidate.throwError('principal functions was empty: "opt.functions"');
    }

    // save reference and get new context
    let context = database.createSuiteScript({
        type: 'user-event',
        code: opt.id || opt.name,
        name: opt.name,
        functions: opt.functions,
        files: opt.files,
        params: opt.params,
        events: {
            beforeLoad: !!opt.functions.beforeLoad,
            beforeSubmit: !!opt.functions.beforeSubmit,
            afterSubmit: !!opt.functions.afterSubmit
        },
        records: opt.records
    });

    for (let i = 0; i < funcs.length; i++) {
        let step = funcs[i];
        if (~['beforeLoad', 'beforeSubmit', 'afterSubmit'].indexOf(step)) {
            ssValidate.principalFunction(opt.functions, step, context);
        } else {
            should(step).be.equal(null, `invalid step ${step}`);
        }
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
