'use strict';
var $metadata = require('../../db-utils/metadata'),
    $sublist = require('../../ctx-utils/sublist');

exports.$$hook = true;

exports.nlapiGetLineItemCount = (ctx) => {

    /**
     * Return the number of sublists in a sublist on the current record on a page.
     * @restriction supported in client and user event scripts only.
     * @param {string} type sublist name
     * @return {int}
     *
     * @since 2005.0
     */
    return (type) => {
        let $this = ctx.$$THIS_RECORD || {},
            recType = $this.recordType;
        $metadata.existsSubList(recType, type);

        let subList = $sublist.get($this, type);
        return subList.size;
    };
};