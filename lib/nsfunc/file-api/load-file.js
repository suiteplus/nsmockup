'use strict';
var fs = require('fs');

/**
 * Load a file from the file cabinet (via its internal ID or path).
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {string, int} id internal ID or relative path to file in the file cabinet (i.e. /SuiteScript/foo.js)
 * @return {nlobjFile}
 *
 * @since 2008.2
 */
exports.nlapiLoadFile = (id) => {
    if (!id) {
        throw nlapiCreateError('SSS_ID_ARG_REQD');
    } else if (id !== 'number' && isNaN(id = parseInt(id))) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    }
    let cabinet = $db.object.__file,
        fileObj = cabinet[id - 1];
    if (!fileObj) {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID', `File no found id: ${id}, total files: ${cabinet.length}`);
    } else {
        let data = fs.readFileSync(fileObj.path, {encoding: 'utf8' || fileObj.encoding});

        let file = new nlobjFile(fileObj.name, fileObj.type, data);
        file.encoding = fileObj.encoding;
        file.folder = fileObj.folder;
        return file;
    }
};