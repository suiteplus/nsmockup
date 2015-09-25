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
            var codes = nlapiSearchRecord('customrecord_codeg');
            should(codes).have.length(1244);
            for (let i=0; i<codes.length; i++) {
                let code = codes[i];
                should(code).have.instanceOf(nlobjSearchResult);
                should(code).have.property('id');
                should(code).have.property('type', 'customrecord_codeg');
                //should(code).have.property('rawColumns').have.length(3);

                let cols = code.getAllColumns();
                should(cols).have.length(3);
                for(let j=0; j<3; j++) {
                   let col = cols[j];
                    should(col).have.instanceOf(nlobjSearchColumn);
                    should(col).have.property('name').have.equalOneOf(['custrecord_type_id', 'custrecord_code_id', 'internalid'])
                }
            }

            return done();
        });

    });
    after(function (done) {
        done();
    });
});
