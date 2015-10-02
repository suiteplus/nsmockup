'use strict';

/**
 * Return a new record using values from an existing record.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string}    type The record type name.
 * @param {int}    id The internal ID for the record.
 * @param {Object}    initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}  Returns an nlobjRecord object of a copied record.
 *
 * @since    2007.0
 */
exports.nlapiCopyRecord = (type, id, initializeValues) => {
    let record = nlapiLoadRecord(type, id, initializeValues);
    record.id = 0;
    return record;
};

/**
 * Load an existing record from the system.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string}    type The record type name.
 * @param {int}    id The internal ID for the record.
 * @param {Object}    initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}  Returns an nlobjRecord object of an existing NetSuite record.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_ID_ARG_REQD}
 *
 * @since    2007.0
 */
exports.nlapiLoadRecord = (type, id, initializeValues) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (!id) throw nlapiCreateError('SSS_ID_ARG_REQD');
    else if (typeof id !== 'number') throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');

    let meta = $db('__metadata').chain().where({code: type}).value();
    if (!meta || !meta.length) throw nlapiCreateError('SSS_INVALID_RECORD_TYPE');

    let collection = $db(type);


    var res = collection.chain().where({internalid: id}).value();
    if (!res || !res.length) throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');

    let o = new nlobjRecord(type, id),
        data = JSON.parse(JSON.stringify(res[0]));
    delete data.internalid;

    let dataFields = Object.keys(data),
        initFields = initializeValues ? Object.keys(initializeValues) : [];

    for (let i = 0; i < dataFields.length; i++) {
        let dataField = dataFields[i];
        o.setFieldValue(dataField, data[dataField]);

        // remove same field from initializeValues
        ((i) => initFields.splice(i, 1))(initFields.indexOf(dataField));
    }

    for (let i = 0; i < initFields.length; i++) {
        let initField = initFields[i];
        if (o.getFieldValue())
            continue;
        else
            o.setFieldValue(initField, initializeValues[initField]);
    }
    return o;
};

/**
 * Instantiate a new nlobjRecord object containing all the default field data for that record type.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} type record type ID.
 * @param {Object} initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 * @return {nlobjRecord}   Returns an nlobjRecord object of a new record from the system.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 *
 * @since    2007.0
 */
exports.nlapiCreateRecord = (type, initializeValues) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');

    let meta = $db('__metadata').chain().where({code: type}).value();
    if (!meta || !meta.length) throw nlapiCreateError('SSS_INVALID_RECORD_TYPE');

    let o = new nlobjRecord(type);
    if (initializeValues) {
        let fields = meta[0].fields.map(f => f.code),
            initFields = Object.keys(initializeValues);

        for (let i = 0; i < initFields.length; i++) {
            let initField = initFields[i];
            if (!~fields.indexOf(initField)) {
                throw nlapiCreateError('SSS_INVALID_INITIALIZE_DEFAULT_VALUE', 'invalid field:' + initField);
            }
            o.setFieldValue(initField, initializeValues[initField]);
        }
    }

    return o;
};

/**
 * Submit a record to the system for creation or update.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {nlobjRecord} record nlobjRecord object containing the data record.
 * @param {boolean}    [doSourcing] If not set, this argument defaults to false.
 * @param {boolean}    [ignoreMandatoryFields] Disables mandatory field validation for this submit operation.
 * @return {string} internal ID for committed record.
 *
 * @exception {SSS_INVALID_RECORD_OBJ}
 * @exception {SSS_RECORD_OBJ_REQD}
 * @exception {SSS_INVALID_SOURCE_ARG}
 *
 * @since    2007.0
 */
