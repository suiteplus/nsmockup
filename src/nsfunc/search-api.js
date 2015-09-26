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
function nlapiSearchRecord(type, id, filters, columns) {
    'use strict';
    let _ = require('lodash');

    let items = $db(type).chain(),
        query = {};

    if (id) {
        query.internalid = id;
        items = items.where(query);
    }

    let select =  {};
    if (columns) {
        let columns_ = !Array.isArray(columns) ? [columns] : columns;
        for (let i=0; i<columns_.length; i++) {
            let column_ = columns_[i];
            if (!(column_ instanceof nlobjSearchColumn)) throw 'SSS_TYPE_ARG_REQD';

            if (column_.join) {
                select[column_.join] = column_.name
            } else {
                select[column_.name] = 1;
            }
        }
    }

    let recordCache = {},
        joinCache = {},
        metaCache = {},
        metaFieldCache = {};
    if (filters) {
        let filters_ = !Array.isArray(filters) ? [filters] : filters;

        for (let i = 0; i < filters_.length; i++) {
            let filter_ = filters_[i];
            if (filter_.join) {
                // add column
                !select[filter_.join] && (select[filter_.join] = filter_.name);
                
                if (!recordCache[filter_.join]) recordCache[filter_.join] = {};

                let recordMeta = metaCache[type] ||
                    (metaCache[type] = $db('__metadata').chain().where({code: type}).value());
                let field = metaFieldCache[type + '.' + filter_.join] ||
                    (metaFieldCache[type + '.' + filter_.join] = _.where(recordMeta[0].fields, {code: filter_.join}));
                if (!field || field.length === 0 || !field[0].recordType) continue;

                let nlFilter = new nlobjSearchFilter(filter_.name, null, 'is', filter_.values[0]),
                    nlColumn = new nlobjSearchColumn(filter_.name),
                    recordName = field[0].recordType,
                    records = nlapiSearchRecord(recordName, null, nlFilter, nlColumn),
                    fkey = filter_.name + '=' + filter_.values[0];

                recordCache[filter_.join][fkey] = records;
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

    return items.value().map(item => {
        let id = item.internalid;
        let columns = Object.keys(item).filter(c => select[c]),
            values = {};

        for (let i=0; i<columns.length; i++) {
            let col = columns[i];
            if (select[col] === 1) {
                values[col] = item[col];
            } else {
                let name = select[col],
                    key = col+'.'+name+'='+item[col],
                    data = joinCache[key].rs;
                if (!values[col]) values[col] = {id: item[col]};
                values[col][name] = data.getValue(name);
            }
        }
        'custrecord_type_id.custrecord_id_title_id=9'
        'custrecord_type_id.custrecord_id_title_id=9'


        return new nlobjSearchResult(type, id, values, columns);
    });
};