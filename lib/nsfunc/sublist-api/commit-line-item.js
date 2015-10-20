'use strict';
var //_ = require('lodash'),
    $metadata = require('../../metadata');

exports.$$hook = true;

exports.nlapiCommitLineItem = (ctx) => {

    /**
     * Save changes made on the currently selected line to the sublist.
     *
     * @param {string} type sublist name
     * @return {void}
     *
     * @since 2005.0
     */
    return (type) => {
        let $this = ctx.$$THIS_RECORD || {},
            recType = $this.recordType,
            recId = $this.recordId,
            meta = $metadata.find(recType),
            sublists = meta.sublists;

        if (!sublists || !sublists[type]) {
            throw nlapiCreateError('SSS_INVALID_SUBLIST_NAME', `Not found Sublist "${type}" in Record "${recType}"`);
        } else if (!$this.sublists || !$this.sublists[type] || !$this.sublists[type].current) {
            throw nlapiCreateError('SSS_INVALID_LINE_ITEM', `No has any item in "${recType}.${type}" ID: [${recId}]`);
        }

        let record = $db(recType).chain().where({internalid: recId}).value();
        if (Array.isArray(record)) record = record[0];
        if (!record) {
            throw nlapiCreateError('SSS_INVALID_ID', `Not found any match to Record "${recType}" with ID ${recId}.`);
        }

        if (!record.$$sublists) {
            record.$$sublists = {};
        }

        let recSublist = record.$$sublists;
        if (!recSublist[type]) {
            recSublist[type] = [];
        }

        let item = $this.sublists[type].current;
        recSublist[type].push(item);

        $db.saveSync();

        delete $this.sublists[type].current;
    };
};