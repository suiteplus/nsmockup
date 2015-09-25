'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(10000);
    before(function (done) {
        let metadatas = [
                __dirname + '/record/meta/recordType-metaData-codeg.json',
                __dirname + '/record/meta/recordType-metaData-codeg_ids.json'
            ],
            records = {
                'customrecord_codeg': __dirname + '/record/data/recordType-codeg.json',
                'customrecord_codeg_ids': __dirname + '/record/data/recordType-codeg_ids.json'
            };
        nsmockup.initDB({records, metadatas}, done);
    });
    describe('SuiteScript API - nlapiSearchRecord:', function () {
        it('simple search', function (done) {
            var columns = [
                'custrecord_type_id',
                'custrecord_code_id'
            ].map(c => new nlobjSearchColumn(c));

            let codes = nlapiSearchRecord('customrecord_codeg', null, null, columns);
            should(codes).have.length(1244);
            for (let i = 0; i < codes.length; i++) {
                let code = codes[i];
                should(code).have.instanceOf(nlobjSearchResult);
                should(code).have.property('id');
                should(code).have.property('type', 'customrecord_codeg');
                //should(code).have.property('rawColumns').have.length(3);

                let cols = code.getAllColumns();
                should(cols).have.length(2);
                for (let j = 0; j < cols.length; j++) {
                    let col = cols[j];
                    should(col).have.instanceOf(nlobjSearchColumn);
                    should(col).have.property('name').have.equalOneOf(['custrecord_type_id', 'custrecord_code_id'])
                }
            }

            return done();
        });

        it('search by internalid', function(done) {
            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c));

            var codes = nlapiSearchRecord('customrecord_codeg', 5, null, columns);
            should(codes).have.length(1);
            return done();
        });

        it('search by field', function(done) {
            let columns = [
                    'custrecord_type_id',
                    'custrecord_code_id'
                ].map(c => new nlobjSearchColumn(c)),
                filters = [
                    ['custrecord_type_id', null, 'is', 237]
                ].map(f => new nlobjSearchFilter(f[0], f[1], f[2], f[3]));

            var codes = nlapiSearchRecord('customrecord_codeg', null, filters, columns);
            should(codes).have.length(224);
            return done();
        });
    });
    after(function (done) {
        done();
    });
});
