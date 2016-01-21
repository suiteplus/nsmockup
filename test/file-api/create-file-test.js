'use strict';

var should = require('should'),
    path = require('path'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite File API>', function () {
    before(done => {
        nsmockup.init(done);
    });
    describe('SuiteScript API - nlapiCreateFile:', () => {
        it('create file', done => {
            let file = nlapiCreateFile('oba.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);
            should(file).have.property('name', 'oba.txt');
            should(file).have.property('type', 'PLAINTEXT');
            should(file).have.property('content', 'uhuuu .. supimpa');

            let folder = nlapiCreateRecord('folder');
            folder.setFieldValue('name', 'eba/humm');
            folder.setFieldValue('parent', '@NONE@');
            let folderId = nlapiSubmitRecord(folder);

            file.setIsOnline(true);
            file.setFolder(folderId);
            file.setEncoding('utf8');
            should(file).have.property('online', true);
            should(file).have.property('folder', folderId);
            should(file).have.property('encoding', 'utf8');

            let id = nlapiSubmitFile(file),
                fc = $db.object.file[id - 1];

            should(fc).have.property('name', file.name);
            should(fc).have.property('folder', file.folder);
            should(fc).have.property('encoding', file.encoding);
            should(fc).have.property('path', path.join('/', folder.getFieldValue('name'), file.name));
            should(fc).have.property('realPath', path.join($db.$pathCabinet, '' + file.folder, file.name));
            return done();
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
