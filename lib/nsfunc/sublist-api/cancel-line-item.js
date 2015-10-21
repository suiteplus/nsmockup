'use strict';
var $metadata = require('../../metadata'),
    $sublist = require('../../sublist');

exports.$$hook = true;

exports.nlapiCancelLineItem = (ctx) => {

    /**
     * Cancel any changes made on the currently selected line.
     * @restriction Only supported for sublists of type inlineeditor and editor
     *
     * @param {string} type sublist name
     * @return {void}
     *
     * @since 2005.0
     */
    return (type) => {
        let $this = ctx.$$THIS_RECORD || {},
            recType = $this.recordType;
        $metadata.existsSubList(recType, type);

        $sublist.current($this, type, {cancel: true});
    };
};
