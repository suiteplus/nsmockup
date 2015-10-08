'use strict';
var $metadata = require('../../metadata');

/**
 * Fetch the value of one or more fields on a record. This API uses search to look up the fields and is much
 * faster than loading the record in order to get the field.
 * @governance 10 units for transactions, 2 for custom records, 4 for all other records
 *
 * @param {string}    type The record type name.
 * @param {int}    id The internal ID for the record.
 * @param {string, string[]} fields - field or fields to look up.
 * @param {boolean} [text] If set then the display value is returned instead for select fields.
 * @return {string, Object} single value or an Object of field name/value pairs depending on the fields argument.
 *
 * @since    2008.1
 */
exports.nlapiLookupField = (type, id, fields, text) => {
    if (!type) throw nlapiCreateError('SSS_TYPE_ARG_REQD');
    if (!id) throw nlapiCreateError('SSS_ID_ARG_REQD', `type: ${type}`);
    else if (typeof id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID', `type: ${type}, id: ${id}`);
    }
    if (!fields || fields.length === 0 || (typeof fields !== 'string' && !Array.isArray(fields))) {
        throw nlapiCreateError('SSS_FIELDS_ARG_REQD');
    }

    let meta = $metadata.find(type);

    let collection = $db(type),
        single = typeof fields === 'string';

    var res = collection.chain().where({internalid: id}).value();
    if (!res || !res.length) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID', `type: ${type}, id: ${id}, size: ${collection.size()}`);
    }

    let data = JSON.parse(JSON.stringify(res[0])),
        joins = {}, joinRegExp = /\./;
    if (Array.isArray(fields)) {
        let _ = require('lodash');

        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (joinRegExp.test(field)) {
                let ss = field.split('.'),
                    code = ss[0];
                if (!joins[code]) {
                    let metaField = _.where(meta.fields, {code}),
                        meta_ = $metadata.find(metaField[0].recordType);
                    if (meta_ && meta_.code) {
                        let collection = $db(meta_.code),
                            data_ = collection.chain().where({internalid: data[code]}).value();

                        if (data_ && data_.length > 0) {
                            joins[code] = data_[0];
                        }
                    }
                    !joins[code] && (joins[code] = {});
                }
            }
        }
    }


    if (single) {
        return '' + data[fields];
    } else {
        let result = {};
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (joinRegExp.test(field)) {
                let ss = field.split('.'),
                    code = ss[0],
                    val = ss[1];
                result[field] = joins[code][val];
            } else {
                result[field] = data[field];
            }
        }
        return result;
    }
};