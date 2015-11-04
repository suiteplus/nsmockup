'use strict';
var _ = require('lodash');

/**
 * Find Record Type metadata.
 *
 * @param recType {String} ID of Record Type.
 * @returns {Object} metadata of Record Type
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 */
exports.find = (recType) => {
    let meta = $db('__metadata').chain().where({code: recType}).value();
    if (!recType || !meta || !meta.length) {
        throw nlapiCreateError('SSS_INVALID_RECORD_TYPE', `Record Type "${recType}" not found`);
    } else {
        return Array.isArray(meta) ? meta[0] : meta;
    }
};

/**
 * Verify if Record Type metadata exists on nsmockup database.
 *
 * @param recType {String} ID of Record Type.
 * @returns {boolean}
 */
exports.exists = (recType) => {
    let meta = exports.find(recType);
    return !!meta;
};


exports.findField = (recType, fieldCode) => {
    let recordMeta = exports.find(recType),
        result = _.where(recordMeta.fields, {code: fieldCode}),
        field = result[0];
    if (!field) {
        return false;
    } else {
        return field;
    }
};

exports.findSubList = (recType, subType) => {
    let meta = exports.find(recType),
        subLists = meta.subLists,
        sub = _.where(subLists, {code: subType});

    if (!sub || !sub.length) {
        throw nlapiCreateError('SSS_INVALID_SUBLIST_NAME', `Not found Sublist "${subType}" in Record "${recType}"`);
    } else {
        return sub[0].fields;
    }
};

exports.existsSubList = (recType, subType) => {
    let subMeta = exports.findSubList(recType, subType);
    return !!(subMeta && subMeta.length);
};
