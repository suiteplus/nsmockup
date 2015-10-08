'use strict';

/**
 * Delete a file from the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {int} id internal ID of file to be deleted
 * @return {id}
 *
 * @since 2009.1
 */
exports.nlapiDeleteFile = (id) => {
    $db.object.__cabinet[id - 1] = null;
    $db.saveSync();
    return id;
};