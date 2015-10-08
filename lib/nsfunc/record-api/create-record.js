'use strict';
var $metadata = require('../../metadata');

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

    let meta = $metadata.find(type);

    let o = new nlobjRecord(type);
    if (initializeValues) {
        let fields = meta.fields.map(f => f.code),
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