'use strict';
var fs = require('fs');

module.exports = (cb) => {
    let base = '.nsmockup',
        tempDir = base + '/temp-' + (new Date().toJSON().replace(/[-:.Z]/g, '')),
        dbDir = tempDir + '/db',
        dbPath = dbDir + '/db.json';

    [base, tempDir, dbDir].forEach(f => {
        !fs.existsSync(f) && fs.mkdirSync(f);
    });

    !fs.existsSync(dbPath) && fs.writeFileSync(dbPath, '{}');

    let low = require('lowdb'),
        db = low(dbPath);

    // create metadata collection
    if (!db.object.__metadata) {
        db.object.__metadata = [];
        db.save();
    }
    db.$path = tempDir;
    db.$pathDB = dbDir;
    db.$pathCabinet = tempDir + '/cabinet';

    cb(global.$db = db);
};
