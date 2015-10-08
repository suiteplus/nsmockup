'use strict';

/**
 * Return the recordtype corresponding to the current page or userevent script.
 *
 * @return {string}
 *
 * @since	2007.0
 */
exports.nlapiGetRecordType = () => {
    let $this = $$THIS_RECORD || {};
    return $this.recordType;
};