exports.nlapiSubmitRecord = (record, doSourcing, ignoreMandatoryFields) => {
    if (!record) throw nlapiCreateError('SSS_RECORD_OBJ_REQD');

    let recType = record.getRecordType(),
        meta = $db('__metadata').chain().where({code: recType}).value();
    if (!recType || !meta || !meta.length) throw nlapiCreateError('SSS_INVALID_RECORD_OBJ');

    let collection = $db(recType),
        fields = record.getAllFields();

    let data = {internalid: record.getId()};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        data[field] = record.getFieldValue(field);
    }

    if (data.internalid > 0) {
        // Update Record
        let query = {internalid: data.internalid};
        collection.chain().find(query).assign(data).value();
    } else {
        // Insert New Record
        data.internalid = collection.size() + 1;
        collection.push(data);
    }

    return (record.id = data.internalid);
};

/**
 * Delete a record from the system.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {string}    type The record type name.
 * @param {int}    id The internal ID for the record.
 * @return {void}
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_ID_ARG_REQD}
 *
 * @since    2007.0
 */
exports.nlapiDeleteRecord = (type, id) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (!id) throw nlapiCreateError('SSS_ID_ARG_REQD');
    else if (typeof id !== 'number') throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');

    let meta = $db('__metadata').chain().where({code: type}).value();
    if (!meta || !meta.length) throw nlapiCreateError('SSS_INVALID_RECORD_TYPE');

    let collection = $db(type),
        query = {internalid: id};

    collection.remove(query);
};

/**
 * Perform a record search using an existing search or filters and columns.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string}        type record type ID.
 * @param {int, string} [id] The internal ID or script ID for the saved search to use for search.
 * @param {nlobjSearchFilter, nlobjSearchFilter[], object[]} [filters] [optional] A single nlobjSearchFilter object - or - an array of nlobjSearchFilter objects.
 * @param {nlobjSearchColumn, nlobjSearchColumn[]} [columns] [optional] A single nlobjSearchColumn object - or - an array of nlobjSearchColumn objects.
 * @return {nlobjSearchResult[]} Returns an array of nlobjSearchResult objects corresponding to the searched records.
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 * @exception {SSS_TYPE_ARG_REQD}
 * @exception {SSS_INVALID_SRCH_ID}
 * @exception {SSS_INVALID_SRCH_FILTER}
 * @exception {SSS_INVALID_SRCH_FILTER_JOIN}
 * @exception {SSS_INVALID_SRCH_OPERATOR}
 * @exception {SSS_INVALID_SRCH_COL_NAME}
 * @exception {SSS_INVALID_SRCH_COL_JOIN}
 *
 * @since    2007.0
 */
