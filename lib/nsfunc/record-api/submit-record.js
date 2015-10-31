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
    let meta = $metadata.find(recType);

    let collection = $db(meta.code),
        fields = record.getAllFields();

    // load data to use in User Event
    let recId = record.getId(),
        isUpdate = recId > 0 && !!collection.where({internalid: recId}).length,
        hasTrigger = $events.existsTriggerUserEvent(meta.code),
        etype = hasTrigger && (isUpdate ? 'edit' : 'create'),
        records = hasTrigger && {old: null, new: record};

    if (isUpdate && hasTrigger) {
        // load record before update
        let query = {internalid: record.getId()},
            actual = collection.chain().find(query).value();
        let recordOld = new nlobjRecord(recType, recId);
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i],
                value = actual[field];
            recordOld.setFieldValue(field, value);
        }
        records.old = recordOld;
    }

    if (hasTrigger) {
        // User Event: "beforeSubmit"
        $events.runTriggerUserEvent(meta.code, 'beforeSubmit', etype, records);
    }

    let data = {
        internalid: record.getId(),
        _uuid: record._uuid
    };
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        data[field] = record.getFieldValue(field);
    }

    if (isUpdate) {
        // Update Record
        let query = {internalid: recId};
        collection.chain().find(query).assign(data).value();
    } else {
        // Insert New Record
        data.internalid = recId || (collection.size() + 1);
        collection.push(data);
    }

    $db.saveSync();

    // commit Sub Lists
    if (record.context) {
        let ctx = record.context,
            $this = ctx.$$THIS_RECORD,
            subLists = $this.subLists,
            subTypes = Object.keys(subLists);

        if (subTypes && subTypes.length) {
            for (let s = 0; s < subTypes.length; s++) {
                let subType = subTypes[s];
                ctx.nlapiCommitLineItem(subType);
            }
        }
    }

    if (hasTrigger) {
        // User Event: "afterSubmit"
        $events.runTriggerUserEvent(meta.code, 'afterSubmit', etype, records);
    }

    return (record.id = data.internalid);
};