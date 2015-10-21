'use strict';
var $metadata = require('../../metadata'),
    $sublist = require('../../sublist');

exports.$$hook = true;

exports.nlapiGetCurrentLineItemIndex = (ctx) => {

    /**
     * Return the line number for the currently selected line.
     *
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
        return subList.index || -1;
    };
};
