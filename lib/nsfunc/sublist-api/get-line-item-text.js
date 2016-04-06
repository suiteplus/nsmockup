'use strict';
var invoke = require('./get-line-item-value');

exports.$$hook = true;

exports.nlapiGetLineItemText = (ctx) => {

    /**
     * Return the label of a select field's current selection for a particular line.
     *
     * @param {string}    type sublist name
     * @param {string}    fldnam sublist field name
     * @param {int}    linenum line number (1-based)
     * @return {string}
     *
     * @since 2005.0
     */
    return invoke.nlapiGetLineItemValue(ctx);
};