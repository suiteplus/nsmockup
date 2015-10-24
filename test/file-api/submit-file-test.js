'use strict';

var should = require('should'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite File API>', function () {
    before(function (done) {
        nsmockup.init(done);
    });
    describe('SuiteScript API - nlapiSubmitFile:', function () {
        let file;
        before(function (done) {
            file = nlapiCreateFile('oba-load.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);

            let folder = nlapiCreateRecord('folder');
            folder.setFieldValue('name', 'eba/humm');
            folder.setFieldValue('parent', '@NONE@');
            let folderId = nlapiSubmitRecord(folder);

            file.setIsOnline(true);
            file.setFolder(folderId);
            file.setEncoding('utf8');
            return done();
        });

        it('submit file', function (done) {
            let id = nlapiSubmitFile(file);

            should(id).be.ok();
            let fileDB = $db.object.file,
                fileObj = fileDB[id - 1];

            should(fileObj).be.ok();
            should(fileObj).have.property('name', file.getName());
            should(fileObj).have.property('type', file.getType());
            should(fileObj).have.property('folder', file.getFolder());
            should(fileObj).have.property('encoding', file.encoding);

            return done();
        });

        it('submit missing file', function (done) {
            try {
                nlapiSubmitFile();
                return done('missing file');
            } catch (e) {
                should(e).have.property('code', 'SSS_FILE_ARG_REQD');
                return done();
            }
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
