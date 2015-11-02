'use strict';
var path = require('path'),
    fs = require('fs');

function findFolderPath(id) {
    if (typeof id === 'string') id = parseInt(id);
    let data = $db.object.folder[id - 1];
    if (!data) {
        return '';
    }

    let folderName = '/' + data.name;
    if (!data.parent || data.parent === '@NONE@') {
        return folderName;
    } else {
        return path.join(findFolderPath(data.parent), folderName);
    }
}

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
    if (!file) {
        throw nlapiCreateError('SSS_FILE_ARG_REQD');
    } else if (typeof file.folder !== 'number' && isNaN(parseInt(file.folder))) {
        throw nlapiCreateError('SSS_INVALID_FOLDER_ID', `Folder ID [${file.folder}], its invalid.`);
    }

    if (typeof file.folder !== 'number') {
        file.folder = parseInt(file.folder);
    }
    if (!$db('folder').chain().where({internalid: file.folder}).value().length) {
        throw nlapiCreateError('SSS_INVALID_FOLDER_ID', `Folder ID [${file.folder}] not found.`);
    }

    let folder = path.join($db.$pathCabinet, '' + file.folder),
        realPath = path.join(folder, file.name);
    if (!fs.existsSync(folder)) {
        let folders = folder.split('/'),
            base = folders[0];
        for (let i = 0; i < folders.length; i++) {
            !fs.existsSync(base) && fs.mkdirSync(base);
            if (!folders[i + 1]) continue;
            base += path.join('/', folders[i + 1]);
        }
    }
    // resolve folder path
    let folderPath = findFolderPath(file.folder);

    let fileDB = $db('file');
    fs.writeFileSync(realPath, file.content, {encoding: 'utf8' || file.encoding});
    let id = fileDB.size() + 1;
    fileDB.push({
        internalid: id,
        path: path.join(folderPath, file.name),
        realPath: realPath,
        encoding: file.encoding,
        name: file.name,
        folder: file.folder,
        type: file.type
    });
    $db.saveSync();
    return id;
};