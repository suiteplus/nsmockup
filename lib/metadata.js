'use strict';

/**
 * Find Record Type metadata.
 *
 * @param recType {String} ID of Record Type.
 * @returns {Object} metadata of Record Type
 *
 * @exception {SSS_INVALID_RECORD_TYPE}
 */
exports.find = (recType) => {
    if (recType === 'file') {
        recType = '__' + recType;
    }

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
