'use strict';
exports.$$hook = true;


exports.nlapiGetNewRecord = (ctx)=> {
    /**
     * Return an record object containing the data being submitted to the system for the currenr record.
     * @restriction User Event scripts only
     *
     * @return {nlobjRecord}
     *
     * @since 2008.1
     */
    return () => {
        let $this = ctx.$$THIS_RECORD || {};
        return $this.recordNew;
    };
};
