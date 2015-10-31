'use strict';

exports.$$hook = true;

exports.nlapiGetRecordId = (ctx) => {
    /**
     * Return the internal ID corresponding to the current page or userevent script.
     *
     *  @return {int}
     *
     * @since    2007.0
     */
    return () => {
        let $this = ctx.$$THIS_RECORD || {};
        return $this.recordId;
    };
};
