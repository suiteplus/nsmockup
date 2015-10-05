'use strict';

module.exports = (opts) => {
    let options = opts || {},
        methods = ['GET', 'POST'];
    if (!Array.isArray(methods)) methods = [methods];

    var methods_allow = methods.concat('OPTIONS').join(', '),
        headers_allow = ['Origin', 'Content-Type', 'Accept'],
        content_type = options.contentType || 'application/json';

    return (req, res, next) => {
        // set origin policy etc so cross-domain access wont be an issue
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', methods_allow);
        res.header('Access-Control-Allow-Headers', headers_allow);
        res.header('Content-Type', content_type);

        res.header('Last-Modified', (new Date()).toUTCString());

        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    };
};