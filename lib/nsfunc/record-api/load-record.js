'use strict';
var $metadata = require('../../metadata'),
    $events = require('../../events');

/**
 * Load an existing record from the system.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string}    type The record type name.
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
exports.nlapiLoadRecord = (type, id, initializeValues) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (!id) throw nlapiCreateError('SSS_ID_ARG_REQD');
    else if (typeof id !== 'number') throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');

    // if no exists throw error
    $metadata.exists(type);

    let collection = $db(type),
        res = collection.chain().where({internalid: id}).value();
    if (!res || !res.length) throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');

    let data = JSON.parse(JSON.stringify(res[0]));
    delete data.internalid;
    let dataFields = Object.keys(data);

    // load data to use in User Event
    let hasTrigger = $events.existsTriggerUserEvent(type);

    if (hasTrigger) {
        // load record before update
        let query = {internalid: id},
            actual = collection.chain().find(query).value();
        let record = new nlobjRecord(type, id),
            records = {
                old: record,
                new: record
            };
        for (let i = 0; i < dataFields.length; i++) {
            let field = dataFields[i],
                value = actual[field];
            record.setFieldValue(field, value);
        }

        // User Event: "beforeLoad"
        $events.runTriggerUserEvent(type, 'beforeLoad', 'view', records);
    }

    let o = new nlobjRecord(type, id),
        initFields = initializeValues ? Object.keys(initializeValues) : [];

    for (let i = 0; i < dataFields.length; i++) {
        let dataField = dataFields[i];
        o.setFieldValue(dataField, data[dataField]);

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