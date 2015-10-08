'use strict';
var $metadata = require('../../metadata');

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
    // if no exists throw error
    $metadata.exists(type);

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

        let recordMeta = metaCache[type] || (metaCache[type] = $metadata.find(type));
        let field = metaFieldCache[type + '.' + join] ||
            (metaFieldCache[type + '.' + join] = _.where(recordMeta.fields, {code: join}));
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