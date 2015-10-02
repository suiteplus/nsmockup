'use strict';

/**
 * Instantiate a file object (specifying the name, type, and contents which are base-64 encoded for binary types.)
 * @restriction Server SuiteScript only
 *
 * @param {string} name file name
 * @param {string} type file type i.e. plainText, htmlDoc, pdf, word (see documentation for the list of supported file types)
 * @param {string} contents string containing file contents (must be base-64 encoded for binary types)
 * @return {nlobjFile}
 *
 * @since 2009.1
 */
exports.nlapiCreateFile = (name, type, contents) => {
    return new nlobjFile(name, type, contents);
};

/**
 * Add/update a file in the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {nlobjFile} file a file object to submit
 * @return {int} return internal ID of file
 *
 * @since 2009.1
 */
exports.nlapiSubmitFile = (file) => {
    let fs = require('fs'),
        cabinet = $db('__cabinet');

    let folder = $db.$pathCabinet + '/' + file.folder,
        path = folder + '/' + file.name;
    if (!fs.existsSync(folder)) {
        let folders = folder.split('/'),
            base = folders[0];
        for (let i = 0; i < folders.length; i++) {
            !fs.existsSync(base) && fs.mkdirSync(base);
            base += '/' + folders[i + 1];
        }
    }

    fs.writeFileSync(path, file.content, {encoding: 'utf8' || file.encoding});
    cabinet.push({
        path: path,
        encoding: file.encoding,
        name: file.name,
        folder: file.folder,
        type: file.type
    });
    return cabinet.size();
};

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
    $db.save();
    return id;
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
    let fc = $db.object.__cabinet[id - 1],
        fs = require('fs');

    let data = fs.readFileSync(fc.path, {encoding: 'utf8' || fc.encoding});

    let file = new nlobjFile(fc.name, fc.type, data);
    file.encoding = fc.encoding;
    file.folder = fc.folder;
    return file;
};