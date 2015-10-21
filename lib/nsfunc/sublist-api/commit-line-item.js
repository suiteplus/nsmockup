'use strict';
var $metadata = require('../../metadata'),
    $sublist = require('../../sublist');

exports.$$hook = true;

exports.nlapiCommitLineItem = (ctx) => {

    /**
     * Save changes made on the currently selected line to the sublist.
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

        let subList = $sublist.get($this, type),
            data = $sublist.loadData($this, type),
            index = subList.index,
            current = subList.current;

        if (index > 0) {
            data[index] = current;
        } else {
            data.push(current);
        }

        $db.saveSync();

        $sublist.current($this, type, {cancel: true});
    };
};