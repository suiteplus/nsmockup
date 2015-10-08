'use strict';

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