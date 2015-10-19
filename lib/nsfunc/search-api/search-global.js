'use strict';

/**
 * Perform a global record search across the system.
 * @governance 10 units
 * @restriction returns the first 1000 rows in the search
 *
 * @param {string} keywords Global search keywords string or expression.
 * @return {nlobjSearchResult[]} Returns an Array of nlobjSearchResult objects containing the following four columns: name, type (as shown in the UI), info1, and info2.
 *
 * @since	2008.1
 */
exports.nlapiSearchGlobal = (keywords) => {
    let prefix;
    if (~keywords.indexOf(':')) {
        let ss = keywords.split(':');
        prefix = ss[0];
        keywords = ss[1];
    }
    let metas = $db('__metadata').value(),
        filterMetadatas = [];
    for (let m = 0; m < metas.length; m++) {
        let meta = metas[m];
        if (!prefix || meta.code.indexOf(prefix) === 0) {
            filterMetadatas.push(meta);
        }
    }

    let results = [];
    for (let r = 0; r < filterMetadatas.length; r++) {
        let metadata = filterMetadatas[r],
            recType = metadata.code,
            records = $db(recType).value();
        for (let i = 0; i < records.length; i++) {
            let record = records[i],
                keys = Object.keys(record);

            for (let k=0; k<keys.length; k++) {
                let key = keys[k],
                    value = record[key];
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                } else if (typeof value !== 'string') {
                    value = '' + value;
                }

                if (~value.indexOf(keywords)) {
                    let result = nlapiSearchRecord(recType, record.internalid, null, new nlobjSearchColumn(key));
                    results.push(Array.isArray(result) ? result[0]: result);
                    break;
                }
            }
        }
    }

    return results;
};
