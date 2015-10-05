'use strict';

exports.exec = (req, res) => {
    let db = global.$db,
        id = req.query.script,
        script = db.object.__scripts[id-1];
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

        let result;
        if (script.type === 'suitelet') {
            result = eval(script.func+'()');
        } else {
            result = eval(script.funcs[method]+'()');
        }

        res.send(result);
    }
};