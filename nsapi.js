'use strict';
var fs = require('fs'),
    vm = require('vm'),
    vmInclude = function(code, path) {
        vm.runInThisContext(code, path);
    },
    vmAddFile = function(path) {
        vmInclude(fs.readFileSync(path), path);
    };

// workaround to 'require' works in vm.runInThisContext
global.require = require;

vmInclude('var window = {};');
vmAddFile(__dirname + '/nsapi-doc.js');

// load Netsuite functions and objects
var glob = require('glob'),
    files = glob.sync(__dirname + '/src/**/*.js');
for (let i=0; i<files.length; vmAddFile(files[i++]));

var $db;

function loadMongodb(cb) {
    'use strict';
    let dbDir = '.lowdb',
        dbPath = dbDir + '/db.json';

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir);
    }
    fs.writeFileSync(dbPath, '{}');

    let low = require('lowdb'),
        db = low(dbPath);

    cb(global.$db = db);
}

exports.initDB = function(records, cb) {
    function initDB (db) {
        let recs = records;
        if (typeof records === 'string') recs = require(records);

        if (!recs) return cb('empty records');
        let recNames = Object.keys(recs);

        let actual = 0,
            verifyDone = function () {
                if (++actual == recNames.length) return cb();
            };
        for (let i = 0; i < recNames.length; i++) {
            let recName = recNames[i],
                recVal = recs[recName];

            if (typeof recVal === 'string') recVal = require(recVal);
            if (!recVal || !recVal.length) {
                verifyDone();
                continue;
            }

            recVal = recVal.map((val,i) => {
                if (!val.internalid) val.internalid = (i+1);
                return val;
            });

            // save record type data in lowdb database
            db.object[recName] = recVal;
            db.save();

            console.log('import record type "' + recName + '" - total: ' + recVal.length);
            verifyDone();
        }
    }
    if ($db) initDB($db);
    else loadMongodb(initDB);
};

exports.cleanDB = function(cb) {
    function cleanDB(db) {
        db.collectionNames(function(err, names) {
            if (err) return cb(err);

            let actual = 0,
                verifyDone = function () {
                    if (++actual == names.length) return cb();
                };

            for (let i=0; i<names.length; i++) {
                let name = names[i];
                db.dropCollection(name, function() {
                    if (err) console.log('fail drop record "'+name+'"');
                    else console.log('record "'+name+'" dropped');
                    verifyDone();
                });
            }
        });
    }
    if ($db) cleanDB($db);
    else loadMongodb(cleanDB);
};

