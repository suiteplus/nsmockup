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

    let collection = $db(type),
        query = {};

    if (id) query.interalid = id;
    else if (filters) {
        let filts = !Array.isArray(filters) ? [filters] : filters;
        //query = {};
    }

    let select =  {interalid: 1};
    if (columns) {
        let cols = !Array.isArray(columns) ? [columns] : columns;
        for (let i=0; i<cols.length; i++) {
            let col = cols[i];
            select[col.getName()] = 1;
        }
    }

    let items = collection.chain().where(query).value();

    return items.map(item => {
        let id = item.interalid;
        delete item.interalid;
        return new nlobjSearchResult(type, id, item, Object.keys(item));
    });
};