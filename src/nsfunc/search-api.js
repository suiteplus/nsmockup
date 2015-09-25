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
    } else if (filters) {
        let filts = !Array.isArray(filters) ? [filters] : filters,
            joinCache = {},
            metaCache = {},
            metaFieldCache = {};
        items = items.filter(item => {
            for (let i = 0; i < filts.length; i++) {
                let filt = filts[i];
                if (filt.join) {
                    let key = filt.join+'.'+filt.name+'='+item[filt.join];
                    if (!joinCache[key]) {
                        joinCache[key] = { result: false };

                        let recordMeta = metaCache[type] || (metaCache[type]=$db('__metadata').chain().where({code: type}).value());
                        let field = metaFieldCache[type+'.'+filt.join] || (metaFieldCache[type+'.'+filt.join]=_.where(recordMeta[0].fields, {code: filt.join}));
                        if (!field || field.length === 0 || !field[0].recordType) return false;
                        let ijoin = nlapiSearchRecord(field[0].recordType, null, new nlobjSearchFilter(filt.name, null, 'is', filt.values[0]), new nlobjSearchColumn(filt.name));

                        if (!ijoin || ijoin.length === 0 || ijoin[0].id !== item[filt.join]) return false;
                        else joinCache[key].result = true;
                    }
                    if (!joinCache[key].result) return false;
                } else {
                    if (!item[filt.name]) return false;
                    else if (item[filt.name] != filt.values[0]) return false;
                }
            }
            return true;
        });
    }

    let select =  {};
    if (columns) {
        let cols = !Array.isArray(columns) ? [columns] : columns;
        for (let i=0; i<cols.length; i++) {
            let col = cols[i];
            select[col.getName()] = 1;
        }
    }

    return items.value().map(item => {
        let id = item.internalid;
        let columns = Object.keys(item).filter(c => select[c]),
            values = {};

        for (let i=0; i<columns.length; i++) {
            let col = columns[i];
            values[col] = item[col];
        }

        return new nlobjSearchResult(type, id, values, columns);
    });
};