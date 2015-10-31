'use strict';

var path = require('path'),
    should = require('should'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite File API>', function () {
    this.timeout(5000);

    before(function (done) {
        nsmockup.init(done);
    });
    describe('SuiteScript API - nlapiLoadFile:', function () {
        let folderNames = ['opa', 'ebaa', 'hummm'],
            file, id;
        before(function (done) {
            file = nlapiCreateFile('oba-load.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);

            let lastFolderId = '@NONE@';
            for (let f = 0; f < folderNames.length; f++) {
                let folderName = folderNames[f],
                    folder = nlapiCreateRecord('folder');
                folder.setFieldValue('name', folderName);
                folder.setFieldValue('parent', lastFolderId);
                lastFolderId = nlapiSubmitRecord(folder);
            }

            file.setIsOnline(true);
            file.setFolder(lastFolderId);
            file.setEncoding('utf8');
            id = nlapiSubmitFile(file);
            return done();
        });

        it('load file', function (done) {
            let data = nlapiLoadFile(id);

            should(file).have.instanceOf(nlobjFile);
            should(data).have.property('name', file.name);
            should(data).have.property('type', file.type);
            should(data).have.property('content', file.content);
            should(data).have.property('encoding', file.encoding);

            let fc = $db.object.file[id-1];
            should(fc).have.property('path', path.join('/', folderNames.join('/'), file.name));
            should(fc).have.property('realPath', path.join($db.$pathCabinet, ''+file.folder, file.name));

            return done();
        });

        it('load missing id', function (done) {
            try {
                nlapiLoadFile();
                return done('missing id');
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('load invalid id', function (done) {
            try {
                nlapiLoadFile('japo');
                return done('invalid id');
            } catch (e) {
                should(e).have.property('code', 'SSS_INVALID_INTERNAL_ID');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
