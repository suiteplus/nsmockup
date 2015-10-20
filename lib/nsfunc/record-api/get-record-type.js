'use strict';
exports.$$hook = true;

exports.nlapiGetRecordType = (ctx) => {
    /**
     * Return the recordtype corresponding to the current page or userevent script.
     *
     * @return {string}
     *
     * @since	2007.0
     */
    return () => {
        let $this = ctx.$$THIS_RECORD || {};
        return $this.recordType;
    };
};
