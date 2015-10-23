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
        if (script.type === 'restlet') {
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
        if (method === 'get') {
            context.$NS_DATAIN = req.query;
        } else {
            context.$NS_DATAIN = req.body;
        }
        context.$NS_RESULT = null;

        // execute script on his context
        let code = `$NS_RESULT = ${execFunc}($NS_DATAIN)`;
        vmSim.evalContext(code, context);

        let body = context.$NS_RESULT;
        if (typeof body === 'object') {
            res.set('Content-Type', 'application/json');
            res.status(200).send(body);
        } else {
            res.set('Content-Type', 'text/plain');
            res.status(200).send('' + body);
        }
    }
};