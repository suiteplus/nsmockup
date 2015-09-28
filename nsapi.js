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

function loadDatabase(cb) {
    let base = '.nsmockup',
        tempDir = base + '/temp-'+(new Date().toJSON().replace(/[-:.Z]/g,'')),
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
    db.$pathCabinet = tempDir+'/cabinet';

    cb(global.$db = db);
}

exports.init = function(opts, cb) {
    function initDB (db) {
        let metadatas = opts.metadatas;
        if (typeof metadatas === 'string') metadatas = [require(opts.records)];
        else if (!Array.isArray(metadatas)) metadatas = [metadatas];

        if (metadatas && metadatas.length !== 0) {
            let _metadata = db('__metadata');
            for (let i = 0; i < metadatas.length; i++) {
                let metadata = metadatas[i];
                if (typeof metadata === 'string') metadata = require(metadata);

                if (!metadata || !metadata.code) continue;
                else {
                    _metadata.remove({code: metadata.code});
                    _metadata.push(metadata);
                    console.log('import record-type metadata "' + metadata.code + '"');
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
    else loadDatabase(initDB);
};

exports.destroy = function(cb) {
    var rmAllDirs = function (path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file) {
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    rmAllDirs(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    function cleanDB(db) {
        db.object = {};
        db.save();

        rmAllDirs(db.$pathCabinet) && fs.mkdirSync(db.$pathCabinet);

        return cb();
    }

    if ($db) cleanDB($db);
    else loadDatabase(cleanDB);
};

