'use strict';
var invoke = require('./select-new-line-item');

var $metadata = require('../../metadata'),
    $sublist = require('../../sublist');

exports.$$hook = true;

exports.nlapiInsertLineItem = (ctx) => {

    let selectNewLineItem = invoke.nlapiSelectNewLineItem(ctx);

    /**
     * Insert and select a new line into the sublist on a page or userevent.
     *
     * @param {string} type sublist name
     * @param {int} line line number at which to insert a new line.
     * @return{void}
     *
     * @since 2005.0
     */
    return (type, line) => {
        let $this = ctx.$$THIS_RECORD || {};

        selectNewLineItem(type);
        let subList = $sublist.get($this, type);

        if (line && line > subList.size) {
            return;
        } else {
            subList.index = line;
            let data = subList.data;
            data.push({});
            for (let i = data.length; i > (line - 1); i--) {
                data[i - 1] = data[i - 2];
            }
            data[line - 1] = {};
        }
    };
};
