'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(5000);

    before(function (done) {
        let metadata = [
                base + '/meta/recordType-metaData-codeg.json',
                base + '/meta/recordType-metaData-codeg_ids.json'
            ],
            records = {
                'customrecord_codeg': base + '/data/recordType-codeg.json',
                'customrecord_codeg_ids': base + '/data/recordType-codeg_ids.json'
            };
        nsmockup.init({records, metadata}, done);
    });
    describe('SuiteScript API - nlapiCreateSearch:', function () {
        let recType = 'customrecord_codeg_ids';

        it('create new search', function (done) {
            let search = nlapiCreateSearch(recType);
            should(search).be.instanceOf(nlobjSearch);

            let set = search.runSearch();
            should(set).be.instanceOf(nlobjSearchResultSet);
            set.forEachResult(item => {
                should(item).be.instanceOf(nlobjSearchResult);
                should(item.getRecordType()).be.equal(recType);
                should(item.getAllColumns()).have.length(0);
            });
            return done();
        });

        it('create new search - all columns', function (done) {
            let columns = [
                    'custrecord_id_code_id',
                    'custrecord_id_title_id'
                ].map(c => new nlobjSearchColumn(c)),
                search = nlapiCreateSearch(recType, null, columns);
            should(search).be.instanceOf(nlobjSearch);

            let set = search.runSearch();
            should(set).be.instanceOf(nlobjSearchResultSet);
            set.forEachResult(item => {
                should(item).be.instanceOf(nlobjSearchResult);
                should(item.getRecordType()).be.equal(recType);
                let columns = item.getAllColumns();
                should(columns).have.length(2);
            });
            return done();
        });

        it('create new search - filter by id', function (done) {
            let columns = [
                    'custrecord_id_code_id',
                    'custrecord_id_title_id'
                ].map(c => new nlobjSearchColumn(c)),
                filter = new nlobjSearchFilter('internalid', null, 'is', 219),
                search = nlapiCreateSearch(recType, filter, columns);
            should(search).be.instanceOf(nlobjSearch);

            let set = search.runSearch();
            should(set).be.instanceOf(nlobjSearchResultSet);
            set.forEachResult(item => {
                should(item).be.instanceOf(nlobjSearchResult);
                should(item.getRecordType()).be.equal(recType);
                should(item.getId()).be.equal(219);
                should(item.getValue('custrecord_id_code_id')).be.equal('219');
                should(item.getValue('custrecord_id_title_id')).be.equal('japo 219');
            });
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
