'use strict';

exports.$$hook = true;

exports.nlapiGetFieldValue = (ctx) => {
    /**
     * Return the value of a field on the current record on a page.
     * @restriction supported in client and user event scripts only.
     * @param {string} fldnam the field name
     * @return {string}
     *
     * @since	2005.0
     */
    return (fldnam) => {
        let $this = ctx.$$THIS_RECORD || {},
            record = $this.recordNew;
        return record.getFieldValue(fldnam);
    };
};