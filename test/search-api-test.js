'use strict';

var should = require('should'),
    nsmockup = require('../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Search API>', function () {
    this.timeout(10000);
    before(function (done) {
        let records = {
            'customrecord_codeg': __dirname + '/data/in/recordType-codeg.json'
        };
        nsmockup.initDB(records, done);
    });
    describe('SuiteScript API - nlapiSearchRecord:', function () {
        it('simple search', function (done) {
            var codes = nlapiSearchRecord('customrecord_codeg');
            //should(codes);

            return done();
        });

    });
    after(function (done) {
        done();
    });
});
