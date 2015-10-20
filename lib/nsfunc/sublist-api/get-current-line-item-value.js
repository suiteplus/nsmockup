'use strict';
var //_ = require('lodash'),
    $metadata = require('../../metadata');

exports.$$hook = true;

exports.nlapiGetCurrentLineItemValue = (ctx) => {

    /**
     * Return the value of a field on the currently selected line.
     *
     * @param {string} type sublist name
     * @param {string} fldnam sublist field name
     * @return {string}
     *
     * @since 2005.0
     */
    return (type, fldnam) => {
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

        let item = $this.sublists[type].current;

        if (item[fldnam] || item[fldnam] === null) {
            let value = item[fldnam];
            if (value) {
                return '' + value;
            } else {
                return null;
            }
        } else {
            throw nlapiCreateError('SSS_INVALID_FIELD_LINE_ITEM', `No found field "${fldnam}" in "${recType}.${type}"`);
        }
    };
};