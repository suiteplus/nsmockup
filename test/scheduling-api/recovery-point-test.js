'use strict';

var should = require('should'),
    parallel = require('mocha.parallel'),
    nsmockup = require('../../');

/**
 * Test Suites
 */
describe('<Unit Test - Netsuite Scheduling API>', function () {
    before(done => {
        nsmockup.init(done);
    });
    parallel('Scheduling API:', () => {
        describe('SuiteScript - nlapiSetRecoveryPoint', () => {
            it('recovey-point execute', done => {
                let status = nlapiSetRecoveryPoint();
                should(status).be.property('status', 'SUCCESS');
                return done();
            });
        });
        describe('SuiteScript - nlapiYieldScript', () => {
            it('yeld-script execute', done => {
                let status = nlapiYieldScript();
                should(status).be.property('status', 'SUCCESS');
                return done();
            });
        });
    });
    after(done => {
        nsmockup.destroy(done);
    });
});
