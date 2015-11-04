'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(5000);

    before(function (done) {
        let metadata = [
                ':customer',
                ':subsidiary'
            ],
            records = {
                'folder': `${base}/data/folder.json`,
                'customer': `${base}/data/customer.json`,
                'subsidiary': `${base}/data/subsidiary.json`
            },
            opts = {
                metadata,
                records
            };
        nsmockup.init(opts, err => {
            if (err) {
                return done(err);
            } else {
                ['opa.js', 'opa.json', 'legal.jsx'].forEach(fileName => {
                    let file = nlapiCreateFile(fileName, 'JAVASCRIPT', '{}');
                    file.setFolder(1);
                    nlapiSubmitFile(file);
                });
                return done();
            }
        });
    });
    parallel('SuiteScript API - nlapiSearchRecord - "operators" - STRING:', function () {
        it('search-op "is": folder by name', function (done) {
            let recType = 'folder',
                columns = [
                    ['name', 'parent']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'is', 'Folder-test']
                ];

            let folders = nlapiSearchRecord(recType, null, filters, columns);
            should(folders).have.length(1);
            let folder = folders[0];
            should(folder.getId()).be.equal(88);
            should(folder.getValue('name')).be.equal('Folder-test');
            should(folder.getValue('name', 'parent')).be.equal('SuiteScripts');
            return done();
        });

        it('search-op "haskeywords": folder by name', function (done) {
            let recType = 'folder',
                columns = [
                    ['name', 'parent']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'haskeywords', 'Folder-test']
                ];

            let folders = nlapiSearchRecord(recType, null, filters, columns);
            should(folders).have.length(1);
            let folder = folders[0];
            should(folder.getId()).be.equal(88);
            should(folder.getValue('name')).be.equal('Folder-test');
            should(folder.getValue('name', 'parent')).be.equal('SuiteScripts');
            return done();
        });

        it('search-op "isempty": folder by name', function (done) {
            let recType = 'folder',
                filters = [
                    ['name', null, 'isempty', '@NONE@']
                ];

            let folders = nlapiSearchRecord(recType, null, filters);
            should(folders).not.ok();
            return done();
        });

        it('search-op "isnot": folder by name', function (done) {
            let recType = 'folder',
                filters = [
                    ['name', null, 'isnot', 'SuiteScripts']
                ];

            let folders = nlapiSearchRecord(recType, null, filters);
            should(folders).have.length(1);
            let folder = folders[0];
            should(folder.getId()).be.equal(88);
            should(folder.getValue('name')).be.equal('Folder-test');
            return done();
        });

        it('search-op "isnotempty": file by name', function (done) {
            let recType = 'file',
                columns = [
                    ['name', 'folder']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'isnotempty', '@NONE@']
                ];

            let files = nlapiSearchRecord(recType, null, filters, columns);
            should(files).have.length(3);
            ['opa.js', 'opa.json', 'legal.jsx'].forEach((fileName, i) => {
                let file = files[i];
                should(file.getValue('name')).be.equal(fileName);
                should(file.getValue('name', 'folder')).be.equal('SuiteScripts');
            });
            return done();
        });

        it('search-op "any": customer by email', function (done) {
            let recType = 'customer',
                columns = [
                    ['entityid']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['email', null, 'is', 'itil@sp.com.br']
                ];

            let cusotmers = nlapiSearchRecord(recType, null, filters, columns);
            should(cusotmers).have.length(1);
            let customer = cusotmers[0];
            should(customer.getId()).be.equal(4);
            should(customer.getValue('entityid')).be.equal('O cara');

            return done();
        });

        it('search-op "contains": file by name', function (done) {
            let recType = 'file',
                columns = [
                    ['name', 'folder']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'contains', '%.js']
                ];

            let files = nlapiSearchRecord(recType, null, filters, columns);
            should(files).have.length(1);
            let file = files[0];
            should(file.getValue('name')).be.equal('opa.js');
            should(file.getValue('name', 'folder')).be.equal('SuiteScripts');
            return done();
        });

        it('search-op "doesnotcontain": file by name', function (done) {
            let recType = 'file',
                columns = [
                    ['name', 'folder']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'doesnotcontain', '%.json']
                ];

            let files = nlapiSearchRecord(recType, null, filters, columns);
            should(files).have.length(2);
            ['opa.js', 'legal.jsx'].forEach((fileName, i) => {
                let file = files[i];
                should(file.getValue('name')).be.equal(fileName);
                should(file.getValue('name', 'folder')).be.equal('SuiteScripts');
            });
            return done();
        });

        it('search-op "doesnotstartwith": file by name', function (done) {
            let recType = 'file',
                columns = [
                    ['name', 'folder']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'doesnotstartwith', 'legal.js']
                ];

            let files = nlapiSearchRecord(recType, null, filters, columns);
            should(files).have.length(2);
            ['opa.js', 'opa.json'].forEach((fileName, i) => {
                let file = files[i];
                should(file.getValue('name')).be.equal(fileName);
                should(file.getValue('name', 'folder')).be.equal('SuiteScripts');
            });
            return done();
        });

        it('search-op "startswith": file by name', function (done) {
            let recType = 'file',
                columns = [
                    ['name', 'folder']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['name', null, 'startswith', 'opa.js']
                ];

            let files = nlapiSearchRecord(recType, null, filters, columns);
            should(files).have.length(2);
            ['opa.js', 'opa.json'].forEach((fileName, i) => {
                let file = files[i];
                should(file.getValue('name')).be.equal(fileName);
                should(file.getValue('name', 'folder')).be.equal('SuiteScripts');
            });
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
