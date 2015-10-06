'use strict';
var low = require('lowdb');

module.exports = (req, res, next) => {
    // reload $db
    let db = global.$db;
    global.$db = low(db.$pathDB + '/db.json');

    console.log('load $db', req.method, req.path);
    return next();
};
