'use strict';
var vmSim = require('../../vm-sim');

exports.exec = (req, res) => {
    let db = global.$db,
        id = req.query.script,
        script = db.object.__scripts[id - 1];
    if (!script) {
        res.status(500).send('SSS_INVALID_INTERNAL_ID');
    } else {
        let methods,
            method = req.method.toLowerCase();
        if (script.type === 'suitelet') {
            methods = ['get', 'post'];
        } else if (script.type === 'restlet') {
            methods = ['get', 'post', 'put', 'delete'];
        }

        if (!methods || !~methods.indexOf(method)) {
            res.status(500).send('SSS_INVALID_TYPE_SCRIPT');
        }

        let execFunc;
        if (script.funcs && method) {
            execFunc = script.funcs[method];
        } else {
            execFunc = script.func;
        }
        // load libs in specific context
        let context = vmSim.importSuiteScript(script);

        // init request and response variables in context
        context.$NS_REQ = new context.nlobjRequest(req);
        context.$NS_RES = new context.nlobjResponse(res);

        // execute script on his context
        vmSim.evalContext(execFunc + '($NS_REQ, $NS_RES)', context);
    }
};