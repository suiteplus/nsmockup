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
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '{}');
    }

    let low = require('lowdb'),
        db = low(dbPath);

    // create metadata collection
    if (!db.object.__metadata) {
        db.object.__metadata = {};
        db.save();
    }

    cb(global.$db = db);
}

exports.initDB = function(opts, cb) {
    function initDB (db) {
        let metadatas = opts.metadatas;
        if (typeof metadatas === 'string') metadatas = [require(opts.records)];
        else if (!Array.isArray(metadatas)) metadatas = [metadatas];

        if (metadatas && metadatas.length !== 0) {
            let _metadata = db.object.__metadata;
            for (let i = 0; i < metadatas.length; i++) {
                let metadata = metadatas[i];
                if (typeof metadata === 'string') metadata = require(metadata);

                if (!metadata.code) continue;
                else {
                    console.log('import record-type metadata "' + metadata.code + '"');
                    _metadata[metadata.code] = metadata;
                }
            }
            db.save();
        }

        let records = opts.records;
        if (typeof records === 'string') records = require(opts.records);

        if (!records) return cb();
        let recNames = Object.keys(records);

        let actual = 0,
            verifyDone = function () {
                if (++actual == recNames.length) return cb();
            };
        for (let i = 0; i < recNames.length; i++) {
            let recName = recNames[i],
                recVal = records[recName];

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

            console.log('import record-type "' + recName + '" - total: ' + recVal.length);
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

