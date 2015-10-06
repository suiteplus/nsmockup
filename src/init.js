'use strict';
var server = require('./server'),
    database = require('./database');

/**
 *
 * @param opts {{
 *   [metadatas]: String || [String],
 *   [records]: Object,
 *   [server]: Boolean
 * }}
 * @param cb Function
 */
module.exports = (opts, cb) => {
    function init(db) {
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
                    //console.log('import record-type metadata "' + metadata.code + '"');
                }
            }
            db.save();
        }

        // ##############################
        // Execute all steps before tests
        // ##############################
        let step = 0,
            verifySteps = () => {
                if (++step === 2) {
                    return cb && cb();
                }
            };

        // ##############################
        // Start nsmockup server
        // ##############################
        if (opts.server === true && !server.isStarted()) {
            server.exec('start', verifySteps);
        } else {
            verifySteps();
        }

        // ##############################
        // Load Records
        // ##############################
        let records = opts.records;
        if (typeof records === 'string') records = require(opts.records);

        if (!records) return verifySteps();
        let recNames = Object.keys(records);

        let actual = 0,
            verifyDone = () => {
                if (++actual == recNames.length) return verifySteps();
            };
        for (let i = 0; i < recNames.length; i++) {
            let recName = recNames[i],
                recVal = records[recName];

            if (typeof recVal === 'string') recVal = require(recVal);
            if (!recVal || !recVal.length) {
                verifyDone();
                continue;
            }

            recVal = recVal.map((val, i) => {
                if (!val.internalid) val.internalid = (i + 1);
                return val;
            });

            // save record type data in lowdb database
            db.object[recName] = recVal;
            db.save();

            //console.log('import record-type "' + recName + '" - total: ' + recVal.length);
            verifyDone();
        }
    }

    if (global.$db) init(global.$db);
    else database.load(init);
};
