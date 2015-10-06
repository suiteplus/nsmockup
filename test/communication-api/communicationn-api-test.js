'use strict';

var should = require('should');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Communication API>', function () {
    describe('SuiteScript API - nlapiSendEmail:', function () {
        it('just test function', function (done) {
            should(nlapiSendEmail).be.ok();
            nlapiSendEmail();
            return done();
        });
    });

    describe('SuiteScript API - nlapiSendCampaignEmail:', function () {
        it('just test function', function (done) {
            should(nlapiSendCampaignEmail).be.ok();
            nlapiSendCampaignEmail();
            return done();
        });
    });

    describe('SuiteScript API - nlapiSendFax:', function () {
        it('just test function', function (done) {
            should(nlapiSendFax).be.ok();
            nlapiSendFax();
            return done();
        });
    });
});
