'use strict';
var invoke = require('./get-current-line-item-value');

exports.$$hook = true;

exports.nlapiGetCurrentLineItemText = (ctx) => {

    /**
     * Return the label of a select field's current selection on the currently selected line.
     *
     * @param {string} type sublist name
     * @param {string} fldnam sublist field name
     * @return {string}
     *
     * @since 2005.0
     */
    return invoke.nlapiGetCurrentLineItemValue(ctx);
};