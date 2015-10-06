'use strict';
var nlobjRequest = require('../../../lib/nsobj/request').nlobjRequest,
    nlobjResponse = require('../../../lib/nsobj/response').nlobjResponse;

exports.exec = (req, res) => {
    console.log('opaaaaa', global.$db('__scripts').value());
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
        let ff = execFunc.split('.'),
            func = global[ff[0]],
            nsreq = new nlobjRequest(req),
            nsres = new nlobjResponse(res);
        // workaround
        if (ff.length === 1)
            func(nsreq, nsres);
        else if (ff.length === 2)
            func[ff[1]](nsreq, nsres);
        else if (ff.length === 3)
            func[ff[1]][ff[2]](nsreq, nsres);
    }
};