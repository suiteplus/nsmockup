'use strict';
var $metadata = require('../../db-utils/metadata'),
    $sublist = require('../../ctx-utils/sublist');

exports.$$hook = true;

exports.nlapiSelectNewLineItem = (ctx) => {

    /**
     * Select a new line in a sublist.
     * @restriction Only supported for sublists of type inlineeditor and editor
     *
     * @param {string} type sublist name
     * @return {void}
     *
     * @since 2005.0
     */
    return (type) => {
        let $this = ctx.$$THIS_RECORD || {},
            recType = $this.recordType,
            subMeta = $metadata.findSubList(recType, type);

        let line = $sublist.current($this, type, {new: true});

        for (let m = 0; m < subMeta.length; m++) {
            let field = subMeta[m];
            line[field.code] = null;
        }
    };
};