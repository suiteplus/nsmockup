'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Scheduling API>', function () {
    before(function (done) {
        nsmockup.init(done);
    });
    parallel('Scheduling API:', function () {
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
    });
    after(function (done) {
        nsmockup.destroy(done);
    });
});
