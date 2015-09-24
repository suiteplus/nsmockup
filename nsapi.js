'use strict';
var vm = require('vm'),
    vmInclude = function(code) {
        vm.runInThisContext(code);
    }.bind(this);

vmInclude('var window = {};');

(function(fs){
    vmInclude(fs.readFileSync(__dirname + '/nsapi-doc.js'));
})(require('fs'));

var scripts = [
    './src/nlobj/error',
    './src/nlobj/context',
    './src/nlapi/create-error',
    './src/nlapi/log-execution',
    './src/nlapi/get-context',
    './src/nlapi/search-record'
];

var $db;

function loadMongodb(cb) {
    let MongoClient = require('mongodb').MongoClient;

    let dbName = process.env.NS_DB_NAME || 'nsmockup',
        url = 'mongodb://localhost:27017/' + dbName;

    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) return cb(err);
        console.log('Connected correctly to server "'+dbName+'"');

        for (let i = 0; i < scripts.length; i++) {
            let script = require(scripts[i])(db);
            console.log(scripts[i], script);
            vmInclude('' + script);
        }

        return cb($db = db);
    });
};

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

            let collection = db.collection(recName);
            collection.drop(function(err) {
                if (err) return cb(err);
                collection.insertMany(recVal, function (err) {
                    if (err) return cb(err);

                    console.log('import record type "' + recName + '" - total: ' + recVal.length);
                    verifyDone();
                });
            });
        }
    };
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
    };
    if ($db) cleanDB($db);
    else loadMongodb(cleanDB);
};

