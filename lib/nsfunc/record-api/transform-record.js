'use strict';
var $metadata = require('../../metadata');

/**
 * Create a new record using values from an existing record of a different type.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string} 	type The record type name.
 * @param {int} 	id The internal ID for the record.
 * @param {string} 	transformType The recordType you are transforming the existing record into.
 * @param {Object} 	[transformValues] An object containing transform default option/value pairs used to pre-configure transformed record
 * @return {nlobjRecord}
 *
 * @exception {SSS_INVALID_URL_CATEGORY}
 * @exception {SSS_CATEGORY_ARG_REQD}
 * @exception {SSS_INVALID_TASK_ID}
 * @exception {SSS_TASK_ID_REQD}
 * @exception {SSS_INVALID_INTERNAL_ID}
 * @exception {SSS_INVALID_EDITMODE_ARG}
 *
 * @since	2007.0
 */
exports.nlapiTransformRecord = (type, id, transformType, transformValues) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    else if (!id) throw nlapiCreateError('SSS_ID_ARG_REQD');
    else if (!transformType) throw nlapiCreateError('SSS_TRANSFORMTYPE_ARG_REQD');
    else if (typeof id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    }

    // if no exists throw error
    $metadata.exists(type) && $metadata.exists(transformType);

    let recordOrg = nlapiLoadRecord(type, id),
        recordTrans = nlapiCreateRecord(transformType);

    // clone fields from original record
    let fields = JSON.parse(JSON.stringify(recordOrg.fields));
    recordTrans.fields = fields;
    recordTrans.type = transformType;

    if (transformValues) {
        let keys = Object.keys(transformValues);
        for (let v=0; v<keys.length; v) {
            let key = keys[v],
                value = transformValues[key];
            recordTrans.setFieldValue(key, value);
        }
    }

    recordTrans.selectNewLineItem('apply');
    recordTrans.setCurrentLineItemValue('apply', 'doc', recordOrg.id);
    recordTrans.commitLineItem('apply');

    return recordTrans;
};

