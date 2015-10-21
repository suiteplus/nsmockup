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

        let subList = $sublist.get($this, type);
        if (!subList.size) {
            return;
        } else {
            let data = $sublist.loadData($this, type),
                edits = subList.edits;

            edits.push({
                current: subList.current,
                index: subList.index
            });

            for (let e = 0; e < edits.length; e++) {
                let edit = edits[e],
                    current = edit.current,
                    index = edit.index;

                if (index <= data.length) {
                    data[index - 1] = current;
                } else {
                    data.push(current);
                }
            }

            $db.saveSync();

            $sublist.current($this, type, {cancel: true});
        }
    };
};