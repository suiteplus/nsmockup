'use strict';

var should = require('should'),
    nsmockup = require('../../');

var base = __dirname + '/../_input-files/record-data';
/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Scheduling API>', function () {
    before(function (done) {
        nsmockup.init(done);
    });
    describe('SuiteScript - nlapiSetRecoveryPoint', function () {
        it('recovey-point execute', function (done) {
            let status = nlapiSetRecoveryPoint();
            should(status).be.property('status', 'SUCCESS');
            return done();
        });
    });
    describe('SuiteScript - nlapiYieldScript', function () {
        it('yeld-script execute', function (done) {
            let status = nlapiYieldScript();
            should(status).be.property('status', 'SUCCESS');
            return done();
        });
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
