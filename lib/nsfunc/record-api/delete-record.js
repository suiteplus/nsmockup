'use strict';
var $metadata = require('../../metadata');

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

    // if no exists throw error
    $metadata.exists(type);

    let collection = $db(type),
        query = {internalid: id};

    collection.remove(query);
};