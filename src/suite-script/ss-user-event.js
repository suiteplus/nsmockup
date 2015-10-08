'use strict';
var database = require('../database'),
    vmSim = require('../vm-sim'),
    ssValidate = require('./utils/ss-validate'),
    should = require('should');

/**
 * NetSuite: User Event mockup.
 *
 * @param opt {{
 *    name: String,
 *    files: [String],
 *    params: Object,
 *    funcs: {
 *      beforeLoad: String,
 *      beforeSubmit: String,
 *      afterSubmit: String
 *    },
 *    record: String
 * }}
 */
module.exports = (opt, cb) => {
    if (!opt || !opt.files || opt.files.length === 0) {
        return ssValidate.throwError('script needs libraries: "opt.files"');
    }
    if (!opt.record) {
        return ssValidate.throwError('user event needs one Record Type: "opt.record"');
    }

    let funcs = Object.keys(opt.funcs);
    if (!funcs || funcs.length === 0) {
        return ssValidate.throwError('principal functions was empty: "opt.funcs"');
    }

    // save reference and get new context
    let context = database.createSuiteScript({
        type: 'user-event',
        name: opt.name,
        funcs: opt.funcs,
        files: opt.files,
        params: opt.params,
        events: {
            beforeLoad: !!opt.funcs.beforeLoad,
            beforeSubmit: !!opt.funcs.beforeSubmit,
            afterSubmit: !!opt.funcs.afterSubmit
        },
        record: opt.record
    });

    for (let i=0; i<funcs.length; i++) {
        let step = funcs[i];
        if (~['beforeLoad', 'beforeSubmit', 'afterSubmit'].indexOf(step)) {
            ssValidate.principalFunction(opt.funcs, step, context);
        } else {
            should(step).be.equal(null, `invalid step ${step}`);
        }
    }

    return cb && cb(context, vmSim.createInvokeFunction(context));
};
