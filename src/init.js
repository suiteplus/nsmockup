'use strict';
var server = require('./server'),
    database = require('./database'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    _ = require('lodash'),
    uuid = require('uuid');

/**
 * Alternative a cache created by 'require(path)'.
 * @param path
 */
var readJSON = (json) => {
    let jPath = path.resolve(json),
        code = fs.readFileSync(jPath, 'utf8');
    return JSON.parse(code);
};

const $$PACK = require('../package');
const $$INIT_CURRENT = {
    user: {
        id: -4,
        type: 'entity'
    },
    company: $$PACK.name.toUpperCase() + $$PACK.version.replace(/./, '')
};

const $$INIT_GENERAL_PREFS = {
    currency: '$',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: {
        decimal: '.',
        precision: 2,
        thousand: ','
    },
    timeFormat: 'hh:mm A',
    lang: 'en'
};

/**
 *
 * @param [opts] {{
 *   [metadata]: String || [String],
 *   [records]: Object,
 *   [server]: Boolean,
 *   [current]: {
 *      [user]: {
 *          id: Number || '-4',
 *          type: String
 *      },
 *      [company]: String || 'NSMOCKUPVxxx'
 *   },
 *   [general]: {
 *      [currency]: String || '$',
 *      [dateFormat]: String || 'MM/DD/YYYY',
 *      [numberFormat]: {
 *          [decimal]: String || '.',
 *          [precision]: Number || 2,
 *          [thousand]: String || ','
 *      }
 *      [timeFormat]: String || 'hh:mm A',
 *      [lang]: String || 'en'
 *   }
 * }}
 * @param cb Function
 */
module.exports = (opts, cb) => {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    } else if (!opts) {
        opts = {};
    }

    if (opts.current && opts.current.user && opts.current.user.type) {
        let types = ['employee', 'customer', 'vendor', 'partner'],
            type = opts.current.user.type;
        if (type !== 'entity' && !~types.indexOf(type)) {
            throw new Error(`Invalid type ("${type}") of current NetSuite user, see options: ${types}`);
        }
    }

    _.merge(global.$$CURRENT_AUTH, $$INIT_CURRENT, opts.current || {});
    _.merge(global.$$GENERAL_PREFS, $$INIT_GENERAL_PREFS, opts.general || {});

    function init(db) {
        let metadata = opts.metadata;
        if (typeof metadata === 'string') {
            metadata = [readJSON(opts.records)];
        } else if (metadata && !Array.isArray(metadata)) {
            metadata = [metadata];
        } else if (!metadata) {
            metadata = [];
        }

        // add default metadatadas
        let defaulEntities = ['folder', 'file'];
        for (let e = 0; e < defaulEntities.length; e++) {
            let entity = defaulEntities[e];
            if (!~metadata.indexOf(`:${entity}`)) {
                metadata.push(`:${entity}`);
            }
        }

        let defaultMetas = glob.sync(__dirname + '/defaults-records/metadata/*.json');
        for (let m = 0; m < defaultMetas.length; m++) {
            let defaultMeta = defaultMetas[m],
                entityName = path.basename(defaultMeta, '.json'),
                index = metadata.indexOf(`:${entityName}`);
            if (~index) {
                metadata[index] = require(defaultMeta);
            }
        }

        let _metadata = db('__metadata');
        for (let i = 0; i < metadata.length; i++) {
            let metadatum = metadata[i];
            if (typeof metadatum === 'string') {
                metadatum = readJSON(metadatum);
            }

            if (!metadatum || !metadatum.code) {
                continue;
            } else {
                _metadata.remove({code: metadatum.code});
                _metadata.push(metadatum);
                //console.log('import record-type metadata "' + metadata.code + '"');
            }
        }
        try {
            db.write();
        } catch (e) {
            console.error(e);
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
        if (typeof records === 'string') records = readJSON(opts.records);

        if (!records) {
            records = {};
        }
        // defaults data
        let defaultDatas = glob.sync(__dirname + '/defaults-records/data/*.json');
        for (let d = 0; d < defaultDatas.length; d++) {
            let defaultData = defaultDatas[d],
                recName = path.basename(defaultData, '.json');

            let data = records[recName] || [];
            if (typeof data === 'string') data = readJSON(data);
            records[recName] = data.concat(require(defaultData));
        }
        let recNames = Object.keys(records);

        let recSubLists = {},
            actual = 0,
            verifyDone = () => {
                if (++actual == recNames.length) {
                    let recSubTypes = Object.keys(recSubLists);
                    if (recSubTypes.length) {
                        for (let s = 0; s < recSubTypes.length; s++) {
                            let recSubType = recSubTypes[s],
                                dataSub = recSubLists[recSubType];
                            if (!dataSub || !dataSub.length) continue;

                            db.object[recSubType] = dataSub.map((val, i) => {
                                val._index = (i + 1);
                                val._uuid = uuid.v4();
                                return val;
                            });
                        }
                        db.write();
                    }

                    return verifySteps();
                }
            };

        for (let i = 0; i < recNames.length; i++) {
            let recName = recNames[i],
                data = records[recName];

            if (typeof data === 'string') data = readJSON(data);
            if (!data || !data.length) {
                // save record type data in lowdb database
                if (!db.object[recName]) {
                    db.object[recName] = [];
                    db.write();
                }
                verifyDone();
                continue;
            }

            let recVal = data.map((val, i) => {
                if (!val.internalid) {
                    val.internalid = (i + 1);
                }
                if (!val._uuid) {
                    val._uuid = uuid.v4();
                }
                if (val.$$subLists) {
                    let subTypes = Object.keys(val.$$subLists);
                    for (let s = 0; s < subTypes.length; s++) {
                        let subType = subTypes[s],
                            recSubType = `$$sl-${recName}-${subType}-${val._uuid}`;

                        recSubLists[recSubType] = val.$$subLists[subType];
                    }
                }
                return val;
            });

            // save record type data in lowdb database
            db.object[recName] = recVal;
            db.write();

            //console.log('import record-type "' + recName + '" - total: ' + recVal.length);
            verifyDone();
        }
    }

    //if (global.$db) init(global.$db);
    //else database.load(init);
    database.load(init);
};
