'use strict';
var //_ = require('lodash'),
    $metadata = require('../../metadata');

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
            meta = $metadata.find(recType),
            sublists = meta.sublists;

        if (!sublists || !sublists[type]) {
            throw nlapiCreateError('SSS_INVALID_SUBLIST_NAME', `Not found Sublist "${type}" in Record "${recType}"`);
        }

        if (!$this.sublists) $this.sublists = {};
        if (!$this.sublists[type]) $this.sublists[type] = {};

        let line = {};
        $this.sublists[type].current = line;


        let subMeta = sublists[type] || [];
        for (let m = 0; m < subMeta.length; m++) {
            let field = subMeta[m];
            line[field.code] = null;
        }
    };
};