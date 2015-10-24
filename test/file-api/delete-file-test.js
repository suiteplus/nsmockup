'use strict';

var should = require('should'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite File API>', function () {
    before(function (done) {
        nsmockup.init({}, done);
    });
    describe('SuiteScript API - nlapiDeleteFile:', function () {
        let file, id;
        before(function (done) {
            file = nlapiCreateFile('oba-del.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);

            let folder = nlapiCreateRecord('folder');
            folder.setFieldValue('name', 'eba/humm');
            folder.setFieldValue('parent', '@NONE@');
            let folderId = nlapiSubmitRecord(folder);

            file.setIsOnline(true);
            file.setFolder(folderId);
            file.setEncoding('utf8');
            id = nlapiSubmitFile(file);
            return done();
        });

        it('delete file', function (done) {
            let id_ = nlapiDeleteFile(id),
                fc = $db.object.file[id-1];

            should(id_).be.equal(id);
            should(fc).be.equal(null);

            return done();
        });

        it('delete missing id', function (done) {
            try {
                nlapiDeleteFile();
                return done('missing id');
            } catch (e) {
                should(e).have.property('code', 'SSS_ID_ARG_REQD');
                return done();
            }
        });

        it('delete invalid id', function (done) {
            try {
                nlapiDeleteFile('japo');
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
