'use strict';
var low = require('lowdb'),
    storage = require('lowdb/file-sync');

module.exports = (req, res, next) => {
    // reload $db
    let db = global.$db,
        dbFile = db.$pathDB + '/db.json';

    global.$db = low(dbFile, { storage }, false);

    ['$path', '$pathDB', '$pathCabinet', '$scripts'].forEach(v => global.$db[v] = db[v]);
    return next();
};
