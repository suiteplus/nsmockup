'use strict';
var $metadata = require('../../db-utils/metadata'),
    $events = require('../../ctx-utils/events');

var fieldValue = require('../../search-utils/field-value');

function getFinalValue(opts) {
    let val = fieldValue(opts);
    if (val && typeof val === 'object') {
        return val.txt;
    } else {
        return val;
    }
}

/**
 * Load an existing record from the system.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string}    recType The record type name.
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
exports.nlapiLoadRecord = (recType, id, initializeValues) => {
    if (!recType) {
        throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    } else if (!id) {
        throw nlapiCreateError('SSS_ID_ARG_REQD');
    } else if (typeof id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    }

    // if no exists throw error
    $metadata.exists(recType);

    let collection = $db(recType),
        res = collection.chain().filter({internalid: id}).value();
    if (!res || !res.length) throw nlapiCreateError('SSS_INVALID_INTERNAL_ID', `Not found "${recType}" with ID [${id}]`, res);

    let data = JSON.parse(JSON.stringify(res[0])),
        _uuid = data._uuid;
    delete data.internalid;
    delete data._uuid;
    let dataFields = Object.keys(data);

    // load data to use in User Event
    let hasTrigger = $events.existsTriggerUserEvent(recType);

    if (hasTrigger) {
        // load record before update
        let query = {internalid: id},
            actual = collection.chain().find(query).value();
        let record = new nlobjRecord(recType, id);
        for (let i = 0; i < dataFields.length; i++) {
            let field = dataFields[i],
                value = actual[field];

            let val = getFinalValue({type: recType, code: field, value: value});
            record.setFieldValue(field, val);

        }
    }

    let o = new nlobjRecord(recType, id, _uuid),
        initFields = initializeValues ? Object.keys(initializeValues) : [];

    for (let i = 0; i < dataFields.length; i++) {
        let dataField = dataFields[i];

        let val = getFinalValue({type: recType, code: dataField, value: data[dataField]});
        o.setFieldValue(dataField, val);

        // remove same field from initializeValues
        ((i) => initFields.splice(i, 1))(initFields.indexOf(dataField));
    }

    for (let i = 0; i < initFields.length; i++) {
        let initField = initFields[i];
        if (o.getFieldValue()) {
            continue;
        } else {
            o.setFieldValue(initField, initializeValues[initField]);
        }
    }
    return o;
};