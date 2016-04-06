'use strict';

exports.$$hook = true;

exports.nlapiSetFieldTexts = (ctx) => {
    /**
     * Set the values of a multiselect field on the current record on a page.
     * @restriction supported in client and user event scripts only.
     * @restriction synchronous arg is only supported in client SuiteScript
     *
     * @param {string} 		fldnam field name
     * @param {string[]} 	values array of strings containing values for field
     * @param {boolean} 	[firefieldchanged] if false then the field change event is suppressed (defaults to true)
     * @param {boolean} 	[synchronous] if true then sourcing and field change execution happens synchronously (defaults to false).
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