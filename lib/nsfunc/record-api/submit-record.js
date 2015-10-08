'use strict';
var $metadata = require('../../metadata'),
    $events = require('../../events');

/**
 * Submit a record to the system for creation or update.
 * @governance 20 units for transactions, 4 for custom records, 8 for all other records
 *
 * @param {nlobjRecord} record nlobjRecord object containing the data record.
 * @param {boolean}    [doSourcing] If not set, this argument defaults to false.
 * @param {boolean}    [ignoreMandatoryFields] Disables mandatory field validation for this submit operation.
 * @return {string} internal ID for committed record.
 *
 * @exception {SSS_INVALID_RECORD_OBJ}
 * @exception {SSS_RECORD_OBJ_REQD}
 * @exception {SSS_INVALID_SOURCE_ARG}
 *
 * @since    2007.0
 */
exports.nlapiSubmitRecord = (record, doSourcing, ignoreMandatoryFields) => {
    if (!record) throw nlapiCreateError('SSS_RECORD_OBJ_REQD');

    let recType = record.getRecordType();

    // if no exists throw error
    $metadata.exists(recType);

    let collection = $db(recType),
        fields = record.getAllFields();

    let isUpdate = record.getId() > 0,
        etype = isUpdate ? 'edit' : 'create',
        recordOld = null;

    // load record before update
    if (isUpdate) {
        let query = {internalid: record.getId()},
            actual = collection.chain().find(query).value();
        recordOld = new nlobjRecord(recType, record.getId());
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i],
                value = actual[field];
            value && recordOld.setFieldValue(field, value);
        }
    }

    // User Event: "beforeSubmit"
    {
        let events = $events.userEvent(recType, 'beforeSubmit'),
            records = {old: recordOld, new: record};
        for (let e = 0; e < events.length; e++) {
            let event = events[e];
            $events.executeUserEvent(event, etype, records);
        }
    }

    let data = {internalid: record.getId()};
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        data[field] = record.getFieldValue(field);
    }

    if (isUpdate) {
        // Update Record
        let query = {internalid: data.internalid};
        collection.chain().find(query).assign(data).value();
    } else {
        // Insert New Record
        data.internalid = collection.size() + 1;
        collection.push(data);
    }

    // User Event: "afterSubmit"
    {
        let events = $events.userEvent(recType, 'afterSubmit'),
            records = {old: recordOld, new: record};
        for (let e = 0; e < events.length; e++) {
            let event = events[e];
            $events.executeUserEvent(event, etype, records);
        }
    }

    return (record.id = data.internalid);
};