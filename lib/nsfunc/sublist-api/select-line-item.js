'use strict';
var $metadata = require('../../db-utils/metadata'),
    $sublist = require('../../ctx-utils/sublist');

exports.$$hook = true;

exports.nlapiSelectLineItem = (ctx) => {

    /**
     * Select an existing line in a sublist.
     *
     * @param {string} type sublist name
     * @param {int} linenum line number to select
     * @return {void}
     *
     * @since 2005.0
     */
    return (type, linenum) => {
        let $this = ctx.$$THIS_RECORD || {},
            recType = $this.recordType;
        $metadata.existsSubList(recType, type);

        if (linenum <= 0) {
            throw nlapiCreateError('SSS_INVALID_LINE_NUMBER', `The first line number on a sublist is 1 (not 0)`);
        } else {
            $sublist.current($this, type, {index: linenum});
        }
    };
};
