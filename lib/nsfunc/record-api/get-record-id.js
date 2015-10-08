'use strict';

/**
 * Return the internal ID corresponding to the current page or userevent script.
 *
 *  @return {int}
 *
 * @since	2007.0
 */
exports.nlapiGetRecordId = () => {
    let $this = $$THIS_RECORD || {};
    return $this.recordId;
};
