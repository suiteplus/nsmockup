'use strict';
var $metadata = require('../../metadata');

/**
 * Submit the values of a field or set of fields for an existing record.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 * @restriction only supported for records and fields where DLE (Direct List Editing) is supported
 *
 * @param {string} 		type The record type name.
 * @param {int} 		id The internal ID for the record.
 * @param {string, string[]} fields field or fields being updated.
 * @param {string, string[]} values field value or field values used for updating.
 * @param {boolean} 	[doSourcing] If not set, this argument defaults to false and field sourcing does not occur.
 * @return {void}
 *
 * @since	2008.1
 */
exports.nlapiSubmitField = (type, id, fields, values, doSourcing) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (!id) throw nlapiCreateError('SSS_ID_ARG_REQD');
    else if (typeof id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    }
    if (!fields || fields.length === 0 || (typeof fields !== 'string' && !Array.isArray(fields))) {
        throw nlapiCreateError('SSS_FIELDS_ARG_REQD');
    }
    if (!values || values.length === 0 || (typeof values !== 'string' && !Array.isArray(values))) {
        throw nlapiCreateError('SSS_VALUES_ARG_REQD');
    }

    // if no exists throw error
    $metadata.exists(type);

    let collection = $db(type),
        query = {internalid: id},
        res = collection.chain().find(query).value();

    if (!res || res.length === 0) throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    let data = Array.isArray(res) ? res[0] : res;
    for (let i=0; i<fields.length; i++) {
        let field = fields[i],
            value = values[i];

        data[field] = value;
    }

    collection.chain().find(query).assign(data).value();
};
