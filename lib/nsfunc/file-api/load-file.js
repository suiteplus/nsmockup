'use strict';

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
    let fc = $db.object.__cabinet[id - 1],
        fs = require('fs');

    let data = fs.readFileSync(fc.path, {encoding: 'utf8' || fc.encoding});

    let file = new nlobjFile(fc.name, fc.type, data);
    file.encoding = fc.encoding;
    file.folder = fc.folder;
    return file;
};