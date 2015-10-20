'use strict';
var //_ = require('lodash'),
    $metadata = require('../../metadata');

exports.$$hook = true;

exports.nlapiSetCurrentLineItemValue = (ctx) =>  {

    /**
     * Set the value of a field on the currently selected line.
     * @restriction synchronous arg is only supported in client SuiteScript
     *
     * @param {string} type sublist name
     * @param {string} fldnam sublist field name
     * @param {string} value field value
     * @param {boolean} [firefieldchanged]    if false then the field change event is suppressed (defaults to true)
     * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
     * @return {void}
     *
     * @since 2005.0
     */
    return (type, fldnam, value, firefieldchanged, synchronous) => {
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
            item[fldnam] = value;
        } else {
            throw nlapiCreateError('SSS_INVALID_FIELD_LINE_ITEM', `No found field "${fldnam}" in "${recType}.${type}"`);
        }
    };
};