'use strict';
var _ = require('lodash');

/**
 * Find Record Type metadata.
 *
 * @param recType {String} ID of Record Type.
 * @returns {{
 *    code: string,
 *    id: number,
 *    inactive: boolean,
 *    fields: [exports.findField],
 *    [subLists]: [{
 *      code: string,
 *      fields: [exports.findSubList]
 *    }],
 *    [tabs]: [{code: string}]
 *  }}
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 */
exports.find = (recType) => {
    let meta = $db('__metadata').chain().filter({code: recType}).value();
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

/**
 * Get the data information from specific field in Record.
 *
 * @param recType {string} ID of Record Type.
 * @param fieldCode {string} ID of field.
 * @returns {{
 *    code: string,
 *    type: string,
 *    mandatory: boolean,
 *    [recordType]: string
 *  }}
 */
exports.findField = (recType, fieldCode) => {
    let recordMeta = exports.find(recType),
        result = _.filter(recordMeta.fields, {code: fieldCode}),
        field = result[0];
    if (!field) {
        return false;
    } else {
        return field;
    }
};

/**
 * Get the field data information from specific sub-list in Record.
 *
 * @param recType {string} ID of Record Type.
 * @param subType {string} ID of sub-list.
 * @returns {{
 *    code: string,
 *    type: string,
 *    mandatory: boolean,
 *    [recordType]: string
 *  }}
 */
exports.findSubList = (recType, subType) => {
    if (subType && subType.startsWith('recmach')) {
        let parent = subType.substr(7),
            field = exports.findField(recType, parent),
            parentMeta = exports.find(field.recordType);
        return parentMeta.fields;
    } else {
        let meta = exports.find(recType),
            subLists = meta.subLists,
            sub = _.filter(subLists, {code: subType});

        if (!sub || !sub.length) {
            throw nlapiCreateError('SSS_INVALID_SUBLIST_NAME', `Not found Sublist "${subType}" in Record "${recType}"`);
        } else {
            return sub[0].fields;
        }
    }
};

/**
 * Verify if Sub-List metadata exists on Record Type.
 *
 * @param recType {String} ID of Record Type.
 * @param subType {string} ID of sub-list.
 * @returns {boolean} true if exists.
 */
exports.existsSubList = (recType, subType) => {
    let subMeta = exports.findSubList(recType, subType);
    return !!(subMeta && subMeta.length);
};
