'use strict';

/**
 * Return an record object containing the current record's data prior to the write operation.
 * @restriction beforeSubmit|afterSubmit User Event scripts only
 *
 * @return {nlobjRecord}
 *
 * @since 2008.1
 */
exports.nlapiGetOldRecord = () => {
    let $this = $$THIS_RECORD || {};
    return $this.recordOld;
};
