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
    describe('SuiteScript API - nlapiCreateFile and nlapiSubmitFile:', function () {
        it('create file', function (done) {
            let file = nlapiCreateFile('oba.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);
            should(file).have.property('name', 'oba.txt');
            should(file).have.property('type', 'PLAINTEXT');
            should(file).have.property('content', 'uhuuu .. supimpa');

            file.setIsOnline(true);
            file.setFolder('eba/humm');
            file.setEncoding('utf8');
            should(file).have.property('online', true);
            should(file).have.property('folder', 'eba/humm');
            should(file).have.property('encoding', 'utf8');

            let id = nlapiSubmitFile(file),
                fc = $db.object.__cabinet[id-1];

            should(fc).have.property('name', file.name);
            should(fc).have.property('folder', file.folder);
            should(fc).have.property('encoding', file.encoding);

            should(fc).have.property('path', $db.$pathCabinet+'/'+file.folder+'/'+file.name);
            return done();
        });
    });

    describe('SuiteScript API - nlapiLoadFile:', function () {
        let file, id;
        before(function (done) {
            file = nlapiCreateFile('oba-load.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);

            file.setIsOnline(true);
            file.setFolder('eba/humm');
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

            return done();
        });
    });

    describe('SuiteScript API - nlapiDeleteFile:', function () {
        let file, id;
        before(function (done) {
            file = nlapiCreateFile('oba-del.txt', 'PLAINTEXT', 'uhuuu .. supimpa');
            should(file).have.instanceOf(nlobjFile);

            file.setIsOnline(true);
            file.setFolder('eba/humm');
            file.setEncoding('utf8');
            id = nlapiSubmitFile(file);
            return done();
        });
        it('delete file', function (done) {
            let id_ = nlapiDeleteFile(id),
                fc = $db.object.__cabinet[id-1];

            should(id_).be.equal(id);
            should(fc).be.equal(null);

            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
