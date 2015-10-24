'use strict';

/**
 * Delete a file from the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {int} id internal ID of file to be deleted
 * @return {int} id.
 *
 * @since 2009.1
 */
exports.nlapiDeleteFile = (id) => {
    if (!id) {
        throw nlapiCreateError('SSS_ID_ARG_REQD');
    } else if (id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    } else {
        $db.object.file[id - 1] = null;
        $db.saveSync();
        return id;
    }
};