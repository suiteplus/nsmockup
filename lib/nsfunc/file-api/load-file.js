'use strict';
var path = require('path'),
    fs = require('fs');

var iniFile = (fileObj) => {
        let data = fs.readFileSync(fileObj.realPath, {encoding: 'utf8' || fileObj.encoding});

        let file = new nlobjFile(fileObj.name, fileObj.type, data);
        file.encoding = fileObj.encoding;
        file.folder = fileObj.folder;
        return file;
};

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
    } else if (typeof id !== 'number' && typeof id !== 'string') {
        throw nlapiCreateError('SSS_INVALID_INTERNAL_ID');
    }
    if (!isNaN(parseInt(id))) {
        if (typeof id === 'string') {
            id = parseInt(id);
        }
        let fileDB = $db.object.file,
            fileObj = fileDB[id - 1];
        if (fileObj) {
            return iniFile(fileObj);
        } else {
            throw nlapiCreateError('SSS_INVALID_INTERNAL_ID', `File no found id: ${id}`);
        }
    } else {
        let filePath = path.join('/', id);
        let fileDB = $db('file'),
            fileObj = fileDB.chain().where({path: filePath}).value();

        if (Array.isArray(fileObj)) fileObj = fileObj[0];
        if (fileObj) {
            return iniFile(fileObj);
        } else {
            throw nlapiCreateError('SSS_INVALID_INTERNAL_ID', `File no found path: ${filePath}`);
        }
    }
};