exports.nlapiSearchRecord = (type, id, filters, columns) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (id && typeof id !== 'number') throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    let meta = $db('__metadata').chain().where({code: type}).value();
    if (!meta || !meta.length) throw nlapiCreateError('SSS_INVALID_RECORD_TYPE');

    let _ = require('lodash');

    let items = $db(type).chain(),
        query = {};

    if (id) {
        query.internalid = id;
        items = items.where(query);
    }

    let select = {},
        rawColumns = [];

    function addSelect(n, f) {
        !select[n] && (select[n] = []);
        if (!f && select[n].length === 0) {
            select[n].push('$val');
            rawColumns.push([n]);
        } else if (f && !~select[n].indexOf(f)) {
            select[n].push(f);
            rawColumns.push([f, n]);
        }
        return select[n];
    }

    // find join columns
    let recordCache = {},
        joinCache = {},
        metaCache = {},
        metaFieldCache = {};

    function findJoinColumns(join, name, value, columns) {
        if (!recordCache[join]) recordCache[join] = {};

        let recordMeta = metaCache[type] ||
            (metaCache[type] = $db('__metadata').chain().where({code: type}).value());
        let field = metaFieldCache[type + '.' + join] ||
            (metaFieldCache[type + '.' + join] = _.where(recordMeta[0].fields, {code: join}));
        if (!field || field.length === 0 || !field[0].recordType) return false;

        let nlFilter = new nlobjSearchFilter(name, null, 'is', value),
            nlColumn = columns ? columns.map((n) => new nlobjSearchColumn(n)) : new nlobjSearchColumn(name),
            recordName = field[0].recordType,
            records = nlapiSearchRecord(recordName, null, nlFilter, nlColumn),
            fkey = name + '=' + value;

        return (recordCache[join][fkey] = records);
    }


    if (columns) {
        let columns_ = !Array.isArray(columns) ? [columns] : columns;
        for (let i = 0; i < columns_.length; i++) {
            let column_ = columns_[i];
            if (!(column_ instanceof nlobjSearchColumn)) throw nlapiCreateError('SSS_INVALID_SRCH_COL_NAME');

            if (column_.join) {
                addSelect(column_.join, column_.name);
            } else {
                let r = addSelect(column_.name);
                if (column_.name === 'formulatext') {
                    r[0] = column_.formula;
                }
            }
        }
    }

    if (filters) {
        let filters_ = !Array.isArray(filters) ? [filters] : filters;

        for (let i = 0; i < filters_.length; i++) {
            let filter_ = filters_[i];
            if (Array.isArray(filter_)) {
                filter_ = new nlobjSearchFilter(filter_[0], filter_[1], filter_[2], filter_[3], filter_[4]);
                filters_[i] = filter_;
            }
            if (filter_.join) {
                // add column
                addSelect(filter_.join, filter_.name);

                findJoinColumns(filter_.join, filter_.name, filter_.values[0]);
            } else {
                addSelect(filter_.name);
            }
        }

        items = items.filter(item => {
            for (let i = 0; i < filters_.length; i++) {
                let filter_ = filters_[i];
                if (filter_.join) {
                    let value = item[filter_.join],
                        key = filter_.join + '.' + filter_.name + '=' + value;
                    if (!joinCache[key]) {
                        joinCache[key] = {has: false};
                        let fkey = filter_.name + '=' + filter_.values[0],
                            records = recordCache[filter_.join][fkey],
                            results = _.where(records, {id: value});

                        if (!results || !results.length) return false;
                        else {
                            joinCache[key].has = true;
                            joinCache[key].rs = results[0];
                        }
                    }
                    if (!joinCache[key].has) return false;
                } else {
                    if (!item[filter_.name]) return false;
                    else if (item[filter_.name] != filter_.values[0]) return false;
                }
            }
            return true;
        });
    }
    //console.log('search record', 'select: ', select);

    return items.value().map(item => {
        let id = item.internalid;
        let columns_ = Object.keys(item).filter(c => select[c]),
            rawValues = {};

        for (let i = 0; i < columns_.length; i++) {
            let col = columns_[i],
                names = select[col];
            if (names) { for (let n = 0; n < names.length; n++) {
                let name = names[n];
                if (name === '$val') {
                    if (names.length === 1) rawValues[col] = item[col];
                    else {
                        if (!rawValues[col]) rawValues[col] = {};
                        rawValues[col].id = item[col];
                    }
                } else {
                    let value = item[col],
                        key = col + '.' + name + '=' + value;
                    if (!joinCache[key]) {
                        let records = findJoinColumns(col, 'internalid', value, [name]),
                            results = _.where(records, {id: value});

                        if (!results || !results.length) {
                            console.log('>>>>>+++', key);
                            continue;
                        } else {
                            joinCache[key] = {
                                has: true,
                                rs: results[0]
                            };
                        }
                    }

                    let data = joinCache[key] && joinCache[key].rs;
                    if (!data) {
                        console.log('>>>>>', key);
                        continue;
                    }
                    if (!rawValues[col]) rawValues[col] = {id: value};
                    rawValues[col][name] = data.getValue(name);
                }
            } }
        }
        // eval formulatext
        if (select.formulatext) {
            //TODO .. implement formulatext parse
            let fields = select.formulatext[0].match(/{[\w]*}/g);
            rawValues.formulatext = '';
            if (fields) { for (let i = 0; i < fields.length; i++) {
                let field = fields[i].replace('{', '').replace('}', '');
                item[field] && (rawValues.formulatext += item[field] + ' ');
            } }
        }

        return new nlobjSearchResult(type, id, rawValues, rawColumns);
    });
};