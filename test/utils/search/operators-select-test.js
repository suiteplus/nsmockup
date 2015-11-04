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
        let metadata = [],
            records = {
                'folder': `${base}/data/folder.json`
            },
            opts = {metadata, records};
        nsmockup.init(opts, done);
    });
    parallel('SuiteScript API - nlapiSearchRecord - "operator" - SELECT:', function () {
        it('search-op "anyof": folder by parent', function (done) {
            let recType = 'folder',
                columns = [
                    ['name'],
                    ['name', 'parent']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['parent', null, 'anyof', '@NONE@']
                ];

            let folders = nlapiSearchRecord(recType, null, filters, columns);
            should(folders).have.length(1);
            let folder = folders[0];
            should(folder.getValue('name')).be.equal('SuiteScripts');
            return done();
        });

        it('search-op "noneof": folder by parent', function (done) {
            let recType = 'folder',
                columns = [
                    ['name'],
                    ['name', 'parent']
                ].map(c => new nlobjSearchColumn(c[0], c[1])),
                filters = [
                    ['parent', null, 'noneof', '@NONE@']
                ];

            let folders = nlapiSearchRecord(recType, null, filters, columns);
            should(folders).have.length(1);
            let folder = folders[0];
            should(folder.getValue('name')).be.equal('Folder-test');
            should(folder.getValue('name', 'parent')).be.equal('SuiteScripts');

            let filters2 = [
                    ['parent', null, 'noneof', '1']
                ];

            let folders2 = nlapiSearchRecord(recType, null, filters2, columns);
            should(folders2).have.length(1);
            let folder2 = folders2[0];
            should(folder2.getValue('name')).be.equal('SuiteScripts');
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
