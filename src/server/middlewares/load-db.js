'use strict';
var low = require('lowdb');

module.exports = (req, res, next) => {
    // reload $db
    let db = global.$db,
        dbFile = db.$pathDB + '/db.json';

    global.$db = low(dbFile, {autosave: false, async: false});
    return next();
};
