'use strict';
var moment = require('moment'),
    $metadata = require('../db-utils/metadata');

var operator = require('./operator');

const $$NS_VALIDATE_DATE_JSON = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;

module.exports = (opts) => {
    const $GENERAL = global.$$GENERAL_PREFS;

    let fieldCode = opts.code,
        fieldMeta = $metadata.findField(opts.type, fieldCode),
        fieldRecType = fieldMeta.recordType,
        fieldType = fieldMeta.type;

    if (fieldRecType && fieldRecType.indexOf('customlist') === 0) {
        let listItem = $db(fieldRecType).chain().filter({internalid: opts.value}).value(),
            obj = {id: opts.value, txt: ''};
        obj.txt = listItem && listItem.length ? listItem[0].name : opts.value;
        return obj;
    } else if (fieldType === 'CURRENCY') {
        if (opts.value) {
            let numberFormat = $GENERAL.numberFormat,
                precision = numberFormat.precision,
                value = opts.value;

            if (typeof opts.value !== 'number') {
                value = Number(value.replace(/,/g, ''));
            }

            return value.toFixed(Math.max(0, ~~precision));
        } else {
            return '';
        }
    } else if (~operator.GROUP_TEXT.indexOf(fieldType) || fieldCode === 'internalid') {
        if (opts.value) {
            return typeof opts.value === 'string' ? opts.value : ('' + opts.value);
        } else {
            return '';
        }
    } else if (~operator.GROUP_NUM.indexOf(fieldType) || fieldType === 'SELECT') {
        if (!opts.value) {
            return 0;
        } else if (~['CURRENCY', 'DECIMAL'].indexOf(fieldType)) {
            return typeof opts.value !== 'number' ? parseFloat(opts.value) : opts.value;
        } else {
            return typeof opts.value !== 'number' ? parseInt(opts.value) : opts.value;
        }
    } else if (~operator.GROUP_DATE.indexOf(fieldType)) {
        if (opts.value) {
            let date;
            if (typeof opts.value === 'string') {
                let dateType = opts.value.match($$NS_VALIDATE_DATE_JSON) ? null : fieldType;
                date = nlapiStringToDate(opts.value, dateType);
            } else {
                date = moment.utc(opts.value).toDate();
            }
            return nlapiDateToString(date, fieldType);
        } else {
            return '';
        }
    } else {
        return opts.value;
    }
};