'use strict';

/**
 * Return an record object containing the data being submitted to the system for the currenr record.
 * @restriction User Event scripts only
 *
 * @return {nlobjRecord}
 *
 * @since 2008.1
 */
exports.nlapiGetNewRecord = () => {
    let $this = $$THIS_RECORD || {};
    return $this.recordNew;
};
