'use strict';

exports.$$hook = true;

exports.nlapiSetFieldValue = (ctx) => {
    /**
     * Set the value of a field on the current record on a page.
     * @restriction supported in client and user event scripts only.
     * @restriction synchronous arg is only supported in client SuiteScript
     *
     * @param {string} 	fldnam the field name
     * @param {string} 	value value used to set field
     * @param {boolean} [firefieldchanged]	if false then the field change event is suppressed (defaults to true)
     * @param {boolean} [synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
     * @return {void}
     *
     * @since	2005.0
     */
    return (fldnam, value) => {
        let $this = ctx.$$THIS_RECORD || {},
            record = $this.recordNew;
        return record.setFieldValue(fldnam, value);
    };
};