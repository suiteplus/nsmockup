'use strict';

var should = require('should'),
    parallel = require('mocha.parallel');

/**
 * Test Suites
 */
parallel('<Unit Test - Netsuite Communication API>', function () {
    describe('SuiteScript API - nlapiSendEmail:', () => {
        it('just test function', done => {
            should(nlapiSendEmail).be.ok();
            nlapiSendEmail();
            return done();
        });
    });

    describe('SuiteScript API - nlapiSendCampaignEmail:', () => {
        it('just test function', done => {
            should(nlapiSendCampaignEmail).be.ok();
            nlapiSendCampaignEmail();
            return done();
        });
    });

    describe('SuiteScript API - nlapiSendFax:', () => {
        it('just test function', done => {
            should(nlapiSendFax).be.ok();
            nlapiSendFax();
            return done();
        });
    });
});
