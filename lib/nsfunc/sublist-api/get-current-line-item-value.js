'use strict';
var $metadata = require('../../metadata'),
    $sublist = require('../../sublist');

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
            recType = $this.recordType;

        $metadata.existsSubList(recType, type);

        let item = $sublist.current($this, type);

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