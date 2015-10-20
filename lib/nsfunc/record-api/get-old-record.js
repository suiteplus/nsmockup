'use strict';

exports.$$hook = true;

exports.nlapiGetOldRecord = (ctx)=> {
    /**
     * Return an record object containing the current record's data prior to the write operation.
     * @restriction beforeSubmit|afterSubmit User Event scripts only
     *
     * @return {nlobjRecord}
     *
     * @since 2008.1
     */
    return () => {
        let $this = ctx.$$THIS_RECORD || {};
        return $this.recordOld;
    };
};
