'use strict';
var $metadata = require('../../metadata'),
    $sublist = require('../../sublist');

exports.$$hook = true;

exports.nlapiFindLineItemValue = (ctx) => {

    /**
     * Return the 1st line number that a sublist field value appears in
     *
     * @param {string} type sublist name
     * @param {string} fldnam sublist field name
     * @param {string} val the value being queried for in a sublist field
     * @return {int}
     *
     * @since 2009.2
     */
    return (type, fldnam, val) => {
        let $this = ctx.$$THIS_RECORD || {},
            recType = $this.recordType;
        $metadata.existsSubList(recType, type);

        let recSubType = $sublist.dbName($this, type),
            query = (item => item[fldnam] == val),
            record = $db(recSubType).chain().filter(query).value(),
            line = Array.isArray(record) ? record[0] : record;

        if (line && line._index) {
            return line._index;
        } else {
            return -1;
        }
    };
};
